import { google } from "googleapis";
import { getToken } from "../oauth2";
import insert_playlistItems from "./insert_playlistItems";
import delete_playlistItems from "./delete_playlistItems";

export default async function (q: {
  playlistId: string;
  videoId: string[];
  title?: string;
}): Promise<void> {
  const playlistId = q.playlistId;
  const update_videoId = q.videoId;
  const oAuth2Client = getToken();
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
            description: "指定期間に公開されたにじさんじの歌動画リストです。毎日更新しています。"
          },
        },
      })
    : "";
}
