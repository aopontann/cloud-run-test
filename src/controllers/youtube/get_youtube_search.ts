import { google, youtube_v3 } from "googleapis";
import { get_time2 } from "../get_times";

//指定した期間と指定したチャンネルの全ての動画URLを取得する
export default async function (q: {
  publishedAfter?: string;
  publishedBefore?: string;
  hour_ago?: number;
}): Promise<string[]> {
  const publishedAfter: string =
    q.publishedAfter ||
    get_time2({
      format: "YYYY-MM-DDTHH:00:00",
      hour_ago: q.hour_ago,
    });
  const publishedBefore: string =
    q.publishedBefore ||
    get_time2();
  console.log(`探索期間 ${publishedAfter} >--< ${publishedBefore}`);

  const service = google.youtube("v3");

  const all_items: youtube_v3.Schema$SearchResult[] = [];
  // 関連性の高いデータだけ取得するため、1ページのみのデータを取得
  const res = await service.search.list({
    part: ["id"],
    maxResults: 50,
    publishedAfter,
    publishedBefore,
    q: "にじさんじ|vtuber + 歌って|cover|歌",
    key: process.env.YOUTUBE_DATA_API_KEY,
  }).catch(e => {
    console.error("youtube search error!");
    throw e;
  });
  /*
  for await (const duration of ["short", "medium"]) {
    const res = await service.search.list({
      part: ["id"],
      maxResults: 50,
      publishedAfter,
      publishedBefore,
      q: "にじさんじ + 歌って|cover",
      type: ["video"],
      videoDuration: duration,
      key: process.env.YOUTUBE_DATA_API_KEY,
    });
    const items = res?.data?.items || [];
    all_items.push(...items);
  }
  
  const all_videoId = all_items.map(item => item.id?.videoId);
  // videoIdの重複を除外
  const result = all_videoId.filter(videoId => typeof videoId == "string") as string[];
  return Array.from(new Set(result));
  */
 if (res.data.items) {
   const all_videoId = res.data.items.map(item => item.id?.videoId);
   // null undefined を除外
   const result = all_videoId.filter(videoId => typeof videoId == "string") as string[];
   return result;
 } else {
   throw "not found res.data.items";
 }
}

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
