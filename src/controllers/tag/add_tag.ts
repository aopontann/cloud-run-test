import prisma from "../../../prisma/client";

interface Query {
  videoId: string;
  tags: {
    name: string;
    description: string;
  }[]
}

export default async function (query: Query[]): Promise<void> {
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
    // １つの動画IDと複数のタグ↓
    for await (const tag of videoTag.tags) {
      await prisma.tag.upsert({
        where: {name: tag.name},
        create: {
          name: tag.name,
          tagVideo: {
            create: {
              videoId: videoTag.videoId,
              description: tag.description || undefined,
            },
          }
        },
        update: {
          tagVideo: {
            create: {
              videoId: videoTag.videoId,
              description: tag.description || undefined,
            },
          },
        }
      });
    }
  } 

}
