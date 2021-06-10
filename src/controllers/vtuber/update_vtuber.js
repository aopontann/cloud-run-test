const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (vtuberInfo) {
  const updateData = {};
  vtuberInfo.name ? updateData.name = vtuberInfo.name : ""
  vtuberInfo.readname ? updateData.readname = vtuberInfo.readname : ""
  vtuberInfo.affiliation ? updateData.affiliation = vtuberInfo.affiliation : ""
  vtuberInfo.birthday ? updateData.birthday = vtuberInfo.birthday : ""
  vtuberInfo.image ? updateData.image = vtuberInfo.image : ""
  
  await prisma.vtuber.update({
    where: { id: vtuberInfo.id },
    data: updateData
  });
  await prisma.$disconnect();
};
