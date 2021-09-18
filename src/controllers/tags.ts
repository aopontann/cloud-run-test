import express from "express";
import { youtube_v3 } from "googleapis";
import search_vtuberName from "../services/tag/search_vtuberName";
import get_tags from "../services/tag/get_tags";
import add_tag from "../services/tag/add_tag";
import delete_tag from "../services/tag/delete_tag";
import { query, body, validationResult } from "express-validator";
import { checkJSONBody, checkQuery } from "../lib/checkQuery";

const router = express.Router();

router.get(
  "/",
  query("names").custom((names) => {
    if (names == "") {
      throw new Error("NG names");
    }
    return true;
  }),
  query("videoId").if(query("videoId").exists()).isAscii(),
  checkQuery(["names", "videoId"]),
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const names = req.query.names
      ? String(req.query.names).split(",")
      : undefined;
    const videoId = req.query.videoId ? String(req.query.videoId) : undefined;

    const Result = await get_tags({
      names,
      videoId,
    }).catch((e) => {
      console.error("get_tags error");
      res.status(500).json({
        error: "get_tags error",
      });
      throw e;
    });

    res.status(200).json(Result);
  }
);

router.post(
  "/",
  body("videoId").isAscii(),
  body("tagNames").custom(async (tagNames, { req }) => {
    if (tagNames == "") {
      throw new Error("not found tagNames");
    }
    const result_get_tags = await get_tags({
      names: String(tagNames).split(","),
      videoId: req.body.videoId,
    });
    if (result_get_tags.length > 0) {
      throw new Error("already add tagNames");
    }
    return true;
  }),
  checkJSONBody(["videoId", "tagNames"]),
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const video_tags = req.body as {
      videoId: string;
      tagNames: string[];
    };
    /*
    await add_tag(video_tags).catch((e) => {
      console.error("add_tag error");
      res.status(500).json({
        error: "add_tag error",
      });
      throw e;
    });
    */

    res.status(201).json("success");
  }
);

router.post("/youtube", async (req: express.Request, res: express.Response) => {
  const youtube_video = req.body as youtube_v3.Schema$Video[];
  if (typeof youtube_video == "undefined") {
    res.status(400).json("not exist body");
  }
  const result_search = await search_vtuberName(youtube_video).catch((e) => {
    res.status(500).json({ error: "add_tag error" });
    throw e;
  });
  for await (const result of result_search) {
    await add_tag(result).catch((e) => {
      res.status(500).json({ error: "add_tag error" });
      throw e;
    });
  }

  res.json("success");
});

router.delete(
  "/",
  query("names")
    .not()
    .isEmpty()
    .custom(async (tagNames, { req }) => {
      if (tagNames == "") {
        throw new Error("not found tagNames");
      }
      const result_get_tags = await get_tags({
        names: String(tagNames).split(","),
        videoId: req.query?.videoId,
      });
      if (result_get_tags.length == 0) {
        throw new Error("not found tagNames");
      }
      return true;
    }),
    checkQuery(["names", "videoId"]),
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const names = req.query.names
      ? String(req.query.names).split(",")
      : undefined;
    const videoId = req.query.videoId ? String(req.query.videoId) : undefined;

    if (typeof names == "undefined" && typeof videoId == "undefined") {
      res.status(400).json("error");
      throw "not exist query";
    }
    /*
    await delete_tag({ names, videoId }).catch((e) => {
      console.error("delete_tags error");
      res.status(500).json({
        error: "delete_tags error",
      });
      throw e;
    });
    */
    res.status(201).json("success");
  }
);

export = router;
