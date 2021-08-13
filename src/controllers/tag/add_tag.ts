import prisma from "../../client";
import delete_tag from "./delete_tag";

export default async function (query: {
  videoId: string;
  tags: {
    name: string;
    type?: string;
  }[];
}): Promise<void> {

  console.log("add_tag videoId=", query.videoId);
  // 既に保存されているタグを取得
  const res = await prisma.tags.findMany({
    where: { videoId: query.videoId },
  });
  const already_names = res.map((tag) => tag.name);

  //
  const save_names: { name: string; videoId: string; type?: string }[] = [];
  query.tags.forEach((tag) =>
    already_names.includes(tag.name)
      ? ""
      : save_names.push({ ...tag, videoId: query.videoId })
  );

  await prisma.tags.createMany({
    data: [...save_names],
  });
}
