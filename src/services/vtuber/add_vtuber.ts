import prisma from "../../lib/client";

export default async function (body: {
  id: string;
  name: string;
  readname: string;
  affiliation: string;
  type: string;
  birthday?: string;
  image?: string;
}): Promise<void> {
  await prisma.vtuber.upsert({
    where: { id: body.id },
    create: {
      id: body.id,
      name: body.name,
      readname: body.readname,
      type: body.type,
      affiliation: body.affiliation,
      birthday: body.birthday || null,
      image: body.image || null,
    },
    update: {},
  });
}
