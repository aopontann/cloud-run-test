import prisma from "../../lib/client";

export default async function (
  body: {
    id: string;
    name: string;
    readname: string;
    affiliation: string;
    birthday?: string;
    image?: string;
  }[]
): Promise<void> {
  for await (const vtuberInfo of body) {
    await prisma.vtuber.upsert({
      where: { id: vtuberInfo.id },
      create: {
        id: vtuberInfo.id,
        name: vtuberInfo.name,
        readname: vtuberInfo.readname,
        affiliation: vtuberInfo.affiliation,
        birthday: vtuberInfo.birthday || null,
        image: vtuberInfo.image || null,
      },
      update: {},
    });
  }
}
