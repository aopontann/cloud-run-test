const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (query) {
  const all_videoId = query ? query.videoId || null : null;
  const songConfirm = query ? query.songConfirm || null : null;
  const checkSongVtuber = query ? query.checkSongVtuber || null : null;
  const startAtAfter = query ? query.startAtAfter || null : null;
  const startAtBefore = query ? query.startAtBefore || null : null;
  const maxResults = query ? Number(query.maxResults) || 9999 : 9999;
  const page = query ? Number(query.page > 0 ? query.page : 1) || 1 : 1;

  const whereAND = [];
  all_videoId
    ? whereAND.push({ id: { in: all_videoId } })
    : "";
  songConfirm
    ? whereAND.push({ songConfirm: songConfirm == "true" ? true : false })
    : "";
  checkSongVtuber
    ? whereAND.push({
        checkSongVtuber: checkSongVtuber == "true" ? true : false,
      })
    : "";
  startAtAfter
    ? whereAND.push({ startTime: { gte: startAtAfter } })
    : "";
  startAtBefore
    ? whereAND.push({ startTime: { lte: startAtBefore } })
    : "";


  const getVideo = await prisma.videos.findMany({
    where: {
      AND: [
        ...whereAND,
      ],
    },
    orderBy: {
      statistic: {
        viewCount: 'desc'
      }
    },
    skip: maxResults * (page - 1),
    take: maxResults,
    include: {
      thumbnail: true,
      statistic: true,
      songVtuber: {
        select: {
          role: true,
          vtuber: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });

  await prisma.$disconnect();
  return getVideo;
};
