import { Thumbnails, Statistics, Videos } from "@prisma/client";
import prisma from "../../../prisma/client";

interface GetVideo {
  videoId?: string[];
  songConfirm?: boolean;
  checkSongVtuber?: boolean;
  startAtAfter?: string;
  startAtBefore?: string;
  maxResults?: number;
  page?: number;
}

interface Include {
  thumbnail: Thumbnails | null;
  statistic: Statistics | null;
}

export default async function (query: GetVideo): Promise<(Videos & Include)[]> {
  const all_videoId = query?.videoId || null;
  const songConfirm = query?.songConfirm || null;
  const checkSongVtuber = query?.checkSongVtuber || null;
  const startAtAfter = query?.startAtAfter || null;
  const startAtBefore = query?.startAtBefore || null;
  const maxResults = query?.maxResults || 9999;
  const page = query?.page && query.page > 0 ? query.page : 1;

  const getVideo = await prisma.videos.findMany({
    where: {
      AND: [
        { id: all_videoId ? { in: all_videoId } : undefined },
        { songConfirm: songConfirm != null ? songConfirm : undefined },
        { checkSongVtuber: checkSongVtuber != null ? checkSongVtuber : undefined },
        { startTime: startAtAfter ? { gte: startAtAfter } : undefined },
        { startTime: startAtBefore ? { lte: startAtBefore } : undefined },
      ],
    },
    orderBy: {
      statistic: {
        viewCount: "desc",
      },
    },
    skip: maxResults * (page - 1),
    take: maxResults,
    include: {
      thumbnail: true,
      statistic: true,
      tags: {
        select: {
          description: true,
          tag: {
            select: {
              name: true
            }
          }
        }
      },
    },
  });

  //await prisma.$disconnect();
  return getVideo;
}
