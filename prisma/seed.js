const { PrismaClient } = require("@prisma/client");

const all_vtuberInfo = require("../vtuber.json");

const prisma = new PrismaClient();

async function main() {
  // vtuber init
  /*
  const insertData = all_vtuberInfo.list.map((vtuberInfo) => {
    return {
      id: vtuberInfo.channelId,
      name: vtuberInfo.name,
      readname: vtuberInfo.readname,
      affiliation: vtuberInfo.affiliation,
      birthday: vtuberInfo.birthday,
      image: vtuberInfo.image,
    };
  });
  await prisma.vtuber.createMany({
    data: insertData
  });
  */
  // ... you will write your Prisma Client queries here
  
  await prisma.videos.create({
    data: {
      id: 'videoId000',
      title: 'titleAAA',
      songConfirm: false,
    },
    include: {
      dayViewCount
    }
  });
  /*
  const allVideos = await prisma.videos.findMany({
    include: {
      thumbnail: true,
      statistic: true,
      time:      true
    },
  });
  console.dir(allVideos, { depth: null });

  */
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
