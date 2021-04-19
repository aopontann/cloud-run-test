const express = require('express');
const router = express.Router();

const get_youtube_activites = require('../controllers/youtube/get_youtube_activites');


router.get('/', async function(req,res){
  const result_activities = await get_youtube_activites(
    req.query.channelId.split(','),
    req.query.datetimeAfter,
    req.query.datetimeBefore
  );
  console.log(result_activities);
  res.json({
    result: result_activities
  });
});

//routerをモジュールとして扱う準備
module.exports = router;