/*
  Warnings:

  - You are about to drop the column `type` on the `Event` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('FTE', 'CONTRACT');

-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('ONSITE', 'REMOTE', 'HYBRID');

-- CreateEnum
CREATE TYPE "CompType" AS ENUM ('YEARLY', 'HOURLY');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('APPLIED', 'INTERVIEWING', 'OFFERED', 'REJECTED', 'WITHDRAWN', 'ACCEPTED', 'CLOSED');

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "compEnd" DOUBLE PRECISION,
ADD COLUMN     "compStart" DOUBLE PRECISION,
ADD COLUMN     "compType" "CompType",
ADD COLUMN     "employmentType" "EmploymentType",
ADD COLUMN     "keySkills" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "locationType" "LocationType",
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'APPLIED',
ADD COLUMN     "yoe" TEXT;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "type",
ADD COLUMN     "notes" TEXT;
