/*
  Warnings:

  - You are about to drop the column `checkSongVtuber` on the `Videos` table. All the data in the column will be lost.
  - You are about to drop the `Join` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Join" DROP CONSTRAINT "Join_videoId_fkey";

-- DropForeignKey
ALTER TABLE "Join" DROP CONSTRAINT "Join_vtuberId_fkey";

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "publish" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Videos" DROP COLUMN "checkSongVtuber";

-- DropTable
DROP TABLE "Join";
