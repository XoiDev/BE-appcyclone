-- AlterTable
ALTER TABLE `Customer` ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'customer';

-- AlterTable
ALTER TABLE `User` ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'user';
