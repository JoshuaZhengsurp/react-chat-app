/*
  Warnings:

  - You are about to drop the column `emial` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `createTime` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_emial_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `emial`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    MODIFY `createTime` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updateTime` TIMESTAMP(0) NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);
