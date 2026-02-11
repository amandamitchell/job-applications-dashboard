import { Suspense } from "react";
import ApplicationsTableRSC from "@/components/pages/Home/ApplicationsTable/ApplicationsTable.server";
import ApplicationsTableSkeleton from "@/components/pages/Home/ApplicationsTable/ApplicationsTableSkeleton";
import Home from "@/components/pages/Home/Home";
import { ApplicationSearchParams } from "@/types/types";

export default async function HomePage({ searchParams }: { searchParams: Promise<ApplicationSearchParams> }) {
  const { sortDir, sortBy, page, perPage, status, query, search } = await searchParams;

  return (
    <Home>
      <Suspense fallback={<ApplicationsTableSkeleton />}>
        <ApplicationsTableRSC
          sortBy={sortBy}
          sortDir={sortDir}
          page={page}
          perPage={perPage}
          status={status}
          query={query}
          search={search}
        />
      </Suspense>
    </Home>
  );
}
