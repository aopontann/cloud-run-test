import express from "express";
import get_video from "../services/video/get_video";
import add_video from "../services/video/add_video";
import update_video from "../services/video/update_video";
import delete_video from "../services/video/delete_video";
import update_statistics from "../services/video/update_statistics";
import get_youtube_videos from "../services/youtube/get_youtube_videos";
import { query, body, validationResult } from "express-validator";
import { checkQuery, checkJSONBody } from "../lib/checkQuery";
import { typeOf } from "../lib/typeOf";
import { validateQuery_GET_videos } from "../validate/videos/validate_get_videos";

const router = express.Router();
const toBoolean = (str: string) => {
  return str == "true" ? true : str == "false" ? false : undefined;
};

router.get(
  "/",
  query("startTimeAtAfter").if(query("startTimeAtAfter").exists()).isRFC3339(),
  query("startTimeAtBefore").if(query("startTimeAtBefore").exists()).isRFC3339(),
  validateQuery_GET_videos,
  async (req: express.Request, res: express.Response) => {
    const videoId = req.query.id ? String(req.query.id).split(",") : undefined;
    const songConfirm = toBoolean(String(req.query.songConfirm));
    const startTimeAtAfter = req.query.startTimeAtAfter
      ? String(req.query.startTimeAtAfter)
      : undefined;
    const startTimeAtBefore = req.query.startTimeAtBefore
      ? String(req.query.startTimeAtBefore)
      : undefined;
    const maxResults = Number(req.query.maxResults) || undefined;
    const page = Number(req.query.page) || undefined;
    const order = req.query.order ? String(req.query.order) : undefined;
    const tags = req.query.tags ? String(req.query.tags).split(",") : undefined;

    console.log("get_videos query", req.query);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    
    const result = await get_video({
      id: videoId,
      songConfirm,
      startTimeAtAfter,
      startTimeAtBefore,
      maxResults,
      page,
      tags,
      order,
    }).catch((e) => {
      console.log("get_video error", e);
      res.status(500).json({
        error: "get_video error",
      });
      throw e;
    });

    res.status(200).json({
      videoId_str: result.items.map((video) => video.id).join(","),
      ...result,
    });
  }
);

router.post(
  "/",
  body().custom((value) => {
    if (value.songConfirm || value.result || value.unsongConfirm) {
      return true;
    } else {
      throw new Error("not youtube video");
    }
  }),
  checkJSONBody(["songConfirm", "result", "unsongConfirm", "message"]),

  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    try {
      await add_video({
        all_videoInfo: req.body.songConfirm || req.body.result || [],
        songConfirm: true,
      });
      await add_video({
        all_videoInfo: req.body.unsongConfirm || [],
        songConfirm: false,
      });
    } catch (e) {
      console.log("add_video error", e);
      res.status(500).json({
        error: "add_video error",
      });
      throw e;
    }
    res.status(201).json("success");
  }
);

router.put(
  "/",
  body("id")
    .isAscii()
    .custom(async (videoId) => {
      const getResult = await get_video({ id: videoId });
      if (getResult.items.length == 0) {
        throw new Error("not found video");
      }
      return true;
    }),
  body("songConfirm").if(body("songConfirm").exists()).isBoolean(),
  body("title")
    .if(body("title").exists())
    .custom((value) => {
      if (value === "" || typeOf(value) !== "string") {
        throw new Error("NG title");
      }
      return true;
    }),
  body("description")
    .if(body("description").exists())
    .custom((value) => {
      if (value === "" || typeOf(value) !== "string") {
        throw new Error("NG description");
      }
      return true;
    }),
  checkJSONBody(["id", "songConfirm", "title", "description"]),

  async function (req: express.Request, res: express.Response) {
    const id = req.body.id ? String(req.body.id) : "error";
    const songConfirm = toBoolean(String(req.body.songConfirm));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    console.log("update_videos body", req.body);
    const result = await update_video({
      id,
      songConfirm,
      title: req.body.title,
      description: req.body.description,
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
  }
);

router.put("/viewCount", async function (req, res) {
  // DB から動画情報を取得
  const result_get_videos = await get_video({
    songConfirm: true,
  });
  const target_videoId = result_get_videos.items.map(
    (videoInfo) => videoInfo.id
  );

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

router.delete(
  "/",
  // バリデーション
  query("id")
    .isAscii()
    .custom(async (videoId) => {
      const getResult = await get_video({ id: videoId });
      if (getResult.items.length == 0) {
        throw new Error("not found video");
      }
      return true;
    }),
  checkQuery(["id"]),

  async function (req: express.Request, res: express.Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    console.log("delete start");
    const all_videoId = req.query.id ? String(req.query.id).split(",") : [];
    await delete_video([...all_videoId]).catch((e) => {
      console.log("delete_video error", e);
      res.status(500).json({
        error: "delete_video error",
      });
      throw e;
    });
    console.log("delete complete!");
    res.status(201).json("success");
  }
);

//routerをモジュールとして扱う準備
export = router;
