import { ApplicationListData } from "@/lib/actions";
import { TableBody } from "@mui/material";
import ApplicationsTableRow from "./ApplicationsTableRow";

type ApplicationsTableBodyProps = {
  applications: ApplicationListData;
};

const ApplicationsTableBody = ({ applications }: ApplicationsTableBodyProps) => {
  return (
    <TableBody>
      {applications.map((application) => (
        <ApplicationsTableRow key={application.id} application={application} />
      ))}
    </TableBody>
  );
};

export default ApplicationsTableBody;
