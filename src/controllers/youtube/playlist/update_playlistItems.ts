import { google } from "googleapis";
import fs from "fs";
import { get_time2 } from "../../get_times";
import get_video from "../../video/get_video";
import insert_playlistItems from "./insert_playlistItems";
import delete_playlistItems from "./delete_playlistItems";

//指定した期間に公開された全ての動画URLを取得する
export default async function (q: {
  playlistId: string;
  startTimeAfter: string;
  startTimeBefore: string;
}): Promise<void> {
  const playlistId = q.playlistId;
  const startAtAfter = q.startTimeAfter;
  const startAtBefore = q.startTimeBefore;
  const CREDENTIALS_PATH = "./client_secret.json";
  const TOKEN_PATH = "./token.json";
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf8"));
  const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8"));

  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  oAuth2Client.setCredentials(token);
  const service = google.youtube("v3");

  // 過去1週間分の動画データを取得（動画データ）
  const result_get_video = await get_video({
    songConfirm: true,
    startAtAfter,
    startAtBefore,
    order: "startTime"
  });
  const res_get_videoId = result_get_video.map((video) => video.id);

  // プレイリストに保存されている動画データを取得 (プレイリスト動画データ)
  const res = await service.playlistItems.list({
    part: ["id", "snippet"],
    playlistId,
    maxResults: 50,
    auth: oAuth2Client,
  }).catch(e => {
    throw e;
  });
  const res_playlistItems_videoId = res.data?.items?.map(item => item.snippet?.resourceId?.videoId as string) || [];
  
  // 動画データに含まれていないプレイリスト動画データidを取得
  const delete_videoId = res_playlistItems_videoId.filter(id => !res_get_videoId.includes(id));

  // プレイリスト動画データに含まれていない動画データidを取得
  const insert_videoId = res_get_videoId.filter(id => !res_playlistItems_videoId.includes(id));
  
  // 動画データに含まれていないプレイリスト動画データを削除
  await delete_playlistItems({
    playlistId,
    videoId: delete_videoId
  });

  await insert_playlistItems({
    playlistId,
    videoId: insert_videoId
  });

  // .slice(0, -1) 最後の「z」を削除
  const today = get_time2({
    format: "MM/DD",
    time: startAtBefore.slice(0, -1),
    addZ: false
  });

  const sixDayAgo = get_time2({
    format: "MM/DD",
    time: startAtAfter.slice(0, -1),
    addZ: false
  });

  await service.playlists.update({
    part: ["snippet"],
    auth: oAuth2Client,
    requestBody: {
      "id": "PL_bYerfwKlGiQSckNm6G6D4e-UugXiZrG",
      "snippet": {
        "title": `にじさんじ 歌動画リスト (${sixDayAgo} 〜 ${today})`
      }
    }
  });

}
