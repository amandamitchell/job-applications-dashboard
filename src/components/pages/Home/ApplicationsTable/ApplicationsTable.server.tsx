import { Status } from "@/generated/prisma/enums";
import { getApplications } from "@/lib/actions";
import { ApplicationSearchParams } from "@/types/types";
import ApplicationsTable from "./ApplicationsTable";

type ApplicationsTableRSCProps = Pick<
  ApplicationSearchParams,
  "page" | "perPage" | "query" | "search" | "sortBy" | "sortDir"
> & {
  status: Status[] | undefined;
};

const ApplicationsTableRSC = async ({
  sortDir,
  sortBy,
  page,
  perPage,
  status,
  query,
  search,
}: ApplicationsTableRSCProps) => {
  const { applications, count } = await getApplications({ sortDir, sortBy, page, perPage, status, query, search });
  return <ApplicationsTable applications={applications} count={count} />;
};

export default ApplicationsTableRSC;
