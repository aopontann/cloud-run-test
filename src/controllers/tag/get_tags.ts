import { Videos, Thumbnails, Statistics, Tag } from "@prisma/client";
import prisma from "../../client";

interface Query {
  names?: string[];
}

export default async function (query?: Query): Promise<Tag[]> {
  const names = query?.names || null;

  //await prisma.$connect();
  const get_tags = await prisma.tag
    .findMany({
      where: {
        name: names ? { in: names } : undefined,
      },
    })
    .catch((e) => {
      console.error("get_tag error");
      throw e;
    });

  return get_tags;
}
