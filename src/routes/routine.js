const express = require("express");
const router = express.Router();

const DB_get_vtuber = require("../controllers/DB_get_vtuber");
const DB_get_videos = require("../controllers/DB_get_videos");
const get_youtube_search_videos = require("../controllers/get_youtube_search");
const get_youtube_videos = require("../controllers/get_youtube_videos");

router.get("/", async function (req, res) {
  /*
  const result_DB_get_vtuber = await DB_get_vtuber({
    Affiliation: "にじさんじ",
  });
  console.log("result_DB_get_vtuber", result_DB_get_vtuber);
  const search_vtuber_channelId = result_DB_get_vtuber.map(
    (doc) => doc.channelId
  );
  */

  /* quota error になった
  const datatimeAfter = "2021-01-01T00:00:00Z";
  const datatimeBefore = "2021-01-01T23:59:59Z"
  const result_get_youtube_search = await get_youtube_search_videos(search_vtuber_channelId, datatimeAfter, datatimeBefore);
  */
  const result_DB_get_videos = await DB_get_videos([]);
  const youtube_videos_id = result_DB_get_videos.map((doc) => doc.id);
  const result_get_youtube_videos = await get_youtube_videos(youtube_videos_id);
  console.log(youtube_videos_id);

  res.send(youtube_videos_id);
  //const result_search_videos = get_search_videos()
});

//routerをモジュールとして扱う準備
module.exports = router;
