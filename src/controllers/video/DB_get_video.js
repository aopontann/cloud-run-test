const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/* query {
  id: "videoId, videoId, ..." or "" or "all"
  songConfirm: "true" or "false" or "all"
  checkSongVtuber: "true" or "false" or "all"
}
true, false, all 以外は false として扱う
*/ 

module.exports = async function (query) {
  console.log("query", query);
  if (!query.id) {
    return [];
  }
  const all_videoId = query.id.split(",");
  const songConfirm = query.songConfirm;
  const checkSongVtuber = query.checkSongVtuber;
  const createdAtAfter = query.createdAtAfter;
  const createdAtBefore = query.createdAtBefore;
  const maxResults = query.maxResults;
  
  const whereAND = [];
  if (songConfirm != "all") {
    whereAND.push({ songConfirm: songConfirm == "true" ? true : false });
  }
  if (checkSongVtuber != "all") {
    whereAND.push({ checkSongVtuber: checkSongVtuber == "true" ? true : false });
  }
  if (query.id != "all") {
    whereAND.push({ id: { in: all_videoId } });
  }
  if (createdAtAfter) {
    whereAND.push({ time: { createdAt: {gte: createdAtAfter} } })
  }
  if (createdAtBefore) {
    whereAND.push({ time: { createdAt: {lte: createdAtBefore} } })
  }

  const getVideo = await prisma.videos.findMany({
    where: {
      AND: whereAND,
    },
    include:{
      thumbnail: true,
      time: true,
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
