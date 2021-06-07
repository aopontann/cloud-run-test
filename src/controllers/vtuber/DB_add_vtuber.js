const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (body) {
  for await (const vtuberInfo of body) {
    await prisma.vtuber.upsert({
      where: { id: vtuberInfo.channelId },
      create: {
        id: vtuberInfo.channelId,
        name: vtuberInfo.name,
        readname: vtuberInfo.readname,
        affiliation: vtuberInfo.affiliation,
        birthday: vtuberInfo.birthday || null,
        image: vtuberInfo.image || null,
      },
    });
  }
  await prisma.$disconnect();
};
