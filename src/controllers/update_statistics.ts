import { youtube_v3 } from "googleapis";
import prisma from "../../prisma/client";
import { get_time2 } from "./get_times";

interface Query {
  kind: string;
  etag: string;
  id: string;
  statistics: youtube_v3.Schema$VideoStatistics
}

export default async function (query: Query[]): Promise<void> {
  console.log("update_viewCount");
  let cnt = 1;
  for await (const video of query) {
    const count = video.statistics;
    console.log(`(${cnt++}/${query.length}) id = ${video.id}`)
    await prisma.statistics.upsert({
      where: { id: video.id },
      update: {
        updatedAt: get_time2({}),
        viewCount: count.viewCount ? Number(count.viewCount) : null,
        likeCount: count.likeCount ? Number(count.likeCount) : null,
        dislikeCount: count.dislikeCount ? Number(count.dislikeCount) : null,
        commentCount: count.commentCount ? Number(count.commentCount) : null,
      },
      create: {
        id: video.id,
        createdAt: get_time2({}),
        updatedAt: get_time2({}),
        viewCount: count.viewCount ? Number(count.viewCount) : null,
        likeCount: count.likeCount ? Number(count.likeCount) : null,
        dislikeCount: count.dislikeCount ? Number(count.dislikeCount) : null,
        commentCount: count.commentCount ? Number(count.commentCount) : null,
      },
    }).catch((e) => {
      console.error("update_statistics error!");
      throw e;
    })
  }
  //prisma.$disconnect();
}

/* result_youtube_videos
[
    {
        "kind": "youtube#video",
        "etag": "lY1K5OnWxSdkvg1J4EWxOHk50SA",
        "id": "JoyhDWE7J-E",
        "statistics": {
            "viewCount": "569408",
            "likeCount": "34761",
            "dislikeCount": "45",
            "favoriteCount": "0",
            "commentCount": "1436"
        }
    },
    ...
]
*/
