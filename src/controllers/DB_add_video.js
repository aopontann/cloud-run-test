const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const get_search_songVtuber = require('./get_search_songVtuber');

module.exports = async function (body) {
  const result_search = await get_search_songVtuber(body);
  /* result_search
  [{
    videoId: videoInfo.id,
    channelId: vtuber.id,
    role: "歌"
  }]
  */
  const songVtuber = prisma.songVtuber.createMany({
    data: result_search
  });
  const videos = prisma.videos.createMany({
    data: body.map((videoInfo) => {
      return {
        id: videoInfo.id,
        title: videoInfo.snippet.title,
        songConfirm: videoInfo.songConfirm,
      };
    }),
  });
  const thumbnails = prisma.thumbnails.createMany({
    data: body.map((videoInfo) => {
      return {
        id: videoInfo.id,
        defaultUrl: videoInfo.snippet.thumbnails.default.url,
        medium: videoInfo.snippet.thumbnails.medium.url,
        high: videoInfo.snippet.thumbnails.high.url,
        standard: videoInfo.snippet.thumbnails.standard.url,
        maxres: videoInfo.snippet.thumbnails.maxres.url,
      };
    })
  });
  const statistics = prisma.statistics.createMany({
    data: body.map((videoInfo) => {
      return {
        id: videoInfo.id,
        viewCount: Number(videoInfo.statistics.viewCount),
        likeCount: Number(videoInfo.statistics.likeCount),
        dislikeCount: Number(videoInfo.statistics.dislikeCount),
        commentCount: Number(videoInfo.statistics.commentCount),
      };
    }),
  });
  const times = prisma.times.createMany({
    data: body.map((videoInfo) => {
      return {
        id: videoInfo.id,
        videoLength: videoInfo.contentDetails.duration,
        startTime:
          videoInfo.liveStreamingDetails
            ? videoInfo.liveStreamingDetails.scheduledStartTime
            : videoInfo.snippet.publishedAt,
      };
    }),
  });
  await prisma.$transaction([videos, thumbnails, statistics, times, songVtuber]);
  
  await prisma.$disconnect();
};

/* body = get_youtube_videos の取得データ 例
[
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
        "songConfirm": true
    },
    {
        "kind": "youtube#video",
        "etag": "f3ArOD8W_D6ChdqDWAWvZhBCDZM",
        "id": "pQxDWYMqjRU",
        "snippet": {
            "publishedAt": "2020-03-04T14:52:38Z",
            "channelId": "UCuep1JCrMvSxOGgGhBfJuYw",
            "title": "【スマブラSP】おれはつよい・・・おれはつよい・・【フレン・Ｅ・ルスタリオ/にじさんじ】",
            "description": "配信タグ：#ルスタリオンエア\n\nみ～～んなまとめてたおしたるかんな＾＾\n\n\nにじさんじ所属新人バーチャルライバーの\nフレン・E・ルスタリオです\n\n応援してね\n\nチャンネル登録、高評価、通知設定よかったらよろしく！\n\nーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー\n\n◆ Twitter\nhttps://twitter.com/furen_2434\n◆チャンネル登録\nhttps://www.youtube.com/channel/UCuep...\n\n◆生放送関連のツイート #ルスタリオンエア\n◆ファントーク #フレン親衛隊\n◆ファンアート #フレン見て\n\n\n【にじさんじ関連】\n\n◆ 公式HP\nhttps://nijisanji.ichikara.co.jp/\n\n◆ 公式Twitter\nhttps://twitter.com/Nijisanji_app\n\n◆ Booth公式Twitter\nhttps://twitter.com/booth_pm\n\n◆ 公式オンラインショップ\nhttps://nijisanji.booth.pm/\n\n◆ お問い合わせやプレゼントはこちら\nhttps://nijisanji.ichikara.co.jp/cont...\n\nファンレター・プレゼントは、下記住所宛てにお送り下さい。\n\n〒175-0082\n東京都板橋区高島平6-2-1\nネットデポ新高島平内\nいちから株式会社 フレン・E・ルスタリオ宛\n\nーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/pQxDWYMqjRU/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/pQxDWYMqjRU/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/pQxDWYMqjRU/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                },
                "standard": {
                    "url": "https://i.ytimg.com/vi/pQxDWYMqjRU/sddefault.jpg",
                    "width": 640,
                    "height": 480
                },
                "maxres": {
                    "url": "https://i.ytimg.com/vi/pQxDWYMqjRU/maxresdefault.jpg",
                    "width": 1280,
                    "height": 720
                }
            },
            "channelTitle": "フレン・E・ルスタリオ",
            "categoryId": "20",
            "liveBroadcastContent": "none",
            "localized": {
                "title": "【スマブラSP】おれはつよい・・・おれはつよい・・【フレン・Ｅ・ルスタリオ/にじさんじ】",
                "description": "配信タグ：#ルスタリオンエア\n\nみ～～んなまとめてたおしたるかんな＾＾\n\n\nにじさんじ所属新人バーチャルライバーの\nフレン・E・ルスタリオです\n\n応援してね\n\nチャンネル登録、高評価、通知設定よかったらよろしく！\n\nーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー\n\n◆ Twitter\nhttps://twitter.com/furen_2434\n◆チャンネル登録\nhttps://www.youtube.com/channel/UCuep...\n\n◆生放送関連のツイート #ルスタリオンエア\n◆ファントーク #フレン親衛隊\n◆ファンアート #フレン見て\n\n\n【にじさんじ関連】\n\n◆ 公式HP\nhttps://nijisanji.ichikara.co.jp/\n\n◆ 公式Twitter\nhttps://twitter.com/Nijisanji_app\n\n◆ Booth公式Twitter\nhttps://twitter.com/booth_pm\n\n◆ 公式オンラインショップ\nhttps://nijisanji.booth.pm/\n\n◆ お問い合わせやプレゼントはこちら\nhttps://nijisanji.ichikara.co.jp/cont...\n\nファンレター・プレゼントは、下記住所宛てにお送り下さい。\n\n〒175-0082\n東京都板橋区高島平6-2-1\nネットデポ新高島平内\nいちから株式会社 フレン・E・ルスタリオ宛\n\nーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー"
            }
        },
        "contentDetails": {
            "duration": "PT1H2M6S",
            "dimension": "2d",
            "definition": "hd",
            "caption": "false",
            "licensedContent": true,
            "contentRating": {},
            "projection": "rectangular"
        },
        "statistics": {
            "viewCount": "35410",
            "likeCount": "1388",
            "dislikeCount": "46",
            "favoriteCount": "0",
            "commentCount": "37"
        },
        "liveStreamingDetails": {
            "actualStartTime": "2020-03-04T13:41:10Z",
            "actualEndTime": "2020-03-04T14:43:10Z",
            "scheduledStartTime": "2020-03-04T13:45:00Z"
        },
        "songConfirm": true
    }
]
*/
