-- AlterTable
ALTER TABLE `Order` ADD COLUMN `discountCodeId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_discountCodeId_fkey` FOREIGN KEY (`discountCodeId`) REFERENCES `DiscountCode`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
