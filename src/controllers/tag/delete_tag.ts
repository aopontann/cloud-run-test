import prisma from "../../../prisma/client";

// namesだけの場合、指定したタグを消す
// videoIdも指定した場合、指定した動画のタグだけ消す

export default async function (query: {names?: string[], videoId?: string}): Promise<void> {
  const delete_tagVideo = prisma.tagVideo.deleteMany({
    where: {
      AND: [
        { tag: query.names ? { name: { in: query.names } } : undefined },
        { videoId: query.videoId || undefined },
      ],
    },
  });
  const delete_tag = prisma.tag.deleteMany({
    where: { name: { in: query.names } },
  });

  query.videoId
    ? await prisma.$transaction([delete_tagVideo])
    : await prisma.$transaction([delete_tagVideo, delete_tag]);
}
