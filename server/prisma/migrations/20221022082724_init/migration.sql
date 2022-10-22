/*
  Warnings:

  - Added the required column `currencyTypeId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iconId` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "currencyTypeId" INTEGER NOT NULL,
ADD COLUMN     "iconId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Icon" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "ImagePath" TEXT NOT NULL,

    CONSTRAINT "Icon_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Currency" (
    "Id" SERIAL NOT NULL,
    "Type" TEXT NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Operation" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "accountId" INTEGER NOT NULL,
    "Sum" DECIMAL(65,30) NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Operation_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Category" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "IconPath" TEXT NOT NULL,
    "Type" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Icon_Name_key" ON "Icon"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_Type_key" ON "Currency"("Type");

-- CreateIndex
CREATE UNIQUE INDEX "Category_Name_key" ON "Category"("Name");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "Icon"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_currencyTypeId_fkey" FOREIGN KEY ("currencyTypeId") REFERENCES "Currency"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
