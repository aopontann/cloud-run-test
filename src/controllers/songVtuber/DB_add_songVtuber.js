const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { get_time } = require("../get_times");

module.exports = async function (query) {
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
            createdAt: get_time("Asia/Tokyo", 0),
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
