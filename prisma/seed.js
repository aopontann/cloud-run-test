const { PrismaClient } = require("@prisma/client");

const all_vtuberInfo = require("../jsonFolder/vtuber.json");

const prisma = new PrismaClient();

async function main() {
  // vtuber init
  for await (const vtuberInfo of all_vtuberInfo.list) {
    console.log("name", vtuberInfo.name);
    await prisma.vtuber.create({
      data: {
        id: vtuberInfo.id,
        name: vtuberInfo.name,
        readname: vtuberInfo.readname,
        affiliation: vtuberInfo.affiliation,
        birthday: vtuberInfo.birthday
      },
    }).catch((e) => {
      console.log("error!!!!!!");
    }).finally(() => {
      console.log("success!");
    });
  }
  //
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
