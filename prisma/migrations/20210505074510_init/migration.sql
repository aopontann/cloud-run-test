-- CreateTable
CREATE TABLE `Thumbnails` (
    `id` VARCHAR(20) NOT NULL,
    `defaultUrl` VARCHAR(255),
    `medium` VARCHAR(255),
    `high` VARCHAR(255),
    `standard` VARCHAR(255),
    `maxres` VARCHAR(255),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Times` (
    `id` VARCHAR(20) NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `videoLength` VARCHAR(10) NOT NULL,
    `startTime` DATETIME(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Videos` (
    `id` VARCHAR(20) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `songConfirm` BOOLEAN NOT NULL DEFAULT false,
    `checkSongVtuber` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vtuber` (
    `id` VARCHAR(30) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `readname` VARCHAR(255) NOT NULL,
    `affiliation` VARCHAR(255) NOT NULL,
    `birthday` CHAR(4),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `SongVtuber` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `videoId` VARCHAR(20) NOT NULL,
    `channelId` VARCHAR(30) NOT NULL,
    `role` VARCHAR(20) NOT NULL,
INDEX `channelId`(`channelId`),
INDEX `videoId`(`videoId`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
ALTER TABLE `Thumbnails` ADD FOREIGN KEY (`id`) REFERENCES `Videos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Times` ADD FOREIGN KEY (`id`) REFERENCES `Videos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VtuberImage` ADD FOREIGN KEY (`channelId`) REFERENCES `Vtuber`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SongVtuber` ADD FOREIGN KEY (`channelId`) REFERENCES `Vtuber`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SongVtuber` ADD FOREIGN KEY (`videoId`) REFERENCES `Videos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DayCount` ADD FOREIGN KEY (`videoId`) REFERENCES `Videos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
