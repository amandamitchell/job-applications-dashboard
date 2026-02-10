/*
  Warnings:

  - You are about to drop the column `recrutingCo` on the `Application` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'RECRUITER';

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "recrutingCo",
ADD COLUMN     "recruitingCo" TEXT;
