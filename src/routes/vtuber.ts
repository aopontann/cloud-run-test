import express from "express";
import get_vtuber from "../controllers/vtuber/get_vtuber";
import add_vtuber from "../controllers/vtuber/add_vtuber";
import update_vtuber from "../controllers/vtuber/update_vtuber";

const router = express.Router();

// http://localhost:8080/DB/vtuber?
// affiliation= (にじさんじ, ...) & name= (える, ...)
// クエリ指定しないと全てのデータが返ってくるよ
router.get("/", async function (req: express.Request, res: express.Response): Promise<void> {
  console.log("query", req.query);
  const affi = (req.query?.affiliation as string) || null;
  const names = (req.query?.name as string) || null;
  const channelId = (req.query?.channelId as string) || null;

  const result = await get_vtuber({
    affiliation: affi?.split(","),
    name: names?.split(","),
    channelId: channelId?.split(","),
  }).catch((e) => {
    console.log("get_vtuber error!");
    res.status(500).json("error!");
    throw e;
  });
  //console.log(result);
  res.status(200).json(result);
});

router.post("/", async function (req: express.Request, res: express.Response): Promise<void> {
  await add_vtuber([...req.body]).catch((e) => {
    console.log("add_vtuber error!", e);
    res.status(500).json("error");
    throw e;
  });
  res.status(201).json("success");
});

router.put("/", async function (req: express.Request, res: express.Response): Promise<void> {
  await update_vtuber({
    id: req.body.id,
    name: req.body.name || null,
    readname: req.body.readname || null,
    affiliation: req.body.affiliation || null,
    birthday: req.body.birthday || null,
    image: req.body.image || null,
  }).catch((e) => {
    console.log("update_vtuber error!", e);
    res.status(500).json("error!");
    throw e;
  });
  res.status(201).json("success!");
});

//routerをモジュールとして扱う準備
export = router;
