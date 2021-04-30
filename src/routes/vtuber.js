const express = require("express");
const router = express.Router();

const DB_add_vtuber = require("../controllers/vtuber/DB_add_vtuber");
const DB_get_vtuber = require("../controllers/vtuber/DB_get_vtuber");
const test = require("../controllers/youtube/select_youtube_videos");
const DB_delete_songVtuber = require("../controllers/songVtuber/delete_songVtuber");

// http://localhost:8080/DB/vtuber?
// affiliation= (にじさんじ, ...) & name= (える, ...)
// クエリ指定しないと全てのデータが返ってくるよ
router.get("/", async function (req, res) {
  console.log("query", req.query);
  const affi = req.query.affiliation ? req.query.affiliation.split(",") : null;
  const names = req.query.name ? req.query.name.split(",") : null;
  const channelId = req.query.channelId ? req.query.channelId.split(",") : null;
  const include = req.query.include ? req.query.include.split(",") : []; // ["songVtuber", "vtuberImage"]
  const result = await DB_get_vtuber({
    affiliation: affi,
    name: names,
    channelId: channelId,
    include: include,
  });

  console.log(result);
  res.json(result);
});

router.post("/", async function (req, res) {
  await DB_add_vtuber(req.body);

  res.json({
    message: "success!",
    body: req.body,
  });
});

router.delete("/songVtuber", async function (req, res) {
  // channelId = "id, id, ...", delete_videoId = "videoId"
  // or channelId = "id", delete_videoId = "videoId, videoId, ..."
  const channelId = req.query.channelId;
  const delete_videoId = req.query.videoId;
  await DB_delete_songVtuber({
    channelId: channelId,
    deleteId: delete_videoId,
  });
  res.json({
    message: "success",
  });
});

//routerをモジュールとして扱う準備
module.exports = router;
