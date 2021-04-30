const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async function(body) {
  for await (const vtuberInfo of body) {
    await prisma.vtuber.create({
      data: {
        id: vtuberInfo.channelId,
        name: vtuberInfo.name,
        readname: vtuberInfo.readname,
        affiliation: vtuberInfo.affiliation,
        birthday: vtuberInfo.birthday
      },
    });
  }
  await prisma.$disconnect();
}