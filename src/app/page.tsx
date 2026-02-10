import { Suspense } from "react";
import ApplicationsTableBodyRSC from "@/components/pages/Home/ApplicationsTable/ApplicationsTableBody.server";
import ApplicationsTableBodySkeleton from "@/components/pages/Home/ApplicationsTable/ApplicationsTableBodySkeleton";
import Home from "@/components/pages/Home/Home";
import { SortOrder } from "@/generated/prisma/internal/prismaNamespace";
import { SortBy } from "@/types/types";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{
    sortDir: SortOrder | undefined;
    sortBy: SortBy | undefined;
  }>;
}) {
  let { sortDir, sortBy } = await searchParams;
  if (!sortDir) sortDir = "desc";
  if (!sortBy) sortBy = "lastUpdated";

  return (
    <Home sortBy={sortBy} sortDir={sortDir}>
      <Suspense fallback={<ApplicationsTableBodySkeleton />}>
        <ApplicationsTableBodyRSC sortBy={sortBy} sortDir={sortDir} />
      </Suspense>
    </Home>
  );
}
