const mysql = require("mysql");
const { PrismaClient } = require("@prisma/client");

// タイムゾーンの時間を取得
const { formatToTimeZone } = require("date-fns-timezone");

const prisma = new PrismaClient();

async function main() {
  const vtuber = await prisma.vtuber.findMany();
  console.log(vtuber);
  const video = await prisma.videos.findMany();
  const videoId = video.map((videoInfo) => videoInfo.id);
  console.log(videoId.join(","));
  /*
  const allVtuber = await prisma.vtuber.findMany();
  console.log("allVtuber", allVtuber);
  */
  // 2020-03-01T00:00:00Z
  const FORMAT = "YYYY-MM-DDTHH:mm:ss";
  const TIME_ZONE_TOKYO = "Asia/Tokyo";
  const now = new Date();
  const time_7_ago = new Date();
  time_7_ago.setHours(now.getHours() - 7);
  const formatted_now = formatToTimeZone(now, FORMAT, {
    timeZone: TIME_ZONE_TOKYO,
  });
  const formatted_time_7_ago = formatToTimeZone(time_7_ago, FORMAT, {
    timeZone: TIME_ZONE_TOKYO,
  });
  console.log("現在時刻", formatted_now + "Z");
  console.log("7時間前", formatted_time_7_ago + "Z");
  /*
  const connection = mysql.createConnection({
    user: "root",
    password: "password",
    database: "nijisongs",
    host: "localhost",
    port: 3306,
    socketPath: process.env.DB_SOCKET
  });
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('connected as id ' + connection.threadId);
    connection.end();
  });
  */
}

main();
