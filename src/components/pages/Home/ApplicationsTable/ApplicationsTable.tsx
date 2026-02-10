"use client";

import { useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SortOrder } from "@/generated/prisma/internal/prismaNamespace";
import { SortBy } from "@/types/types";
import { Backdrop, Paper, Table, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@mui/material";

type ApplicationsTableProps = {
  sortDir: SortOrder;
  sortBy: SortBy;
};

const ApplicationsTable = ({ children, sortDir, sortBy }: React.PropsWithChildren<ApplicationsTableProps>) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSortClick = (newSortBy: string) => {
    const newSortDir = sortDir === "asc" ? "desc" : "asc";
    startTransition(() => {
      router.push(`${pathname}?sortDir=${newSortBy === sortBy ? newSortDir : sortDir}&sortBy=${newSortBy}`);
    });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sortDirection={sortBy === "employer" ? sortDir : undefined}>
                <TableSortLabel
                  active={sortBy === "employer"}
                  direction={sortBy === "employer" ? sortDir : undefined}
                  onClick={() => handleSortClick("employer")}
                >
                  Employer
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={sortBy === "title" ? sortDir : undefined}>
                <TableSortLabel
                  active={sortBy === "title"}
                  direction={sortBy === "title" ? sortDir : undefined}
                  onClick={() => handleSortClick("title")}
                >
                  Title
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={sortBy === "recruiter" ? sortDir : undefined}>
                <TableSortLabel
                  active={sortBy === "recruiter"}
                  direction={sortBy === "recruiter" ? sortDir : undefined}
                  onClick={() => handleSortClick("recruiter")}
                >
                  3rd Party Recruiter
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={sortBy === "createdAt" ? sortDir : undefined}>
                <TableSortLabel
                  active={sortBy === "createdAt"}
                  direction={sortBy === "createdAt" ? sortDir : undefined}
                  onClick={() => handleSortClick("createdAt")}
                >
                  Date Applied
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={sortBy === "lastUpdated" ? sortDir : undefined}>
                <TableSortLabel
                  active={sortBy === "lastUpdated"}
                  direction={sortBy === "lastUpdated" ? sortDir : undefined}
                  onClick={() => handleSortClick("lastUpdated")}
                >
                  Last Response
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={sortBy === "status" ? sortDir : undefined}>
                <TableSortLabel
                  active={sortBy === "status"}
                  direction={sortBy === "status" ? sortDir : undefined}
                  onClick={() => handleSortClick("status")}
                >
                  Status
                </TableSortLabel>
              </TableCell>
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
