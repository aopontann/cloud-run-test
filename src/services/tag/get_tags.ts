import prisma from "../../lib/client";

export default async function (query?: { names?: string[]; videoId?: string }) {
  const names = query?.names || null;
  const videoId = query?.videoId || null;
  const NG_tags = ["test"];

  const get_tags = await prisma.tags.groupBy({
    where: {
      AND: [
        { name: names ? { in: names } : undefined },
        { videoId: videoId || undefined },
        { name: { notIn: NG_tags } },
      ],
    },
    by: ["name"],
    _count: {
      _all: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return get_tags;
}
