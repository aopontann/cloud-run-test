const admin = require("firebase-admin");

// 初期化は一度だけ
if (!admin.apps.length) {
  console.log("admin 初期化するよ");
  const serviceAccount = require("../../path/to/natural-venture-305013-21e2c77b1f88.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  console.log("admin 初期化してあるよ");
}

const db = admin.firestore();

module.exports = async function (all_videoId) {
  /*
  例　all_videoId ["videoId", "videoId", ...]
  */
  let return_data = [];
  if (all_videoId.length == 0) {
    const snapshot = await db
      .collection("selectedVideos-nijisanji")
      .where("confirm", "==", true)
      .get();
    snapshot.forEach((doc) => {
      return_data.push(doc.data());
    });
    return return_data;
  }

  for await (const videoId of all_videoId) {
    const snapshot = await db
      .collection("selectedVideos-nijisanji")
      .doc(videoId)
      .get();
    return_data.push(snapshot.data());
  }

  return return_data;
};
