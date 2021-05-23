const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { get_time } = require("../controllers/get_times");
const get_youtube_videos = require("./youtube/get_youtube_videos");

module.exports = async function (query) {
  console.log("viewCount");
  const all_videoId = query.all_videoId || [];
  const all_videoInfo = query.all_videoInfo || [];
  let return_data = {
    success: [],
    error: []
  }
  let send_videoId;

  if (all_videoId[0] == "all") {
    const result = await prisma.videos.findMany();
    send_videoId = result.map((video) => video.id);
  } else {
    send_videoId = all_videoId;
  }

  const result_youtube_videos = await all_videoInfo
    ? all_videoInfo
    : await get_youtube_videos({
        videoId: send_videoId,
        part: "statistics",
      });

  for await (const videoInfo of result_youtube_videos) {
    const count = videoInfo.statistics;
    await prisma.dayCount.create({
      data: {
        videoId: videoInfo.id,
        createdAt: get_time("Asia/Tokyo", 0),
        viewCount: count.viewCount ? Number(count.viewCount) : null,
        likeCount: count.likeCount ? Number(count.likeCount) : null,
        dislikeCount: count.dislikeCount ? Number(count.dislikeCount) : null,
        commentCount: count.commentCount ? Number(count.commentCount) : null,
      }
    }).catch((e) => {
      console.log("add dayCount error!");
      return_data.error.push(videoInfo.id);
    }).finally(() => {
      return_data.success.push(videoInfo.id);
    })
  }
    
  prisma.$disconnect();
  return return_data;
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
