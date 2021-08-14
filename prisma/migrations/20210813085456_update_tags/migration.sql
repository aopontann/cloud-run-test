/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TagVideo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TagVideo" DROP CONSTRAINT "TagVideo_tagId_fkey";

-- DropForeignKey
ALTER TABLE "TagVideo" DROP CONSTRAINT "TagVideo_videoId_fkey";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "TagVideo";

-- CreateTable
CREATE TABLE "Tags" (
    "id" SERIAL NOT NULL,
    "videoId" VARCHAR(20) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255),

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tags" ADD FOREIGN KEY ("videoId") REFERENCES "Videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
