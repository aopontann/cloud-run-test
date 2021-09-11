import prisma from "../../lib/client";

// namesだけの場合、指定したタグを消す
// videoIdも指定した場合、指定した動画のタグだけ消す

export default async function (query: {names?: string[], videoId?: string}): Promise<void> {
  console.log("----- start delete_tag -----");
  console.log("videoId =", query.videoId);
  console.log("names =", query.names);

  await prisma.tags.deleteMany({
    where: {
      AND: [
        { name: query.names ? { in: query.names } : undefined },
        { videoId: query.videoId || undefined },
      ],
    },
  });

  console.log("----- complete delete_tag -----");
}
