import prisma from "../../../prisma/client";
import { get_time2 } from "../get_times";

interface Query {
  type: string;
  videoId: string;
  joinVtuber: {
    vtuberId: string;
    role: string;
  }[];
}

export default async function (query: Query): Promise<void> {
  const type = query.type || "init";
  const videoId = query.videoId || null;
  const joinVtuber = query.joinVtuber || null;

  const find_videos = await prisma.videos.findFirst({
    where: { id: videoId ? videoId : undefined },
  });

  if (find_videos == null || videoId == null) {
    throw "not exist videoId";
  }

  if (type == "init") {
    await prisma.join.deleteMany({
      where: {
        videoId: videoId,
      },
    });
  }

  for await (const oneJoinVtuber of joinVtuber) {
    await prisma.join
      .create({
        data: {
          createdAt: get_time2({}),
          videoId,
          vtuberId: oneJoinVtuber.vtuberId,
          role: oneJoinVtuber.role,
        },
      })
      .catch((e) => {
        console.error("create_joinVtuber error!");
        throw e;
      });
  }
}
