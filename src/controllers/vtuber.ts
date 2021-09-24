import express from "express";
import get_vtuber from "../services/vtuber/get_vtuber";
import add_vtuber from "../services/vtuber/add_vtuber";
import update_vtuber from "../services/vtuber/update_vtuber";
import { validateQuery_vtuber } from "../validate/vtuber/validate_get_vtuber";
import { validateBody_POST_vtuber } from "../validate/vtuber/validate_post_vtuber";
import { validateBody_PUT_vtuber } from "../validate/vtuber/validate_put_vtuber";

const router = express.Router();

// クエリ指定しないと全てのデータが返ってくるよ
router.get(
  "/",
  validateQuery_vtuber,
  async function (req: express.Request, res: express.Response): Promise<void> {
    console.log("get vtuber query", req.query);
    const affi = req.query.affiliation
      ? String(req.query.affiliation).split(",")
      : undefined;
    const name = req.query.name ? String(req.query.name).split(",") : undefined;
    const id = req.query.id ? String(req.query.id).split(",") : undefined;
    const type = req.query.type ? String(req.query.type).split(",") : undefined;
    const birthday = req.query.birthday
      ? String(req.query.birthday).split(",")
      : undefined;

    const result = await get_vtuber({
      affiliation: affi,
      name,
      id,
      type,
      birthday,
    }).catch((e) => {
      console.log("get_vtuber error!");
      res.status(500).json({
        error: "get_vtuber error",
      });
      throw e;
    });
    //console.log(result);
    res.status(200).json(result);
  }
);

router.post(
  "/",
  validateBody_POST_vtuber,
  async function (req: express.Request, res: express.Response): Promise<void> {
    await add_vtuber({ ...req.body }).catch((e) => {
      console.log("add_vtuber error!", e);
      res.status(500).json({
        error: "add_vtuber error",
      });
      throw e;
    });

    res.status(201).json("success");
  }
);

router.put(
  "/",
  validateBody_PUT_vtuber,
  async function (req: express.Request, res: express.Response): Promise<void> {
    await update_vtuber({ ...req.body }).catch((e) => {
      console.log("update_vtuber error!", e);
      res.status(500).json({
        error: "update_vtuber error",
      });
      throw e;
    });

    res.status(201).json("success!");
  }
);

//routerをモジュールとして扱う準備
export = router;
