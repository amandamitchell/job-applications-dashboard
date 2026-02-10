import { SortOrder } from "@/generated/prisma/internal/prismaNamespace";
import { getApplications } from "@/lib/actions";
import { SortBy } from "@/types/types";
import ApplicationsTable from "./ApplicationsTable";

type ApplicationsTableRSCProps = {
  sortDir: SortOrder;
  sortBy: SortBy;
  page: number;
  perPage: number;
};

const ApplicationsTableRSC = async ({ sortDir, sortBy, page, perPage }: ApplicationsTableRSCProps) => {
  const { applications, count } = await getApplications({ sortDir, sortBy, page, perPage });
  return (
    <ApplicationsTable
      applications={applications}
      count={count}
      sortBy={sortBy}
      sortDir={sortDir}
      page={page}
      perPage={perPage}
    />
  );
};

export default ApplicationsTableRSC;
