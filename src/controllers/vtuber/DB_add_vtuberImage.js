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

module.exports = async function (body) {
  for await (const vtuberImage of body) {
    await prisma.vtuberImage
      .create({
        data: {
          createdAt: formatted_now + "Z",
          type: vtuberImage.type,
          url: vtuberImage.url,
          channelId: vtuberImage.channelId,
        },
      })
      .catch((e) => {
        console.log("add vtuberImage error!");
      })
      .finally(() => {
        console.log("add vtuberimage success!");
      });
  }
  await prisma.$disconnect();
};
