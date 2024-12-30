/*
  Warnings:

  - You are about to drop the column `productId` on the `Discount` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Discount` DROP FOREIGN KEY `Discount_productId_fkey`;

-- AlterTable
ALTER TABLE `Discount` DROP COLUMN `productId`;
