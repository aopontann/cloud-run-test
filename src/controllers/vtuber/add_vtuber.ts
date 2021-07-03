import prisma from '../../../prisma/client';

interface NewVtuber {
  channelId: string;
  name: string;
  readname: string;
  affiliation: string;
  birthday?: string;
  image?: string;
}

export default async function (body: NewVtuber[]): Promise<void> {
  for await (const vtuberInfo of body) {
    await prisma.vtuber.upsert({
      where: { id: vtuberInfo.channelId },
      create: {
        id: vtuberInfo.channelId,
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
