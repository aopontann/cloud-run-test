-- DropForeignKey
ALTER TABLE "Statistics" DROP CONSTRAINT "Statistics_id_fkey";

-- DropForeignKey
ALTER TABLE "Tags" DROP CONSTRAINT "Tags_videoId_fkey";

-- DropForeignKey
ALTER TABLE "Thumbnails" DROP CONSTRAINT "Thumbnails_id_fkey";

-- AddForeignKey
ALTER TABLE "Thumbnails" ADD CONSTRAINT "Thumbnails_id_fkey" FOREIGN KEY ("id") REFERENCES "Videos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statistics" ADD CONSTRAINT "Statistics_id_fkey" FOREIGN KEY ("id") REFERENCES "Videos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tags" ADD CONSTRAINT "Tags_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Videos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
