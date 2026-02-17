-- AlterTable
ALTER TABLE "applications" RENAME CONSTRAINT "Application_pkey" TO "applications_pkey";

-- AlterTable
ALTER TABLE "events" RENAME CONSTRAINT "Event_pkey" TO "events_pkey";

-- RenameForeignKey
ALTER TABLE "events" RENAME CONSTRAINT "Event_application_id_fkey" TO "events_application_id_fkey";
