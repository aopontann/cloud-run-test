const express = require("express");
const router = express.Router();

const DB_add_videos = require("../controllers/DB_add_video");
const DB_get_videos = require("../controllers/DB_get_video");
const DB_delete_videos = require("../controllers/DB_delete_video");
const DB_update_videos = require("../controllers/DB_update_video");

// http://localhost:8080/DB/videos?
router.get("/", async function (req, res) {
  const result = await DB_get_videos({
    id: req.query.id || "",
    songConfirm: req.query.songConfirm || "all",
    checkSongVtuber: req.query.checkSongVtuber || "all"
  });
  console.log(result);

  res.json(result);
});

//http://localhost:3002/DB/videos
router.post("/", async function (req, res) {
  console.log(req.body);
  try {
    for await (const videoInfo of req.body) {
      console.log("videoId = ", videoInfo.id);
      const result = await DB_add_videos(videoInfo);
      console.log("result", result);
      res.json({
        message: result,
      });
    }
  } catch(e) {
    console.log("error", e);
    res.json({
      message: "Add Video error!"
    });
  }
});

router.post("/update", async function (req, res) {
  console.log(req.body);
  const result = await DB_update_videos(req.body);
  res.json({
    message: result,
  });
})

// http://localhost:8080/DB/videos?id="videoId, ..."
router.delete("/", async function (req, res) {
  const all_videoId = req.query.id ? req.query.id.split(",") : null;
  if (!all_videoId) {
    console.log("error!");
    res.json({
      message: "error!",
    });
    return;
  }
  console.log("消す動画ID");
  for await (const videoId of all_videoId) {
    console.log(videoId);
    try {
      result = await DB_delete_videos(videoId);
      console.log(result);
    } catch (e) {
      res.json({
        message: "error",
      });
      return;
    }
  }
  console.log("delete complete!");
  res.json({
    message: "delete complete!",
  });
});

//routerをモジュールとして扱う準備
module.exports = router;
