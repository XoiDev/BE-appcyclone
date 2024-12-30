/*
  Warnings:

  - Added the required column `desc` to the `Discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Discount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Discount` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `desc` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
