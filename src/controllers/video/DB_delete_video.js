const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (all_delete_id) {
  const result = {
    success: [],
    error: [],
  };
  for await (const deleteId of all_delete_id) {
    let errorFlag = false;
    const deleteDayCount = prisma.dayCount.deleteMany({
      where: {
        videoId: deleteId,
      },
    });
    const deleteSongVideos = prisma.songVtuber.deleteMany({
      where: {
        videoId: deleteId,
      },
    });
    const times = prisma.times.delete({
      where: {
        id: deleteId,
      },
    });
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
      deleteDayCount,
      deleteSongVideos,
      times,
      thumbnails,
      videos,
    ]).catch((e) => {
      console.log("delete error =>", deleteId);
      errorFlag = true;
    }).finally(() => {
      console.log("delete success =>", deleteId);
      errorFlag ? result.error.push(deleteId) : result.success.push(deleteId);
    });
  }
  
  await prisma.$disconnect();
  return result;
};
