import { google, youtube_v3 } from "googleapis";
import fs from "fs";

export default async function (q: {
  playlistId: string;
  startTimeAfter?: string;
  startTimeBefore?: string;
}): Promise<void> {
  const playlistId = q.playlistId;
  const startTimeAfter = q.startTimeAfter;
  const startTimeBefore = q.startTimeBefore;
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

  console.log("----- playlistItems list -----");
  const res = await service.playlistItems.list({
    part: ["id", "snippet"],
    playlistId,
    maxResults: 50,
    auth: oAuth2Client
  });

  console.log("----- complete -----");
}
