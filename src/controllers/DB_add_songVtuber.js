const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async function(body) {
  let insertData = [];
  body.forEach(videoInfo => {
    videoInfo.joinVtuber.forEach(vtuberInfo => {
      insertData.push({
        videoId: videoInfo.id,
        channelId: vtuberInfo.id,
        role: "歌"
      });
    })
  });

  await prisma.songVtuber.createMany({
    data: insertData
  });
  prisma.$disconnect();
}

/* body (sample)
 [
        {
            "id": "pQxDWYMqjRU",
            "joinVtuber": [
                {
                    "id": "UCuep1JCrMvSxOGgGhBfJuYw",
                    "name": "フレン・E・ルスタリオ"
                }
            ]
        },
        ...
    ]
*/