const express = require("express");
const router = express.Router();

const get_videoinfo = require("../controllers/youtube/get_youtube_videos");
const select_videos = require("../controllers/youtube/select_youtube_videos");

//http://localhost:3002/youtube/videos?select=(bool)&videoId=
router.get("/", async function (req, res) {
  const result_getVideoInfo = await get_videoinfo({
    videoId: req.query.videoId ? req.query.videoId.split(",") : [],
    part: req.query.part || "statistics,contentDetails,snippet,liveStreamingDetails"
  });

  if(req.query.select === "yes") {
    console.log("取得したデータを歌動画か判別するよ");
    // 判別できたデータは result_select_Videos.songConfirm = true になる
    // 判別が難しいデータは result_select_Videos.songConfirm = false になる
    const result_select_videos = select_videos(
      result_getVideoInfo
    );
    res.json(result_select_videos);

  } else if(req.query.select === "no") {
    console.log("取得したデータを歌動画か判別せず返すよ");
    const result_select_videos = result_getVideoInfo.map(videoInfo => {
      videoInfo.songConfirm = true;
      return videoInfo;
    })
    res.json(result_select_videos);
    
  } else {
    res.json({
      message: "error"
    });
  }
});
  

//routerをモジュールとして扱う準備
module.exports = router;
