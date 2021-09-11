import Twitter from "twitter";
import { Status } from "twitter-d";
import { Videos } from ".prisma/client";
import { format_date } from "../get_times";
export default async function (q: { video: Videos[] }) {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_API_KEY || "",
    consumer_secret: process.env.TWITTER_SECRET_API_KEY || "",
    access_token_key: process.env.TWITTER_ACCESS_TOKEN || "",
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || "",
  });
  if (!q?.video) {
    throw "not exist videoId";
  }
  const hashTag = "#にじさんじ #歌ってみた"; //タグは使わない
  console.log("----- video tweet -----");
  for await (const video of q.video) {
    const startTime = format_date({
      date: video.startTime,
      format: "MM/DD HH:mm 公開"
    });
    const msg = `
     [${startTime}]\n${video.title}\nhttps://www.youtube.com/watch?v=${video.id}
   `;
    console.log("videoId=", video.id);
    console.log(msg);
    const res = <Status>(
      await client.post("statuses/update", {
        status: msg
      })
    );
    console.log(res);
  }
  console.log("----- complete -----");
}
