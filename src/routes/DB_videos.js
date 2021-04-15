const express = require("express");
const router = express.Router();

const DB_add_videos = require("../controllers/DB_add_video");
const DB_get_videos = require("../controllers/DB_get_video");
const DB_delete_videos = require("../controllers/DB_delete_video");
const get_joinVtuber = require("../controllers/get_joinVtuber");

// http://localhost:3002/DB/videos?id="videoId,videoId, ..." or id="all"
router.get("/", async function (req, res) {
  const id = req.query.id || null;
  console.log("id", id);
  const result = id ? await DB_get_videos(id.split(",")) : null;
  console.log(result);

  res.json(result);
});

//http://localhost:3002/DB/videos
router.post("/", async function (req, res) {
  console.log(req.body);
  await DB_add_videos(req.body);

  res.json({
    message: "success!",
  });
});

// http://localhost:8080/DB/videos?id="videoId"
router.delete("/", async function (req, res) {
  const id = req.query.id || null;
  if (!id || id == "") {
    console.log("error!");
    res.json({
      message: "error!",
    });
    return;
  }
  console.log("消す動画ID", id);
  try {
    await DB_delete_videos(id);
  } catch (e) {
    res.json({
      message: "指定されたIDが見つかりません",
    });
    return;
  }

  res.json({
    message: "success!",
  });
});


//routerをモジュールとして扱う準備
module.exports = router;
