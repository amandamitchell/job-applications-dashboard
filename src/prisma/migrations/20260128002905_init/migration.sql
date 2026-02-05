-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "employer" TEXT,
    "title" TEXT,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);
