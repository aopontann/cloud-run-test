// fetchをnode.jsで使う
const fetch = require("node-fetch");
const { get_time } = require("../get_times");
//Youtube Data API を叩くためのプロパティ
const YoutubeApiSearch = "https://www.googleapis.com/youtube/v3/activities";
const Key = process.env.YOUTUBE_DATA_API_KEY;
const part = "contentDetails";

//指定した期間と指定したチャンネルの全ての動画URLを取得する
module.exports = async function (query) {
  //引数datetime は ISO 8601（YYYY-MM-DDThh:mm:ss.sZ）形式データを使用する(UTC)
  const datetimeAfter = query.datetimeAfter || get_time("UTC", -7);
  const datetimeBefore = query.datetimeBefore || get_time("UTC", 0);

  let all_channelId;
  if (query.all_channelId[0] == "all") {
    const result_DB_get_vtuber = await DB_get_vtuber();
    all_channelId = result_DB_get_vtuber.map((vtuber) => vtuber.id);
  } else {
    all_channelId = query.all_channelId || [];
  }
  console.log(`探索期間(UTC) ${datetimeAfter} <--> ${datetimeBefore}`);

  //  期間分全ての動画情報を入れる
  let return_data = [];

  for await (const channelId of all_channelId) {
    let cnt = 0;
    const cntMax = 50;
    let pageToken = "";
    // なんかのバグで無限ループになったら怖いから回数制限する
    // 長期間の探索はやめた方がいいかも
    while (cnt++ < cntMax) {
      const res = await fetch(
        `${YoutubeApiSearch}?part=${part}&pageToken=${pageToken}&maxResults=50&channelId=${channelId}&publishedAfter=${datetimeAfter}&publishedBefore=${datetimeBefore}&key=${Key}`
      );
      const data = await res.json();

      // 取得失敗した場合
      if (data.error) {
        console.log("search error!");
        return return_data.join(",");
      }

      data.items.forEach((item) => {
        const content = item.contentDetails.upload || null;
        if (content && content.videoId) {
          return_data.push(content.videoId);
        }
      });
      // [OLWqLMbq5QY, ...]

      if (!data.nextPageToken) {
        console.log("get activity ok!");
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
