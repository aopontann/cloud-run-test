import { Videos } from "@prisma/client";
import prisma from "../../client";

export default async function (body: {
  videoId: string;
  songConfirm?: boolean;
  title?: string;
  description?: string;
}): Promise<Videos> {
  if (!body || !body.videoId) {
    console.log("update_video body error");
    throw "update_video body error";
  }
  const videoId = body.videoId;
  const songConfirm = body.songConfirm || null;

  const updateSongConfirm = await prisma.videos
    .update({
      where: {
        id: videoId,
      },
      data: {
        songConfirm: songConfirm != null ? songConfirm : undefined,
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
