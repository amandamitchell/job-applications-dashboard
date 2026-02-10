import { SortOrder } from "@/generated/prisma/internal/prismaNamespace";
import { getApplications } from "@/lib/actions";
import ApplicationsTableBody from "./ApplicationsTableBody";

type ApplicationsTableBodyRSCProps = {
  sortDir: SortOrder | undefined;
  sortBy: "createdAt";
};

const ApplicationsTableBodyRSC = async ({ sortDir, sortBy }: ApplicationsTableBodyRSCProps) => {
  const applications = await getApplications({ sortDir });
  return <ApplicationsTableBody applications={applications} />;
};

export default ApplicationsTableBodyRSC;
