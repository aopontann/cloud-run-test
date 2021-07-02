import prisma from "../../../prisma/client";

export default async function (all_delete_id: string[]): Promise<void> {  
  for await (const deleteId of all_delete_id) {
    const deleteStatistics = prisma.statistics.deleteMany({
      where: {
        id: deleteId,
      },
    });
    const deleteJoin = prisma.join.deleteMany({
      where: {
        videoId: deleteId,
      },
    });
    const deleteTagVideo = prisma.tagVideo.deleteMany({
      where: {
        videoId: deleteId,
      }
    })
    const thumbnails = prisma.thumbnails.delete({
      where: {
        id: deleteId,
      },
    });
    const videos = prisma.videos.delete({
      where: {
        id: deleteId,
      },
    });
    await prisma.$transaction([
      deleteJoin,
      deleteTagVideo,
      deleteStatistics,
      thumbnails,
      videos,
    ]).catch((e) => {
      console.log("delete error =>", deleteId);
      throw e;
    });
  }
}
