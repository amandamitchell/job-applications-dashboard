"use client";

import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SortOrder } from "@/generated/prisma/internal/prismaNamespace";
import type { ApplicationListData } from "@/lib/actions";
import { SortBy } from "@/types/types";
import { Backdrop, Paper, Table, TableBody, TableContainer } from "@mui/material";
import ApplicationsTableHead from "./ApplicationsTableHead";
import ApplicationsTablePagination from "./ApplicationsTablePagination";
import ApplicationsTableRow from "./ApplicationsTableRow";

type ApplicationsTableProps = {
  applications: ApplicationListData["applications"];
  count: number;
  sortDir: SortOrder;
  sortBy: SortBy;
  page: number;
  perPage: number;
};

const ApplicationsTable = ({ applications, count, sortDir, sortBy, page, perPage }: ApplicationsTableProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleParamsChange = (param: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(param, value);
    startTransition(() => {
      router.push(`${pathname}?${newSearchParams.toString()}`);
    });
  };

  const handlePageChange = (newPage: number) => {
    handleParamsChange("page", newPage.toString());
  };

  const handleSortDirChange = () => {
    handleParamsChange("sortDir", sortDir === "desc" ? "asc" : "desc");
  };

  const handleSortByChange = (newSortBy: string) => {
    handleParamsChange("sortBy", newSortBy);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <ApplicationsTableHead
            sortBy={sortBy}
            sortDir={sortDir}
            handleSortDirChange={handleSortDirChange}
            handleSortByChange={handleSortByChange}
          />
          <TableBody>
            {applications.map((application) => (
              <ApplicationsTableRow key={application.id} application={application} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ApplicationsTablePagination page={page} perPage={perPage} count={count} handlePageChange={handlePageChange} />
      <Backdrop open={isPending} />
    </>
  );
};

export default ApplicationsTable;
