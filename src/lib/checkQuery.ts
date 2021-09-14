import express from "express";

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
