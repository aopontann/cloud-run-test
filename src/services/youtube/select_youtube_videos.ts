import { youtube_v3 } from "googleapis";
import get_vtuber from "../vtuber/get_vtuber";

//getVideoInfoが取得した動画詳細データを使って、動画が歌ってみた系なのか判別する
// all_videoInfo はどのようなデータなのか一番下に記載
export default async function (all_videoInfo: youtube_v3.Schema$Video[]) {
  //  条件にあった全ての動画データを入れる
  // songConfirm 歌ってみた動画確定 // unsongConfirm 不確定
  const return_data: {
    songConfirm: youtube_v3.Schema$Video[];
    unsongConfirm: youtube_v3.Schema$Video[];
  } = {
    songConfirm: [],
    unsongConfirm: [],
  };
  const result_get_vtuber = await get_vtuber();
  const all_channelId = result_get_vtuber.map((vtuber) => vtuber.id);
  const all_name = result_get_vtuber.map((vtuber) => vtuber.name);
  //console.log(all_channelId);

  for (const videoInfo of all_videoInfo) {
    const videotime = videoInfo.contentDetails?.duration || "PT99H99M499S"; // 例 "PT1H33M45S"
    const comptime = "PT9M59S"; // 9分59秒

    if (
      videotime.search(/\d\dM/) === -1 &&
      comptime.length >= videotime.length
    ) {
      // 動画の長さが9分59秒以下の場合
      const checktitle = videoInfo.snippet?.title || "";
      const checkDesc = videoInfo.snippet?.description || "";

      // にじさんじ公式チャンネル、にじさんじ所属ライバーチャンネルからアップロードされた動画か
      if (all_channelId.includes(videoInfo.snippet?.channelId || "error")) {
        if (select_video(checktitle, match_list_ng)) {
          (""); // ngワードを含む動画を除外
        } else if (select_video(checktitle, match_list_ok)) {
          return_data.songConfirm.push(videoInfo);
        } else if (
          select_video(checktitle, match_list_indeterminate) ||
          select_video(checkDesc, match_list_indeterminate)
        ) {
          return_data.unsongConfirm.push(videoInfo);
        }
      }
      // にじさんじ外部チャンネルからアップロードされた動画か(にじさんじとコラボの可能性)
      else {
        if (select_video(checktitle, [...match_list_ng, "切り抜き"])) {
          (""); // ngワードを含む動画を除外
        } else if (
          select_video(checktitle, match_list_ok) &&
          select_video(checktitle, all_name)
        ) {
          return_data.unsongConfirm.push(videoInfo);
        }
      }
    }
  }
  return return_data;
}

function select_video(search: string, all_match_data: string[]) {
  for (const match_data of all_match_data) {
    const reg = new RegExp(match_data);
    if (reg.test(search)) {
      return true;
    }
  }
  return false;
}

const match_list_ng = [
  "まいにち動画",
  "漫画",
  "【アニメ】",
  "マリオカート",
  "Apex",
  "APEX",
  "ARK",
  "Ark",
  "XFD",
  "クロスフェード",
  "メドレー",
  "Reaction",
];
const match_list_ok = [
  "歌ってみた",
  "歌わせていただきました",
  "歌って踊ってみた",
  "cover",
  "Cover",
  "COVER",
  "MV",
  "Music Video",
  "ソング",
  "song",
  "オリジナル曲",
  "オリジナルMV",
  "Official Lyric Video",
];
const match_list_indeterminate = [
  "feat",
  "歌",
  "うた",
  "曲",
  "vocal",
  "Vocal",
  "song",
  "Song",
  "music",
  "Music",
  "唄",
  "ワンコーラス",
  "試聴",
  "short",
  "Short",
];

/* all_videoInfo データ
 [
  {
    kind: 'youtube#video',
    etag: 'MnxfMb6LV5Tnn4akp44EvIVhYDM',
    id: 'oG8xJF6_B8A',
    snippet: {
      publishedAt: '2020-03-01T09:38:57Z',
      channelId: 'UCuep1JCrMvSxOGgGhBfJuYw',
      title: '【Minecraft】一ヵ月が経ちました【フレン・Ｅ・ルスタリオ/にじさんじ】',
      description: '配信タグ：#ルスタリオンエア\n' +
        '\n' +
        'さむねあとでかえる！ごめん！！\n' +
        '\n' +
        'きかくにむけてれんしゅう！\n' +
        'いっかげつたったしこれからのこととかいろんなはなししよ\n' +
        '\n' +
        '\n' +
        '\n' +
        'にじさんじ所属新人バーチャルライバーの\n' +
        'フレン・E・ルスタリオです\n' +
        '\n' +
        '応援してね\n' +
        '\n' +
        'チャンネル登録、高評価、通知設定よかったらよろしく！\n' +
        '\n' +
        'ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー\n' +
        '\n' +
        '◆ Twitter\n' +
        'https://twitter.com/furen_2434\n' +
        '◆チャンネル登録\n' +
        'https://www.youtube.com/channel/UCuep...\n' +
        '\n' +
        '◆生放送関連のツイート #ルスタリオンエア\n' +
        '◆ファントーク #フレン親衛隊\n' +
        '◆ファンアート #フレン見て\n' +
        '\n' +
        '\n' +
        '【にじさんじ関連】\n' +
        '\n' +
        '◆ 公式HP\n' +
        'https://nijisanji.ichikara.co.jp/\n' +
        '\n' +
        '◆ 公式Twitter\n' +
        'https://twitter.com/Nijisanji_app\n' +
        '\n' +
        '◆ Booth公式Twitter\n' +
        'https://twitter.com/booth_pm\n' +
        '\n' +
        '◆ 公式オンラインショップ\n' +
        'https://nijisanji.booth.pm/\n' +
        '\n' +
        '◆ お問い合わせやプレゼントはこちら\n' +
        'https://nijisanji.ichikara.co.jp/cont...\n' +
        '\n' +
        'ファンレター・プレゼントは、下記住所宛てにお送り下さい。\n' +
        '\n' +
        '〒175-0082\n' +
        '東京都板橋区高島平6-2-1\n' +
        'ネットデポ新高島平内\n' +
        'いちから株式会社 フレン・E・ルスタリオ宛\n' +
        '\n' +
        'ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー',
      thumbnails: [Object],
      channelTitle: 'フレン・E・ルスタリオ',
      categoryId: '20',
      liveBroadcastContent: 'none',
      localized: [Object]
    },
    contentDetails: {
      duration: 'PT59M55S',
      dimension: '2d',
      definition: 'hd',
      caption: 'false',
      licensedContent: true,
      contentRating: {},
      projection: 'rectangular'
    },
    statistics: {
      viewCount: '34750',
      likeCount: '1353',
      dislikeCount: '3',
      favoriteCount: '0',
      commentCount: '39'
    },
    liveStreamingDetails: {
      actualStartTime: '2020-03-01T08:31:28Z',
      actualEndTime: '2020-03-01T09:31:03Z',
      scheduledStartTime: '2020-03-01T08:30:00Z'
    }
  },
  ...
*/
