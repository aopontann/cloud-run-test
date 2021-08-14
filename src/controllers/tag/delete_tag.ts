import prisma from "../../client";

// namesだけの場合、指定したタグを消す
// videoIdも指定した場合、指定した動画のタグだけ消す

export default async function (query: {names?: string[], videoId?: string}): Promise<void> {
  await prisma.tags.deleteMany({
    where: {
      AND: [
        { name: query.names ? { in: query.names } : undefined },
        { videoId: query.videoId || undefined },
      ],
    },
  });
}
