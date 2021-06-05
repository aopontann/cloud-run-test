const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (query) {
  const all_videoId = query ? query.videoId || null : null;
  const songConfirm = query ? query.songConfirm || null : null;
  const checkSongVtuber = query ? query.checkSongVtuber || null : null;
  const createdAtAfter = query ? query.createdAtAfter || null : null;
  const createdAtBefore = query ? query.createdAtBefore || null : null;
  const maxResults = query ? query.maxResults || null : null;
  
  all_videoId ? whereAND.push({ id: { in: all_videoId } }) : ""
  songConfirm ? whereAND.push({ songConfirm: songConfirm == "true" ? true : false }) : ""
  checkSongVtuber ? whereAND.push({ checkSongVtuber: checkSongVtuber == "true" ? true : false }) : ""
  createdAtAfter ? whereAND.push({ time: { createdAt: {gte: createdAtAfter} } }) : ""
  createdAtBefore ? whereAND.push({ time: { createdAt: {lte: createdAtBefore} } }) : ""

  const whereAND = [];

  const getVideo = await prisma.videos.findMany({
    where: {
      AND: whereAND,
    },
    include:{
      thumbnail: true,
      dayCount: true,
      songVtuber: {
        select: {
          role: true,
          vtuber: {
            select: {
              id: true,
              name: true,
              vtuberImage: {
                select: { url: true }
              }
            }
          }
        }
      }
    },
  });

  await prisma.$disconnect();
  return getVideo.slice(0, maxResults || getVideo.length);
};
