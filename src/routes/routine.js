const express = require("express");
const router = express.Router();

const DB_get_vtuber = require("../controllers/DB_get_vtuber");
const get_youtube_activites = require("../controllers/youtube/get_youtube_activites");
const get_youtube_videos = require("../controllers/youtube/get_youtube_videos");
const select_youtube_videos = require("../controllers/youtube/select_youtube_videos");
const DB_add_videos = require("../controllers/DB_add_video");

router.get("/", async function (req, res) {
  const result_DB_get_vtuber = await DB_get_vtuber({
    Affiliation: "にじさんじ,にじさんじユニット"
  });
  //console.log("result_DB_get_vtuber", result_DB_get_vtuber);
  const search_vtuber_channelId = result_DB_get_vtuber.map(
    (vtuber) => vtuber.id
  );
  console.log("search_vtuber_channelId", search_vtuber_channelId);
  
  const datatimeAfter = "2021-01-01T00:00:00Z";
  const datatimeBefore = "2021-01-01T23:59:59Z"
  const result_get_youtube_activites = await get_youtube_activites(search_vtuber_channelId, datatimeAfter, datatimeBefore);
  console.log(result_get_youtube_activites); // videoId, videoId, ...

  // 動画の詳細データを取得する
  const result_get_youtube_videos = await get_youtube_videos(result_get_youtube_activites.split(','));
  // 歌ってみた動画か判定する
  const result_select_youtube_videos = select_youtube_videos(result_get_youtube_videos);
  // 判定した動画データをDBに保存する
  //await DB_add_videos(result_select_youtube_videos);

  res.json({
    message: "routine success!",
    saveVideos: result_select_youtube_videos
  });

  //res.send({message: "ok!"});
});

//routerをモジュールとして扱う準備
module.exports = router;
