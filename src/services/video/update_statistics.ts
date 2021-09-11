import { youtube_v3 } from "googleapis";
import prisma from "../../lib/client";
import { get_time } from "../get_times";

export default async function (query: youtube_v3.Schema$Video[]): Promise<void> {
  console.log("update_viewCount");
  const updateTime = get_time({format: "YYYY-MM-DDTHH:mm:ss"}) + "Z";
  let cnt = 1;
  for await (const video of query) {
    const count = video.statistics;
    console.log(`(${cnt++}/${query.length}) id = ${video.id}`)
    await prisma.statistics.update({
      where: { id: video.id || "error" },
      data: {
        updatedAt: updateTime,
        viewCount: count?.viewCount ? Number(count.viewCount) : undefined,
        likeCount: count?.likeCount ? Number(count.likeCount) : undefined,
        dislikeCount: count?.dislikeCount ? Number(count.dislikeCount) : undefined,
        commentCount: count?.commentCount ? Number(count.commentCount) : undefined,
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
