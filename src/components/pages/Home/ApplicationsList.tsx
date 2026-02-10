"use client";

import { usePathname, useRouter } from "next/navigation";
import NextLink from "@/components/shared/NextLink";
import StatusChip from "@/components/shared/StatusChip";
import { Status } from "@/generated/prisma/enums";
import { SortOrder } from "@/generated/prisma/internal/prismaNamespace";
import { ApplicationListData } from "@/lib/actions";
import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { amber, red } from "@mui/material/colors";

type ApplicationsListProps = {
  applications: ApplicationListData;
  sortDir: SortOrder | undefined;
  sortBy: "createdAt";
};

const ApplicationsList = ({ applications, sortDir, sortBy }: ApplicationsListProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const getColor = (status: ApplicationListData[number]["status"]) => {
    switch (status) {
      case Status.CLOSED:
      case Status.REJECTED:
      case Status.WITHDRAWN:
        return red[100];
      case Status.INTERVIEWING:
        return amber[200];
    }
  };

  const handleSortClick = () => {
    const newSortDir = sortDir === "asc" ? "desc" : "asc";
    router.push(`${pathname}?sortDir=${newSortDir}`);
  };

  if (!applications.length) return null;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Employer</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>3rd Party Recruiter</TableCell>
            <TableCell sortDirection={sortBy === "createdAt" ? sortDir : undefined}>
              <TableSortLabel
                active={sortBy === "createdAt"}
                direction={sortBy === "createdAt" ? sortDir : undefined}
                id="createdAt"
                onClick={() => handleSortClick()}
              >
                Date Applied
              </TableSortLabel>
            </TableCell>
            <TableCell>Last Response</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id} sx={{ bgcolor: getColor(application.status) }}>
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
                {(!!application.recruiter || !!application.recruitingCo) && (
                  <Link component={NextLink} href={`/application/${application.id}`}>
                    {!!application.recruiter && !application.recruitingCo && application.recruiter}
                    {!!application.recruitingCo && !application.recruiter && application.recruitingCo}
                    {!!application.recruitingCo &&
                      !!application.recruiter &&
                      `${application.recruiter} at ${application.recruitingCo}`}
                  </Link>
                )}
              </TableCell>
              <TableCell>{application.createdAt.toLocaleDateString()}</TableCell>
              <TableCell>{application.events[0]?.createdAt.toLocaleDateString()}</TableCell>
              <TableCell>
                <StatusChip status={application.status} size="small" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ApplicationsList;
