import express from "express";
import Ajv from "ajv";
import addFormats from "ajv-formats";

interface VtuberData {
  id: string;
  name?: string;
  readname?: string;
  affiliation?: string;
  type?: string;
  birthday?: string;
  image?: string;
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
      pattern: "/^[\x20-\x7e]+$/", //ascii
    },
    name: {
      type: "string",
    },
    readname: {
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
      pattern: "/[0-9]{4}/", // 4桁固定数字
    },
    image: {
      type: "string",
    },
  },
  required: ["id"],
  additionalProperties: false,
};

// バリデーション関数を作成
const validate = ajv.compile(schema);

export const validateBody_PUT_vtuber = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const body: VtuberData = req.body;

  // バリデーションを実行
  const valid = validate(body);
  if (!valid) {
    // バリデーションエラー
    console.log(validate.errors);
    res.status(400).json({ errors: validate.errors });
    return;
  }

  if (body.affiliation && !all_affiliation.includes(body.affiliation)) {
    res.status(400).json({ errors: "NG affiliation" });
    return;
  }

  if (body.type && !all_type.includes(body.type)) {
    res.status(400).json({ errors: "NG type" });
    return;
  }

  // 「""」文字排除
  for (const [key, val] of Object.entries(body)) {
    if (val === "") {
      res.status(400).json({ errors: `NG ${key}` });
      return;
    }
  }

  next();
};
