const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { get_time } = require("../get_times");

module.exports = async function (body) {
  for await (const vtuberImage of body) {
    await prisma.vtuberImage
      .create({
        data: {
          createdAt: get_time("Asia/Tokyo", 0),
          type: vtuberImage.type,
          poster: vtuberImage.poster,
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
