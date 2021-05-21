/*
  Warnings:

  - Added the required column `poster` to the `VtuberImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `VtuberImage` ADD COLUMN     `poster` VARCHAR(255) NOT NULL;
