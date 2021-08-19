import express from "express";
const router = express.Router();

import get_youtube_activities from "../controllers/youtube/get_youtube_activities";
import get_youtube_videos from "../controllers/youtube/get_youtube_videos";
import get_youtube_search from "../controllers/youtube/get_youtube_search";
import select_youtube_videos from "../controllers/youtube/select_youtube_videos";
import get_video from "../controllers/video/get_video";
import { get_time2 } from "../controllers/get_times";
import update_playlistItems from "../controllers/youtube/playlist/update_playlistItems";
import { toUTC } from "../controllers/get_times";

router.get(
  "/activities",
  async (req: express.Request, res: express.Response) => {
    // datetime "1970-01-01T00:00:00Z"
    const all_channelId = req.query.channel as string | undefined;
    const publishedAfter = req.query.publishedAfter as string | undefined;
    const publishedBefore = req.query.publishedBefore as string | undefined;

    const result_activities = await get_youtube_activities({
      all_channelId: all_channelId ? all_channelId.split(",") : undefined,
      publishedAfter: publishedAfter ? toUTC(publishedAfter) : undefined,
      publishedBefore: publishedBefore ? toUTC(publishedBefore) : undefined,
    }).catch((e) => {
      console.log("youtube_activities error", e);
      res.status(500).json("youtube_activities error");
    });
    //console.log(result_activities);

    res.status(200).json(result_activities);
  }
);

//http://localhost:3002/youtube/videos?select=(bool)&videoId=
router.get(
  "/videos",
  async function (req: express.Request, res: express.Response): Promise<void> {
    console.log("query", req.query);
    const all_videoId = req.query.videoId
      ? (req.query.videoId as string).split(",")
      : [];
    const part = req.query.part
      ? (req.query.part as string).split(",")
      : ["statistics", "contentDetails", "snippet", "liveStreamingDetails"];
    const songcheck = req.query.select === "true" ? true : false;

    if (songcheck && !part.includes("snippet")) {
      res.status(500).json({
        error: "select するには snippet が必要です",
      });
      return;
    }

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
  async function (req: express.Request, res: express.Response): Promise<void> {
    // datetime "1970-01-01T00:00:00Z"
    const result_search = await get_youtube_search({
      publishedAfter: req.query.publishedAfter as string | undefined,
      publishedBefore: req.query.publishedBefore as string | undefined,
    }).catch((e) => {
      console.log("youtube_search error");
      res.status(500).json({
        error: "youtube_search error",
      });
      throw e;
    });
    //console.log(result_search);
    res.status(200).json(result_search);
  }
);

router.put(
  "/playlistItems/week",
  async function (req: express.Request, res: express.Response): Promise<void> {
    const startAtAfter =
      (req.query.startAtAfter as string) ||
      get_time2({ day_diff: -7, format: "YYYY-MM-DDT00:00:00" });
    const startAtBefore =
      (req.query.startAtBefore as string) ||
      get_time2({ day_diff: -1, format: "YYYY-MM-DDT23:59:59" });
    const result_get_video = await get_video({
      songConfirm: true,
      startAtAfter,
      startAtBefore,
      order: "startTime",
    }).catch(e => {
      res.status(500).json("error");
      throw e;
    });
    const res_get_videoId = result_get_video.map((video) => video.id);
    // MM/DD
    const today = startAtBefore.slice(5, 7) + "/" + startAtBefore.slice(8, 10);
    const sixDayAgo = startAtAfter.slice(5, 7) + "/" + startAtAfter.slice(8, 10);

    await update_playlistItems({
      playlistId: "PL_bYerfwKlGiQSckNm6G6D4e-UugXiZrG",
      videoId: res_get_videoId,
      title: `にじさんじ 歌動画リスト (${sixDayAgo} 〜 ${today})`,
    }).catch(e => {
      res.status(500).json("error");
      throw e;
    });

    res.status(201).json("success");
  }
);

router.put(
  "/playlistItems/random",
  async function (req: express.Request, res: express.Response): Promise<void> {
    const result_get_video = await get_video({
      songConfirm: true,
      maxResults: 30,
      order: "random",
    });
    const res_get_videoId = result_get_video.map((video) => video.id);
    await update_playlistItems({
      playlistId: "PL_bYerfwKlGiQSckNm6G6D4e-UugXiZrG",
      videoId: res_get_videoId,
    });
  }
);

//routerをモジュールとして扱う準備
export = router;
