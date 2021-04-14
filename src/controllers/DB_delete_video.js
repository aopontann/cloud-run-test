const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async function(delete_id) {
  const deleteSongVideos = prisma.songVtuber.deleteMany({
    where: {
      videoId: delete_id
    }
  });
  const times = prisma.times.delete({
    where: {
      id: delete_id
    }
  });
  const thumbnails = prisma.thumbnails.delete({
    where: {
      id: delete_id
    }
  });
  const statistics = prisma.statistics.delete({
    where: {
      id: delete_id
    }
  })
  const videos = prisma.videos.delete({
    where: {
      id: delete_id
    }
  });
  await prisma.$transaction([deleteSongVideos, times, thumbnails, statistics, videos]);
  await prisma.$disconnect();
}