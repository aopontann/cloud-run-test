import prisma from "../../client";
import delete_tag from "./delete_tag";

export default async function (
  query: {
    videoId: string;
    tags: {
      name: string;
      description?: string;
    }[];
  }[]
): Promise<void> {
  /*
  const query_test = [{
    videoId: "097qC2EjLHg",
    tags: [
      {
        name: "alex1",
        description: "abc",
      },
      {
        name: "alex2",
        description: "edf", 
      },
    ]
  }];
  */

  for await (const videoTag of query) {
    console.log("add_tag videoId=", videoTag.videoId);

    // タグの重複を防ぐための処理 あまりよくないから修正する必要がある
    await delete_tag({videoId: videoTag.videoId});

    // １つの動画IDと複数のタグ↓
    for await (const tag of videoTag.tags) {
      await prisma.tag.upsert({
        where: { name: tag.name },
        create: {
          name: tag.name,
          tagVideo: {
            create: {
              videoId: videoTag.videoId,
              description: tag.description || undefined,
            },
          },
        },
        update: {
          tagVideo: {
            create: {
              videoId: videoTag.videoId,
              description: tag.description || undefined,
            },
          },
        },
      });
    }
  }
}
