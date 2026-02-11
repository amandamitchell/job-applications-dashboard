"use client";

import { useSearchParams } from "next/navigation";
import { TablePagination } from "@mui/material";

type ApplicationsTablePaginationProps = {
  count: number;
  handlePageChange: (page: number) => void;
};

const ApplicationsTablePagination = ({ count, handlePageChange }: ApplicationsTablePaginationProps) => {
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1");
  const perPage = parseInt(searchParams.get("perPage") || "25");

  return (
    <TablePagination
      component="div"
      page={page - 1}
      rowsPerPage={perPage}
      count={count}
      onPageChange={(_, page) => {
        handlePageChange(page + 1);
      }}
    />
  );
};

export default ApplicationsTablePagination;
