const express = require("express");
const router = express.Router();

const get_youtube_activities = require('../controllers/youtube/get_youtube_activities');
const get_videoinfo = require("../controllers/youtube/get_youtube_videos");
const get_youtube_search = require("../controllers/youtube/get_search");
const select_videos = require("../controllers/youtube/select_youtube_videos");
const { get_time, toUTC } = require("../controllers/get_times");

router.get('/activities', async function(req,res){
  // datetime "1970-01-01T00:00:00Z"
  const result_activities = await get_youtube_activities({
    all_channelId: req.query.channelId ? req.query.channelId.split(',') : [],
    datetimeAfter: req.query.datetimeAfter ? toUTC(req.query.datetimeAfter) : get_time("UTC", -7),
    datetimeBefore: req.query.datetimeBefore ? toUTC(req.query.datetimeBefore) : get_time("UTC", 0)
  });
  console.log(result_activities);
  res.json(result_activities.split(","));
});

//http://localhost:3002/youtube/videos?select=(bool)&videoId=
router.get("/videos", async function (req, res) {
  console.log("query", req.query);
  const all_videoId = req.query.videoId ? req.query.videoId.split(",") : [];
  const part = req.query.part || "statistics,contentDetails,snippet,liveStreamingDetails";
  const songcheck = req.query.select === "true" ? true : false;

  if (songcheck && !part.match(/snippet/)) {
    res.json({
      error: "select するには snippet が必要です"
    });
    return;
  }
  
  const result_getVideoInfo = await get_videoinfo({
    videoId: all_videoId,
    part: part
  });

  if (!songcheck) {
    res.json({
      message: "Not songCheck",
      result: result_getVideoInfo
    })
    return;
  }

  // 歌ってみた動画か判断する
  const result_select_videos = await select_videos(
    result_getVideoInfo
  );

  res.json({
    message: "done songCheck",
    songConfirm: result_select_videos.songConfirm,
    unsongConfirm: result_select_videos.unsongConfirm
  });

});

router.get('/search', async function(req,res){
  // datetime "1970-01-01T00:00:00Z"
  const query = req.query || {};
  const result_search = await get_youtube_search({
    publishedAfter: query.publishedAfter || null,
    publishedBefore: query.publishedBefore || null,
  })
  //console.log(result_search);
  res.json(result_search);
});
  

//routerをモジュールとして扱う準備
module.exports = router;
