-- CreateTable
CREATE TABLE `ProductDiscount` (
    `productId` INTEGER NOT NULL,
    `discountId` INTEGER NOT NULL,

    PRIMARY KEY (`productId`, `discountId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductDiscount` ADD CONSTRAINT `ProductDiscount_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductDiscount` ADD CONSTRAINT `ProductDiscount_discountId_fkey` FOREIGN KEY (`discountId`) REFERENCES `Discount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
