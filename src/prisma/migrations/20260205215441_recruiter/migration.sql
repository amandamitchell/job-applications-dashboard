-- AlterEnum
ALTER TYPE "EventType" ADD VALUE 'RECRUITER';

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "recruiter" TEXT,
ADD COLUMN     "recrutingCo" TEXT;
