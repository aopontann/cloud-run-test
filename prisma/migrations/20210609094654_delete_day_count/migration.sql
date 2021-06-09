/*
  Warnings:

  - You are about to drop the `DayCount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DayCount" DROP CONSTRAINT "DayCount_videoId_fkey";

-- DropTable
DROP TABLE "DayCount";

-- CreateTable
CREATE TABLE "Statistics" (
    "id" VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "viewCount" INTEGER,
    "likeCount" INTEGER,
    "dislikeCount" INTEGER,
    "commentCount" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Statistics" ADD FOREIGN KEY ("id") REFERENCES "Videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
