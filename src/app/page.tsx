import { Suspense } from "react";
import ApplicationsTableRSC from "@/components/pages/Home/ApplicationsTable/ApplicationsTable.server";
import ApplicationsTableSkeleton from "@/components/pages/Home/ApplicationsTable/ApplicationsTableSkeleton";
import Home from "@/components/pages/Home/Home";
import { SortOrder } from "@/generated/prisma/internal/prismaNamespace";
import { SortBy } from "@/types/types";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{
    sortDir: SortOrder | undefined;
    sortBy: SortBy | undefined;
    page: number | undefined;
    perPage: number | undefined;
  }>;
}) {
  let { sortDir, sortBy, page, perPage } = await searchParams;
  if (!sortDir) sortDir = "desc";
  if (!sortBy) sortBy = "lastUpdated";
  if (!page) page = 1;
  if (!perPage) perPage = 25;

  return (
    <Home>
      <Suspense fallback={<ApplicationsTableSkeleton />}>
        <ApplicationsTableRSC sortBy={sortBy} sortDir={sortDir} page={page} perPage={perPage} />
      </Suspense>
    </Home>
  );
}
