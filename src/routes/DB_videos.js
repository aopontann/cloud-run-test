const express = require("express");
const router = express.Router();

const DB_add_videos = require("../controllers/DB_add_videos");
const DB_get_videos = require("../controllers/DB_get_videos");

// http://localhost:3002/DB/videos?
// id="videoId,videoId, ..."
router.get("/", async function (req, res) {
  const id = req.query.id;
  console.log("id", id);
  const result = await DB_get_videos(id.split(","));
  console.log(result);

  res.json(result);
});

//http://localhost:3002/DB/videos?confirm= (yes or no)
router.post("/", async function (req, res) {
  console.log(req.body);
  await DB_add_videos(req.body, req.query.confirm == "yes" ? true : false);

  res.json({
    message: "success!",
  });
});

//routerをモジュールとして扱う準備
module.exports = router;
