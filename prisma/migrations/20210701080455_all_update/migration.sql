/*
  Warnings:

  - You are about to drop the `SongVtuber` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SongVtuber" DROP CONSTRAINT "SongVtuber_channelId_fkey";

-- DropForeignKey
ALTER TABLE "SongVtuber" DROP CONSTRAINT "SongVtuber_videoId_fkey";

-- AlterTable
ALTER TABLE "TagVideo" ALTER COLUMN "description" DROP NOT NULL;

-- DropTable
DROP TABLE "SongVtuber";

-- CreateTable
CREATE TABLE "Join" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "videoId" VARCHAR(20) NOT NULL,
    "vtuberId" VARCHAR(30) NOT NULL,
    "role" VARCHAR(20) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "vtuberId" ON "Join"("vtuberId");

-- CreateIndex
CREATE INDEX "videoId" ON "Join"("videoId");

-- AddForeignKey
ALTER TABLE "Join" ADD FOREIGN KEY ("vtuberId") REFERENCES "Vtuber"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Join" ADD FOREIGN KEY ("videoId") REFERENCES "Videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
