const express = require("express");
const router = express.Router();

const DB_get_vtuber = require("../controllers/DB_get_vtuber");
const DB_get_videos = require("../controllers/DB_get_video");
const get_youtube_activites = require("../controllers/youtube/get_youtube_activites");
const get_youtube_videos = require("../controllers/youtube/get_youtube_videos");
const select_youtube_videos = require("../controllers/youtube/select_youtube_videos");
const DB_add_videos = require("../controllers/DB_add_video");
const DB_add_viewCount = require("../controllers/DB_add_viewCount");

router.post("/addNewVideo", async function (req, res) {
  
  const result_DB_get_vtuber = await DB_get_vtuber({
    Affiliation: "にじさんじ,にじさんじユニット,にじさんじ公式"
  });
  const search_vtuber_channelId = result_DB_get_vtuber.map(
    (vtuber) => vtuber.id
  );
  console.log("search_vtuber_channelId", search_vtuber_channelId);
  
  const datatimeAfter = "2021-01-01T00:00:00Z";
  const datatimeBefore = "2021-01-31T23:59:59Z"
  const result_get_youtube_activites = await get_youtube_activites(search_vtuber_channelId, datatimeAfter, datatimeBefore);
  console.log(result_get_youtube_activites); // videoId, videoId, ...

  // 動画の詳細データを取得する
  const result_get_youtube_videos = await get_youtube_videos({
    videoId: result_get_youtube_activites.videoId.split(','),
    part: "statistics,contentDetails,snippet,liveStreamingDetails"
  });

  // 歌ってみた動画か判定する
  const result_select_youtube_videos = select_youtube_videos(result_get_youtube_videos);
  console.log("save all_videoInfo", result_select_youtube_videos.map(videoInfo => {
    return {
      videoId:  videoInfo.id,
      songConfirm: videoInfo.songConfirm,
      title: videoInfo.snippet.title,
      description: videoInfo.snippet.description
    }
  }));

  // 判定した動画データをDBに保存する
  try {
    for await (const videoInfo of result_select_youtube_videos) {
      console.log("videoId = ", videoInfo.id);
      await DB_add_videos(videoInfo);
    }
    res.json({
      message: "routine success!"
    });
  } catch(e) {
    console.log("error", e);
    res.json({
      message: "Add Video error!"
    });
  }
});

router.post("/addNewViewCount", async function (req, res) {
  // DB から動画情報を取得
  const result_DB_get_videos = await DB_get_videos({
    id: "all",
    songConfirm: "true"
  });
  console.log("result_DB_get_videos", result_DB_get_videos);

  const target_videoId = result_DB_get_videos.map(videoInfo => videoInfo.id);
  // 動画の詳細データ(視聴回数や評価数など)を取得する
  const result_get_youtube_videos = await get_youtube_videos({
    videoId: target_videoId,
    part: "statistics"
  });

  const result = await DB_add_viewCount(result_get_youtube_videos);
  res.json(result);
})

//routerをモジュールとして扱う準備
module.exports = router;
