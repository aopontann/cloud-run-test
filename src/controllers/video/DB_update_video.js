const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (body) {
  if (!body || !body.videoId) {
    console.log("videoUpdate body error");
    return "body error";
  }
  const videoId = body.videoId;
  const songConfirm = body.songConfirm || false;
  const checkSongVtuber = body.checkSongVtuber || false;
  // 指定した動画IDがDBに存在するか調べる
  const search_video = await prisma.videos.findFirst({
    where: {
      id: videoId
    }
  });
  if (!search_video) {
    console.log("not exist");
    return "not exist";
  }
  console.log(search_video);
  // 出演Vtuberを確認したら自分で確認済みチェックを入れることができる checkSongVtuber
  const updateSongConfirm = await prisma.videos.update({
    where: {
      id: videoId,
    },
    data: {
      title: body.title,
      description: body.description,
      songConfirm: songConfirm,
      checkSongVtuber: checkSongVtuber
    },
  }).catch((e) => {
    console.log("update video error!");
    return "update video error!";
  });
  /*
  const findResult = await prisma.videos.findFirst({
    where: {
      id: videoId
    }
  });
  */
  await prisma.$disconnect();
  return updateSongConfirm;
  // 動画に出演しているVtuber情報を登録する
  /*
  const updateSongVtuber = prisma.songVtuber.createMany({
    data: body.songVtuber.map((array) => {
      return {
        videoId: body.id,
        channelId: array.vtuber.id,
        role: array.role || "歌",
      };
    }),
  });
  */
};

/* body
{
    "videoId": "1CaG8DhNcy0",
    "joinVtuber": [
            {
                "channelId": "UCsg-YqdqQ-KFF0LNk23BY4A",
                "role": "歌"
            }
        ]
}
*/
