import { youtube_v3 } from "googleapis";
import prisma from "../../client";

interface ReturnType {
  videoId: string;
  tags: Tags[];
}

interface Tags {
  name: string;
  type: string | null;
}

export default async function (
  query: youtube_v3.Schema$Video[]
): Promise<
  { videoId: string;
    tags: {
      name: string; 
      type: string | null
    }[]
  }[]
> {
  //const all_videoInfo = query.all_videoInfo;
  const all_vtuberInfo = await prisma.vtuber.findMany({
    where: {
      NOT: {
        name: "にじさんじ",
      },
    },
    select: {
      id: true,
      name: true,
    },
  });
  const search_vtuberName: string[] = all_vtuberInfo.map(
    (vtuber) => vtuber.name
  );
  // console.log("search_vtuberName", search_vtuberName);
  //const all_search_vtuber = result_findMany.map(vtuber => vtuber.name);
  //let result_search_vtuber = [];

  const return_data: ReturnType[] = [];
  query.forEach((videoInfo: youtube_v3.Schema$Video) => {
    if (videoInfo.id) {
      const tags: Tags[] = [];
      search_vtuberName.forEach((vtuberName: string) => {
        const reg = new RegExp(vtuberName);
        const snippet = videoInfo.snippet;
        if (snippet?.title?.match(reg)) {
          tags.push({
            name: vtuberName,
            type: null,
          });
        }
      });
      return_data.push({
        videoId: videoInfo.id,
        tags,
      });
    }
  });
  //await prisma.$disconnect();
  //console.log("search_vtuberName", return_data);
  return return_data;
}

/* videoInfo (sample)
    {
        "kind": "youtube#video",
        "etag": "MnxfMb6LV5Tnn4akp44EvIVhYDM",
        "id": "oG8xJF6_B8A",
        "snippet": {
            "publishedAt": "2020-03-01T09:38:57Z",
            "channelId": "UCuep1JCrMvSxOGgGhBfJuYw",
            "title": "【Minecraft】一ヵ月が経ちました【フレン・Ｅ・ルスタリオ/にじさんじ】",
            "description": "配信タグ：#ルスタリオンエア\n\nさむねあとでかえる！ごめん！！\n\nきかくにむけてれんしゅう！\nいっかげつたったしこれからのこととかいろんなはなししよ\n\n\n\nにじさんじ所属新人バーチャルライバーの\nフレン・E・ルスタリオです\n\n応援してね\n\nチャンネル登録、高評価、通知設定よかったらよろしく！\n\nーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー\n\n◆ Twitter\nhttps://twitter.com/furen_2434\n◆チャンネル登録\nhttps://www.youtube.com/channel/UCuep...\n\n◆生放送関連のツイート #ルスタリオンエア\n◆ファントーク #フレン親衛隊\n◆ファンアート #フレン見て\n\n\n【にじさんじ関連】\n\n◆ 公式HP\nhttps://nijisanji.ichikara.co.jp/\n\n◆ 公式Twitter\nhttps://twitter.com/Nijisanji_app\n\n◆ Booth公式Twitter\nhttps://twitter.com/booth_pm\n\n◆ 公式オンラインショップ\nhttps://nijisanji.booth.pm/\n\n◆ お問い合わせやプレゼントはこちら\nhttps://nijisanji.ichikara.co.jp/cont...\n\nファンレター・プレゼントは、下記住所宛てにお送り下さい。\n\n〒175-0082\n東京都板橋区高島平6-2-1\nネットデポ新高島平内\nいちから株式会社 フレン・E・ルスタリオ宛\n\nーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/oG8xJF6_B8A/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/oG8xJF6_B8A/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/oG8xJF6_B8A/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                },
                "standard": {
                    "url": "https://i.ytimg.com/vi/oG8xJF6_B8A/sddefault.jpg",
                    "width": 640,
                    "height": 480
                },
                "maxres": {
                    "url": "https://i.ytimg.com/vi/oG8xJF6_B8A/maxresdefault.jpg",
                    "width": 1280,
                    "height": 720
                }
            },
            "channelTitle": "フレン・E・ルスタリオ",
            "categoryId": "20",
            "liveBroadcastContent": "none",
            "localized": {
                "title": "【Minecraft】一ヵ月が経ちました【フレン・Ｅ・ルスタリオ/にじさんじ】",
                "description": "配信タグ：#ルスタリオンエア\n\nさむねあとでかえる！ごめん！！\n\nきかくにむけてれんしゅう！\nいっかげつたったしこれからのこととかいろんなはなししよ\n\n\n\nにじさんじ所属新人バーチャルライバーの\nフレン・E・ルスタリオです\n\n応援してね\n\nチャンネル登録、高評価、通知設定よかったらよろしく！\n\nーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー\n\n◆ Twitter\nhttps://twitter.com/furen_2434\n◆チャンネル登録\nhttps://www.youtube.com/channel/UCuep...\n\n◆生放送関連のツイート #ルスタリオンエア\n◆ファントーク #フレン親衛隊\n◆ファンアート #フレン見て\n\n\n【にじさんじ関連】\n\n◆ 公式HP\nhttps://nijisanji.ichikara.co.jp/\n\n◆ 公式Twitter\nhttps://twitter.com/Nijisanji_app\n\n◆ Booth公式Twitter\nhttps://twitter.com/booth_pm\n\n◆ 公式オンラインショップ\nhttps://nijisanji.booth.pm/\n\n◆ お問い合わせやプレゼントはこちら\nhttps://nijisanji.ichikara.co.jp/cont...\n\nファンレター・プレゼントは、下記住所宛てにお送り下さい。\n\n〒175-0082\n東京都板橋区高島平6-2-1\nネットデポ新高島平内\nいちから株式会社 フレン・E・ルスタリオ宛\n\nーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー"
            }
        },
        "contentDetails": {
            "duration": "PT59M55S",
            "dimension": "2d",
            "definition": "hd",
            "caption": "false",
            "licensedContent": true,
            "contentRating": {},
            "projection": "rectangular"
        },
        "statistics": {
            "viewCount": "34750",
            "likeCount": "1353",
            "dislikeCount": "3",
            "favoriteCount": "0",
            "commentCount": "39"
        },
        "liveStreamingDetails": {
            "actualStartTime": "2020-03-01T08:31:28Z",
            "actualEndTime": "2020-03-01T09:31:03Z",
            "scheduledStartTime": "2020-03-01T08:30:00Z"
        },
    }
*/
