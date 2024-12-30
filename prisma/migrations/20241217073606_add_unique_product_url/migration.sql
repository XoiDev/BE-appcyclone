/*
  Warnings:

  - A unique constraint covering the columns `[url,productId]` on the table `ProductImage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ProductImage_url_productId_key` ON `ProductImage`(`url`, `productId`);
