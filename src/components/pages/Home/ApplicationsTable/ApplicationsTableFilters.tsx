"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Status } from "@/generated/prisma/enums";
import { statusLabel } from "@/lib/format";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  ListSubheader,
  Menu,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

type ApplicationsTableFiltersProps = {
  handleStatusChange: (newStatus: string) => void;
  handleSearchQueryChange: (newSearchQuery: string | null, newSearchField: string) => void;
};

const ApplicationsTableFilters = ({ handleStatusChange, handleSearchQueryChange }: ApplicationsTableFiltersProps) => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [menuAnchorElem, setMenuAnchorElem] = useState<Element | null>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMenuAnchorElem(filterButtonRef.current);
  }, []);

  const handleFilterButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleMenuClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    handleStatusChange(e.currentTarget.id);
    setIsOpen(false);
  };

  const handleSearchFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    handleSearchQueryChange(
      formData.get("search-query")?.toString() || null,
      formData.get("search-field")?.toString() || "employer",
    );
  };

  return (
    <Box sx={{ mt: 1, mb: 2 }}>
      <Stack direction="row" spacing={4}>
        <form onSubmit={handleSearchFormSubmit}>
          <Stack direction="row" spacing={1}>
            <TextField
              size="small"
              label="Search Field"
              name="search-query"
              id="search-query"
              defaultValue={searchParams.get("query") || ""}
              sx={{ bgcolor: "white" }}
            />
            <FormControl>
              <InputLabel id="search-field-label">Search Field</InputLabel>
              <Select
                labelId="search-field-label"
                label="Search Field"
                name="search-field"
                id="search-field"
                size="small"
                defaultValue={searchParams.get("search") || "employer"}
                sx={{ bgcolor: "white" }}
              >
                <MenuItem value="employer">Employer</MenuItem>
                <MenuItem value="title">Job Title</MenuItem>
                <MenuItem value="recruiter">Recruiter Name</MenuItem>
                <MenuItem value="recruitingCo">Recruiting Company</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="secondary" startIcon={<SearchIcon />}>
              Search
            </Button>
          </Stack>
        </form>
        <Button
          variant="contained"
          color="secondary"
          ref={filterButtonRef}
          onClick={handleFilterButtonClick}
          startIcon={<FilterListIcon />}
        >
          Filter
        </Button>
        <Menu open={isOpen} anchorEl={menuAnchorElem} onClose={handleClose}>
          <ListSubheader>Status</ListSubheader>
          {Object.keys(Status).map((s) => (
            <MenuItem
              key={s}
              id={s}
              onClick={handleMenuClick}
              selected={searchParams.getAll("status").includes(s)}
              dense
            >
              {statusLabel(s as Status)}
            </MenuItem>
          ))}
        </Menu>
      </Stack>
    </Box>
  );
};

export default ApplicationsTableFilters;
