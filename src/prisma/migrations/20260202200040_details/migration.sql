-- CreateEnum
CREATE TYPE "InterviewType" AS ENUM ('RECRUITER', 'MANAGER', 'TECH', 'PRODUCT', 'LIVE_CODE', 'AUTO_CODE', 'TAKE_HOME');

-- CreateEnum
CREATE TYPE "SearchSource" AS ENUM ('LINKEDIN', 'HIRINGCAFE', 'BUILTIN', 'INDEED', 'RECRUITER', 'REFERRAL', 'INTERNAL');

-- CreateEnum
CREATE TYPE "ResumeVersion" AS ENUM ('FRONTEND_2', 'FULLSTACK_2', 'ECOMM_2', 'FRONTEND_3', 'FULLSTACK_3', 'ECOMM_3');

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "resume" "ResumeVersion",
ADD COLUMN     "searchSource" "SearchSource";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "interviewType" "InterviewType";
