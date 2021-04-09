const select_videos = require("../controllers/select_youtube_videos");

const test_data = [
  {
    add: false,
    confirm: true,
    timestamp: "",
    dayViewcount: [],
    id: "UP6gZDFPZZE",
    snippet: {
      publishedAt: "2019-10-27T15:56:30Z",
      channelId: "UCsg-YqdqQ-KFF0LNk23BY4A",
      title: "【HANDCLAP】2週間で10kg痩せるダンス【全部JK組】",
      description: "aaa",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/UP6gZDFPZZE/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/UP6gZDFPZZE/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/UP6gZDFPZZE/hqdefault.jpg",
          width: 480,
          height: 360,
        },
        standard: {
          url: "https://i.ytimg.com/vi/UP6gZDFPZZE/sddefault.jpg",
          width: 640,
          height: 480,
        },
        maxres: {
          url: "https://i.ytimg.com/vi/UP6gZDFPZZE/maxresdefault.jpg",
          width: 1280,
          height: 720,
        },
      },
      channelTitle: "樋口楓【にじさんじ所属】",
      tags: [
        "ぶいちゅーばー",
        "ブイチューバー",
        "vtuber",
        "にじさんじ1期生",
        "にじさんじ",
        "ひぐちかえで",
        "でろーん",
        "樋口楓",
        "ハンドクラップ",
        "handclap",
        "JK組",
        "踊ってみた",
        "静凛",
        "月ノ美兎",
        "しずりん",
        "つきのみと",
      ],
      categoryId: "22",
      liveBroadcastContent: "none",
      defaultLanguage: "ja",
      localized: {
        title: "【HANDCLAP】2週間で10kg痩せるダンス【全部JK組】",
        description:
          "・楽曲：HandClap\n・アーティスト名：Fitz and the Tantrums \n\n・中央ダンサー兼ベース：Mito-Mito\nhttps://www.youtube.com/channel/UCD-miitqNY3nyukJ4Fnf4_A\n\n・右ダンサー兼サックス：ShiZuRiN\nhttps://www.youtube.com/channel/UC6oDys1BGgBsIC3WhG1BovQ\n\n・左ダンサー兼ほか：Deroon\nhttps://www.youtube.com/channel/UCsg-YqdqQ-KFF0LNk23BY4A\n\n\nみなさんもぜひ踊ってみてね。\n本編はこちら\nhttps://www.youtube.com/watch?v=lXoKDFm8l4I&t=112s\n\n\n_(-ω- ´ _)⌒)__(-ω- ´ _)⌒)__(-ω- ´ _)⌒)__(-ω- ´ _)⌒)_\n\n◆Twitter◆\nhttps://twitter.com/Higuchikaede/\n創作タグ→#でろあーと\n生放送タグ→#でろおんえあ\n\n◆お問い合わせ先◆\n東京都港区六本木7-18-18 住友不動産六本木通ビル2F incube内\nいちから株式会社 \n\n◆プレゼントはこちら◆...Thank you!\n〒175-0082\n東京都板橋区高島平6-2-1\nネットデポ新高島平内\nいちから株式会社 (ライバー名)宛\n\n◆公式ホームページ◆\nhttps://nijisanji.ichikara.co.jp/contact/\n\n◆お問い合わせメール◆\ninfo@ichikara.co.jp\n\n_(-ω- ´ _)⌒)__(-ω- ´ _)⌒)__(-ω- ´ _)⌒)__(-ω- ´ _)⌒)_",
      },
      defaultAudioLanguage: "ja",
    },
    contentDetails: {
      duration: "PT1M50S",
      dimension: "2d",
      definition: "hd",
      caption: "false",
      licensedContent: true,
      contentRating: {},
      projection: "rectangular",
    },
    statistics: {
      viewCount: "318234",
      likeCount: "10857",
      dislikeCount: "96",
      favoriteCount: "0",
      commentCount: "475",
    },
  }
];

