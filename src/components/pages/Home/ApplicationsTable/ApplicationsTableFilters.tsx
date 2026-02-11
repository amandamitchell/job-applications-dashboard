"use client";

import React, { useRef, useState } from "react";
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
  SelectChangeEvent,
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

  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const getAnchorElement = () => {
    return filterButtonRef.current;
  };

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

  const [searchQuery, setSearchQuery] = useState(searchParams.get("query"));
  const [searchField, setSearchField] = useState(searchParams.get("search") || "employer");

  const handleSearchButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSearchQueryChange(searchQuery, searchField);
  };

  return (
    <Box sx={{ mt: 1, mb: 2 }}>
      <Stack direction="row" spacing={4}>
        <Stack direction="row" spacing={1}>
          <TextField
            size="small"
            label="Search Field"
            name="search-query"
            id="search-query"
            defaultValue={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchQuery(e.currentTarget.value);
            }}
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
              value={searchField}
              onChange={(e: SelectChangeEvent) => {
                setSearchField(e.target.value);
              }}
              sx={{ bgcolor: "white" }}
            >
              <MenuItem value="employer" selected={searchField === "employer"}>
                Employer
              </MenuItem>
              <MenuItem value="title" selected={searchField === "title"}>
                Job Title
              </MenuItem>
              <MenuItem value="recruiter" selected={searchField === "recruiter"}>
                Recruiter Name
              </MenuItem>
              <MenuItem value="recruitingCo" selected={searchField === "recruitingCo"}>
                Recruiting Company
              </MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="secondary" onClick={handleSearchButtonClick} startIcon={<SearchIcon />}>
            Search
          </Button>
        </Stack>
        <Button
          variant="contained"
          color="secondary"
          ref={filterButtonRef}
          onClick={handleFilterButtonClick}
          startIcon={<FilterListIcon />}
        >
          Filter
        </Button>
        <Menu open={isOpen} anchorEl={getAnchorElement} onClose={handleClose}>
          <ListSubheader>Status</ListSubheader>
          {Object.keys(Status).map((s) => (
            <MenuItem key={s} id={s} onClick={handleMenuClick} selected={searchParams.get("status") === s} dense>
              {statusLabel(s as Status)}
            </MenuItem>
          ))}
        </Menu>
      </Stack>
    </Box>
  );
};

export default ApplicationsTableFilters;
