// fetchをnode.jsで使う
const { google } = require("googleapis");
const { get_time2 } = require("../get_times");
const Key = process.env.YOUTUBE_DATA_API_KEY;

//指定した期間と指定したチャンネルの全ての動画URLを取得する
module.exports = async function (q) {
  const query = q || {};

  const publishedAfter =
    query.publishedAfter ||
    get_time2({
      format: "YYYY-MM-DDT00:00:00",
      timezone: "Asia/Tokyo",
    });
  const publishedBefore =
    query.publishedBefore ||
    get_time2({
      format: "YYYY-MM-DDT23:59:59",
      timezone: "Asia/Tokyo",
    });
  console.log(`探索期間 ${publishedAfter} >--< ${publishedBefore}`);

  let errorFlag = false;
  const service = google.youtube("v3");

  // 関連性の高いデータから取得するため、1ページのみのデータを取得
  const res = await service.search
    .list({
      part: "snippet",
      maxResults: 50,
      publishedAfter,
      publishedBefore,
      q: "にじさんじcover",
      type: "video",
      key: Key,
    })
    .catch((e) => {
      console.log("youtube_search_error", e);
      errorFlag = true;
    });
  
  return errorFlag ? [] : res.data.items.map((items) => items.id.videoId);
};

/* youtube から返ってくるデータ
{
    "kind": "youtube#searchListResponse",
    "etag": "lq413lnnbfUXkPMVmDhjgjRiPJA",
    "nextPageToken": "CAIQAA"
    "regionCode": "JP",
    "pageInfo": {
        "totalResults": 60,
        "resultsPerPage": 49
    },
    "items": [
        {
            "kind": "youtube#searchResult",
            "etag": "ZKBkmnO37EJAu229otmtoyokKzA",
            "id": {
                "kind": "youtube#video",
                "videoId": "w2xcjGwlLyU"
            },
            "snippet": {
                "publishedAt": "2021-06-09T16:07:43Z",
                "channelId": "UC94gXookC9nPYFLDEGkJuig",
                "title": "にじPEXカスタムでとんでもない作戦を実行した結果、試合からBANされるグウェル・オス・ガール【グウェル・オス・ガール/歌衣メイカ/Mukai/にじさんじ切り抜き】",
                "description": "#銅像#即バレ#バグ#BAN#APEX#にじさんじ#にじさんじ切り抜き.",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/w2xcjGwlLyU/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/w2xcjGwlLyU/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/w2xcjGwlLyU/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "にじさんじ切り抜きTV",
                "liveBroadcastContent": "none",
                "publishTime": "2021-06-09T16:07:43Z"
            }
        },
*/
