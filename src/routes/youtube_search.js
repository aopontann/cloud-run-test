const express = require('express');
const router = express.Router();

const get_search_videos = require('../controllers/get_youtube_search');

//http://localhost:3002/youtube/search?channelId=UCuep1JCrMvSxOGgGhBfJuYw&datetimeAfter=2020-03-01T00:00:00Z&datetimeBefore=2020-03-05T00:00:00Z
router.get('/', async function(req,res){
  const result_search_videos = await get_search_videos(
    req.query.channelId.split(','),
    req.query.datetimeAfter,
    req.query.datetimeBefore
  );
  console.log(result_search_videos);
  res.json({
    result: result_search_videos
  });
});

//routerをモジュールとして扱う準備
module.exports = router;