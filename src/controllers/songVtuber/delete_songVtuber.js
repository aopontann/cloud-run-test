const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (query) {
  const channelId = query.channelId || null;
  const deleteId = query.deleteId || null;
  
  await prisma.songVtuber
    .deleteMany({
      where: {
        AND: [{ channelId: { in: channelId } }, { videoId: { in: deleteId } }],
      },
    })
    .catch((e) => {
      console.log("delete songVtuber error!");
    })
    .finally(async () => {
      console.log("done");
      await prisma.$disconnect();
    });
};
