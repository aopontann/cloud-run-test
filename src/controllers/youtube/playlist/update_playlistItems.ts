import { google } from "googleapis";
import fs from "fs";
import { get_time2 } from "../../get_times";
import get_video from "../../video/get_video";
import insert_playlistItems from "./insert_playlistItems";
import delete_playlistItems from "./delete_playlistItems";

//指定した期間に公開された全ての動画URLを取得する
export default async function (q: {
  playlistId: string;
  videoId: string[];
  title?: string;
}): Promise<void> {
  const playlistId = q.playlistId;
  const update_videoId = q.videoId;
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

  // プレイリストに保存されている動画データを取得 (プレイリスト動画データ)
  const res = await service.playlistItems
    .list({
      part: ["id", "snippet"],
      playlistId,
      maxResults: 50,
      auth: oAuth2Client,
    })
    .catch((e) => {
      throw e;
    });
  const res_playlistItems_videoId =
    res.data?.items?.map(
      (item) => item.snippet?.resourceId?.videoId as string
    ) || [];

  // 動画データに含まれていないプレイリスト動画データidを取得
  const delete_videoId = res_playlistItems_videoId.filter(
    (id) => !update_videoId.includes(id)
  );

  // プレイリスト動画データに含まれていない動画データidを取得
  const insert_videoId = update_videoId.filter(
    (id) => !res_playlistItems_videoId.includes(id)
  );

  // 動画データに含まれていないプレイリスト動画データを削除
  await delete_playlistItems({
    playlistId,
    videoId: delete_videoId,
  });

  await insert_playlistItems({
    playlistId,
    videoId: insert_videoId,
  });

  q.title
    ? await service.playlists.update({
        part: ["snippet"],
        auth: oAuth2Client,
        requestBody: {
          id: playlistId,
          snippet: {
            title: q.title,
          },
        },
      })
    : "";
}
