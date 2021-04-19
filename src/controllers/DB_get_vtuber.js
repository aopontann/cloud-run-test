const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async function(query) {
  const affi = query.Affiliation ? query.Affiliation.split(',') : null;
  const names = query.name ? query.name.split(',') : null;
  const channelId = query.channelId ? query.channelId.split(',') : null;
  
  // 所属と名前が指定されている場合 条件にあった情報を返す
  if (affi && names) {
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
        songVtuber: true
      }
    });
    await prisma.$disconnect();
    return getVtuber;
  }

  // 所属とチャンネルIDが指定されている場合
  if (affi && channelId) {
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
        songVtuber: true
      }
    });
    await prisma.$disconnect();
    return getVtuber;
  }

  // 所属のみ指定されている場合
  if (affi) {
    const getVtuber = await prisma.vtuber.findMany({
      where: {
        affiliation: { in: affi }
      },
      include: {
        songVtuber: true
      }
    });
    await prisma.$disconnect();
    return getVtuber;
  }

  // 名前のみ指定されている場合
  if (names) {
    const getVtuber = await prisma.vtuber.findMany({
      where: {
        name: { in: names }
      },
      include: {
        songVtuber: true
      }
    });
    await prisma.$disconnect();
    return getVtuber;
  }

  // チャンネルIDのみ指定されている場合
  if (channelId) {
    const getVtuber = await prisma.vtuber.findMany({
      where: {
        id: { in: channelId }
      },
      include: {
        songVtuber: true
      }
    });
    await prisma.$disconnect();
    return getVtuber;
  }

  // 何も指定されていない場合 全ての情報を返す
  const getVtuber = await prisma.vtuber.findMany({
    include: {
      songVtuber: true
    }
  });
  await prisma.$disconnect();
  return getVtuber;
}
