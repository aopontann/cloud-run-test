require('events').EventEmitter.defaultMaxListeners = 15;
// ライブラリ読み込み
import express from "express"
import youtube_router from "./routes/youtube"
import video_router from "./routes/videos"
import vtuber_router from "./routes/vtuber"
import tags_router from "./routes/tags"

const Router = express.Router();
// const cors = require('cors');
const app = express();

// ローカルのクライアントからフェッチできるように
// app.use(cors());

//app.use(express.urlencoded({ extended: true }));
// ↓これがないと(POST)bodyが受け取れなくなる
app.use(express.json({ limit: '10mb' }));

const port = process.env.PORT || 8080; // port番号を指定

app.use('/youtube', youtube_router);
app.use('/videos', video_router);
app.use('/vtuber', vtuber_router);
app.use('/tags', tags_router);

//サーバ起動
app.listen(port);
console.log('niji-song-server port ' + port);