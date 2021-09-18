import express from "express";
import { get_time } from "../lib/get_times";
import get_video from "../services/video/get_video";
import tweet_videoId from "../services/twitter/tweet_video";

const router = express.Router();

router.post(
  "/today-video",
  async (req: express.Request, res: express.Response) => {   
    const startTimeAfter = get_time({ format: "YYYY-MM-DDT00:00:00" }) + "Z";
    const startTimeBefore = get_time({ format: "YYYY-MM-DDT23:59:59" }) + "Z";
    const res_video = await get_video({
      songConfirm: true,
      startTimeAtAfter: startTimeAfter,
      startTimeAtBefore: startTimeBefore,
    }).catch((e) => {
      res.status(500).json("error");
      throw e;
    });

    await tweet_videoId({ 
      video: res_video.items.map((video) => video)
    }).catch((e) => {
      res.status(500).json("error");
      throw e;
    });

    res.status(201).json("success");
  }
);

export = router;
