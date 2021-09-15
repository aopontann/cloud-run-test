import express from "express";

const toString = Object.prototype.toString;

export const checkQuery =
  (params: string[]) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    for (const key of Object.keys(req.query)) {
      if (!params.includes(key)) {
        res.status(400).json({ errors: key });
        return;
      }
    }
    next();
  };

  export const checkJSONBody =
  (params: string[]) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const typeOf = toString.call(req.body).slice(8, -1).toLowerCase();
    if (typeOf !== "object") {
      res.status(400).json({ errors: "bad body" });
      return;
    }
    for (const key of Object.keys(req.body)) {
      if (!params.includes(key)) {
        res.status(400).json({ errors: key });
        return;
      }
    }
    next();
  };
