import express from "express";
import { query, validationResult } from "express-validator";
const router = express.Router();

import get_youtube_activities from "../services/youtube/get_youtube_activities";
import get_youtube_videos from "../services/youtube/get_youtube_videos";
import get_youtube_search from "../services/youtube/get_youtube_search";
import select_youtube_videos from "../services/youtube/select_youtube_videos";
import get_video from "../services/video/get_video";
import { get_time } from "../lib/get_times";
import update_playlistItems from "../services/youtube/playlist/update_playlistItems";
import { toUTC } from "../lib/get_times";
import { checkQuery } from "../lib/checkQuery";

router.get(
  "/activities",
  // バリデーション
  query("channelId").if(query("channelId").exists()).isAscii(),
  query("publishedAfter").if(query("publishedAfter").exists()).isRFC3339(),
  query("publishedBefore").if(query("publishedBefore").exists()).isRFC3339(),
  query("hour_ago").if(query("hour_ago").exists()).isInt({ min: 1 }),
  query().custom((value) => {
    if (value.hour_ago && (value.publishedAfter || value.publishedBefore)){
      throw new Error("publishedAfter, publishedBefore指定時にhour_agoは指定できません");
    }
    if (!value.hour_ago && !value.publishedAfter && !value.publishedBefore){
      throw new Error("publishedAfter, publishedBefore か hour_ago 指定してください");
    }
    return true;
  }),
  checkQuery(["channelId", "publishedAfter", "publishedBefore", "hour_ago"]), //指定したパラメーター以外きたら400返す

  async (req: express.Request, res: express.Response) => {
    console.log("YouTube activities query", req.query);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const all_channelId = req.query.channelId as string | undefined;
    const publishedAfter = req.query.publishedAfter as string | undefined;
    const publishedBefore = req.query.publishedBefore as string | undefined;
    const hour_ago = Number(req.query.hour_ago) || undefined;

    const result_activities = await get_youtube_activities({
      all_channelId: all_channelId ? all_channelId.split(",") : undefined,
      publishedAfter,
      publishedBefore,
      hour_ago,
    }).catch((e) => {
      console.error("youtube_activities error", e);
      res.status(500).json({ error: "youtube_activities error" });
      throw e;
    });
    //console.log(result_activities);

    res.status(200).json({
      videoId_str: result_activities.join(","),
      videoId: result_activities,
    });
  }
);

router.get(
  "/videos",
  query("videoId").if(query("videoId").exists()).isAscii(),
  query("part").if(query("part").exists()).isAscii(),
  query("select").if(query("select").exists()).isBoolean(),
  checkQuery(["videoId", "part", "select"]), //指定したパラメーター以外きたら400返す

  async function (req: express.Request, res: express.Response): Promise<void> {
    console.log("youtube videos query", req.query);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    // 文字列から文字型配列やboolean型に変換
    const all_videoId = req.query.videoId
      ? (req.query.videoId as string).split(",")
      : [];
    const part = req.query.part
      ? (req.query.part as string).split(",")
      : ["statistics", "contentDetails", "snippet", "liveStreamingDetails"];
    const songcheck = req.query.select === "true" ? true : false;

    // 歌動画か判断するには, snippet.titleなどが必要なため
    if (songcheck && !part.includes("snippet")) {
      res.status(400).json({
        error: "select するには snippet が必要です",
      });
      return;
    }

    // Youtube Data API で動画詳細データを取得
    const result_getVideoInfo = await get_youtube_videos({
      videoId: all_videoId,
      part: part,
    }).catch((e) => {
      console.error("youtube_videos error", e);
      res.status(500).json({
        error: "youtube_videos error",
      });
      throw e;
    });

    // 歌ってみた動画か判断しないで返す
    if (!songcheck) {
      res.json({
        message: "Not songCheck",
        result: result_getVideoInfo,
      });
      return;
    }

    // 歌ってみた動画か判断する
    const result_select_videos = await select_youtube_videos(
      result_getVideoInfo
    );
    res.json({
      message: "done songCheck",
      songConfirm: result_select_videos.songConfirm,
      unsongConfirm: result_select_videos.unsongConfirm,
    });
  }
);

