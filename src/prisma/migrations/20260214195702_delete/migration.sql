-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_applicationId_fkey";

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;
