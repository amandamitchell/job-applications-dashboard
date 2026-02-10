import { SortOrder } from "@/generated/prisma/internal/prismaNamespace";
import { getApplications } from "@/lib/actions";
import { SortBy } from "@/types/types";
import ApplicationsTableBody from "./ApplicationsTableBody";

type ApplicationsTableBodyRSCProps = {
  sortDir: SortOrder | undefined;
  sortBy: SortBy;
};

const ApplicationsTableBodyRSC = async ({ sortDir, sortBy }: ApplicationsTableBodyRSCProps) => {
  const applications = await getApplications({ sortDir, sortBy });
  return <ApplicationsTableBody applications={applications} />;
};

export default ApplicationsTableBodyRSC;
