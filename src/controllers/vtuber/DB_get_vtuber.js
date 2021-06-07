const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (query) {
  const affi = query ? query.affiliation || null : null;
  const names = query ? query.name || null : null;
  const channelId = query ? query.channelId || null : null;
  const whereAND = [];

  affi ? whereAND.push({ affiliation: { in: affi } }) : ""
  names ? whereAND.push({ name: { in: names } }) : ""
  channelId ? whereAND.push({ id: { in: channelId } }) : ""

  let errorFlag = false;
  //await prisma.$connect();
  const getVtuber = await prisma.vtuber.findMany({
    where: {
      AND: whereAND
    },
    include: {
      songVtuber: { 
        where: { 
          videos: { songConfirm: true }
        },
        select: {
          videoId: true,
          role: true,
          videos: {
            select: {
              title: true,
              startTime: true,
              thumbnail: true
            },
          }
        }
       },
    },
  }).catch(e => {
    errorFlag = true;
  }).finally(async() => {
    //await prisma.$disconnect();
  });
  return errorFlag ? [`error - ${names}`] : getVtuber;
};
