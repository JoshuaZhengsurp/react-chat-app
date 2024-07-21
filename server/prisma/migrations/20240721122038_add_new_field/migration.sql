/*
  Warnings:

  - You are about to alter the column `createTime` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `username` VARCHAR(24) NOT NULL,
    MODIFY `createTime` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updateTime` TIMESTAMP(0) NOT NULL DEFAULT NOW() ON UPDATE NOW();
