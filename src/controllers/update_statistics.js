const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { get_time } = require("./get_times");

module.exports = async function (query) {
  console.log("update_viewCount");
  const all_videoInfo = query.all_videoInfo || [];
  let errorFlag = false; 

  for await (const videoInfo of all_videoInfo) {
    const count = videoInfo.statistics;
    await prisma.statistics.upsert({
      where: { id: videoInfo.id },
      update: {
        updatedAt: get_time("Asia/Tokyo", 0),
        viewCount: count.viewCount ? Number(count.viewCount) : null,
        likeCount: count.likeCount ? Number(count.likeCount) : null,
        dislikeCount: count.dislikeCount ? Number(count.dislikeCount) : null,
        commentCount: count.commentCount ? Number(count.commentCount) : null,
      },
      create: {
        id: videoInfo.id,
        createdAt: get_time("Asia/Tokyo", 0),
        updatedAt: get_time("Asia/Tokyo", 0),
        viewCount: count.viewCount ? Number(count.viewCount) : null,
        likeCount: count.likeCount ? Number(count.likeCount) : null,
        dislikeCount: count.dislikeCount ? Number(count.dislikeCount) : null,
        commentCount: count.commentCount ? Number(count.commentCount) : null,
      },
    }).catch((e) => {
      errorFlag = true;
      console.error("add dayCount error!", "videoId =", videoInfo.id);
    })
  }
    
  prisma.$disconnect();
  return errorFlag ? "error" : "success";
};

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
