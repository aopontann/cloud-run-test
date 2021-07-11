import { Vtuber, Thumbnails } from "@prisma/client";
import prisma from '../../../prisma/client';

interface Query {
  affiliation?: string[];
  name?: string[];
  channelId?: string[];
}


export default async function (query?: Query): Promise<Vtuber[]> {
  const affi = query?.affiliation || null;
  const names = query?.name || null;
  const channelId = query?.channelId || null;
  /*
  const whereAND = [];
  affi ? whereAND.push({ affiliation: { in: affi } }) : ""
  names ? whereAND.push({ name: { in: names } }) : ""
  channelId ? whereAND.push({ id: { in: channelId } }) : ""
  */

  //await prisma.$connect();
  const getVtuber = await prisma.vtuber
    .findMany({
      where: {
        AND: [
          { affiliation: affi ? { in: affi } : undefined },
          { name: names ? { in: names } : undefined },
          { id: channelId ? { in: channelId } : undefined },
        ],
      },
    })
    .catch((e) => {
      console.error("get_vtuber error");
      throw e;
    });

  return getVtuber;
}
