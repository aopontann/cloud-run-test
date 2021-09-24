import express from "express";
import Ajv from "ajv";
import addFormats from "ajv-formats";

interface VtuberData {
  id?: string;
  name?: string;
  affiliation?: string;
  type?: string;
  birthday?: string;
}

const all_affiliation = [
  "にじさんじ",
  "NIJISANJI KR",
  "NIJISANJI ID",
  "NIJISANJI IN",
  "NIJISANJI EN",
];
const all_type = ["活動中", "卒業", "ユニット", "公式"];

// インスタンスを作成
const ajv = new Ajv();
addFormats(ajv);

const schema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      pattern: "^[\x20-\x7E]+$", //ascii
    },
    name: {
      type: "string",
    },
    affiliation: {
      type: "string",
    },
    type: {
      type: "string",
    },
    birthday: {
      type: "string",
      pattern: "[0-9]{4}", // 4桁固定数字
    },
  },
  additionalProperties: false,
};

// バリデーション関数を作成
const validate = ajv.compile(schema);

export const validateQuery_vtuber = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const query: VtuberData = req.query || {};

  // バリデーションを実行
  const valid = validate(query);
  if (!valid) {
    // バリデーションエラー
    res.status(400).json({ errors: validate.errors });
    return;
  }

  if (query.affiliation) {
    for (const affi of query.affiliation.split(",")) {
      if (!all_affiliation.includes(affi)) {
        res.status(400).json({ errors: "NG affiliation" });
        return;
      }
    }
  }

  if (query.type) {
    for (const type of query.type.split(",")) {
      if (!all_type.includes(type)) {
        res.status(400).json({ errors: "NG type" });
        return;
      }
    }
  }

  // 「""」文字排除
  for (const [key, val] of Object.entries(query)) {
    if (val === "") {
      res.status(400).json({ errors: `NG ${key}` });
      return;
    }
  }

  next();
};
