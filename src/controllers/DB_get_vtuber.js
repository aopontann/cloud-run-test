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

module.exports = async function (query) {
  /*
  このクエリにあったデータを持ってくる
  例　query { Affiliation: 'にじさんじ, ...', name: 'aaa, ...' }
  */
  let return_data = [];

  // クエリ nameがある場合  Affiliationも指定されているかも
  if (query.name) {
    const search_name = query.name.split(",");
    const snapshot = await db
      .collection("VtuberInfo-nijisanji")
      .where("name", "in", search_name)
      .get();
    snapshot.forEach((doc) => {
      if (!query.Affiliation) {
        return_data.push(doc.data());
      } else if (query.Affiliation.search(doc.data().Affiliation)) {
        return_data.push(doc.data());
      }
    });
  // クエリ nameはないけど、Affiliationがある場合
  } else if (query.Affiliation) {
    const search_Affiliation = query.Affiliation.split(",");
    const snapshot = await db
      .collection("VtuberInfo-nijisanji")
      .where("Affiliation", "in", search_Affiliation)
      .get();
    snapshot.forEach((doc) => {
      return_data.push(doc.data());
    });
  // クエリ nameもAffiliationもない場合
  } else {
    const snapshot = await db.collection("VtuberInfo-nijisanji").get();
    snapshot.forEach((doc) => {
      return_data.push(doc.data());
    });
  }

  return return_data;
};
