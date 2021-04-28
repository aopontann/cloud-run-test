// fetchをnode.jsで使う
const fetch = require("node-fetch");

// 環境変数を使う
//require("dotenv").config();

// serachVideoで取得したvideoIdを使ってYoutube Data Api Videosを叩いて動画の詳細データを取得する
module.exports = async function (query) {
  const YoutubeApiVideos = "https://www.googleapis.com/youtube/v3/videos";
  const Key = process.env.YOUTUBE_DATA_API_KEY;

  const part = query.part;
  let all_videoId = query.videoId; // query.videoId [URL, URL, ...]

  //  複数の動画データを入れる
  let return_data = [];

  // ZArPzQu_cXE
  console.log("Youtube Data 取得開始");

  const cutsize = 50;
  while (all_videoId.length > 0) {
    console.log("Youtube Data 取得中");
    // 50個のURLに分ける
    const videoId = all_videoId.slice(0, cutsize); // 0 - 49まで配列をコピー 49ない場合最後まで
    const send_videoId = videoId.join(","); // 配列を , 区切り文字列に変換

    const res = await fetch(
      `${YoutubeApiVideos}?part=${part}&id=${send_videoId}&key=${Key}`
    );
    const data = await res.json();

    if (data.error) {
      console.log("get_youtube_videos error!");
      return return_data;
    }

    const result_get_videos = data.items.slice();
    return_data.push(...result_get_videos);

    all_videoId = all_videoId.slice(cutsize);
  }

  console.log("return_data", return_data);
  console.log("Youtube Data 完了!");
  return return_data;
};


