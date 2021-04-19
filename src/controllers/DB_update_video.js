const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (body) {
  if (!body || !body.id) {
    console.log("body error");
    return "body error";
  }
  // 指定した動画IDがDBに存在するか調べる
  const search_videoId = await prisma.videos.findFirst({
    where: {
      id: body.id
    }
  });
  if (!search_videoId) {
    console.log("not exist");
    return "not exist";
  }
  // 一旦、動画に出演しているVtuber情報を削除する
  const deleteSongVtuber = prisma.songVtuber.deleteMany({
    where: {
      videoId: body.id,
    },
  });
  // 歌ってみた動画か自分で確認してDBに保存する
  // 出演Vtuberを確認したら自分で確認済みチェックを入れることができる checkSongVtuber
  const updateSongConfirm = prisma.videos.update({
    where: {
      id: body.id,
    },
    data: {
      songConfirm: body.songConfirm || search_videoId.songConfirm,
      checkSongVtuber: body.checkSongVtuber || search_videoId.checkSongVtuber
    },
  });
  // 動画に出演しているVtuber情報を登録する
  const updateSongVtuber = prisma.songVtuber.createMany({
    data: body.songVtuber.map((array) => {
      return {
        videoId: body.id,
        channelId: array.vtuber.id,
        role: array.role || "歌",
      };
    }),
  });

  await prisma.$transaction([
    deleteSongVtuber,
    updateSongConfirm,
    updateSongVtuber
  ]);
  
  await prisma.$disconnect();
  return "update success";
};

/* body
{
    "videoId": "1CaG8DhNcy0",
    "songConfirm": true,
    "checkSongVtuber" : true,
    "updateSongVtuber": [
            {
                "confirm": false,
                "role": "歌",
                "vtuber": {
                    "id": "UC_GCs6GARLxEHxy1w40d6VQ",
                    "name": "家長むぎ"
                }
            },
            {
                "confirm": false,
                "role": "歌",
                "vtuber": {
                    "id": "UC48jH1ul-6HOrcSSfoR02fQ",
                    "name": "夕陽リリ"
                }
            },
            {
                "confirm": false,
                "role": "歌",
                "vtuber": {
                    "id": "UCBiqkFJljoxAj10SoP2w2Cg",
                    "name": "文野環"
                }
            },
            {
                "confirm": false,
                "role": "歌",
                "vtuber": {
                    "id": "UCtpB6Bvhs1Um93ziEDACQ8g",
                    "name": "森中花咲"
                }
            }
        ]
}
*/
