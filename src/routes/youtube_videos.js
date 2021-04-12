const express = require("express");
const router = express.Router();

const get_videoinfo = require("../controllers/get_youtube_videos");
const select_videos = require("../controllers/select_youtube_videos");

//http://localhost:3002/youtube/videos?select=(bool)&videoId=
router.get("/", async function (req, res) {
  const result_getVideoInfo = await get_videoinfo(
    req.query.videoId.split(",")
  );

  if(req.query.select === "yes") {
    console.log("取得したデータを歌動画か判別するよ");
    // 判別できたデータは result_selectedVideos.confirm[]に格納する
    // 判別が難しいデータは result_selectedVideos.unconfirm[]に格納する
    const result_select_videos = select_videos(
      result_getVideoInfo
    );
    res.json(result_select_videos);

  } else if(req.query.select === "no") {
    console.log("取得したデータをそのまま返すよ");
    res.json({
      confirm: result_getVideoInfo,
      unconfirm: []
    });
    
  } else {
    res.json({
      message: "error"
    });
  }
});
  

//routerをモジュールとして扱う準備
module.exports = router;