/* data から返ってくるデータ
{
      "kind": "youtube#videoListResponse",
      "etag": "pMx5emovzWPwlQIibWc477mBJfs",
      "items": [
        {
          "kind": "youtube#video",
          "etag": "QJ3F9Ln0tBlibRGZDTzlIjcKvvQ",
          "id": "OLWqLMbq5QY",
          "snippet": {
            "publishedAt": "2018-07-13T21:30:02Z",
            "channelId": "UCsg-YqdqQ-KFF0LNk23BY4A",
            "title": "MapleDancer【樋口楓オリジナル曲】",
            "description": "作詞・作曲・編曲・Mix：かずぺそ\n映像：ソムニア\nサムネイル：brat\n歌：樋口楓\n\n楽曲提供ありがとうございました！\n音楽：かずぺそ\nhttps://twitter.com/kazupeso88\nhttp://www.nicovideo.jp/watch/sm33178298\n映像：ソムニア\nhttps://twitter.com/somnia_RS\nサムネイル：brat\nhttps://twitter.com/brabrabrat00\n\n\n歌詞\n\n白いリボン　秋に染めて\n開演の時間 心燃やすぜ\n\n手を　拝借　いざ　参る\n二次と三次の交わる間\nさあ 今日も 踊りましょ\nポニーテール揺らして\n\nDance!! 月に楓は ふわり宙を舞う\nその姿に見とれた 紅い目が濡れる　\noh yeah\n\n黒い夜空 秋を描く\n最高の時間 魂燃やすぜ\n\nさあ Clap Your Hands\nねえ Shall We Dance?\n兎にも角にも進めよ前へ\n奏でろよ 音楽を\nスカート翻して\n\nJump!! 宵(よい)に楓はふわり弧を描く\nその水面(みなも)に湖月(こげつ)は\n蛙(かわず)を照らす\noh yeah\n\nDance 月に楓は～\nその姿に見とれて\n\nDance!!! 月と楓は 空に舞い踊る\nその宴に見蕩れた 紅い目が揺れる\noh yeah\n\nDance! 月に楓はふわり宙を舞う\n\n歌ってみたシリーズの再生リストはこちら！\nhttps://www.youtube.com/playlist?list=PLXVn5n2jQV_AnMLuD_8gsG5Q2Mehikf_0\n_(-ω- ´ _)⌒)__(-ω- ´ _)⌒)__(-ω- ´ _)⌒)__(-ω- ´ _)⌒)_\n\n◆Twitter◆\nhttps://twitter.com/Higuchikaede/\n創作タグ→#でろあーと\n生放送タグ→#でろおんえあ\n\n◆お問い合わせ先◆\n東京都港区六本木7-18-18 住友不動産六本木通ビル2F incube内\nいちから株式会社 \n\n◆公式ホームページ◆\nhttps://nijisanji.ichikara.co.jp/contact/\n\n◆お問い合わせメール◆\ninfo@ichikara.co.jp\n\n_(-ω- ´ _)⌒)__(-ω- ´ _)⌒)__(-ω- ´ _)⌒)__(-ω- ´ _)⌒)_",
            "thumbnails": {
              "default": {
                "url": "https://i.ytimg.com/vi/OLWqLMbq5QY/default.jpg",
                "width": 120,
                "height": 90
              },
              "medium": {
                "url": "https://i.ytimg.com/vi/OLWqLMbq5QY/mqdefault.jpg",
                "width": 320,
                "height": 180
              },
              "high": {
                "url": "https://i.ytimg.com/vi/OLWqLMbq5QY/hqdefault.jpg",
                "width": 480,
                "height": 360
              },
              "standard": {
                "url": "https://i.ytimg.com/vi/OLWqLMbq5QY/sddefault.jpg",
                "width": 640,
                "height": 480
              },
              "maxres": {
                "url": "https://i.ytimg.com/vi/OLWqLMbq5QY/maxresdefault.jpg",
                "width": 1280,
                "height": 720
              }
            },
            "channelTitle": "樋口楓【にじさんじ所属】",
            "tags": [
              "樋口楓",
              "でろーん",
              "MapleDancer",
              "KANA-DERO",
              "オリジナル曲",
              "歌ってみた",
              "だんちぇ"
            ],
            "categoryId": "10",
            "liveBroadcastContent": "none",
            "localized": {
              "title": "MapleDancer【樋口楓オリジナル曲】",
              "description": "作詞・作曲・編曲・Mix：かずぺそ\n映像：ソムニア\nサムネイル：brat\n歌：樋口楓\n\n楽曲提供ありがとうございました！\n音楽：かずぺそ\nhttps://twitter.com/kazupeso88\nhttp://www.nicovideo.jp/watch/sm33178298\n映像：ソムニア\nhttps://twitter.com/somnia_RS\nサムネイル：brat\nhttps://twitter.com/brabrabrat00\n\n\n歌詞\n\n白いリボン　秋に染めて\n開演の時間 心燃やすぜ\n\n手を　拝借　いざ　参る\n二次と三次の交わる間\nさあ 今日も 踊りましょ\nポニーテール揺らして\n\nDance!! 月に楓は ふわり宙を舞う\nその姿に見とれた 紅い目が濡れる　\noh yeah\n\n黒い夜空 秋を描く\n最高の時間 魂燃やすぜ\n\nさあ Clap Your Hands\nねえ Shall We Dance?\n兎にも角にも進めよ前へ\n奏でろよ 音楽を\nスカート翻して\n\nJump!! 宵(よい)に楓はふわり弧を描く\nその水面(みなも)に湖月(こげつ)は\n蛙(かわず)を照らす\noh yeah\n\nDance 月に楓は～\nその姿に見とれて\n\nDance!!! 月と楓は 空に舞い踊る\nその宴に見蕩れた 紅い目が揺れる\noh yeah\n\nDance! 月に楓はふわり宙を舞う\n\n歌ってみたシリーズの再生リストはこちら！\nhttps://www.youtube.com/playlist?list=PLXVn5n2jQV_AnMLuD_8gsG5Q2Mehikf_0\n_(-ω- ´ _)⌒)__(-ω- ´ _)⌒)__(-ω- ´ _)⌒)__(-ω- ´ _)⌒)_\n\n◆Twitter◆\nhttps://twitter.com/Higuchikaede/\n創作タグ→#でろあーと\n生放送タグ→#でろおんえあ\n\n◆お問い合わせ先◆\n東京都港区六本木7-18-18 住友不動産六本木通ビル2F incube内\nいちから株式会社 \n\n◆公式ホームページ◆\nhttps://nijisanji.ichikara.co.jp/contact/\n\n◆お問い合わせメール◆\ninfo@ichikara.co.jp\n\n_(-ω- ´ _)⌒)__(-ω- ´ _)⌒)__(-ω- ´ _)⌒)__(-ω- ´ _)⌒)_"
            },
            "defaultAudioLanguage": "ja"
          },
          "contentDetails": {
            "duration": "PT3M18S",
            "dimension": "2d",
            "definition": "hd",
            "caption": "true",
            "licensedContent": true,
            "contentRating": {},
            "projection": "rectangular"
          },
          "statistics": {
            "viewCount": "1478411",
            "likeCount": "28416",
            "dislikeCount": "206",
            "favoriteCount": "0",
            "commentCount": "1019"
          }
        },
        ...
*/
