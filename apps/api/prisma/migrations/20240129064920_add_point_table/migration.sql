/*
  Warnings:

  - You are about to drop the column `expiryDate` on the `referralusages` table. All the data in the column will be lost.
  - You are about to drop the column `usageDate` on the `referralusages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `referralusages` DROP COLUMN `expiryDate`,
    DROP COLUMN `usageDate`;

-- CreateTable
CREATE TABLE `Points` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `point` INTEGER NOT NULL DEFAULT 10000,
    `expiryDate` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Points` ADD CONSTRAINT `Points_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
