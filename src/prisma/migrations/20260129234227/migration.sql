/*
  Warnings:

  - You are about to drop the column `self` on the `Event` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "EventType" ADD VALUE 'FOLLOW_UP_SELF';

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "self";
