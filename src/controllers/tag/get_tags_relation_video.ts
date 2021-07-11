import { Videos, Thumbnails, Statistics } from "@prisma/client";
import prisma from "../../../prisma/client";

interface Query {
  names?: string[];
  songConfirm?: boolean;
  startAtAfter?: string;
  startAtBefore?: string;
  maxResults?: number;
  page?: number;
}

interface Return {
  videos: Videos & {
    statistic: Statistics | null;
    thumbnail: Thumbnails | null;
  };
}

export default async function (query?: Query): Promise<Return[]> {
  const names = query?.names || null;
  const songConfirm = query?.songConfirm || null;
  const startAtAfter = query?.startAtAfter || null;
  const startAtBefore = query?.startAtBefore || null;
  const maxResults = query?.maxResults || 9999;
  const page = query?.page && query.page > 0 ? query.page : 1;

  //await prisma.$connect();
  const get_tag_video = await prisma.tagVideo
    .findMany({
      where: {
        AND: [
          { tag: { name: names ? { in: names } : undefined } },
          { videos: { songConfirm: songConfirm || undefined } },
          {
            videos: {
              startTime: startAtAfter ? { gte: startAtAfter } : undefined,
            },
          },
          {
            videos: {
              startTime: startAtBefore ? { lte: startAtBefore } : undefined,
            },
          },
        ],
      },
      select: {
        tag: true,
        description: true,
        videos: {
          include: {
            thumbnail: true,
            statistic: true,
          },
        },
      },
      skip: maxResults * (page - 1),
      take: maxResults,
    })
    .catch((e) => {
      console.error("get_tag_video error");
      throw e;
    });

  return get_tag_video;
}
