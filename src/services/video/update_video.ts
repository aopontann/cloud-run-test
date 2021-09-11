import { Videos } from "@prisma/client";
import prisma from "../../lib/client";

export default async function (body: {
  id: string;
  songConfirm?: boolean;
  title?: string;
  description?: string;
}): Promise<Videos> {
  if (!body || !body.id) {
    console.log("update_video body error");
    throw "update_video body error";
  }
  const videoId = body.id;
  const songConfirm = body.songConfirm;

  const updateSongConfirm = await prisma.videos
    .update({
      where: {
        id: videoId,
      },
      data: {
        songConfirm,
        title: body.title,
        description: body.description,
      },
    })
    .catch((e) => {
      console.log("update_video error");
      throw e;
    });

  //await prisma.$disconnect();
  return updateSongConfirm;
}
