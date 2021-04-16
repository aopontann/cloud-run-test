/*
  Warnings:

  - You are about to drop the column `confirm` on the `SongVtuber` table. All the data in the column will be lost.
  - You are about to drop the `DayViewCount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Statistics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `DayViewCount` DROP FOREIGN KEY `DayViewCount_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Statistics` DROP FOREIGN KEY `Statistics_ibfk_1`;

-- AlterTable
ALTER TABLE `SongVtuber` DROP COLUMN `confirm`;

-- AlterTable
ALTER TABLE `Videos` ADD COLUMN     `checkSongVtuber` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `DayViewCount`;

-- DropTable
DROP TABLE `Statistics`;

-- CreateTable
CREATE TABLE `DayCount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `videoId` VARCHAR(20) NOT NULL,
    `viewCount` INTEGER UNSIGNED,
    `likeCount` INTEGER UNSIGNED,
    `dislikeCount` INTEGER UNSIGNED,
    `commentCount` INTEGER UNSIGNED,
INDEX `videoId`(`videoId`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DayCount` ADD FOREIGN KEY (`videoId`) REFERENCES `Videos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
