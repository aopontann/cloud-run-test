require('events').EventEmitter.defaultMaxListeners = 15;
// ライブラリ読み込み
import express from "express"
import youtube_router from "./routes/youtube"
import youtube_auth from "./routes/youtube-oauth"
import video_router from "./routes/videos"
import vtuber_router from "./routes/vtuber"
import tags_router from "./routes/tags"
import twitter_router from "./routes/twitter"
import cros from "cors"
import { authCheck } from "./authCheck";

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
  console.log()
}

const app = express();

// ローカルのクライアントからフェッチできるように
app.use(cros());

//app.use(express.urlencoded({ extended: true }));
// ↓これがないと(POST)bodyが受け取れなくなる
app.use(express.json({ limit: '10mb' }));

const port = process.env.PORT || 8080; // port番号を指定

app.use('/youtube', youtube_router);
app.use('/youtube-auth', authCheck);
app.use('/youtube-auth', youtube_auth);
app.use('/videos', video_router);
app.use('/vtuber', vtuber_router);
app.use('/tags', tags_router);
app.use('/twitter', twitter_router);


//サーバ起動
app.listen(port);
console.log('niji-song-server port ' + port);