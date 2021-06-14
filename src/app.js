require('events').EventEmitter.defaultMaxListeners = 15;
// ライブラリ読み込み
const express = require('express');
// const cors = require('cors');
const app = express();

// ローカルのクライアントからフェッチできるように
// app.use(cors());

//app.use(express.urlencoded({ extended: true }));
// ↓これがないと(POST)bodyが受け取れなくなる
app.use(express.json({ extended: true, limit: '10mb' }));

const port = process.env.PORT || 8080; // port番号を指定

const youtube_router = require('./routes/youtube');
app.use('/youtube', youtube_router);

const DB_videos_router = require('./routes/videos');
app.use('/videos', DB_videos_router);

const DB_vtuber_router = require('./routes/vtuber');
app.use('/vtuber', DB_vtuber_router);

//サーバ起動
app.listen(port);
console.log('niji-song-server port ' + port);