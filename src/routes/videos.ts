import express from "express";
import get_video from "../controllers/video/get_video";
import add_video from "../controllers/video/add_video";
import update_video from "../controllers/video/update_video";
import delete_video from "../controllers/video/delete_video";
import update_statistics from "../controllers/update_statistics";
import get_youtube_videos from "../controllers/youtube/get_youtube_videos";

import search_vtuberName from "../controllers/tag/search_vtuberName";
import add_tag from "../controllers/tag/add_tag";

const router = express.Router();

// http://localhost:8080/DB/videos?
router.get("/", async function (req: express.Request, res: express.Response) {
  const videoId = req.query.id as string | undefined;
  const songConfirm = req.query.songConfirm as string | undefined;
  const startAtAfter = req.query.startAtAfter as string | undefined;
  const startAtBefore = req.query.startAtBefore as string | undefined;
  const maxResults = Number(req.query.maxResults) || undefined;
  const page = Number(req.query.page) || undefined;

  const result = await get_video({
    videoId: videoId ? videoId.split(",") : undefined,
    songConfirm:
      songConfirm == "true" || songConfirm == "false"
        ? JSON.parse(songConfirm.toLowerCase())
        : undefined,
    startAtAfter,
    startAtBefore,
    maxResults,
    page,
  }).catch((e) => {
    console.log("get_video error", e);
    res.status(500).json({
      error: "get_video error",
    });
    throw e;
  });
  console.log(result);

  res.status(200).json(result);
});

//http://localhost:3002/DB/videos
router.post("/", async function (req: express.Request, res: express.Response) {
  // 取得した動画情報をDBに保存する
  await add_video({
    all_videoInfo: req.body.songConfirm || req.body.result || [],
    songConfirm: true,
  }).catch((e) => {
    console.log("add_video error", e);
    res.status(500).json("add_video error");
  });
  await add_video({
    all_videoInfo: req.body.unsongConfirm || [],
    songConfirm: false,
  }).catch((e) => {
    console.log("add_video error", e);
    res.status(500).json({
      error: "add_video error",
    });
    throw e;
  });
  /*
  const result_search = await search_vtuberName(req.body.songConfirm || req.body.result);
  add_tag(result_search);
  */
  res.status(201).json("success");
});

router.put("/", async function (req: express.Request, res: express.Response) {
  //console.log("update body", req.body);
  const result = await update_video({
    videoId: req.body.videoId || "",
    songConfirm: req.body.songConfirm,
    title: req.body.title,
    description: req.body.description
  }).catch((e) => {
    console.log("update_video error", e);
    res.status(500).json({
      error: "update_video error",
    });
    throw e;
  });
  res.status(201).json({
    result: result,
  });
});

router.put("/viewCount", async function (req, res) {
  // DB から動画情報を取得
  const result_DB_get_videos = await get_video({
    songConfirm: true,
  });
  const target_videoId = result_DB_get_videos.map((videoInfo) => videoInfo.id);

  // 動画の詳細データ(視聴回数や評価数など)を取得する
  const result_get_youtube_videos = await get_youtube_videos({
    videoId: target_videoId,
    part: ["statistics"],
  });

  const result = await update_statistics([...result_get_youtube_videos]).catch(
    (e) => {
      console.log("update_statistics error", e);
      res.status(500).json({
        error: "update_statistics error",
      });
      throw e;
    }
  );
  res.status(201).json(result);
});

// http://localhost:8080/DB/videos?id="videoId, ..."
router.delete(
  "/",
  async function (req: express.Request, res: express.Response) {
    console.log("delete start");
    const all_videoId = req.query.id ? (req.query.id as string).split(",") : [];
    await delete_video(all_videoId).catch((e) => {
      console.log("delete_video error", e);
      res.status(500).json({
        error: "delete_video error",
      });
    });
    console.log("delete complete!");
    res.status(201).json("success");
  }
);

//routerをモジュールとして扱う準備
export = router;
