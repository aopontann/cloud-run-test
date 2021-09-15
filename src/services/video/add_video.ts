import { youtube_v3 } from "googleapis";
import prisma from "../../lib/client";
import { get_time, toJST } from "../../lib/get_times";

interface YoutubeVideo {
  kind?: string;
  etag?: string;
  id: string;
  snippet: youtube_v3.Schema$VideoSnippet;
  contentDetails?: youtube_v3.Schema$VideoContentDetails;
  statistics?: youtube_v3.Schema$VideoStatistics;
  liveStreamingDetails?: youtube_v3.Schema$VideoLiveStreamingDetails;
}

interface Query {
  all_videoInfo: YoutubeVideo[];
  songConfirm: boolean;
}

export default async function (query: Query): Promise<void> {
  const all_videoInfo: YoutubeVideo[] = query.all_videoInfo;
  const songConfirm: boolean = query.songConfirm || false;

  console.log("add video start!!");

  let cnt = 1;
  for await (const videoInfo of all_videoInfo) {
    console.log(
      `(${cnt++} / ${all_videoInfo.length}) videoId = ${videoInfo.id}`
    );
    const thumb = videoInfo.snippet.thumbnails;
    const count = videoInfo.statistics;
    const startTime =
      videoInfo.liveStreamingDetails?.scheduledStartTime ||
      videoInfo.liveStreamingDetails?.actualStartTime ||
      videoInfo.snippet.publishedAt ||
      "2000-01-01T00:00:00Z";

    await prisma.videos
      .upsert({
        where: { id: videoInfo.id },
        create: {
          id: videoInfo.id,
          title: videoInfo.snippet?.title || "",
          description: videoInfo.snippet?.description || "",
          songConfirm: songConfirm,
          startTime: startTime,
          createdAt: get_time(),
          thumbnail: {
            create: {
              defaultUrl: thumb?.default?.url || null,
              medium: thumb?.medium?.url || null,
              high: thumb?.high?.url || null,
              standard: thumb?.standard?.url || null,
              maxres: thumb?.maxres?.url || null,
            },
          },
          statistic: {
            create: {
              createdAt: get_time(),
              updatedAt: get_time(),
              viewCount: count?.viewCount ? Number(count.viewCount) : null,
              likeCount: count?.likeCount ? Number(count.likeCount) : null,
              dislikeCount: count?.dislikeCount
                ? Number(count.dislikeCount)
                : null,
              commentCount: count?.commentCount
                ? Number(count.commentCount)
                : null,
            },
          },
        },
        update: {
          title: videoInfo.snippet?.title || undefined,
          description: videoInfo.snippet?.description || undefined,
          songConfirm: songConfirm,
        },
      })
      .catch((e) => {
        console.log("add_video error!");
        throw e;
      });
  }

  console.log("add_video end");
}