import { Thumbnails, Statistics, Videos } from "@prisma/client";
import prisma from "../../client";

interface GetVideo {
  videoId?: string[];
  songConfirm?: boolean;
  startAtAfter?: string;
  startAtBefore?: string;
  maxResults?: number;
  page?: number;
  order?: string;
  tags?: string[];
}

interface Include {
  thumbnail: Thumbnails | null;
  statistic: Statistics | null;
}

export default async function (query: GetVideo): Promise<(Videos & Include)[]> {
  const all_videoId = query?.videoId || null;
  const songConfirm =
    typeof query?.songConfirm == "boolean" ? query.songConfirm : null;
  const startAtAfter = query?.startAtAfter || null;
  const startAtBefore = query?.startAtBefore || null;
  const order = query?.order || "viewCount";
  const maxResults = query?.maxResults || 9999;
  const page = query?.page && query.page > 0 ? query.page : 1;
  const tags = query?.tags || null;
  const NG_tags = ["test"];

  const getVideo = await prisma.videos.findMany({
    where: {
      AND: [
        { id: all_videoId ? { in: all_videoId } : undefined },
        { songConfirm: songConfirm != null ? songConfirm : undefined },
        { startTime: startAtAfter ? { gte: startAtAfter } : undefined },
        { startTime: startAtBefore ? { lte: startAtBefore } : undefined },
        { tags: tags ? { some: { name: { in: tags } } } : undefined },
      ],
    },
    orderBy:
      order == "startTime"
        ? { startTime: "desc" }
        : {
            statistic: {
              viewCount: "desc",
            },
          },
    skip: maxResults * (page - 1),
    take: order == "random" ? 9999 : maxResults,
    include: {
      thumbnail: true,
      statistic: true,
      tags: {
        where: {
          name: { notIn: NG_tags },
        },
        select: {
          name: true,
        },
      },
    },
  });

  if(order == "random"){
    for (let i = getVideo.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [getVideo[i], getVideo[j]] = [getVideo[j], getVideo[i]];
    }
  }

  return getVideo.slice(0, maxResults);
}
