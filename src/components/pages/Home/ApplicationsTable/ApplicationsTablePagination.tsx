"use client";

import { TablePagination } from "@mui/material";

type ApplicationsTablePaginationProps = {
  page: number;
  perPage: number;
  count: number;
  handlePageChange: (page: number) => void;
};

const ApplicationsTablePagination = ({ page, perPage, count, handlePageChange }: ApplicationsTablePaginationProps) => {
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
