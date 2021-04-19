// fetchをnode.jsで使う
const fetch = require("node-fetch");
// 環境変数を使う
require("dotenv").config();

//指定した期間と指定したチャンネルの全ての動画URLを取得する
module.exports = async function (all_channelId, datetimeAfter, datetimeBefore) {
  //引数datetime は "1970-01-01T00:00:00Z" のようなデータを使用する
  //Youtube Data API を叩くためのプロパティ
  const YoutubeApiSearch = "https://www.googleapis.com/youtube/v3/search";
  const Key = process.env.YOUTUBE_DATA_API_KEY;
  const part = "id";

  //  期間分全ての動画情報を入れる
  let jsondata = [];
  let return_data = [];

  for await (const channelId of all_channelId) {
    console.log("channelId", channelId);
    let cnt = 0;
    const cntMax = 20;
    let pageToken = "";
    // なんかのバグで無限ループになったら怖いから回数制限する
    // 長期間の探索はやめた方がいいかも
    while (cnt++ < cntMax) {
      const res = await fetch(`${YoutubeApiSearch}?part=${part}&pageToken=${pageToken}&maxResults=50&channelId=${channelId}&publishedAfter=${datetimeAfter}&publishedBefore=${datetimeBefore}&type=video&key=${Key}`);
      const data = await res.json();

      // 取得失敗した場合
      if (data.error) {
        console.log("search error!");
        return return_data;
      }

      const result_videoId = data.items.map((item) => item.id.videoId); // [OLWqLMbq5QY, ...]
      return_data.push(...result_videoId);

      if (!data.nextPageToken) {
        console.log("search ok!");
        break;
      }

      pageToken = data.nextPageToken;
    }
  }
  
  console.log("return_data", return_data);
  return return_data.join(","); // videoId,videoId,...
};

/* youtube から返ってくるデータ
{
  "kind": "youtube#searchListResponse",
  "etag": "3pY_ZmTvtW_LbIG1KhPM7QcpPEo",
  "nextPageToken": "CDIQAA",
  "regionCode": "JP",
  "pageInfo": { "totalResults": 137, "resultsPerPage": 50 },
  "items": [
    {
      "kind": "youtube#searchResult",
      "etag": "3erH29whWEWGcunZKMSo3sPc5L8",
      "id": { "kind": "youtube#video", "videoId": "OLWqLMbq5QY" }
    },
    ...
*/

/* エラーの時
{
  "error": {
    "code": 403,
    "message": "The request cannot be completed because you have exceeded your \u003ca href=\"/youtube/v3/getting-started#quota\"\u003equota\u003c/a\u003e.",
    "errors": [
      {
        "message": "The request cannot be completed because you have exceeded your \u003ca href=\"/youtube/v3/getting-started#quota\"\u003equota\u003c/a\u003e.",
        "domain": "youtube.quota",
        "reason": "quotaExceeded"
      }
    ]
  }
}

*/
