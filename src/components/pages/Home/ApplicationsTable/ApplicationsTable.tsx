"use client";

import { useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SortOrder } from "@/generated/prisma/internal/prismaNamespace";
import { Backdrop, Paper, Table, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@mui/material";

type ApplicationsTableProps = {
  sortDir: SortOrder;
  sortBy: "createdAt";
};

const ApplicationsTable = ({ children, sortDir, sortBy }: React.PropsWithChildren<ApplicationsTableProps>) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSortClick = () => {
    const newSortDir = sortDir === "asc" ? "desc" : "asc";
    startTransition(() => {
      router.push(`${pathname}?sortDir=${newSortDir}`);
    });
  };

  return (
    <>
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
          {children}
        </Table>
      </TableContainer>
      <Backdrop open={isPending} />
    </>
  );
};

export default ApplicationsTable;
