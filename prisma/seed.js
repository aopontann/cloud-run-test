const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  /*
  await prisma.videos.create({
    data: {
      id: 'videoId000',
      title: 'titleAAA',
      description: '概要欄だよ',
      songConfirm: false,
      thumbnail: {
        create: {
          defaultUrl: 'image'
        }
      },
      statistic: {
        create: {
          viewCount: 1111,
          likeCount: 222,
          dislikeCount: 0,
          commentCount: 111
        }
      },
      time: {
        create: {
          videoLength: 'PT1M5S'
        }
      }
    },
  });

  const allVideos = await prisma.videos.findMany({
    include: {
      thumbnail: true,
      statistic: true,
      time:      true
    },
  });
  console.dir(allVideos, { depth: null });

  */
 
  await prisma.vtuber.create({
    data: {
      id: 'channelId000',
      name: 'テスト太郎',
      readname: 'てすとたろう',
      affiliation: 'にじさんじ',
      birthday: '0416',
    },
  });
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  });