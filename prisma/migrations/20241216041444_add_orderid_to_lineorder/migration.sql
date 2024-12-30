/*
  Warnings:

  - Added the required column `orderId` to the `LineOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `LineOrder` ADD COLUMN `orderId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `LineOrder` ADD CONSTRAINT `LineOrder_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
