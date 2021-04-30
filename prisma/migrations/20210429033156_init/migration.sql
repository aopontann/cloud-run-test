/*
  Warnings:

  - You are about to drop the column `image` on the `Vtuber` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `DayCount` MODIFY `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `SongVtuber` MODIFY `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `Times` MODIFY `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `Vtuber` DROP COLUMN `image`;

-- CreateTable
CREATE TABLE `VtuberImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `type` VARCHAR(255) NOT NULL DEFAULT 'icon',
    `url` VARCHAR(255) NOT NULL,
    `channelId` VARCHAR(30) NOT NULL,
INDEX `channelId`(`channelId`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VtuberImage` ADD FOREIGN KEY (`channelId`) REFERENCES `Vtuber`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
