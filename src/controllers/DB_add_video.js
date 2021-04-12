const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// トランザクション処理を追加する
module.exports = async function (body, songBool) {
  for await (const videoInfo of body) {
    try {
      await prisma.videos.create({
        data: {
          id: videoInfo.id,
          title: videoInfo.snippet.title,
          songConfirm: songBool,
          thumbnail: {
            create: {
              defaultUrl: videoInfo.snippet.thumbnails.default.url,
              medium: videoInfo.snippet.thumbnails.medium.url,
              high: videoInfo.snippet.thumbnails.high.url,
              standard: videoInfo.snippet.thumbnails.standard.url,
              maxres: videoInfo.snippet.thumbnails.maxres.url,
            },
          },
          statistic: {
            create: {
              viewCount: Number(videoInfo.statistics.viewCount),
              likeCount: Number(videoInfo.statistics.likeCount),
              dislikeCount: Number(videoInfo.statistics.dislikeCount),
              commentCount: Number(videoInfo.statistics.commentCount),
            },
          },
          time: {
            create: {
              videoLength: videoInfo.contentDetails.duration,
              scheduledStartTime:
                videoInfo.liveStreamingDetails != "none"
                  ? videoInfo.liveStreamingDetails.scheduledStartTime
                  : null,
            },
          },
        },
      });
      await prisma.$disconnect();
    } catch (e) {
      console.log("DB_add_video error!");
      throw e;
    }
  }
};

/* get_youtube_videos の取得データ 例
{
    "confirm": [
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
            }
        },
        {
            "kind": "youtube#video",
            "etag": "JsOMsvZ4WOZxnQBVJfRulL1x0-A",
            "id": "S2BVyuRrIRw",
            "snippet": {
                "publishedAt": "2020-03-04T13:45:59Z",
                "channelId": "UCuep1JCrMvSxOGgGhBfJuYw",
                "title": "スマブラのＤＬ終わるまで(おそらくアーカイブは残らない)(ごめんね)",
                "description": "配信タグ：#ルスタリオンエア\n\nもうしわけ・・・・・・・・・・・\n\n\nにじさんじ所属新人バーチャルライバーの\nフレン・E・ルスタリオです\n\n応援してね\n\nチャンネル登録、高評価、通知設定よかったらよろしく！\n\nーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー\n\n◆ Twitter\nhttps://twitter.com/furen_2434\n◆チャンネル登録\nhttps://www.youtube.com/channel/UCuep...\n\n◆生放送関連のツイート #ルスタリオンエア\n◆ファントーク #フレン親衛隊\n◆ファンアート #フレン見て\n\n\n【にじさんじ関連】\n\n◆ 公式HP\nhttps://nijisanji.ichikara.co.jp/\n\n◆ 公式Twitter\nhttps://twitter.com/Nijisanji_app\n\n◆ Booth公式Twitter\nhttps://twitter.com/booth_pm\n\n◆ 公式オンラインショップ\nhttps://nijisanji.booth.pm/\n\n◆ お問い合わせやプレゼントはこちら\nhttps://nijisanji.ichikara.co.jp/cont...\n\nファンレター・プレゼントは、下記住所宛てにお送り下さい。\n\n〒175-0082\n東京都板橋区高島平6-2-1\nネットデポ新高島平内\nいちから株式会社 フレン・E・ルスタリオ宛\n\nーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/S2BVyuRrIRw/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/S2BVyuRrIRw/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/S2BVyuRrIRw/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    },
                    "standard": {
                        "url": "https://i.ytimg.com/vi/S2BVyuRrIRw/sddefault.jpg",
                        "width": 640,
                        "height": 480
                    },
                    "maxres": {
                        "url": "https://i.ytimg.com/vi/S2BVyuRrIRw/maxresdefault.jpg",
                        "width": 1280,
                        "height": 720
                    }
                },
                "channelTitle": "フレン・E・ルスタリオ",
                "categoryId": "24",
                "liveBroadcastContent": "none",
                "localized": {
                    "title": "スマブラのＤＬ終わるまで(おそらくアーカイブは残らない)(ごめんね)",
                    "description": "配信タグ：#ルスタリオンエア\n\nもうしわけ・・・・・・・・・・・\n\n\nにじさんじ所属新人バーチャルライバーの\nフレン・E・ルスタリオです\n\n応援してね\n\nチャンネル登録、高評価、通知設定よかったらよろしく！\n\nーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー\n\n◆ Twitter\nhttps://twitter.com/furen_2434\n◆チャンネル登録\nhttps://www.youtube.com/channel/UCuep...\n\n◆生放送関連のツイート #ルスタリオンエア\n◆ファントーク #フレン親衛隊\n◆ファンアート #フレン見て\n\n\n【にじさんじ関連】\n\n◆ 公式HP\nhttps://nijisanji.ichikara.co.jp/\n\n◆ 公式Twitter\nhttps://twitter.com/Nijisanji_app\n\n◆ Booth公式Twitter\nhttps://twitter.com/booth_pm\n\n◆ 公式オンラインショップ\nhttps://nijisanji.booth.pm/\n\n◆ お問い合わせやプレゼントはこちら\nhttps://nijisanji.ichikara.co.jp/cont...\n\nファンレター・プレゼントは、下記住所宛てにお送り下さい。\n\n〒175-0082\n東京都板橋区高島平6-2-1\nネットデポ新高島平内\nいちから株式会社 フレン・E・ルスタリオ宛\n\nーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー"
                }
            },
            "contentDetails": {
                "duration": "PT36M53S",
                "dimension": "2d",
                "definition": "hd",
                "caption": "false",
                "licensedContent": true,
                "contentRating": {},
                "projection": "rectangular"
            },
            "statistics": {
                "viewCount": "25785",
                "likeCount": "1082",
                "dislikeCount": "6",
                "favoriteCount": "0",
                "commentCount": "38"
            },
            "liveStreamingDetails": {
                "actualStartTime": "2020-03-04T12:59:53Z",
                "actualEndTime": "2020-03-04T13:36:43Z",
                "scheduledStartTime": "2020-03-04T13:00:00Z"
            }
        }
    ],
    "unconfirm": []
}
*/
