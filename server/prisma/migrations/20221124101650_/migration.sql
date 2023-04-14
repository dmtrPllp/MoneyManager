/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Token` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Phone" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Token_userId_key" ON "Token"("userId");
