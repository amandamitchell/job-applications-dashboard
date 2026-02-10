"use client";

import { SortOrder } from "@/generated/prisma/internal/prismaNamespace";
import { SortBy } from "@/types/types";
import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";

type ApplicationsTableHeadProps = {
  sortDir: SortOrder;
  sortBy: SortBy;
  handleSortDirChange: () => void;
  handleSortByChange: (newSortBy: string) => void;
};

const ApplicationsTableHead = ({
  sortDir,
  sortBy,
  handleSortDirChange,
  handleSortByChange,
}: ApplicationsTableHeadProps) => {
  const handleSortClick = (newSortBy: string) => {
    if (sortBy !== newSortBy) {
      handleSortByChange(newSortBy);
    } else {
      handleSortDirChange();
    }
  };

  return (
    <>
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
    </>
  );
};

export default ApplicationsTableHead;
