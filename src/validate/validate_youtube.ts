import express from "express";
import Ajv, { JSONSchemaType } from "ajv";
import addFormats from "ajv-formats";

// インスタンスを作成
const ajv = new Ajv();
addFormats(ajv);

const schema = {
  type: "object",
  properties: {
    channelId: {
      type: "string",
    },
    publishedAfter: {
      type: "string",
      format: "date-time",
    },
    publishedBefore: {
      type: "string",
      format: "date-time",
    },
    hour_ago: {
      type: "string",
    },
  },
  additionalProperties: false
};

// バリデーション関数を作成
const validate = ajv.compile(schema);

export const validate_youtube = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const query = req.query || {};
  console.log("query", query);
  // バリデーションを実行
  const valid = validate(req.query);
  if (!valid) {
    // バリデーションエラー
    console.log(validate.errors);
    res.status(400).json({ errors: validate.errors });
    return;
  }
  if (query.hour_ago){
    const hour_ago = Number(query.hour_ago); //数字以外は NaN になる
    if(Number.isNaN(hour_ago) || hour_ago < 1) {
      res.status(400).json({
        errors: "1以上指定してください",
      });
      return;
    }
  }
  if (query.hour_ago && (query.publishedAfter || query.publishedBefore)) {
    const errormsg = "publishedAfter, publishedBefore指定時にhour_agoは指定できません";
    res.status(400).json({
      errors: errormsg,
    });
    return;
  }
  if (!query.hour_ago && !query.publishedAfter && !query.publishedBefore) {
    const errormsg = "publishedAfter, publishedBefore か hour_ago 指定してください";
    res.status(400).json({
      errors: errormsg,
    });
    return;
  }
  next();
};
