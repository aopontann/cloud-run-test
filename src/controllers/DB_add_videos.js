const admin = require("firebase-admin");

// タイムゾーンの時間を取得
const { formatToTimeZone } = require("date-fns-timezone");

// 初期化は一度だけ
if(!admin.apps.length){
  console.log("admin 初期化するよ");
  const serviceAccount = require("../../path/to/natural-venture-305013-21e2c77b1f88.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  console.log("admin 初期化してあるよ");
}

const db = admin.firestore();

module.exports = async function (all_videoInfo, bool) {
  for await (const videoInfo of all_videoInfo) {
    const FORMAT = "YYYY/MM/DD HH:mm:ss";
    const TIME_ZONE_TOKYO = "Asia/Tokyo";
    const now = new Date();
    const formatted = formatToTimeZone(now, FORMAT, {
      timeZone: TIME_ZONE_TOKYO,
    });

    await db.collection("selectedVideos-nijisanji").doc(videoInfo.id).set({
      add: false,
      confirm: bool,
      id: videoInfo.id,
      timestamp: formatted,
      dayViewcount: [],
      snippet: videoInfo.snippet,
      statistics: videoInfo.statistics,
      liveStreamingDetails: videoInfo.liveStreamingDetails || "none",
      contentDetails: videoInfo.contentDetails,
    });
  }
};
