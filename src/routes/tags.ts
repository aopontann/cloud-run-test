import express from "express";
import { youtube_v3 } from "googleapis";
import search_vtuberName from "../controllers/tag/search_vtuberName";
import get_tags from "../controllers/tag/get_tags";
import add_tag from "../controllers/tag/add_tag";
import delete_tag from "../controllers/tag/delete_tag";

const router = express.Router();

interface TagBody {
  videoId: string;
  tags: {
    name: string;
    type: string;
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

  res.status(200).json(Result);
});

router.post("/", async (req: express.Request, res: express.Response) => {
  const video_tags = req.body as {
    videoId: string;
    tags: {
      name: string;
      type: string | undefined;
    }[];
  } | undefined;

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

  /*
  const youtube_video = req.body.youtube_video as
    | youtube_v3.Schema$Video[]
    | undefined;
  const result_search = youtube_video
    ? await search_vtuberName(youtube_video)
    : null;
  */
  // console.log("video_tags", video_tags);

  /*
  result_search
    ? await add_tag(result_search).catch((e) => {
        console.error("add_tag error");
        res.status(500).json({
          error: "add_tag error",
        });
        throw e;
      })
    : "";
  */
});

router.delete("/", async (req: express.Request, res: express.Response) => {
  const tagName = req.query.names
    ? (req.query.names as string).split(",")
    : undefined; //errorになるかも
  const videoId = req.query.videoId as string | undefined;

  if (typeof tagName == undefined && typeof videoId) {
    res.status(500).json("error");
  }

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
