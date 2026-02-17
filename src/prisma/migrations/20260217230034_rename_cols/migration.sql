/*
  Warnings:

  - You are about to drop the column `compEnd` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `compStart` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `compType` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `employmentType` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `keySkills` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `lastUpdated` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `locationType` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `searchSource` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `interviewType` on the `Event` table. All the data in the column will be lost.
  - Added the required column `application_id` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_applicationId_fkey";

-- AlterTable
ALTER TABLE "Application" RENAME COLUMN "compEnd" TO "comp_end";
ALTER TABLE "Application" RENAME COLUMN "compStart" TO "comp_start";
ALTER TABLE "Application" RENAME COLUMN "compType" TO "comp_type";
ALTER TABLE "Application" RENAME COLUMN "createdAt" TO "created_at";
ALTER TABLE "Application" RENAME COLUMN "employmentType" TO "employment_type";
ALTER TABLE "Application" RENAME COLUMN "keySkills" TO "key_skills";
ALTER TABLE "Application" RENAME COLUMN "lastUpdated" TO "last_updated";
ALTER TABLE "Application" RENAME COLUMN "locationType" TO "location_type";
ALTER TABLE "Application" RENAME COLUMN "searchSource" TO "search_source";

-- AlterTable
ALTER TABLE "Event" RENAME COLUMN "applicationId" TO "application_id";
ALTER TABLE "Event" RENAME COLUMN "createdAt" TO "created_at";
ALTER TABLE "Event" RENAME COLUMN "interviewType" TO "interview_type";

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;
