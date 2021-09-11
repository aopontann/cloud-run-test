import express from "express"

export const authCheck = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const apiKey = req.query.key || "";
  if (apiKey != process.env.YOUTUBE_DATA_API_KEY) {
    res.status(401).json({ error: "auth error"});
  }
  next();
}