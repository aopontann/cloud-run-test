const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// タイムゾーンの時間を取得
const { formatToTimeZone } = require("date-fns-timezone");
const FORMAT = "YYYY-MM-DDTHH:mm:ss";
const TIME_ZONE_TOKYO = "Asia/Tokyo";

module.exports = async function (query) {
  const now = new Date();
  const formatted_now = formatToTimeZone(now, FORMAT, {
    timeZone: TIME_ZONE_TOKYO,
  });
  const type = query.type || "update";
  const videoId = query.videoId || "";
  const joinVtuber = query.joinVtuber || null;
  const array_videoInfo = query.data || [];

  const return_data = {
    success: [],
    error: [],
  };

  if (videoId && joinVtuber) {
    array_videoInfo.push({
      videoId: videoId,
      joinVtuber: joinVtuber,
    });
  }

  const all_videoId = array_videoInfo.map((video) => video.videoId);
  if (type == "init") {
    await prisma.songVtuber.deleteMany({
      where: {
        videoId: { in: all_videoId },
      },
    });
  }

  for await (const oneVideoInfo of array_videoInfo) {
    let errorFlag = false;
    await prisma.songVtuber
      .createMany({
        data: oneVideoInfo.joinVtuber.map((oneVtuber) => {
          return {
            createdAt: formatted_now + "Z",
            videoId: oneVideoInfo.videoId,
            channelId: oneVtuber.channelId,
            role: oneVtuber.role,
          };
        }),
      })
      .catch((e) => {
        console.log("joinVtuber error!");
        errorFlag = true;
      })
      .finally(() => {
        const vid = oneVideoInfo.videoId;
        errorFlag ? return_data.error.push(vid) : return_data.success.push(vid);
      });
  }
  const findResult = await prisma.songVtuber.findMany({
    where: {
      videoId: { in: all_videoId },
    },
  });
  await prisma.$disconnect();
  return {
    add_result: return_data,
    add_videoInfo: findResult
  }
};

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
