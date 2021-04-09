// ライブラリ読み込み
const express = require('express');
const app = express();

//app.use(express.urlencoded({ extended: true }));
//app.use(express.json());

const port = process.env.PORT || 8080; // port番号を指定

const youtube_search_router = require('./routes/youtube_search');
app.use('/youtube/search', youtube_search_router);

const youtube_videos_router = require('./routes/youtube_videos');
app.use('/youtube/videos', youtube_videos_router);

const DB_videos_router = require('./routes/DB_videos');
app.use('/DB/videos', DB_videos_router);

const DB_vtuber_router = require('./routes/DB_vtuber');
app.use('/DB/vtuber', DB_vtuber_router);

const routin_router = require('./routes/routine');
app.use('/routine', routin_router);




//サーバ起動
app.listen(port);
console.log('listen on port ' + port);