/*
import prisma from "../src/lib/client";
import add_video from "../src/services/video/add_video";
import add_tag from "../src/services/tag/add_tag";
import search_vtuberName from "../src/services/tag/search_vtuberName";

const all_vtuberInfo = require("../sample/sample_VtuberList.json");
const sample_videoList = require("../sample/sample_VideoList.json");
const sample_tags = require("../sample/sample_tags.json");

async function main() {
  // vtuberデータ
  for await (const vtuberInfo of all_vtuberInfo.list) {
    let errorFlag = false;
    console.log("name", vtuberInfo.name);
    await prisma.vtuber
      .upsert({
        where: { id: vtuberInfo.id },
        create: {
          id: vtuberInfo.id,
          name: vtuberInfo.name,
          readname: vtuberInfo.readname,
          affiliation: vtuberInfo.affiliation,
          birthday: vtuberInfo.birthday || null,
          type: vtuberInfo.type || null,
        },
        update: {
          name: vtuberInfo.name,
          readname: vtuberInfo.readname,
          affiliation: vtuberInfo.affiliation,
          birthday: vtuberInfo.birthday || null,
          type: vtuberInfo.type || null,
        },
      })
      .catch((e) => {
        errorFlag = true;
      });
    errorFlag ? console.log("error!") : console.log("success!");
  }

  // 動画データ
  await add_video({
    all_videoInfo: sample_videoList.songConfirm,
    songConfirm: true,
  });
  await add_video({
    all_videoInfo: sample_videoList.unsongConfirm,
    songConfirm: false,
  });

  // タグデータ
  const result_search = await search_vtuberName(sample_videoList.songConfirm)
  for await (const result of result_search) {
    await add_tag(result)
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
*/
