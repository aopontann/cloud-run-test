const { PrismaClient } = require("@prisma/client");
// タイムゾーンの時間を取得
const { formatToTimeZone } = require("date-fns-timezone");
const FORMAT = "YYYY-MM-DDTHH:mm:ss";
const TIME_ZONE_TOKYO = "Asia/Tokyo";

const all_vtuberInfo = require("../jsonFolder/vtuber.json");

const prisma = new PrismaClient();

async function main() {
  const now = new Date();
  const formatted_now = formatToTimeZone(now, FORMAT, {
    timeZone: TIME_ZONE_TOKYO,
  });
  // vtuber init
  for await (const vtuberInfo of all_vtuberInfo.list) {
    console.log("name", vtuberInfo.name);
    await prisma.vtuber.create({
      data: {
        id: vtuberInfo.id,
        name: vtuberInfo.name,
        readname: vtuberInfo.readname,
        affiliation: vtuberInfo.affiliation,
        birthday: vtuberInfo.birthday
      },
    }).catch((e) => {
      console.log("error!!!!!!");
    }).finally(() => {
      console.log("success!");
    });
  }
  // video test data
  await prisma.videos.create({
    data: {
      id: "oPAcjv__fbc",
      title: "【】歌ってみた KING 葛葉 【】",
      thumbnail: {
        create: {
          defaultUrl: "https://i.ytimg.com/vi/oPAcjv__fbc/default.jpg"
        }
      },
      time: {
        create: {
          videoLength: "PT2M15S",
          startTime: "2020-11-10T11:00:00Z",
          createdAt: formatted_now
        }
      },
      dayCount: {
        create: {
          viewCount: 18188058,
          likeCount: 304201,
          dislikeCount: 2363,
          commentCount: 21016,
          createdAt: formatted_now
        }
      },
      songVtuber: {
        create: {
          role: "歌",
          channelId: "UCSFCh5NL4qXrAy9u-u2lX3g",
          createdAt: formatted_now
        }
      }
    }
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
