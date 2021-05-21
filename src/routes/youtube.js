const express = require("express");
const router = express.Router();

const get_youtube_activities = require('../controllers/youtube/get_youtube_activities');
const get_videoinfo = require("../controllers/youtube/get_youtube_videos");
const select_videos = require("../controllers/youtube/select_youtube_videos");

router.get('/activities', async function(req,res){
  // datetime "1970-01-01T00:00:00Z"
  const result_activities = await get_youtube_activities({
    all_channelId: req.query.channelId ? req.query.channelId.split(',') : [],
    datetimeAfter: req.query.datetimeAfter || "1970-01-01T00:00:00Z",
    datetimeBefore: req.query.datetimeBefore || "1970-01-01T00:00:00Z"
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
  const result_select_videos = select_videos(
    result_getVideoInfo
  );

  res.json({
    message: "done songCheck",
    songConfirm: result_select_videos.songConfirm,
    unsongConfirm: result_select_videos.unsongConfirm
  });

});
  

//routerをモジュールとして扱う準備
module.exports = router;
