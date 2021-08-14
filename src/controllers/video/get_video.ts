import { Thumbnails, Statistics, Videos } from "@prisma/client";
import prisma from "../../client";

interface GetVideo {
  videoId?: string[];
  songConfirm?: boolean;
  startAtAfter?: string;
  startAtBefore?: string;
  maxResults?: number;
  page?: number;
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
        { tags: tags ? {some: {name: {in: tags} }} : undefined},
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
        where: {
          name: {notIn: NG_tags}
        },
        select: {
          name: true,
          type: true,
        }
      },
    },
  });

  //await prisma.$disconnect();
  return getVideo;
}
