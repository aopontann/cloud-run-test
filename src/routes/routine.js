const express = require("express");
const router = express.Router();
const DB_get_vtuber = require("../controllers/vtuber/DB_get_vtuber");
const DB_get_videos = require("../controllers/video/DB_get_video");
const get_youtube_activities = require("../controllers/youtube/get_youtube_activities");
const get_youtube_videos = require("../controllers/youtube/get_youtube_videos");
const select_youtube_videos = require("../controllers/youtube/select_youtube_videos");
const DB_add_videos = require("../controllers/video/DB_add_video");
const search_songVtuber = require("../controllers/songVtuber/get_search_songVtuber");
const DB_add_songVtuber = require("../controllers/songVtuber/DB_add_songVtuber");
const DB_add_viewCount = require("../controllers/DB_add_viewCount");
const { get_time, toUTC } = require("../controllers/get_times");

router.post("/addNewVideo", async function (req, res) {
  
  const result_DB_get_vtuber = await DB_get_vtuber();
  const search_vtuber_channelId = result_DB_get_vtuber.map(
    (vtuber) => vtuber.id
  );
  const datatimeAfter = req.query.datatimeAfter ? toUTC(req.query.datatimeAfter) : get_time("UTC", -7);
  const datatimeBefore = req.query.datatimeBefore ? toUTC(req.query.datatimeBefore) : get_time("UTC", 0);

  const result_get_youtube_activites = await get_youtube_activities({
    all_channelId: search_vtuber_channelId,
    datetimeAfter: datatimeAfter,
    datetimeBefore: datatimeBefore,
  });
  console.log("result_get_youtube_activites", result_get_youtube_activites); // videoId, videoId, ...

  // 動画の詳細データを取得する
  const result_get_youtube_videos = await get_youtube_videos({
    videoId: result_get_youtube_activites ? result_get_youtube_activites.split(',') : [],
    part: "statistics,contentDetails,snippet,liveStreamingDetails"
  });

  // 歌ってみた動画か判定する
  const result_select_youtube_videos = select_youtube_videos(result_get_youtube_videos);

  // 判定した動画データをDBに保存する
  const result_add_video = {}
  result_add_video.confirm = await DB_add_videos({
    all_videoInfo: result_select_youtube_videos.songConfirm,
    songConfirm: true
  });
  result_add_video.unconfirm = await DB_add_videos({
    all_videoInfo: result_select_youtube_videos.unsongConfirm,
    songConfirm: false
  });
  
  const videoInfo_confirm = result_add_video.confirm.success_videoInfo;
  const videoInfo_unconfirm = result_add_video.unconfirm.success_videoInfo;

  // DB保存に成功した動画情報から出演しているVtuberを取得する
  const result_search_songVtuber = {};
  result_search_songVtuber.confirm = await search_songVtuber({
    all_videoInfo: videoInfo_confirm,
  });
  result_search_songVtuber.unconfirm = await search_songVtuber({
    all_videoInfo: videoInfo_unconfirm,
  });
  
  // 取得したVtuber情報をDBに保存する
  const result_add_songVtuber = {}
  result_add_songVtuber.confirm = await DB_add_songVtuber({
    type: "init",
    data: result_search_songVtuber.confirm
  });
  result_add_songVtuber.unconfirm = await DB_add_songVtuber({
    type: "init",
    data: result_search_songVtuber.unconfirm
  });

  // 動画情報にある視聴回数などDBに保存する * videoIdも指定可能
  const result_add_viewcCount = {};
  result_add_viewcCount.confirm = await DB_add_viewCount({
    all_videoInfo: videoInfo_confirm
  });
  result_add_viewcCount.unconfirm = await DB_add_viewCount({
    all_videoInfo: videoInfo_unconfirm
  });
  
  res.json({
    add_video: {
      confirm: {
        success: result_add_video.confirm.success,
        error: result_add_video.confirm.error,
      },
      unconfirm: {
        success: result_add_video.unconfirm.success,
        error: result_add_video.unconfirm.error,
      },
    },
    search_songVtuber: result_search_songVtuber,
    add_songVtuber: result_add_songVtuber
  });
});

router.post("/addNewViewCount", async function (req, res) {
  // DB から動画情報を取得
  const result_DB_get_videos = await DB_get_videos({
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
