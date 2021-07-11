import express from "express";
import { youtube_v3 } from "googleapis";
import search_vtuberName from "../controllers/tag/search_vtuberName";
import get_tags_relation_video from "../controllers/tag/get_tags_relation_video";
import get_tags from "../controllers/tag/get_tags";
import add_tag from "../controllers/tag/add_tag";
import delete_tag from "../controllers/tag/delete_tag";

const router = express.Router();

interface TagBody {
  videoId: string;
  tags: {
    name: string;
    description: string;
  }[];
}

router.get("/", async (req: express.Request, res: express.Response) => {
  const names = req.query.names
    ? (req.query.names as string).split(",")
    : undefined;

  const Result = await get_tags({
    names,
  }).catch((e) => {
    console.error("get_tags error");
    res.status(500).json({
      error: "get_tags error",
    });
    throw e;
  });

  res.status(500).json(Result);
});

router.get("/videos", async (req: express.Request, res: express.Response) => {
  const names = req.query.names
    ? (req.query.names as string).split(",")
    : undefined;
  const songConfirm = req.query?.songConfirm || undefined;
  const startAtAfter = (req.query?.startAtAfter as string) || undefined;
  const startAtBefore = (req.query?.startAtBefore as string) || undefined;
  const maxResults = req.query?.maxResults
    ? Number(req.query?.maxResults)
    : undefined;
  const page =
    req.query?.page && Number(req.query.page) > 0
      ? Number(req.query.page)
      : undefined;

  const Result = await get_tags_relation_video({
    names,
    songConfirm:
      songConfirm == "true" || songConfirm == "false"
        ? JSON.parse(songConfirm.toLowerCase())
        : undefined,
    startAtAfter,
    startAtBefore,
    maxResults,
    page,
  }).catch((e) => {
    console.error("get_tag_video error");
    res.status(500).json({
      error: "get_tag_video error",
    });
    throw e;
  });

  res.status(500).json(Result);
});

router.post("/", async (req: express.Request, res: express.Response) => {
  const youtube_video = req.body.youtube_video as
    | youtube_v3.Schema$Video[]
    | undefined;
  const result_search = youtube_video
    ? await search_vtuberName(youtube_video)
    : null;
  const video_tags = req.body.video_tags as TagBody[] | undefined;

  result_search
    ? await add_tag(result_search).catch((e) => {
        console.error("add_tag error");
        res.status(500).json({
          error: "add_tag error",
        });
        throw e;
      })
    : "";

  video_tags
    ? await add_tag(video_tags).catch((e) => {
        console.error("add_tag error");
        res.status(500).json({
          error: "add_tag error",
        });
        throw e;
      })
    : "";

  res.status(201).json("success");
});

router.delete("/", async (req: express.Request, res: express.Response) => {
  const tagName = req.query.name
    ? (req.query.name as string).split(",")
    : undefined; //errorになるかも
  const videoId = req.query.videoId as string | undefined;

  await delete_tag({ names: tagName, videoId: videoId }).catch((e) => {
    console.error("delete_tags error");
    res.status(500).json({
      error: "delete_tags error",
    });
    throw e;
  });
  res.status(201).json("success");
});

export = router;
