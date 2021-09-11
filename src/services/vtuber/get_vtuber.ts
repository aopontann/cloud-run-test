import { Vtuber } from "@prisma/client";
import prisma from "../../lib/client";

export default async function (query?: {
  affiliation?: string[];
  name?: string[];
  id?: string[];
}): Promise<Vtuber[]> {
  const affi = query?.affiliation || null;
  const names = query?.name || null;
  const id = query?.id || null;
 
  const getVtuber = await prisma.vtuber
    .findMany({
      where: {
        AND: [
          { affiliation: affi ? { in: affi } : undefined },
          { name: names ? { in: names } : undefined },
          { id: id ? { in: id } : undefined },
        ],
      },
      orderBy: {readname: "asc"}
    })
    .catch((e) => {
      console.error("get_vtuber error");
      throw e;
    });

  return getVtuber;
}
