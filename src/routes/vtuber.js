const express = require("express");
const router = express.Router();

const DB_add_vtuber = require("../controllers/vtuber/DB_add_vtuber");
const DB_get_vtuber = require("../controllers/vtuber/DB_get_vtuber");
const DB_delete_songVtuber = require("../controllers/songVtuber/delete_songVtuber");
const update_vtuber = require("../controllers/vtuber/update_vtuber");
const add_vtuberImage = require("../controllers/vtuber/add_vtuberImage");

// http://localhost:8080/DB/vtuber?
// affiliation= (にじさんじ, ...) & name= (える, ...)
// クエリ指定しないと全てのデータが返ってくるよ
router.get("/", async function (req, res) {
  console.log("query", req.query);
  const affi = req.query.affiliation ? req.query.affiliation.split(",") : null;
  const names = req.query.name ? req.query.name.split(",") : null;
  const channelId = req.query.channelId ? req.query.channelId.split(",") : null;
  const include = req.query.include ? req.query.include.split(",") : []; // ["songVtuber", "vtuberImage"]

  const result = await DB_get_vtuber({
    affiliation: affi,
    name: names,
    channelId: channelId,
    include: include,
  });

  console.log(result);
  res.json(result);
});

router.post("/", async function (req, res) {
  let errorFlag = false;
  await DB_add_vtuber([...req.body])
    .catch((e) => {
      console.log("error!");
      errorFlag = true;
    })
    .finally(() => {
      errorFlag ? res.json("error") : res.json("success");
    });
});

router.put("/", async function (req, res) {
  let errorFlag = false;
  await update_vtuber({
    channelId: req.query.channelId || null,
    name: req.query.name || null,
    readname: req.query.readname || null,
    affiliation: req.query.affiliation || null,
    birthday: req.query.birthday || null,
  })
    .catch((e) => {
      console.log("update_vtuber error!");
      errorFlag = true;
    })
    .finally(() => {
      errorFlag ? res.json("error!") : res.json("success!");
    });
});

router.post("/image", async function (req, res) {
  let errorFlag = false;
  await add_vtuberImage([...req.body])
    .catch((e) => {
      errorFlag = true;
      console.log("create vtuberImage error!");
    })
    .finally(() => {
      errorFlag ? res.json("error") : res.json("success");
    });
});


//routerをモジュールとして扱う準備
module.exports = router;
