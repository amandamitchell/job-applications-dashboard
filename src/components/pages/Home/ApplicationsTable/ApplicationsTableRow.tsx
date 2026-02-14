import NextLink from "@/components/shared/NextLink";
import StatusChip from "@/components/shared/StatusChip";
import { Status } from "@/generated/prisma/enums";
import type { ApplicationListData } from "@/lib/applications";
import { formatRecruiterInfo } from "@/lib/format";
import { Link, TableCell, TableRow } from "@mui/material";
import { grey, teal } from "@mui/material/colors";

type ApplicationsTableRowProps = {
  application: ApplicationListData["applications"][number];
};

const ApplicationsTableRow = ({ application }: ApplicationsTableRowProps) => {
  const getColor = () => {
    switch (application.status) {
      case Status.CLOSED:
      case Status.AUTO_REJECTED:
      case Status.WITHDRAWN:
      case Status.GHOSTED:
      case Status.REJECTED:
        return grey[300];
      case Status.INTERVIEWING:
      case Status.RECRUITER_SUBMIT:
        return teal[200];
    }
  };

  const recrutierInfo = formatRecruiterInfo({
    recruiter: application.recruiter,
    recruitingCo: application.recruitingCo,
  });

  return (
    <TableRow key={application.id} sx={{ bgcolor: getColor() }}>
      <TableCell>
        <Link component={NextLink} href={`/application/${application.id}`}>
          {application.employer}
        </Link>
      </TableCell>
      <TableCell>
        <Link component={NextLink} href={`/application/${application.id}`}>
          {application.title}
        </Link>
      </TableCell>
      <TableCell>
        {!!recrutierInfo && (
          <Link component={NextLink} href={`/application/${application.id}`}>
            {recrutierInfo}
          </Link>
        )}
      </TableCell>
      <TableCell>{application.createdAt.toLocaleDateString()}</TableCell>
      <TableCell>{application.lastUpdated.toLocaleDateString()}</TableCell>
      <TableCell>
        <StatusChip status={application.status} size="small" />
      </TableCell>
    </TableRow>
  );
};

export default ApplicationsTableRow;
