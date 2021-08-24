import express from "express";
const router = express.Router();
import { getAuthUrl, storeNewToken } from "../controllers/youtube/oauth2";

router.get("/authUrl", async (req: express.Request, res: express.Response) => {
  try {
    const result_authUrl = getAuthUrl();
    res.status(200).json({
      authUrl: result_authUrl,
    });
  } catch (error) {
    res.status(500).json({
      error: "youtube_videos error",
    });
    throw error;
  }
});

router.post(
  "/storeNewToken",
  async (req: express.Request, res: express.Response) => {
    try {
      await storeNewToken((req.query.authUrl as string) || "");
      res.status(200).json({
        result: "success",
      });
    } catch (error) {
      res.status(500).json({
        error: "storeNewToken error",
      });
      throw error;
    }
  }
);

//routerをモジュールとして扱う準備
export = router;
