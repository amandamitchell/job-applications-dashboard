/*
  Warnings:

  - You are about to drop the column `recruitingCo` on the `Application` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Application" RENAME COLUMN "recruitingCo" TO "recruiting_co";
