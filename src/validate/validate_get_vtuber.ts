import express from "express";

const target_validate = [
  "affiliation",
  "type",
  "id",
  "name",
  "birthday",
  "readname",
  "image",
];
const all_affiliation = [
  "にじさんじ",
  "NIJISANJI KR",
  "NIJISANJI ID",
  "NIJISANJI IN",
  "NIJISANJI EN",
];
const all_type = ["活動中", "卒業", "ユニット", "公式"];

export const validateQuery_vtuber =
  (requireKeys?: string[]) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const query = req.query || {};
    console.log("query", query);
    // affiliation バリデーションチェック
    if (query.affiliation) {
      for (const affi of String(query.affiliation).split(",")) {
        if (!all_affiliation.includes(affi)) {
          res.status(400).json({ errors: "NG affiliation" });
        }
      }
    }

    // type バリデーションチェック
    if (query.type) {
      for (const type of String(query.type).split(",")) {
        if (!all_type.includes(type)) {
          res.status(400).json({ errors: "NG type" });
        }
      }
    }

    if (query.birthday) {
      if (!String(query.birthday).match(/[0-9]{4}/)) {
        res.status(400).json({ errors: "NG birthday" });
      }
    }

    for (const [key, val] of Object.entries(query)) {
      // 「""」文字排除
      if (val === "") {
        res.status(400).json({ errors: `NG ${key}` });
      }
      // target_validate以外のkey排除
      if (!target_validate.includes(key)) {
        res.status(400).json({ errors: `Cannot be specified ${key}` });
      }
    }
    // 必須パラメータが全て含まれているか
    for (const requireKey of requireKeys || []) {
      if (!Object.keys(query).includes(requireKey)) {
        res.status(400).json({ errors: `not found require key ${requireKey}` });
      }
    }

    next();
  };
