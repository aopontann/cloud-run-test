import { Tags } from "@prisma/client";
import prisma from "../../client";

export default async function (query?: { names?: string[] }) {
  const names = query?.names || null;
  const NG_tags = ["test"];

  const get_tags = await prisma.tags.groupBy({
    where: {
      AND: [
        { name: names ? { in: names } : undefined },
        { name: { notIn: NG_tags } },
      ],
    },
    by: ["name", "type"],
    _count: {
      _all: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  /*
  //await prisma.$connect();
  const get_tags = await prisma.tags
    .findMany({
      where: {
        name: names ? { in: names } : undefined,
      },
      orderBy: {name: "asc"},
    })
    .catch((e) => {
      console.error("get_tag error");
      throw e;
    });
  */

  return get_tags;
}
