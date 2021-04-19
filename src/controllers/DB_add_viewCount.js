const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const get_youtube_videos = require("./youtube/get_youtube_videos");

module.exports = async function (all_videoInfo) {
  const insertData = all_videoInfo.map((videoInfo) => {
    const count = videoInfo.statistics;
    return {
      videoId: videoInfo.id,
      viewCount: count.viewCount ? Number(count.viewCount) : null,
      likeCount: count.likeCount ? Number(count.likeCount) : null,
      dislikeCount: count.dislikeCount ? Number(count.dislikeCount) : null,
      commentCount: count.commentCount ? Number(count.commentCount) : null,
    };
  });
  await prisma.dayCount.createMany({
    data: insertData,
  });
  prisma.$disconnect();
  return insertData;
};

/* all_videoInfo
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
        },
        "songConfirm": true
    },
    ...
]
*/
