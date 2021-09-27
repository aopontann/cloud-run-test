import prisma from "../../lib/client";

export default async function (vtuberInfo: {
  id: string;
  name?: string;
  readname?: string;
  type?: string;
  affiliation?: string;
  birthday?: string;
  image?: string;
}) {
  const result = await prisma.vtuber
    .update({
      where: { id: vtuberInfo.id },
      data: {
        name: vtuberInfo.name || undefined,
        readname: vtuberInfo.readname || undefined,
        type: vtuberInfo.type || undefined,
        affiliation: vtuberInfo.affiliation || undefined,
        birthday: vtuberInfo.birthday || undefined,
        image: vtuberInfo.image || undefined,
      },
    })
    .catch((e) => {
      console.error("update_vtuber error");
      throw e;
    });
  return result;
}
