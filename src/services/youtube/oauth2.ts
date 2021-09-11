import fs from "fs";
var readline = require("readline");
var { google } = require("googleapis");
var OAuth2 = google.auth.OAuth2;

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/youtube-nodejs-quickstart.json
const SCOPES = ["https://www.googleapis.com/auth/youtube"];
const TOKEN_PATH = process.env.YOUTUBE_TOKEN_PATH as string;

const clientSecret = process.env.YOUTUBE_CLIENT_SECRET;
const clientId = process.env.YOUTUBE_CLIENT_ID;
const redirectUrl = process.env.YOUTUBE_REDIRECT_URIS;
const oAuth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

export function getToken() {
  try {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
    oAuth2Client.setCredentials(token);
  } catch (error) {
    console.error("getToken error");
    throw "getToken error";
  }
  return oAuth2Client;
}

export function getAuthUrl() {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url: ", authUrl);
  return authUrl;
}

export async function storeNewToken(code: string) {
  const res_token = await oAuth2Client.getToken(code);
  console.log("res_token", res_token);
  fs.writeFile(TOKEN_PATH, JSON.stringify(res_token.tokens), (err) => {
    if (err) throw err;
    console.log("Token stored to " + TOKEN_PATH);
  });
}
