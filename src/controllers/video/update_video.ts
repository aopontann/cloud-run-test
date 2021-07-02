import { Videos } from "@prisma/client";
import prisma from "../../../prisma/client";

interface Query {
  videoId: string;
  songConfirm?: boolean;
  checkSongVtuber?: boolean;
}

export default async function (body: Query): Promise<Videos> {
  if (!body || !body.videoId) {
    console.log("update_video body error");
    throw "update_video body error";
  }
  const videoId = body.videoId;
  const songConfirm = body.songConfirm || null;
  const checkSongVtuber = body.checkSongVtuber || null;
  
  // 出演Vtuberを確認したら自分で確認済みチェックを入れることができる checkSongVtuber
  const updateSongConfirm = await prisma.videos.update({
    where: {
      id: videoId,
    },
    data: {
      songConfirm: songConfirm != null ? songConfirm : undefined,
      checkSongVtuber: checkSongVtuber != null ? checkSongVtuber : undefined
    },
  }).catch((e) => {
    console.log("update_video error");
    throw e;
  });
  
  //await prisma.$disconnect();
  return updateSongConfirm;
}