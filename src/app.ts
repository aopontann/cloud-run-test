require('events').EventEmitter.defaultMaxListeners = 15;

import express from "express"
import youtube_controller from "./controllers/youtube"
import youtube_auth from "./controllers/youtube-oauth"
import video_controller from "./controllers/videos"
import vtuber_controller from "./controllers/vtuber"
import tags_controller from "./controllers/tags"
import twitter_controller from "./controllers/twitter"
import cros from "cors"
import { authCheck } from "./lib/authCheck";

const app = express();

// ローカルのクライアントからフェッチできるように
app.use(cros());

// ↓これがないと(POST)bodyが受け取れなくなる
app.use(express.json({ limit: '10mb' }));

// ルーティング
app.use('/youtube', youtube_controller);
app.use('/youtube-auth', authCheck);
app.use('/youtube-auth', youtube_auth);
app.use('/videos', video_controller);
app.use('/vtuber', vtuber_controller);
app.use('/tags', tags_controller);
app.use('/twitter', twitter_controller);

export default app;
