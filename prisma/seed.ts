import prisma from "../src/client";
import add_video from "../src/controllers/video/add_video";
import add_tag from "../src/controllers/tag/add_tag";
import search_vtuberName from "../src/controllers/tag/search_vtuberName";
import { toJST, get_time2 } from "../src/controllers/get_times";

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

  /*
  let cnt = 1;
  for await (const videoInfo of sample_videoList.result) {
    console.log(
      `(${cnt++} / ${sample_videoList.result.length}) videoId = ${videoInfo.id}`
    );
    const thumb = videoInfo.snippet.thumbnails;
    const count = videoInfo.statistics;
    const startTime =
      videoInfo.liveStreamingDetails?.scheduledStartTime ||
      videoInfo.liveStreamingDetails?.actualStartTime ||
      videoInfo.snippet.publishedAt ||
      "2000-01-01T00:00:00";

    await prisma.videos
      .upsert({
        where: { id: videoInfo.id },
        create: {
          id: videoInfo.id,
          title: videoInfo.snippet?.title || "",
          description: videoInfo.snippet?.description || "",
          songConfirm: true,
          startTime: toJST(startTime),
          createdAt: get_time2({}),
          thumbnail: {
            create: {
              defaultUrl: thumb?.default?.url || null,
              medium: thumb?.medium?.url || null,
              high: thumb?.high?.url || null,
              standard: thumb?.standard?.url || null,
              maxres: thumb?.maxres?.url || null,
            },
          },
          statistic: {
            create: {
              createdAt: get_time2({}),
              updatedAt: get_time2({}),
              viewCount: count?.viewCount ? Number(count.viewCount) : null,
              likeCount: count?.likeCount ? Number(count.likeCount) : null,
              dislikeCount: count?.dislikeCount
                ? Number(count.dislikeCount)
                : null,
              commentCount: count?.commentCount
                ? Number(count.commentCount)
                : null,
            },
          },
        },
        update: {},
      })
      .catch((e) => {
        console.log("add_video error!");
        throw e;
      });
  }
  */
  
  // タグデータ
  for await (const saveTags of sample_tags){
    await add_tag({
      videoId: saveTags.videoId,
      tags: [...saveTags.tags]
    })
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
