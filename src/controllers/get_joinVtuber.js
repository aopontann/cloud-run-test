const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async function(videoId) {
  const result = await prisma.songVtuber.findMany({
    where: {
      videoId: { in: videoId }
    }
  });
  return result;
}