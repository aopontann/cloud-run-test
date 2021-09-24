import express from "express";
import Ajv from "ajv";
import addFormats from "ajv-formats";

interface VideoData {
  id?: string;
  songConfirm?: string;
  startTimeAtAfter?: string;
  startTimeAtBefore?: string;
  maxResults?: string;
  page?: string;
  order?: string;
  tags?: string;
}

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
    songConfirm: {
      type: "string",
    },
    startTimeAtAfter: {
      type: "string",
    },
    startTimeAtBefore: {
      type: "string",
    },
    maxResults: {
      type: "string",
    },
    page: {
      type: "string",
    },
    order: {
      type: "string",
    },
    tags: {
      type: "string",
    },
  },
  additionalProperties: false,
};

// バリデーション関数を作成
const validate = ajv.compile(schema);

export const validateQuery_GET_videos = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const query: VideoData = req.query || {};

  // バリデーションを実行
  const valid = validate(query);
  if (!valid) {
    // バリデーションエラー
    res.status(400).json({ errors: validate.errors });
    return;
  }

  if (query.songConfirm) {
    if (query.songConfirm !== "true" && query.songConfirm !== "false") {
      res.status(400).json({ errors: "NG songConfirm" });
      return;
    }
  }

  if (query.maxResults) {
    const maxResults = Number(query.maxResults); //数字以外は NaN になる
    if (Number.isNaN(maxResults) || maxResults < 1) {
      res.status(400).json({
        errors: "1以上指定してください",
      });
      return;
    }
  }

  if (query.page) {
    const page = Number(query.page); //数字以外は NaN になる
    if (Number.isNaN(page) || page < 1) {
      res.status(400).json({
        errors: "1以上指定してください",
      });
      return;
    }
  }

  if (query.order) {
    for (const order of query.order.split(",")) {
      if (!["viewCount", "startTime", "random"].includes(order)) {
        res.status(400).json({ errors: "NG order" });
        return;
      }
    }
  }

  if (query.tags) {
    // 空文字列を排除 "aaa,,bbb" などの場合
    for (const tag of query.tags.split(",")) {
      if (tag === "") {
        res.status(400).json({ errors: "NG tags" });
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
