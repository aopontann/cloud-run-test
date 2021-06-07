/*
  Warnings:

  - You are about to drop the `VtuberImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "VtuberImage" DROP CONSTRAINT "VtuberImage_channelId_fkey";

-- AlterTable
ALTER TABLE "Vtuber" ADD COLUMN     "image" VARCHAR(255);

-- DropTable
DROP TABLE "VtuberImage";
