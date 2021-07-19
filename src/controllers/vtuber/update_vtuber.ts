import prisma from "../../client";

export default async function (vtuberInfo: {
  id: string;
  name?: string;
  readname?: string;
  affiliation?: string;
  birthday?: string;
  image?: string;
}): Promise<void> {
  await prisma.vtuber
    .update({
      where: { id: vtuberInfo.id },
      data: {
        name: vtuberInfo.name || undefined,
        readname: vtuberInfo.readname || undefined,
        affiliation: vtuberInfo.affiliation || undefined,
        birthday: vtuberInfo.birthday || undefined,
        image: vtuberInfo.image || undefined,
      },
    })
    .catch((e) => {
      console.error("update_vtuber error");
      throw e;
    });
}