const test_data2 = [
  {
    add: false,
    confirm: false,
    timestamp: "",
    dayViewcount: [],
    id: "UP6gZDFPZZE",
    snippet: {
      publishedAt: "2019-10-27T15:56:30Z",
      channelId: "UCsg-YqdqQ-KFF0LNk23BY4A",
      title: "【HANDCLAP】2週間で10kg痩せるダンス【全部JK組】cover",
      description:
        "・楽曲：HandClap\n・アーティスト名：Fitz and the Tantrums \n\n・中央ダンサー兼ベース：Mito-Mito\nhttps://www.youtube.com/channel/UCD-miitqNY3nyukJ4Fnf4_A\n\n・右ダンサー兼サックス：ShiZuRiN\nhttps://www.youtube.com/channel/UC6oDys1BGgBsIC3WhG1BovQ\n\n・左ダンサー兼ほか：Deroon\nhttps://www.youtube.com/channel/UCsg-YqdqQ-KFF0LNk23BY4A\n\n\nみなさんもぜひ踊ってみてね。\n本編はこちら\nhttps://www.youtube.com/watch?v=lXoKDFm8l4I&t=112s\n\n\n_(-ω- ´ _)⌒)__(-ω- ´ _)⌒)__(-ω- ´ _)⌒)__(-ω- ´ _)⌒)_\n\n◆Twitter◆\nhttps://twitter.com/Higuchikaede/\n創作タグ→#でろあーと\n生放送タグ→#でろおんえあ\n\n◆お問い合わせ先◆\n東京都港区六本木7-18-18 住友不動産六本木通ビル2F incube内\nいちから株式会社 \n\n◆プレゼントはこちら◆...Thank you!\n〒175-0082\n東京都板橋区高島平6-2-1\nネットデポ新高島平内\nいちから株式会社 (ライバー名)宛\n\n◆公式ホームページ◆\nhttps://nijisanji.ichikara.co.jp/contact/\n\n◆お問い合わせメール◆\ninfo@ichikara.co.jp\n\n_(-ω- ´ _)⌒)__(-ω- ´ _)⌒)__(-ω- ´ _)⌒)__(-ω- ´ _)⌒)_",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/UP6gZDFPZZE/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/UP6gZDFPZZE/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/UP6gZDFPZZE/hqdefault.jpg",
          width: 480,
          height: 360,
        },
        standard: {
          url: "https://i.ytimg.com/vi/UP6gZDFPZZE/sddefault.jpg",
          width: 640,
          height: 480,
        },
        maxres: {
          url: "https://i.ytimg.com/vi/UP6gZDFPZZE/maxresdefault.jpg",
          width: 1280,
          height: 720,
        },
      },
      channelTitle: "樋口楓【にじさんじ所属】",
      tags: [
        "ぶいちゅーばー",
        "ブイチューバー",
        "vtuber",
        "にじさんじ1期生",
        "にじさんじ",
        "ひぐちかえで",
        "でろーん",
        "樋口楓",
        "ハンドクラップ",
        "handclap",
        "JK組",
        "踊ってみた",
        "静凛",
        "月ノ美兎",
        "しずりん",
        "つきのみと",
      ],
      categoryId: "22",
      liveBroadcastContent: "none",
      defaultLanguage: "ja",
      localized: {
        title: "【HANDCLAP】2週間で10kg痩せるダンス【全部JK組】",
        description:
          "・楽曲：HandClap\n・アーティスト名：Fitz and the Tantrums \n\n・中央ダンサー兼ベース：Mito-Mito\nhttps://www.youtube.com/channel/UCD-miitqNY3nyukJ4Fnf4_A\n\n・右ダンサー兼サックス：ShiZuRiN\nhttps://www.youtube.com/channel/UC6oDys1BGgBsIC3WhG1BovQ\n\n・左ダンサー兼ほか：Deroon\nhttps://www.youtube.com/channel/UCsg-YqdqQ-KFF0LNk23BY4A\n\n\nみなさんもぜひ踊ってみてね。\n本編はこちら\nhttps://www.youtube.com/watch?v=lXoKDFm8l4I&t=112s\n\n\n_(-ω- ´ _)⌒)__(-ω- ´ _)⌒)__(-ω- ´ _)⌒)__(-ω- ´ _)⌒)_\n\n◆Twitter◆\nhttps://twitter.com/Higuchikaede/\n創作タグ→#でろあーと\n生放送タグ→#でろおんえあ\n\n◆お問い合わせ先◆\n東京都港区六本木7-18-18 住友不動産六本木通ビル2F incube内\nいちから株式会社 \n\n◆プレゼントはこちら◆...Thank you!\n〒175-0082\n東京都板橋区高島平6-2-1\nネットデポ新高島平内\nいちから株式会社 (ライバー名)宛\n\n◆公式ホームページ◆\nhttps://nijisanji.ichikara.co.jp/contact/\n\n◆お問い合わせメール◆\ninfo@ichikara.co.jp\n\n_(-ω- ´ _)⌒)__(-ω- ´ _)⌒)__(-ω- ´ _)⌒)__(-ω- ´ _)⌒)_",
      },
      defaultAudioLanguage: "ja",
    },
    contentDetails: {
      duration: "PT1M50S",
      dimension: "2d",
      definition: "hd",
      caption: "false",
      licensedContent: true,
      contentRating: {},
      projection: "rectangular",
    },
    statistics: {
      viewCount: "318234",
      likeCount: "10857",
      dislikeCount: "96",
      favoriteCount: "0",
      commentCount: "475",
    },
  }
];

test('select video', () => {
  expect(select_videos(test_data)).toBe([]);
});


