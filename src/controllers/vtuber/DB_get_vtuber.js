const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async function(query) {
  const affi = query.affiliation || null;
  const names = query.name || null;
  const channelId = query.channelId || null;
  let include_songVtuber = false;
  if (query.include[0] == "songVtuber" || query.include[1] == "songVtuber") {
    include_songVtuber = true;
  }
  let include_vtuberImage = false;
  if (query.include[0] == "vtuberImage" || query.include[1] == "vtuberImage") {
    include_vtuberImage = true;
  }

  console.log(include_songVtuber);
  console.log(include_vtuberImage);
  
  // 所属と名前が指定されている場合 条件にあった情報を返す
  if (affi && names) {
    console.log("affi and names");
    const getVtuber = await prisma.vtuber.findMany({
      where: {
        AND: [
          {
            name: { in: names }
          },
          {
            affiliation: { in: affi }
          }
        ]
      },
      include: {
        songVtuber: include_songVtuber,
        vtuberImage: include_vtuberImage
      }
    });
    await prisma.$disconnect();
    return getVtuber;
  }

  // 所属とチャンネルIDが指定されている場合
  if (affi && channelId) {
    console.log("channelId and affi");
    const getVtuber = await prisma.vtuber.findMany({
      where: {
        AND: [
          {
            id: { in: channelId }
          },
          {
            affiliation: { in: affi }
          }
        ]
      },
      include: {
        songVtuber: include_songVtuber,
        vtuberImage: include_vtuberImage
      }
    });
    await prisma.$disconnect();
    return getVtuber;
  }

  // 所属のみ指定されている場合
  if (affi) {
    console.log("affi");
    const getVtuber = await prisma.vtuber.findMany({
      where: {
        affiliation: { in: affi }
      },
      include: {
        songVtuber: include_songVtuber,
        vtuberImage: include_vtuberImage
      }
    });
    await prisma.$disconnect();
    return getVtuber;
  }

  // 名前のみ指定されている場合
  if (names) {
    console.log("name!!!");
    const getVtuber = await prisma.vtuber.findMany({
      where: {
        name: { in: names }
      },
      include: {
        songVtuber: include_songVtuber,
        vtuberImage: include_vtuberImage
      }
    });
    await prisma.$disconnect();
    return getVtuber;
  }

  // チャンネルIDのみ指定されている場合
  if (channelId) {
    console.log("channelId");
    const getVtuber = await prisma.vtuber.findMany({
      where: {
        id: { in: channelId }
      },
      include: {
        songVtuber: include_songVtuber,
        vtuberImage: include_vtuberImage
      }
    });
    await prisma.$disconnect();
    return getVtuber;
  }

  // 何も指定されていない場合 全ての情報を返す
  console.log("none");
  const getVtuber = await prisma.vtuber.findMany({
    include: {
      songVtuber: include_songVtuber,
      vtuberImage: include_vtuberImage
    }
  });
  await prisma.$disconnect();
  return getVtuber;
}
