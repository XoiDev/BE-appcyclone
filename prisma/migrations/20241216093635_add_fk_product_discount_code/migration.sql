-- CreateTable
CREATE TABLE `ProductDiscountCodes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `discountCodeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductDiscountCodes` ADD CONSTRAINT `ProductDiscountCodes_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductDiscountCodes` ADD CONSTRAINT `ProductDiscountCodes_discountCodeId_fkey` FOREIGN KEY (`discountCodeId`) REFERENCES `DiscountCode`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
