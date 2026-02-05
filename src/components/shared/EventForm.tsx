"use client";

import { useActionState } from "react";
import NextLink from "@/components/shared/NextLink";
import { EventType, InterviewType } from "@/generated/prisma/enums";
import { EventDetailData, saveEvent } from "@/lib/actions";
import { dateToFormField, interviewTypeLabel } from "@/lib/format";
import { Alert, Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";

type EventFormProps = {
  applicationId: number;
  event?: EventDetailData | null;
};

const EventForm = ({ applicationId, event = null }: EventFormProps) => {
  const [state, dispatch, isPending] = useActionState(saveEvent, { data: event, message: null });

  return (
    <form action={dispatch}>
      {!!state.message && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {state.message}
        </Alert>
      )}
      <input type="hidden" name="applicationId" value={applicationId} />
      {!!state.data?.id && <input type="hidden" name="eventId" value={state.data.id} />}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 9 }}>
          <FormControl fullWidth disabled={isPending} required>
            <InputLabel id="event-type-label">Event Type</InputLabel>
            <Select
              labelId="event-type-label"
              id="event-type"
              name="event-type"
              label="Event Type"
              defaultValue={state.data?.type}
            >
              <MenuItem value={EventType.APPLICATION}>Application</MenuItem>
              <MenuItem value={EventType.INTERVIEW}>Interview</MenuItem>
              <MenuItem value={EventType.SCHEDULE_REQUEST}>Schedule Request</MenuItem>
              <MenuItem value={EventType.FOLLOW_UP}>Follow Up (Them)</MenuItem>
              <MenuItem value={EventType.FOLLOW_UP_SELF}>Follow Up (Me)</MenuItem>
              <MenuItem value={EventType.OFFER}>Offer</MenuItem>
              <MenuItem value={EventType.REJECTION}>Rejection</MenuItem>
              <MenuItem value={EventType.WITHDRAWAL}>Withdrawal</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 9 }}>
          <FormControl fullWidth disabled={isPending}>
            <InputLabel id="interview-type-label">Interview Type</InputLabel>
            <Select
              labelId="interview-type-label"
              id="interview-type"
              name="interview-type"
              label="Interview Type"
              defaultValue={state.data?.interviewType || undefined}
            >
              <MenuItem>Select Interview Type</MenuItem>
              <MenuItem value={InterviewType.AUTO_CODE}>{interviewTypeLabel(InterviewType.AUTO_CODE)}</MenuItem>
              <MenuItem value={InterviewType.LIVE_CODE}>{interviewTypeLabel(InterviewType.LIVE_CODE)}</MenuItem>
              <MenuItem value={InterviewType.MANAGER}>{interviewTypeLabel(InterviewType.MANAGER)}</MenuItem>
              <MenuItem value={InterviewType.PRODUCT}>{interviewTypeLabel(InterviewType.PRODUCT)}</MenuItem>
              <MenuItem value={InterviewType.RECRUITER}>{interviewTypeLabel(InterviewType.RECRUITER)}</MenuItem>
              <MenuItem value={InterviewType.TAKE_HOME}>{interviewTypeLabel(InterviewType.TAKE_HOME)}</MenuItem>
              <MenuItem value={InterviewType.TECH}>{interviewTypeLabel(InterviewType.TECH)}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 9, md: 6 }}>
          <TextField
            label="Event Date"
            fullWidth
            name="createdAt"
            id="createdAt"
            type="date"
            defaultValue={dateToFormField(state.data?.createdAt)}
            disabled={isPending}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            label="Notes"
            fullWidth
            name="notes"
            id="notes"
            multiline
            defaultValue={state.data?.notes}
            disabled={isPending}
          />
        </Grid>
        <Grid size={12}>
          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained" color="primary" disabled={isPending}>
              Save
            </Button>
            <Button component={NextLink} href={`/application/${applicationId}`} variant="outlined">
              Cancel
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default EventForm;