router.get(
  "/search",
  query("publishedAfter").if(query("publishedAfter").exists()).isRFC3339(),
  query("publishedBefore").if(query("publishedBefore").exists()).isRFC3339(),
  query("hour_ago").if(query("hour_ago").exists()).isInt({ min: 1 }),
  query().custom((value) => {
    if (value.hour_ago && (value.publishedAfter || value.publishedBefore)){
      throw new Error("publishedAfter, publishedBefore指定時にhour_agoは指定できません");
    }
    if (!value.hour_ago && !value.publishedAfter && !value.publishedBefore){
      throw new Error("publishedAfter, publishedBefore か hour_ago 指定してください");
    }
    return true;
  }),
  checkQuery(["publishedAfter", "publishedBefore", "hour_ago"]), //指定したパラメーター以外きたら400返す

  async function (req: express.Request, res: express.Response) {
    console.log("youtube search query", req.query);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const publishedAfter = req.query.publishedAfter as string | undefined;
    const publishedBefore = req.query.publishedBefore as string | undefined;
    const hour_ago = Number(req.query.hour_ago) || undefined;

    const result_search = await get_youtube_search({
      publishedAfter,
      publishedBefore,
      hour_ago,
    }).catch((e) => {
      console.error("youtube_search error");
      res.status(500).json({
        error: "youtube_search error",
      });
      throw e;
    });
    //console.log(result_search);
    res.status(200).json({
      videoId_str: result_search.join(","),
      videoId: result_search,
    });
  }
);

// アクセストークンの管理でつまづいているから、保留中
/*
router.put(
  "/playlistItems/week",
  async function (req: express.Request, res: express.Response): Promise<void> {
    const startAtAfter =
      (req.query.startAtAfter as string) ||
      get_time({ day_ago: 7, format: "YYYY-MM-DDT00:00:00" }) + "Z";
    const startAtBefore =
      (req.query.startAtBefore as string) ||
      get_time({ day_ago: 1, format: "YYYY-MM-DDT23:59:59" }) + "Z";
    const result_get_video = await get_video({
      songConfirm: true,
      startAtAfter,
      startAtBefore,
      order: "startTime",
    }).catch((e) => {
      res.status(500).json({ error: "error" });
      throw e;
    });
    const res_get_videoId = result_get_video.map((video) => video.id);
    // MM/DD
    const today = startAtBefore.slice(5, 7) + "/" + startAtBefore.slice(8, 10);
    const sixDayAgo =
      startAtAfter.slice(5, 7) + "/" + startAtAfter.slice(8, 10);

    await update_playlistItems({
      playlistId: "PL_bYerfwKlGiQSckNm6G6D4e-UugXiZrG",
      videoId: res_get_videoId,
      title: `にじさんじ 歌動画リスト (${sixDayAgo} 〜 ${today})`,
    }).catch((e) => {
      res.status(500).json({ error: "error" });
      throw e;
    });

    res.json({ result: "success" });
  }
);

router.put(
  "/playlistItems/random",
  async function (req: express.Request, res: express.Response): Promise<void> {
    const result_get_video = await get_video({
      songConfirm: true,
      maxResults: 30,
      order: "random",
    }).catch((e) => {
      res.status(500).json({ error: "error" });
      throw e;
    });
    const res_get_videoId = result_get_video.map((video) => video.id);
    await update_playlistItems({
      playlistId: "PL_bYerfwKlGiS7VkaBUmUBgoqGOGyt1TC",
      videoId: res_get_videoId,
    }).catch((e) => {
      res.status(500).json({ error: "error" });
      throw e;
    });
    res.json({ result: "success" });
  }
);
*/

//routerをモジュールとして扱う準備
export = router;
