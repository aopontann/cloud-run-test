const express = require("express");
const router = express.Router();
// タイムゾーンの時間を取得
const { formatToTimeZone } = require("date-fns-timezone");

const DB_get_vtuber = require("../controllers/vtuber/DB_get_vtuber");
const DB_get_videos = require("../controllers/video/DB_get_video");
const get_youtube_activities = require("../controllers/youtube/get_youtube_activities");
const get_youtube_videos = require("../controllers/youtube/get_youtube_videos");
const select_youtube_videos = require("../controllers/youtube/select_youtube_videos");
const DB_add_videos = require("../controllers/video/DB_add_video");
const DB_add_viewCount = require("../controllers/DB_add_viewCount");

router.post("/addNewVideo", async function (req, res) {
  
  const result_DB_get_vtuber = await DB_get_vtuber({
    Affiliation: "にじさんじ,にじさんじユニット,にじさんじ公式"
  });
  const search_vtuber_channelId = result_DB_get_vtuber.map(
    (vtuber) => vtuber.id
  );
  console.log("search_vtuber_channelId", search_vtuber_channelId);

  const FORMAT = "YYYY-MM-DDTHH:mm:ss";
  const TIME_ZONE_TOKYO = "Asia/Tokyo";
  const now = new Date();
  const time_7_ago = new Date();
  time_7_ago.setHours(now.getHours() - 7);
  const formatted_now = formatToTimeZone(now, FORMAT, {
    timeZone: TIME_ZONE_TOKYO,
  });
  const formatted_time_7_ago = formatToTimeZone(time_7_ago, FORMAT, {
    timeZone: TIME_ZONE_TOKYO,
  });
  
  const datatimeAfter = req.query.datatimeAfter || formatted_time_7_ago + "Z";
  const datatimeBefore = req.query.datatimeBefore || formatted_now + "Z"

  const result_get_youtube_activites = await get_youtube_activities({
    all_channelId: search_vtuber_channelId,
    datetimeAfter: datatimeAfter,
    datetimeBefore: datatimeBefore,
  });
  console.log("result_get_youtube_activites", result_get_youtube_activites); // videoId, videoId, ...

  // 動画の詳細データを取得する
  const result_get_youtube_videos = await get_youtube_videos({
    videoId: result_get_youtube_activites.split(','),
    part: "statistics,contentDetails,snippet,liveStreamingDetails"
  });

  // 歌ってみた動画か判定する
  const result_select_youtube_videos = select_youtube_videos(result_get_youtube_videos);

  // 判定した動画データをDBに保存する
  await DB_add_videos({
    videoInfo: result_select_youtube_videos.songConfirm || [],
    songConfirm: true
  });
  await DB_add_videos({
    videoInfo: result_select_youtube_videos.unsongConfirm || [],
    songConfirm: false
  });
  res.json({
    resultActivities: result_get_youtube_activites,
    resultSongConfirm: result_select_youtube_videos.songConfirm.map(videoInfo => videoInfo.id),
    resultUnSongConfirm: result_select_youtube_videos.unsongConfirm.map(videoInfo => videoInfo.id)
  });
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
