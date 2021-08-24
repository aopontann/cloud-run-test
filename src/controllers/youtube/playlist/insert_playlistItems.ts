import { google, youtube_v3 } from "googleapis";
import { getToken } from "../oauth2";

export default async function (q: {videoId: string[], playlistId: string}): Promise<void> {
  const add_videoId = q.videoId || [];
  const playlistId = q.playlistId || undefined;
  const oAuth2Client = getToken();
  const service = google.youtube("v3");

  if(!playlistId) {
    throw "not exist playlistId"
  }

  console.log("----- playlistItems insert -----");
  for await (const videoId of add_videoId) {
    await service.playlistItems.insert({
      part: ["snippet"],
      auth: oAuth2Client,
      requestBody: {
        snippet: {
          playlistId,
          resourceId: {
            videoId,
            kind: "youtube#video",
          },
        },
      },
    }).catch(e => {
      console.error("error:", e);
      throw e;
    });
    console.log("videoId", videoId);
  }
  console.log("----- complete -----");;
}