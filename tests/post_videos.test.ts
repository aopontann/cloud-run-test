import request from "supertest";
import app from "../src/app";

/* for of でテストしてもいいかも
const testCheck = [
  {
    name: "get video all",
    query: {},
    status: 200,
  },
];
*/

describe("post-videos", () => {
  test("add videos songConfirm, unsongConfirm", async () => {
    return request(app)
      .post("/videos")
      .send({
        songConfirm: sample_data.songConfirm,
        unsongConfirm: sample_data.unsongConfirm
      })
      .then((res) => {
        expect(res.status).toBe(201);
      });
  });

  test("add videos result", async () => {
    return request(app)
      .post("/videos")
      .send({
        result: sample_data.result
      })
      .then((res) => {
        expect(res.status).toBe(201);
      });
  });

  // errorチェック
  test("(err) add videos songConfirm2, unsongConfirm", async () => {
    return request(app)
      .post("/videos")
      .send({
        songConfirm2: sample_data.songConfirm,
        unsongConfirm: sample_data.unsongConfirm
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("(err) add videos result2", async () => {
    return request(app)
      .post("/videos")
      .send({
        result2: sample_data.result
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });
});

const sample_data = {
  songConfirm: [
    {
      kind: "youtube#video",
      etag: "SFOtw6NHAwb63i2o_Gmc1A5MkXQ",
      id: "0jseKaZGFzM",
      snippet: {
        publishedAt: "2018-03-27T22:30:01Z",
        channelId: "UCsg-YqdqQ-KFF0LNk23BY4A",
        title: "Maple【樋口楓オリジナル曲】",
        description:
          "作詞作曲編曲Mix：ろくげん\nhttps://twitter.com/ex_odayaka\nhttp://www.nicovideo.jp/mylist/59179986\n歌：樋口楓\n\n楽曲提供ありがとうございました！\nhttp://www.nicovideo.jp/watch/sm32924332\n\n歌詞\n\n一緒に笑うと楽しくなれるのは\n＼なぁーんで！？／ \n\n教室の中 授業中も?でろーん って夢を見てる\n追試の山を 乗り越えて 今日も配信スタート\n\nヒロインつかみとって\n目指せ正規ルート  \nLet's go! 燃やしてこう\nもりだくさんの未来(これから)描いて つなぎたいんだ\n\nみんなを笑わせたくて\n想いを乗せて届けるよ\n一緒に笑うと楽しくなれるのは\n＼なぁーんで！？／\nなんだか照れくさくて\n言えないこともあるけど\nきっと明日もその先も\n一緒なら笑っていられるはず！\n\n歌ってみたシリーズの再生リストはこちら！\nhttps://www.youtube.com/playlist?list=PLXVn5n2jQV_AnMLuD_8gsG5Q2Mehikf_0\n_(-ω- ´ _)⌒)__(-ω- ´ _)⌒)__(-ω- ´ _)⌒)__(-ω- ´ _)⌒)_\n\n◆Twitter◆\nhttps://twitter.com/Higuchikaede/\n創作タグ→#でろあーと\n生放送タグ→#でろおんえあ\n\n◆お問い合わせ先◆\n東京都港区六本木7-18-18 住友不動産六本木通ビル2F incube内\nいちから株式会社 \n\n◆公式ホームページ◆\nhttps://nijisanji.ichikara.co.jp/contact/\n\n◆お問い合わせメール◆\ninfo@ichikara.co.jp\n\n_(-ω- ´ _)⌒)__(-ω- ´ _)⌒)__(-ω- ´ _)⌒)__(-ω- ´ _)⌒)_",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/0jseKaZGFzM/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/0jseKaZGFzM/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/0jseKaZGFzM/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/0jseKaZGFzM/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/0jseKaZGFzM/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "樋口楓【にじさんじ所属】",
        tags: [
          "にじさんじ",
          "歌ってみた",
          "樋口楓",
          "Maple",
          "ろくげん",
          "でろーん",
          "オリジナル曲",
          "めーぷる",
          "KANA-DERO",
        ],
        categoryId: "10",
        liveBroadcastContent: "none",
        defaultLanguage: "ja",
        localized: {
          title: "Maple【樋口楓オリジナル曲】",
          description:
            "作詞作曲編曲Mix：ろくげん\nhttps://twitter.com/ex_odayaka\nhttp://www.nicovideo.jp/mylist/59179986\n歌：樋口楓\n\n楽曲提供ありがとうございました！\nhttp://www.nicovideo.jp/watch/sm32924332\n\n歌詞\n\n一緒に笑うと楽しくなれるのは\n＼なぁーんで！？／ \n\n教室の中 授業中も?でろーん って夢を見てる\n追試の山を 乗り越えて 今日も配信スタート\n\nヒロインつかみとって\n目指せ正規ルート  \nLet's go! 燃やしてこう\nもりだくさんの未来(これから)描いて つなぎたいんだ\n\nみんなを笑わせたくて\n想いを乗せて届けるよ\n一緒に笑うと楽しくなれるのは\n＼なぁーんで！？／\nなんだか照れくさくて\n言えないこともあるけど\nきっと明日もその先も\n一緒なら笑っていられるはず！\n\n歌ってみたシリーズの再生リストはこちら！\nhttps://www.youtube.com/playlist?list=PLXVn5n2jQV_AnMLuD_8gsG5Q2Mehikf_0\n_(-ω- ´ _)⌒)__(-ω- ´ _)⌒)__(-ω- ´ _)⌒)__(-ω- ´ _)⌒)_\n\n◆Twitter◆\nhttps://twitter.com/Higuchikaede/\n創作タグ→#でろあーと\n生放送タグ→#でろおんえあ\n\n◆お問い合わせ先◆\n東京都港区六本木7-18-18 住友不動産六本木通ビル2F incube内\nいちから株式会社 \n\n◆公式ホームページ◆\nhttps://nijisanji.ichikara.co.jp/contact/\n\n◆お問い合わせメール◆\ninfo@ichikara.co.jp\n\n_(-ω- ´ _)⌒)__(-ω- ´ _)⌒)__(-ω- ´ _)⌒)__(-ω- ´ _)⌒)_",
        },
        defaultAudioLanguage: "ja",
      },
      contentDetails: {
        duration: "PT1M16S",
        dimension: "2d",
        definition: "hd",
        caption: "true",
        licensedContent: true,
        contentRating: {},
        projection: "rectangular",
      },
      statistics: {
        viewCount: "244292",
        likeCount: "6777",
        dislikeCount: "61",
        favoriteCount: "0",
        commentCount: "369",
      },
    },
    {
      kind: "youtube#video",
      etag: "5w7as_-8w2gsFqH2_ZeSgEQ_Y4w",
      id: "2_SlchUg264",
      snippet: {
        publishedAt: "2018-10-13T01:13:00Z",
        channelId: "UCLpYMk5h1bq8_GAFVBgXhPQ",
        title: "『命に嫌われている。』歌ってみた - 出雲霞",
        description:
          "まだ見ぬ貴女へ、お誕生日おめでとう。\n\n歌：出雲霞\nMIX：鈴木勝 https://www.youtube.com/channel/UCaF-mODqAziHivqg0Q61XKQ\n原曲：https://youtu.be/0HYm60Mjm0k \n投稿許諾ありがとうございます。\n\n\n❅*॰ॱ｡ﾟ•┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈•ﾟ｡ॱ॰*❅\n▼にじさんじSEEDs「出雲霞」\nTwitter  ▷▶︎ @ikasumi_zzz\nMirrativ ▶︎▷ https://www.mirrativ.com/user/3210908\n\n▼お手紙はこちらまで\n〒106-0032\n東京都港区六本木7-18-18\n​住友不動産六本木通ビル2F\nincube内「いちから株式会社」出雲霞 宛",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/2_SlchUg264/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/2_SlchUg264/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/2_SlchUg264/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/2_SlchUg264/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/2_SlchUg264/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "《IzumoKasumi》Project channel【にじさんじ】",
        tags: ["出雲霞", "にじさんじプロジェクト", "バーチャルライバー"],
        categoryId: "10",
        liveBroadcastContent: "none",
        localized: {
          title: "『命に嫌われている。』歌ってみた - 出雲霞",
          description:
            "まだ見ぬ貴女へ、お誕生日おめでとう。\n\n歌：出雲霞\nMIX：鈴木勝 https://www.youtube.com/channel/UCaF-mODqAziHivqg0Q61XKQ\n原曲：https://youtu.be/0HYm60Mjm0k \n投稿許諾ありがとうございます。\n\n\n❅*॰ॱ｡ﾟ•┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈•ﾟ｡ॱ॰*❅\n▼にじさんじSEEDs「出雲霞」\nTwitter  ▷▶︎ @ikasumi_zzz\nMirrativ ▶︎▷ https://www.mirrativ.com/user/3210908\n\n▼お手紙はこちらまで\n〒106-0032\n東京都港区六本木7-18-18\n​住友不動産六本木通ビル2F\nincube内「いちから株式会社」出雲霞 宛",
        },
      },
      contentDetails: {
        duration: "PT4M32S",
        dimension: "2d",
        definition: "hd",
        caption: "false",
        licensedContent: false,
        contentRating: {},
        projection: "rectangular",
      },
      statistics: {
        viewCount: "93909",
        likeCount: "3129",
        dislikeCount: "22",
        favoriteCount: "0",
        commentCount: "91",
      },
    },
  ],
  unsongConfirm: [
    {
      kind: "youtube#video",
      etag: "vimAvrs_OUi9Wib8bAguqbD6YPM",
      id: "1QY4ex7oLd4",
      snippet: {
        publishedAt: "2018-06-21T03:00:36Z",
        channelId: "UC1zFJrfEKvCixhsjNSb1toQ",
        title: "おねがいダーリン シスター・クレア",
        description:
          "おねがい、ダーリン...♥\n\n🔻ナナホシ管弦楽団（不純異性交遊P)様の原曲『おねがいダーリン』はこちら🔻\nhttps://www.nicovideo.jp/watch/sm26099756\n\n素敵なミックスは、innさんにお手伝いいただきました😊 : @inntothefuton\n\nメンバーシップ登録はこちらから ☞　http://u0u0.net/RjAl\n\n※メンバーシップは、月額490円で加入いただけるサービスです。\nメンバー限定で、オリジナル絵文字がつかえたり、この３D配信後は\nオフショット映像、写真をたくさん投稿する予定です😊🔔✨\n\n⋰⋱⋰⋱⋰⋱⋰⋱⋰⋱⋰⋱⋰⋱⋰⋱⋰⋱⋰⋱⋰⋱⋰⋱⋰⋱⋰⋱⋰⋱\n\nいつも、いつもありがとう。\nみなさんの応援がなければ、ここにいない私です。\nすべてのコメント、スーパーチャットにも\nお返事したいのですが、わたしが気づけず、\nすべてにできないこともあります。\n頑張るので、ご理解いただければ嬉しいです。\n\n ﾟ･｡..｡･ﾟ･｡..｡･ﾟ･｡..｡･ﾟ･｡..｡･ﾟ･｡..｡･ﾟ･｡..｡･ﾟ･｡..｡･ﾟ･｡..｡･ﾟ･｡..｡･ﾟ\n\n　シスター・クレア\n\n　𝗧witter\n\n　https://twitter.com/SisterCleaire\n\n　𝗠arshmallow\n\n     https://marshmallow-qa.com/sistercleaire\n\n　𝗚oods\n　 http://u0u0.net/nwCb\n　　　　　　　　　　　　　　　　　　　　　　\n　𝗗estination\n\n　〒106-0032 \n　東京都港区六本木7-18-18 \n　住友不動産六本木通ビル2F incube内 \n　いちから株式会社 シスター・クレア 宛\n　\n\n ﾟ･｡..｡･ﾟ･｡..｡･ﾟ･｡..｡･ﾟ･｡..｡･ﾟ･｡..｡･ﾟ･｡..｡･ﾟ･｡..｡･ﾟ･｡..｡･ﾟ･｡..｡･ﾟ",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/1QY4ex7oLd4/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/1QY4ex7oLd4/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/1QY4ex7oLd4/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/1QY4ex7oLd4/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/1QY4ex7oLd4/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "シスター・クレア -SisterClaire-",
        tags: [
          "にじさんじプロジェクト",
          "バーチャルライバー",
          "UC1zFJrfEKvCixhsjNSb1toQ",
          "シスタークレア",
          "にじさんじ",
          "声優",
          "女性声優",
          "アイドル",
          "ねこ",
          "ニコニコ動画",
          "マインクラフト",
          "マイクラ",
          "Minecraft",
          "かわいい",
          "癒し",
        ],
        categoryId: "24",
        liveBroadcastContent: "none",
        localized: {
          title: "おねがいダーリン シスター・クレア",
          description:
            "おねがい、ダーリン...♥\n\n🔻ナナホシ管弦楽団（不純異性交遊P)様の原曲『おねがいダーリン』はこちら🔻\nhttps://www.nicovideo.jp/watch/sm26099756\n\n素敵なミックスは、innさんにお手伝いいただきました😊 : @inntothefuton\n\nメンバーシップ登録はこちらから ☞　http://u0u0.net/RjAl\n\n※メンバーシップは、月額490円で加入いただけるサービスです。\nメンバー限定で、オリジナル絵文字がつかえたり、この３D配信後は\nオフショット映像、写真をたくさん投稿する予定です😊🔔✨\n\n⋰⋱⋰⋱⋰⋱⋰⋱⋰⋱⋰⋱⋰⋱⋰⋱⋰⋱⋰⋱⋰⋱⋰⋱⋰⋱⋰⋱⋰⋱\n\nいつも、いつもありがとう。\nみなさんの応援がなければ、ここにいない私です。\nすべてのコメント、スーパーチャットにも\nお返事したいのですが、わたしが気づけず、\nすべてにできないこともあります。\n頑張るので、ご理解いただければ嬉しいです。\n\n ﾟ･｡..｡･ﾟ･｡..｡･ﾟ･｡..｡･ﾟ･｡..｡･ﾟ･｡..｡･ﾟ･｡..｡･ﾟ･｡..｡･ﾟ･｡..｡･ﾟ･｡..｡･ﾟ\n\n　シスター・クレア\n\n　𝗧witter\n\n　https://twitter.com/SisterCleaire\n\n　𝗠arshmallow\n\n     https://marshmallow-qa.com/sistercleaire\n\n　𝗚oods\n　 http://u0u0.net/nwCb\n　　　　　　　　　　　　　　　　　　　　　　\n　𝗗estination\n\n　〒106-0032 \n　東京都港区六本木7-18-18 \n　住友不動産六本木通ビル2F incube内 \n　いちから株式会社 シスター・クレア 宛\n　\n\n ﾟ･｡..｡･ﾟ･｡..｡･ﾟ･｡..｡･ﾟ･｡..｡･ﾟ･｡..｡･ﾟ･｡..｡･ﾟ･｡..｡･ﾟ･｡..｡･ﾟ･｡..｡･ﾟ",
        },
        defaultAudioLanguage: "ja",
      },
      contentDetails: {
        duration: "PT3M22S",
        dimension: "2d",
        definition: "hd",
        caption: "false",
        licensedContent: false,
        contentRating: {},
        projection: "rectangular",
      },
      statistics: {
        viewCount: "599549",
        likeCount: "25025",
        dislikeCount: "104",
        favoriteCount: "0",
        commentCount: "1349",
      },
    },
    {
      kind: "youtube#video",
      etag: "iGG6k6saAy3dV8-fN2BiU4w-1iY",
      id: "8b709uhKSUY",
      snippet: {
        publishedAt: "2018-06-07T11:19:33Z",
        channelId: "UC1zFJrfEKvCixhsjNSb1toQ",
        title: "#01 クレアの自己紹介",
        description:
          "改めて、自己紹介させていただきます。\nシスター・クレアと申します☺️\n\n使用させていただいたBGM\n\n✳︎陽のあたる教会(イメージソングを作っていただきました。)\nAtelierXさま 作曲\nhttps://www.dropbox.com/s/pgl0rwway0zbimx/%E9%99%BD%E3%81%AE%E3%81%82%E3%81%9F%E3%82%8B%E6%95%99%E4%BC%9A_loop.wav?dl=0",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/8b709uhKSUY/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/8b709uhKSUY/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/8b709uhKSUY/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/8b709uhKSUY/sddefault.jpg",
            width: 640,
            height: 480,
          },
        },
        channelTitle: "シスター・クレア -SisterClaire-",
        tags: [
          "にじさんじプロジェクト",
          "バーチャルライバー",
          "UC1zFJrfEKvCixhsjNSb1toQ",
          "シスタークレア",
          "にじさんじ",
          "声優",
          "女性声優",
          "アイドル",
          "ねこ",
          "ニコニコ動画",
          "マインクラフト",
          "マイクラ",
          "Minecraft",
          "かわいい",
          "癒し",
        ],
        categoryId: "24",
        liveBroadcastContent: "none",
        defaultLanguage: "ja",
        localized: {
          title: "#01 クレアの自己紹介",
          description:
            "改めて、自己紹介させていただきます。\nシスター・クレアと申します☺️\n\n使用させていただいたBGM\n\n✳︎陽のあたる教会(イメージソングを作っていただきました。)\nAtelierXさま 作曲\nhttps://www.dropbox.com/s/pgl0rwway0zbimx/%E9%99%BD%E3%81%AE%E3%81%82%E3%81%9F%E3%82%8B%E6%95%99%E4%BC%9A_loop.wav?dl=0",
        },
      },
      contentDetails: {
        duration: "PT2M36S",
        dimension: "2d",
        definition: "hd",
        caption: "true",
        licensedContent: true,
        contentRating: {},
        projection: "rectangular",
      },
      statistics: {
        viewCount: "74912",
        likeCount: "2727",
        dislikeCount: "38",
        favoriteCount: "0",
        commentCount: "299",
      },
    },
  ],
  result: [
    {
      kind: "youtube#video",
      etag: "p2DoaIBSHC4JivUiroA2KRL5cSc",
      id: "1Ejf88Ovb5s",
      snippet: {
        publishedAt: "2018-06-23T04:53:30Z",
        channelId: "UCt5-0i4AVHXaWJrL8Wql3mw",
        title: "ロキ / みきとP (covered by 緑仙)",
        description:
          "ヒトカラガチ勢の本気を舐めてはいけない\n\n\nLyrics, Music & Arrangement：みきとP\nhttps://www.youtube.com/watch?v=Xg-qfsKN2_E\n\nVocal：緑仙 \nhttps://t.co/OQhPMsxBXb\nhttps://twitter.com/midori_2434\n\nillustration：小金井コガネ\nhttps://touch.pixiv.net/member.php?id=981706\n\n\niTunes Store：https://music.apple.com/jp/artist/%E7%B7%91%E4%BB%99/1453314533\n\n\n\n\n💭－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－\n\n▼メンバーシップ\n\nhttps://www.youtube.com/channel/UCt5-0i4AVHXaWJrL8Wql3mw/join\n変な絵文字が使えたり、ここでしか見れない情報があります\n\n💭－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－\n\nTwitter：https://twitter.com/midori_2434\n\nMain channel：https://www.youtube.com/channel/UCt5-0i4AVHXaWJrL8Wql3mw?view_as=subscriber\nSub channel：https://www.youtube.com/channel/UCTi_rzf5QIkXjhJjkbcAdTg?view_as=subscriber\n\niTunes Store：https://music.apple.com/jp/artist/%E7%B7%91%E4%BB%99/1453314533\nGoods：https://nijisanji.booth.pm/\n\n💭－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－\n\nhttps://nijisanji.ichikara.co.jp/contact\n✉offer@ichikara.co.jp\n\nTwitter：https://twitter.com/midori_2434\n\n▼詳しくは\nhttp://twpf.jp/midori_2434\n\n\n💭－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－\n\n【ファンレター等の送り先】\n\n〒101-0022\n東京都千代田区神田練塀町300番地\n住友不動産秋葉原駅前ビル10F\nいちから株式会社 緑仙宛\n\n\n－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/1Ejf88Ovb5s/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/1Ejf88Ovb5s/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/1Ejf88Ovb5s/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/1Ejf88Ovb5s/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/1Ejf88Ovb5s/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "緑仙 / Ryushen",
        tags: ["緑仙", "りゅーしぇん", "リューシェン", "にじさんじ", "2434"],
        categoryId: "22",
        liveBroadcastContent: "none",
        localized: {
          title: "ロキ / みきとP (covered by 緑仙)",
          description:
            "ヒトカラガチ勢の本気を舐めてはいけない\n\n\nLyrics, Music & Arrangement：みきとP\nhttps://www.youtube.com/watch?v=Xg-qfsKN2_E\n\nVocal：緑仙 \nhttps://t.co/OQhPMsxBXb\nhttps://twitter.com/midori_2434\n\nillustration：小金井コガネ\nhttps://touch.pixiv.net/member.php?id=981706\n\n\niTunes Store：https://music.apple.com/jp/artist/%E7%B7%91%E4%BB%99/1453314533\n\n\n\n\n💭－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－\n\n▼メンバーシップ\n\nhttps://www.youtube.com/channel/UCt5-0i4AVHXaWJrL8Wql3mw/join\n変な絵文字が使えたり、ここでしか見れない情報があります\n\n💭－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－\n\nTwitter：https://twitter.com/midori_2434\n\nMain channel：https://www.youtube.com/channel/UCt5-0i4AVHXaWJrL8Wql3mw?view_as=subscriber\nSub channel：https://www.youtube.com/channel/UCTi_rzf5QIkXjhJjkbcAdTg?view_as=subscriber\n\niTunes Store：https://music.apple.com/jp/artist/%E7%B7%91%E4%BB%99/1453314533\nGoods：https://nijisanji.booth.pm/\n\n💭－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－\n\nhttps://nijisanji.ichikara.co.jp/contact\n✉offer@ichikara.co.jp\n\nTwitter：https://twitter.com/midori_2434\n\n▼詳しくは\nhttp://twpf.jp/midori_2434\n\n\n💭－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－\n\n【ファンレター等の送り先】\n\n〒101-0022\n東京都千代田区神田練塀町300番地\n住友不動産秋葉原駅前ビル10F\nいちから株式会社 緑仙宛\n\n\n－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－",
        },
        defaultAudioLanguage: "ja",
      },
      contentDetails: {
        duration: "PT2M50S",
        dimension: "2d",
        definition: "hd",
        caption: "true",
        licensedContent: false,
        contentRating: {},
        projection: "rectangular",
      },
      statistics: {
        viewCount: "431167",
        likeCount: "11339",
        dislikeCount: "79",
        favoriteCount: "0",
        commentCount: "473",
      },
    },
    {
      kind: "youtube#video",
      etag: "cEANSVYs2jKkrb0qy3s_A7GPrZw",
      id: "1O2tU4OxFmQ",
      snippet: {
        publishedAt: "2018-06-27T10:00:00Z",
        channelId: "UCtpB6Bvhs1Um93ziEDACQ8g",
        title: "パッチワーク/森中花咲【森中花咲イメージソング】",
        description:
          "【森中花咲イメージソング】\n歌:森中花咲\n歌詞/作曲/編曲:房\nイラスト/動画編集:房\nMIX:saKi2Ro\n\n\n\n誕生日プレゼントにもらったすてきなイメージソングを歌わせて頂きました🐻\nかーいい！\n\n\nTwitter☞森中花咲🐻にじさんじ所属\n《＠KazakiMorinaka》\nhttp://twitter.com/KazakiMorinaka\n\nMirrativ☞森中花咲🐻\nhttp://www.mirrativ.com/user/2641794",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/1O2tU4OxFmQ/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/1O2tU4OxFmQ/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/1O2tU4OxFmQ/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/1O2tU4OxFmQ/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/1O2tU4OxFmQ/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "森中花咲",
        tags: [
          "バーチャルライバー",
          "Vtuber",
          "イメージソング",
          "にじさんじ",
          "キャラソン",
          "にじさんじプロジェクト",
          "歌",
          "バーチャルYouTuber",
        ],
        categoryId: "24",
        liveBroadcastContent: "none",
        defaultLanguage: "ja",
        localized: {
          title: "パッチワーク/森中花咲【森中花咲イメージソング】",
          description:
            "【森中花咲イメージソング】\n歌:森中花咲\n歌詞/作曲/編曲:房\nイラスト/動画編集:房\nMIX:saKi2Ro\n\n\n\n誕生日プレゼントにもらったすてきなイメージソングを歌わせて頂きました🐻\nかーいい！\n\n\nTwitter☞森中花咲🐻にじさんじ所属\n《＠KazakiMorinaka》\nhttp://twitter.com/KazakiMorinaka\n\nMirrativ☞森中花咲🐻\nhttp://www.mirrativ.com/user/2641794",
        },
        defaultAudioLanguage: "ja",
      },
      contentDetails: {
        duration: "PT1M49S",
        dimension: "2d",
        definition: "hd",
        caption: "true",
        licensedContent: true,
        contentRating: {},
        projection: "rectangular",
      },
      statistics: {
        viewCount: "30345",
        likeCount: "1182",
        dislikeCount: "22",
        favoriteCount: "0",
        commentCount: "79",
      },
    },
  ],
};
