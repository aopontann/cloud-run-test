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
  const checkSongVtuber =query.checkSongVtuber;

  const include = {
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
          },
        },
      },
    },
  };
  const whereAND = {};
  if (songConfirm != "all") {
    whereAND.songConfirm = songConfirm == "true" ? true : false;
  }
  if (checkSongVtuber != "all") {
    whereAND.checkSongVtuber = checkSongVtuber == "true" ? true : false;
  }
  if (query.id != "all") {
    whereAND.id = { in: all_videoId };
  }
  console.log("whereAND", whereAND);

  // 全ての動画を取得する
  if (query.id == "all" && songConfirm == "all" && checkSongVtuber == "all") {
    const getVideo = await prisma.videos.findMany({
      include: include
    });
    await prisma.$disconnect();
    return getVideo;
  }

  const getVideo = await prisma.videos.findMany({
    where: {
      AND: whereAND,
    },
    include: include,
  });
  await prisma.$disconnect();
  return getVideo;
};
