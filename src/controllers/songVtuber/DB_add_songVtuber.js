const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// タイムゾーンの時間を取得
const { formatToTimeZone } = require("date-fns-timezone");
const FORMAT = "YYYY-MM-DDTHH:mm:ss";
const TIME_ZONE_TOKYO = "Asia/Tokyo";
const now = new Date();
const formatted_now = formatToTimeZone(now, FORMAT, {
  timeZone: TIME_ZONE_TOKYO,
});

module.exports = async function (query) {
  const type = query.type || "update";
  const all_video_data = query.data || [];

  const return_data = {
    success: [],
    error: []
  };

  if(type == "init") {
    const delete_videoId = all_video_data.map(video => video.videoId);
    await prisma.songVtuber.deleteMany({
      where: {
        videoId: { in: delete_videoId }
      }
    });
  }

  for await (const videoJoinVtubers of all_video_data) {
    let errorFlag = false;
    await prisma.songVtuber.createMany({
      data: videoJoinVtubers.joinVtuber.map(oneVtuber => {
        return {
          createdAt: formatted_now + "Z",
          videoId: videoJoinVtubers.videoId,
          channelId: oneVtuber.channelId,
          role: oneVtuber.role
        }
      })
    }).catch((e) => {
      console.log("joinVtuber error!");
      errorFlag = true;
    }).finally(() => {
      const vid = videoJoinVtubers.videoId;
      errorFlag ? return_data.error.push(vid) : return_data.success.push(vid);
    })
  }
  await prisma.$disconnect();
  return return_data;
}

/* query
  type: "init" or "update",
  data: [
    {
      "videoId": "_-Qmg1nN5P0",
      "joinVtuber": [
        {
          "channelId": "UCt5-0i4AVHXaWJrL8Wql3mw",
          "role": "歌"
        },
        ...
      ]
    },
    ...
  ]
*/