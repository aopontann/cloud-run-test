import { google, youtube_v3 } from "googleapis";
import fs from "fs";
import { getToken } from "../oauth2";

export default async function (q: {
  playlistId: string;
  startTimeAfter?: string;
  startTimeBefore?: string;
}): Promise<void> {
  const playlistId = q.playlistId;
  const oAuth2Client = getToken();
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
