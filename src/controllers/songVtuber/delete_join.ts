import prisma from "../../../prisma/client";

interface Query {
  vtuberId: string[];
  videoId: string[];
}

export default async function (query: Query): Promise<void> {
  const vtuberId = query.vtuberId || null;
  const videoId = query.videoId || null;

  await prisma.join
    .deleteMany({
      where: {
        AND: [
          { vtuberId: vtuberId ? { in: vtuberId } : undefined },
          { videoId: videoId ? { in: videoId } : undefined },
        ],
      },
    })
    .catch((e) => {
      console.error("delete_join error!");
      throw e;
    });
    
}
