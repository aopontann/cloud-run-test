//getVideoInfoが取得した動画詳細データを使って、動画が歌ってみた系なのか判別する
// all_videoInfo はどのようなデータなのか一番下に記載
module.exports = function (all_videoInfo) {
  //  条件にあった全ての動画データを入れる
  let return_data = {
    confirm: [],
    unconfirm: []
  };

  for (const videoInfo of all_videoInfo) {
    const videotime = videoInfo.contentDetails.duration;  // 例 "PT1H33M45S"
    const comptime = "PT9M59S" // 9分59秒

    if (comptime.length >= videotime.length) {    // 動画の長さが9分59秒以下の場合
      const checktitle = videoInfo.snippet.title;
      const checkDesc = videoInfo.snippet.description;
      const match_strings_1 = ["試聴", "short", "Short"];
      const match_strings_2 = ["歌ってみた", "歌って踊ってみた", "cover", "Cover", "MV", "Music Video", "ソング", "song", "オリジナル曲"];
      const match_strings_3 = ["feat", "歌", "うた", "曲", "vocal", "Vocal", "唄"];

      if (select_video(checktitle, match_strings_1)) {
        return_data.unconfirm.push(videoInfo);
      } else if(select_video(checktitle, match_strings_2)) {
        return_data.confirm.push(videoInfo);
      } else if(select_video(checktitle, match_strings_3) || select_video(checkDesc, match_strings_3)){
        return_data.unconfirm.push(videoInfo);
      }
    }
  }   
  return return_data;
};

function select_video(search, all_match_data) {
  for(const match_data of all_match_data) {
    if(search.match(match_data)){
      return true;
    }
  }
  return false;
}


/* all_videoInfo から返ってくるデータ
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