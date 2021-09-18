import { Vtuber } from "@prisma/client";
import prisma from "../../lib/client";

export default async function (query?: {
  affiliation?: string[];
  name?: string[];
  id?: string[];
  type?: string[];
  birthday?: string[];
}): Promise<Vtuber[]> {
  const affi = query?.affiliation || null;
  const names = query?.name || null;
  const id = query?.id || null;
  const type = query?.type || null;
  const birthday = query?.birthday || null;
 
  const getVtuber = await prisma.vtuber
    .findMany({
      where: {
        AND: [
          { affiliation: affi ? { in: affi } : undefined },
          { name: names ? { in: names } : undefined },
          { id: id ? { in: id } : undefined },
          { type: type ? { in: type } : undefined },
          { birthday: birthday ? { in: birthday } : undefined },
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
