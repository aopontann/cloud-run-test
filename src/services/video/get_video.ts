import { Thumbnails, Statistics, Videos } from "@prisma/client";
import prisma from "../../lib/client";
import { get_time } from "../../lib/get_times";

interface GetVideo {
  id?: string[];
  songConfirm?: boolean;
  startTimeAtAfter?: string;
  startTimeAtBefore?: string;
  maxResults?: number;
  page?: number;
  order?: string;
  tags?: string[];
}

export default async function (query: GetVideo) {
  const all_videoId = query?.id || null;
  const songConfirm =
    typeof query?.songConfirm == "boolean" ? query.songConfirm : null;
  const startTimeAtAfter = query?.startTimeAtAfter
    ? get_time({ time: query.startTimeAtAfter })
    : null;
  const startTimeAtBefore = query?.startTimeAtBefore
    ? get_time({ time: query.startTimeAtBefore })
    : null;
  const order = query?.order || "viewCount";
  /* result_videos_totalCountの下に書いた
    const maxResults = query?.maxResults || 9999;
  */
  const page = query?.page && query.page > 0 ? query.page : 1;
  const tags = query?.tags || null;
  const NG_tags = ["test"];

  const result_videos_totalCount = await prisma.videos.count({
    where: {
      AND: [
        { id: all_videoId ? { in: all_videoId } : undefined },
        { songConfirm: songConfirm != null ? songConfirm : undefined },
        { startTime: startTimeAtAfter ? { gte: startTimeAtAfter } : undefined },
        { startTime: startTimeAtBefore ? { lte: startTimeAtBefore } : undefined },
        { tags: tags ? { some: { name: { in: tags } } } : undefined },
      ],
    },
  });
  const maxResults = query?.maxResults || result_videos_totalCount;

  const result_videos = await prisma.videos.findMany({
    where: {
      AND: [
        { id: all_videoId ? { in: all_videoId } : undefined },
        { songConfirm: songConfirm != null ? songConfirm : undefined },
        { startTime: startTimeAtAfter ? { gte: startTimeAtAfter } : undefined },
        { startTime: startTimeAtBefore ? { lte: startTimeAtBefore } : undefined },
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
    take: order == "random" ? undefined : maxResults,
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

  if (order == "random") {
    for (let i = result_videos.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [result_videos[i], result_videos[j]] = [
        result_videos[j],
        result_videos[i],
      ];
    }
  }

  const pageInfo = {
    totalResults: result_videos_totalCount,
    resultsPerPage: result_videos.slice(0, maxResults).length,
    nextPage:
      page * maxResults < result_videos_totalCount ? page + 1 : undefined,
    prevPage: page > 1 ? page - 1 : undefined,
  };
  return {
    pageInfo,
    items: result_videos.slice(0, maxResults),
  };
}
