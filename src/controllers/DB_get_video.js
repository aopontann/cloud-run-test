const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async function(all_videoId) {
  if (all_videoId[0] == "all") {
    const getVideo = await prisma.videos.findMany({
      include: {
        statistic: true,
        thumbnail: true,
        time: true
      }
    });
    await prisma.$disconnect();
    return getVideo;
  }

  const getVideo = await prisma.videos.findMany({
    where: {
      id: { in: all_videoId }
    },
    include: {
      statistic: true,
      thumbnail: true,
      time: true
    }
  });
  await prisma.$disconnect();
  return getVideo;
}