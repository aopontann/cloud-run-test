import { google, youtube_v3 } from "googleapis";
import fs from "fs"

export default async function (q: {videoId: string[], playlistId: string}): Promise<void> {
  const add_videoId = q.videoId || [];
  const playlistId = q.playlistId || undefined;
  const CREDENTIALS_PATH = './client_secret.json';
  const TOKEN_PATH = './token.json';
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
  const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));

  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  oAuth2Client.setCredentials(token);
  const service = google.youtube("v3");

  if(!playlistId) {
    throw "not exist playlistId"
  }

  console.log("----- playlistItems insert -----");
  for await (const videoId of add_videoId) {
    const res = await service.playlistItems.insert({
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