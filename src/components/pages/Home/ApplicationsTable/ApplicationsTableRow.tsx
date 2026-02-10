import NextLink from "@/components/shared/NextLink";
import StatusChip from "@/components/shared/StatusChip";
import { Status } from "@/generated/prisma/enums";
import { ApplicationListData } from "@/lib/actions";
import { formatRecruiterInfo } from "@/lib/format";
import { Link, TableCell, TableRow } from "@mui/material";
import { amber, grey, red } from "@mui/material/colors";

type ApplicationsTableRowProps = {
  application: ApplicationListData[number];
};

const ApplicationsTableRow = ({ application }: ApplicationsTableRowProps) => {
  const getColor = () => {
    switch (application.status) {
      case Status.CLOSED:
      case Status.AUTO_REJECTED:
      case Status.WITHDRAWN:
      case Status.GHOSTED:
        return grey[300];
      case Status.REJECTED:
        return red[100];
      case Status.INTERVIEWING:
      case Status.RECRUITER_SUBMIT:
        return amber[200];
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
