const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async function(query) {
  const affi = query.Affiliation ? query.Affiliation.split(',') : null;
  const names = query.name ? query.name.split(',') : null;
  
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
    });
    await prisma.$disconnect();
    return getVtuber;
  }

  // 何も指定されていない場合 全ての情報を返す
  const getVtuber = await prisma.vtuber.findMany({});
  await prisma.$disconnect();
  return getVtuber;
}
