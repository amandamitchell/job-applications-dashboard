"use client";

import { useActionState, useState } from "react";
import NextLink from "@/components/shared/NextLink";
import { CompType, EmploymentType, LocationType, ResumeVersion, SearchSource, Status } from "@/generated/prisma/enums";
import { ApplicationDetailData } from "@/lib/actions";
import { saveApplication } from "@/lib/actions";
import { dateToFormField, statusLabel } from "@/lib/format";
import {
  Alert,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

type ApplicationFormProps = {
  application?: ApplicationDetailData;
};

const ApplicationForm = ({ application = null }: ApplicationFormProps) => {
  const [state, dispatch, isPending] = useActionState(saveApplication, { data: application, message: null });

  const createdAtInput = dateToFormField(state.data?.createdAt);

  return (
    <form action={dispatch}>
      {!!state.message && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {state.message}
        </Alert>
      )}
      {!!state.data?.id && <input type="hidden" name="id" value={state.data.id} />}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 9 }}>
          <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
            Main Information
          </Typography>
          <TextField
            label="Employer"
            fullWidth
            name="employer"
            id="employer"
            defaultValue={state.data?.employer}
            disabled={isPending}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 9 }}>
          <TextField
            label="Job Title"
            fullWidth
            name="title"
            id="title"
            defaultValue={state.data?.title}
            disabled={isPending}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 9 }}>
          <TextField
            label="Recruiting Company"
            fullWidth
            name="recruiting-company"
            id="recruiting-company"
            defaultValue={state.data?.recruitingCo}
            disabled={isPending}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 9 }}>
          <TextField
            label="Recruiter Name"
            fullWidth
            name="recruiter"
            id="recruiter"
            defaultValue={state.data?.recruiter}
            disabled={isPending}
          />
        </Grid>
        <Grid size={{ xs: 9, md: 6 }}>
          <TextField
            label="Date Applied"
            fullWidth
            name="createdAt"
            id="createdAt"
            type="date"
            defaultValue={createdAtInput}
            disabled={isPending}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <FormControl disabled={isPending} required>
            <InputLabel id="search-source-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              name="status"
              label="Status"
              defaultValue={state.data?.status || Status.APPLIED}
              sx={{ minWidth: "15rem" }}
            >
              {Object.keys(Status).map((s) => (
                <MenuItem value={s} key={s}>
                  {statusLabel(s as Status)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={12}>
          <Typography component="h2" variant="h6" sx={{ mt: 2, mb: 1 }}>
            Compensation
          </Typography>
          <FormControl>
            <FormLabel id="employment-type-group-label">Employment Type</FormLabel>
            <RadioGroup
              aria-labelledby="employment-type-group-label"
              name="employment-type"
              row
              defaultValue={state.data?.employmentType}
            >
              <FormControlLabel value={EmploymentType.FTE} label="FTE" control={<Radio />} />
              <FormControlLabel value={EmploymentType.CONTRACT} label="Contract" control={<Radio />} />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl>
            <FormLabel id="location-type-group-label">Location Type</FormLabel>
            <RadioGroup
              aria-labelledby="location-type-group-label"
              name="location-type"
              row
              defaultValue={state.data?.locationType}
            >
              <FormControlLabel value={LocationType.REMOTE} label="Remote" control={<Radio />} />
              <FormControlLabel value={LocationType.HYBRID} label="Hybrid" control={<Radio />} />
              <FormControlLabel value={LocationType.ONSITE} label="On-site" control={<Radio />} />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }} sx={{ pt: { xs: 0, md: 1 } }}>
          <TextField name="location" id="location" label="Location" fullWidth />
        </Grid>
        <Grid size={12}>
          <FormLabel id="compensation">Compensation Range</FormLabel>
          <Stack
            direction={{ xs: "column", md: "row" }}
            gap={2}
            sx={{ mt: 2, alignItems: { xs: "flex-start", md: "center" } }}
          >
            <Stack direction="row" gap={2} sx={{ alignItems: "center" }}>
              <TextField
                name="compensation-start"
                id="compensation-start"
                label="Start Range"
                defaultValue={state.data?.compStart}
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  },
                }}
                sx={{ maxWidth: "10em" }}
              />
              <span>&ndash;</span>
              <TextField
                name="compensation-end"
                id="compensation-end"
                label="End Range"
                defaultValue={state.data?.compEnd}
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  },
                }}
                sx={{ maxWidth: "10em" }}
              />
            </Stack>
            <FormControl>
              <RadioGroup name="compensation-type" row defaultValue={state.data?.compType}>
                <FormControlLabel value={CompType.YEARLY} label="Yearly" control={<Radio />} />
                <FormControlLabel value={CompType.HOURLY} label="Hourly" control={<Radio />} />
              </RadioGroup>
            </FormControl>
          </Stack>
        </Grid>
        <Grid size={{ xs: 9, md: 6 }}>
          <Typography component="h2" variant="h6" sx={{ mt: 2, mb: 1 }}>
            Role Details
          </Typography>
          <TextField label="YOE" fullWidth name="yoe" id="yoe" defaultValue={state.data?.yoe} disabled={isPending} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            label="Key Skills"
            fullWidth
            name="key-skills"
            id="key-skills"
            defaultValue={state.data?.keySkills}
            disabled={isPending}
            multiline
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            label="Notes"
            fullWidth
            name="notes"
            id="notes"
            defaultValue={state.data?.notes}
            disabled={isPending}
            multiline
          />
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <Typography component="h2" variant="h6" sx={{ mt: 2, mb: 1 }}>
            Search Details
          </Typography>
          <FormControl fullWidth disabled={isPending}>
            <InputLabel id="search-source-label">Search Source</InputLabel>
            <Select
              labelId="search-source-label"
              id="search-source"
              name="search-source"
              label="Search Source"
              defaultValue={state.data?.searchSource || undefined}
            >
              <MenuItem value={undefined}>Select Search Source</MenuItem>
              <MenuItem value={SearchSource.LINKEDIN}>Linked In</MenuItem>
              <MenuItem value={SearchSource.HIRINGCAFE}>Hiring Cafe</MenuItem>
              <MenuItem value={SearchSource.BUILTIN}>Built In</MenuItem>
              <MenuItem value={SearchSource.INDEED}>Indeed</MenuItem>
              <MenuItem value={SearchSource.RECRUITER}>Direct via Recruiter</MenuItem>
              <MenuItem value={SearchSource.REFERRAL}>Direct via Referral</MenuItem>
              <MenuItem value={SearchSource.INTERNAL}>Internal</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <FormControl disabled={isPending} fullWidth>
            <InputLabel id="search-source-label">Resume Version</InputLabel>
            <Select
              labelId="resume-version-label"
              id="resume-version"
              name="resume-version"
              label="Resume Version"
              defaultValue={state.data?.resume || undefined}
            >
              <MenuItem value={undefined}>Select Resume Version</MenuItem>
              <MenuItem value={ResumeVersion.FRONTEND_3}>Frontend 3</MenuItem>
              <MenuItem value={ResumeVersion.FULLSTACK_3}>Fullstack 3</MenuItem>
              <MenuItem value={ResumeVersion.ECOMM_3}>Ecomm 3</MenuItem>
              <MenuItem value={ResumeVersion.FRONTEND_2}>Frontend 2</MenuItem>
              <MenuItem value={ResumeVersion.FULLSTACK_2}>Fullstack 2</MenuItem>
              <MenuItem value={ResumeVersion.ECOMM_2}>Ecomm 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={12}>
          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained" color="primary" disabled={isPending}>
              Save
            </Button>
            <Button
              component={NextLink}
              href={application?.id ? `/application/${application.id}` : `/`}
              variant="outlined"
            >
              Cancel
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default ApplicationForm;
