import { get_time } from "../get_times";
import { google } from "googleapis";
import get_vtuber from "../vtuber/get_vtuber";

const part = ["contentDetails"];

//指定した期間と指定したチャンネルの全ての動画URLを取得する
export default async function (query: {
  all_channelId?: string[];
  publishedAfter?: string;
  publishedBefore?: string;
}): Promise<string[]> {
  //引数datetime は ISO 8601（YYYY-MM-DDThh:mm:ss.sZ）形式データを使用する(UTC)
  const publishedAfter: string = query.publishedAfter || get_time("UTC", -7);
  const publishedBefore: string = query.publishedBefore || get_time("UTC", 0);

  // all_channelIdが指定されなかった場合、全てのにじさんじライバーのidを取得
  const all_channelId = query.all_channelId || (await get_vtuber()).map(vtuber => vtuber.id);

  console.log(`探索期間(UTC) ${publishedAfter} <--> ${publishedBefore}`);

  //  期間分全ての動画情報を入れる
  const result_videoId: string[] = [];

  const service = google.youtube("v3");

  for await (const channelId of all_channelId) {
    let cnt = 0;
    const cntMax = 50;
    let pageToken = "";
    console.log("channelId=", channelId);

    while (cnt++ < cntMax) {
      const res = await service.activities
        .list({
          part,
          pageToken,
          maxResults: 50,
          channelId,
          publishedAfter,
          publishedBefore,
          key: process.env.YOUTUBE_DATA_API_KEY,
        })
        .catch((e) => {
          console.error("youtube_activities error!");
          throw e;
        });
      res.data.items?.forEach((item) => {
        const content = item.contentDetails?.upload?.videoId || null;
        content ? result_videoId.push(content) : "";
      });

      if (!res.data.nextPageToken) {
        break;
      }

      pageToken = res.data.nextPageToken;
    }
  }
  return result_videoId; // videoId,videoId,...
}

/* youtube から返ってくるデータ
{
  "kind": "youtube#activityListResponse",
  "etag": "PV-iGqlS8YztArZHdg-vm7JBMjk",
  "items": [
    {
      "kind": "youtube#activity",
      "etag": "GvyaP7goSPp3pLmolWf9LOCvO5I",
      "id": "MTUxNjE3MTkyNDY4MTYxNzE5MjQ2ODAwMDcxNg",
      "contentDetails": {
        "upload": {
          "videoId": "KsnoVFJdbVc"
        }
      }
    },
    {
      "kind": "youtube#activity",
      "etag": "f4tpYnA3HZxo5DF1n48YLtGJa78",
      "id": "MTA4MTYxNzE4NDgxNDE2MTcxODQ4MTQwMDA4ODY",
      "contentDetails": {}
    },
    {
      "kind": "youtube#activity",
      "etag": "Qz8b7goNjzb0yzByHgYADGMZBeg",
      "id": "MTUxNjE2MTcyNzAzMTYxNjE3MjcwMzAwMDEyOQ",
      "contentDetails": {
        "upload": {
          "videoId": "Rvk5G9ASErI"
        }
      }
    },
    {
      "kind": "youtube#activity",
      "etag": "mXC-MldS4CjADY0onASo2Tka9c4",
      "id": "MTA4MTYxNjE2ODE4NTE2MTYxNjgxODUwMDA1NzA",
      "contentDetails": {}
    },
    {
      "kind": "youtube#activity",
      "etag": "x4JLloRlE_0Zm6G4Phza_8O6oF4",
      "id": "MTUxNjE1NTYzMDA5MTYxNTU2MzAwOTAwMDAzOA",
      "contentDetails": {
        "upload": {
          "videoId": "K5_UsaW90dc"
        }
      }
    }
  ],
  "nextPageToken": "CAUQAA",
  "pageInfo": {
    "totalResults": 20,
    "resultsPerPage": 5
  }
}


*/
