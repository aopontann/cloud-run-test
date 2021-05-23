const express = require("express");
const router = express.Router();

const DB_add_videos = require("../controllers/video/DB_add_video");
const DB_get_videos = require("../controllers/video/DB_get_video");
const DB_delete_videos = require("../controllers/video/DB_delete_video");
const DB_update_videos = require("../controllers/video/DB_update_video");
const search_songVtuber = require("../controllers/songVtuber/get_search_songVtuber");
const DB_add_songVtuber = require("../controllers/songVtuber/DB_add_songVtuber");
const delete_songVtuber = require("../controllers/songVtuber/delete_songVtuber");
const DB_add_viewCount = require("../controllers/DB_add_viewCount");

// http://localhost:8080/DB/videos?
router.get("/", async function (req, res) {
  const result = await DB_get_videos({
    id: req.query.id || "",
    songConfirm: req.query.songConfirm || "all",
    checkSongVtuber: req.query.checkSongVtuber || "all",
    createdAtAfter: req.query.createdAtAfter || null,
    createdAtBefore: req.query.createdAtBefore || null,
    maxResults: req.query.maxResults || null
  });
  console.log(result);

  res.json(result);
});

//http://localhost:3002/DB/videos
router.post("/", async function (req, res) {
  const res_json = {};
  // 取得した動画情報をDBに保存する
  const result_add_video = {}
  result_add_video.confirm = await DB_add_videos({
    all_videoInfo: req.body.songConfirm || req.body.result || [],
    songConfirm: true
  });
  result_add_video.unconfirm = await DB_add_videos({
    all_videoInfo: req.body.unsongConfirm || [],
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
/* result_search_songVtuber_*
  [
    {
        "videoId": "_-Qmg1nN5P0",
        "joinVtuber": [
            {
                "channelId": "UCt5-0i4AVHXaWJrL8Wql3mw",
                "role": "歌"
            }
        ]
    }
  ]
*/

router.put("/", async function (req, res) {
  console.log("update body", req.body);
  const result = await DB_update_videos({
    videoId: req.body.videoId || "",
    songConfirm: req.body.songConfirm || false,
    checkSongVtuber: req.body.checkSongVtuber || false
  });
  res.json({
    message: result,
  });
});

// http://localhost:8080/DB/videos?id="videoId, ..."
router.delete("/", async function (req, res) {
  console.log("delete start");
  const all_videoId = req.query.id ? req.query.id.split(",") : [];
  const result_delete = await DB_delete_videos(all_videoId);
  console.log("delete complete!");
  res.json({
    message: "delete complete!",
    result: result_delete
  });
});

router.put("/songVtuber", async function(req, res) {
  console.log("update songVtuber body", req.body);
  const type = req.query.type === "update" ? "update" : "init"; // or update
  const result = await DB_add_songVtuber({
    type: type,
    videoId: req.body.videoId || "",
    joinVtuber: req.body.joinVtuber || []
  }); // data: も使えるよ

  res.json({
    result: result
  });
});

router.delete("/songVtuber", async function (req, res) {
  // channelId = "id, id, ...", delete_videoId = "videoId"
  // or channelId = "id", delete_videoId = "videoId, videoId, ..."
  const channelId = req.query.channelId;
  const delete_videoId = req.query.videoId;
  await delete_songVtuber({
    channelId: channelId,
    deleteId: delete_videoId,
  });
  res.json({
    message: "success",
  });
});

/* req.body
  [
    {
        "videoId": "_-Qmg1nN5P0",
        "joinVtuber": [
            {
                "channelId": "UCt5-0i4AVHXaWJrL8Wql3mw",
                "role": "歌"
            }
        ]
    }
  ]
*/

//routerをモジュールとして扱う準備
module.exports = router;
