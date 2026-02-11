"use client";

import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ApplicationListData } from "@/lib/actions";
import { ApplicationSearchParams } from "@/types/types";
import { Backdrop, Paper, Table, TableBody, TableContainer } from "@mui/material";
import ApplicationsTableFilters from "./ApplicationsTableFilters";
import ApplicationsTableHead from "./ApplicationsTableHead";
import ApplicationsTablePagination from "./ApplicationsTablePagination";
import ApplicationsTableRow from "./ApplicationsTableRow";

type ApplicationsTableProps = {
  applications: ApplicationListData["applications"];
  count: number;
};

const ApplicationsTable = ({ applications, count }: ApplicationsTableProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const sortDir = (searchParams.get("sortDir") as ApplicationSearchParams["sortDir"]) || "desc";

  const handleParamsChange = (params: [string, string | null][]) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    for (const [param, value] of params) {
      if (!value) {
        newSearchParams.delete(param);
      } else {
        newSearchParams.set(param, value);
      }
    }
    startTransition(() => {
      router.push(`${pathname}?${newSearchParams.toString()}`);
    });
  };

  const handlePageChange = (newPage: number) => {
    handleParamsChange([["page", newPage.toString()]]);
  };

  const handleSortDirChange = () => {
    handleParamsChange([["sortDir", sortDir === "desc" ? "asc" : "desc"]]);
  };

  const handleSortByChange = (newSortBy: string) => {
    handleParamsChange([["sortBy", newSortBy]]);
  };

  const handleStatusChange = (newStatus: string) => {
    if (newStatus === searchParams.get("status")) {
      handleParamsChange([["status", null]]);
    } else {
      handleParamsChange([["status", newStatus]]);
    }
  };

  const handleSearchQueryChange = (newSearchQuery: string | null, newSearchField: string) => {
    if (!newSearchQuery) {
      handleParamsChange([
        ["query", null],
        ["search", null],
      ]);
    } else {
      handleParamsChange([
        ["query", newSearchQuery],
        ["search", newSearchField],
      ]);
    }
  };

  return (
    <>
      <ApplicationsTableFilters
        handleStatusChange={handleStatusChange}
        handleSearchQueryChange={handleSearchQueryChange}
      />
      <TableContainer component={Paper}>
        <Table>
          <ApplicationsTableHead handleSortDirChange={handleSortDirChange} handleSortByChange={handleSortByChange} />
          <TableBody>
            {applications.map((application) => (
              <ApplicationsTableRow key={application.id} application={application} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ApplicationsTablePagination count={count} handlePageChange={handlePageChange} />
      <Backdrop open={isPending} />
    </>
  );
};

export default ApplicationsTable;
