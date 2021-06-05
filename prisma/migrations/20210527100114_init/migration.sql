-- CreateTable
CREATE TABLE "Thumbnails" (
    "id" VARCHAR(20) NOT NULL,
    "defaultUrl" VARCHAR(255),
    "medium" VARCHAR(255),
    "high" VARCHAR(255),
    "standard" VARCHAR(255),
    "maxres" VARCHAR(255),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Videos" (
    "id" VARCHAR(20) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "startTime" TIMESTAMP(0) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "songConfirm" BOOLEAN NOT NULL DEFAULT false,
    "checkSongVtuber" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vtuber" (
    "id" VARCHAR(30) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "readname" VARCHAR(255) NOT NULL,
    "affiliation" VARCHAR(255) NOT NULL,
    "birthday" CHAR(4),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VtuberImage" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" VARCHAR(255) NOT NULL DEFAULT E'icon',
    "url" VARCHAR(255) NOT NULL,
    "poster" VARCHAR(255) NOT NULL,
    "channelId" VARCHAR(30) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SongVtuber" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "videoId" VARCHAR(20) NOT NULL,
    "channelId" VARCHAR(30) NOT NULL,
    "role" VARCHAR(20) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DayCount" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "videoId" VARCHAR(20) NOT NULL,
    "viewCount" INTEGER,
    "likeCount" INTEGER,
    "dislikeCount" INTEGER,
    "commentCount" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "image_channelId" ON "VtuberImage"("channelId");

-- CreateIndex
CREATE INDEX "channelId" ON "SongVtuber"("channelId");

-- CreateIndex
CREATE INDEX "videoId" ON "SongVtuber"("videoId");

-- CreateIndex
CREATE INDEX "count_videoId" ON "DayCount"("videoId");

-- AddForeignKey
ALTER TABLE "DayCount" ADD FOREIGN KEY ("videoId") REFERENCES "Videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thumbnails" ADD FOREIGN KEY ("id") REFERENCES "Videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongVtuber" ADD FOREIGN KEY ("channelId") REFERENCES "Vtuber"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongVtuber" ADD FOREIGN KEY ("videoId") REFERENCES "Videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VtuberImage" ADD FOREIGN KEY ("channelId") REFERENCES "Vtuber"("id") ON DELETE CASCADE ON UPDATE CASCADE;
