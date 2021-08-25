import prisma from "../../client";

export default async function (query: { videoId: string; tagNames: string[] }): Promise<void> {


  console.log("add_tag videoId=", query.videoId);
  // 既に保存されているタグを取得
  const res = await prisma.tags.findMany({
    where: { videoId: query.videoId },
  });
  const already_names = res.map((tag) => tag.name);
  
  const save_names: { name: string; videoId: string; type?: string }[] = [];
  query.tagNames.forEach((name) =>
    already_names.includes(name)

      ? ""
      : save_names.push({ name, videoId: query.videoId })
  );

  await prisma.tags.createMany({
    data: [...save_names],
  });
}
