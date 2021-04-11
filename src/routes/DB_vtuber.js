const express = require("express");
const router = express.Router();

//const DB_add_vtuber = require("../controllers/DB_add_vtuber");
const DB_get_vtuber = require("../controllers/DB_get_vtuber");

// http://localhost:8080/DB/vtuber?
// Affiliation= (にじさんじ, ...) & name= (える, ...)
// クエリ指定しないと全てのデータが返ってくるよ
router.get("/", async function (req, res) {
  console.log("query", req.query);
  const result = await DB_get_vtuber(req.query);
  console.log(result);

  res.json(result);
});

router.post("/", async function (req, res) {
  const result = await DB_add_vtuber(req.body);

  res.json({
    message: result,
    body: req.body,
  });
});

//routerをモジュールとして扱う準備
module.exports = router;
