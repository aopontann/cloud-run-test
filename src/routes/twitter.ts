import express from "express";
import { get_time2 } from "../controllers/get_times";
import get_video from "../controllers/video/get_video";
import tweet_videoId from "../controllers/twitter/tweet_video";
import { type } from "os";

const router = express.Router();

router.post(
  "/today-video",
  async (req: express.Request, res: express.Response) => {
    
    const startTimeAfter = get_time2({ format: "YYYY-MM-DDT00:00:00" });
    const startTimeBefore = get_time2({ format: "YYYY-MM-DDT23:59:59" });
    const res_video = await get_video({
      songConfirm: true,
      startAtAfter: startTimeAfter,
      startAtBefore: startTimeBefore,
    }).catch((e) => {
      res.status(500).json("error");
      throw e;
    });

    await tweet_videoId({ 
      video: res_video.map((video) => video)
    }).catch((e) => {
      res.status(500).json("error");
      throw e;
    });

    res.status(201).json("success");
  }
);

export = router;
