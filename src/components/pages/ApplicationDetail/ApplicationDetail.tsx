"use client";

import { useMemo, useState } from "react";
import NextLink from "@/components/shared/NextLink";
import StatusChip from "@/components/shared/StatusChip";
import { EventType } from "@/generated/prisma/enums";
import { type ApplicationDetailData, deleteApplication } from "@/lib/applications";
import {
  compTypeLabel,
  employmentTypeLabel,
  formatRecruiterInfo,
  locationTypeLabel,
  resumeVersionLabel,
  searchSourceLabel,
} from "@/lib/format";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PaidIcon from "@mui/icons-material/Paid";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PlaceIcon from "@mui/icons-material/Place";
import { Box, Button, Container, Divider, Paper, Stack, Typography } from "@mui/material";
import DeleteConfirmation from "./DeleteConfirmation";
import EventsList from "./EventsList";

type ApplicationDetailProps = {
  application: NonNullable<ApplicationDetailData>;
};

const ApplicationDetail = ({ application }: ApplicationDetailProps) => {
  const [confirmIsOpen, setConfirmIsOpen] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setConfirmIsOpen(true);
  };

  const handleClose = () => {
    setConfirmIsOpen(false);
  };

  const handleConfirm = () => {
    deleteApplication(application.id);
  };

  const recrutierInfo = formatRecruiterInfo({
    recruiter: application.recruiter,
    recruitingCo: application.recruitingCo,
  });

  const timeSinceApplication = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const applied = new Date(application.createdAt.toISOString());
    applied.setHours(0, 0, 0, 0);
    const timeDiff = today.getTime() - applied.getTime();
    const timeDiffDays = timeDiff / (1000 * 60 * 60 * 24);
    return Math.floor(timeDiffDays);
  }, [application.createdAt]);

  const timeSinceFirstResponse = useMemo(() => {
    const firstResponse = application.events.filter(
      (e) =>
        e.type === EventType.AUTO_REJECTION ||
        e.type === EventType.SCHEDULE_REQUEST ||
        e.type === EventType.FOLLOW_UP ||
        e.type === EventType.INTERVIEW,
    );
    if (firstResponse.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const firstResponseTime = new Date(firstResponse[firstResponse.length - 1].createdAt.toISOString());
      firstResponseTime.setHours(0, 0, 0, 0);
      const timeDiff = today.getTime() - firstResponseTime.getTime();
      const timeDiffDays = timeDiff / (1000 * 60 * 60 * 24);
      return Math.floor(timeDiffDays);
    }
    return null;
  }, [application.events]);

  const timeSinceLastAction = useMemo(() => {
    if (application.events.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const lastActionTime = new Date(application.events[0].createdAt.toISOString());
      lastActionTime.setHours(0, 0, 0, 0);
      const timeDiff = today.getTime() - lastActionTime.getTime();
      const timeDiffDays = timeDiff / (1000 * 60 * 60 * 24);
      return Math.floor(timeDiffDays);
    }
  }, [application.events]);

  return (
    <Box sx={{ bgcolor: "background.default", px: 3 }}>
      <Container
        sx={{
          px: { xs: 0, md: 0 },
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
        maxWidth="lg"
        component="main"
      >
        <Paper sx={{ flex: "1 1 100%", display: "flex", flexDirection: "column" }}>
          <Box sx={{ flex: "1 1 100%", py: { xs: 3, md: 4 }, px: { xs: 3, sm: 4, md: 6 } }}>
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <Box sx={{ flex: "1 1 auto" }}>
                {!!application.employer && (
                  <Typography variant="h1" component="h1" sx={{ mb: 1 }}>
                    {application.employer}
                  </Typography>
                )}
                {!!application.title && (
                  <Typography variant="h2" component="h2" sx={{ mb: recrutierInfo ? 1 : 3 }}>
                    {application.title}
                  </Typography>
                )}
                {!!recrutierInfo && (
                  <Typography variant={application.title ? "h3" : "h2"} component="h2" sx={{ mb: 3 }}>
                    {`via ${recrutierInfo}`}
                  </Typography>
                )}
              </Box>
              <Box sx={{ flex: "0 0 auto" }}>
                <StatusChip status={application.status} />
              </Box>
            </Stack>
            <Stack direction="row" spacing={4}>
              <Stack direction="row" spacing={1} sx={{ flex: "1 1 33%" }}>
                {!!application.compStart && (
                  <>
                    <PaidIcon color="primary" />
                    <Typography variant="body1">
                      {`$${application.compStart.toLocaleString()}${application.compEnd ? `–$${application.compEnd.toLocaleString()}` : ``} ${application.compType ? compTypeLabel(application.compType) : ``}`}
                    </Typography>
                  </>
                )}
              </Stack>

              <Stack direction="row" spacing={1} sx={{ flex: "1 1 33%" }}>
                {!!application.employmentType && (
                  <>
                    <PendingActionsIcon color="primary" />
                    <Typography variant="body1">{employmentTypeLabel(application.employmentType)}</Typography>
                  </>
                )}
              </Stack>
              <Stack direction="row" spacing={1} sx={{ flex: "1 1 33%" }}>
                {(!!application.locationType || !!application.location) && (
                  <>
                    <PlaceIcon color="primary" />
                    <Typography variant="body1">
                      {!!application.locationType && locationTypeLabel(application.locationType)}
                      {!!application.location && ` – ${application.location}`}
                    </Typography>
                  </>
                )}
              </Stack>
            </Stack>
            <Divider sx={{ mt: 2, mb: 4 }} />
            {(!!application.keySkills || !!application.yoe || !!application.notes) && (
              <>
                <Typography variant="h3" component="h3" gutterBottom>
                  Details
                </Typography>
                {!!application.keySkills && <Typography variant="body1">{application.keySkills}</Typography>}
                {!!application.yoe && <Typography variant="body1">{`${application.yoe} YOE`}</Typography>}
                {!!application.notes && (
                  <Typography variant="body1" sx={{ fontStyle: "italic" }}>
                    {application.notes}
                  </Typography>
                )}
              </>
            )}

            <Stack direction="row" sx={{ mt: 6, mb: 2, alignItems: "center", justifyContent: "space-between" }}>
              <Typography variant="h3" component="h3">
                Timeline
              </Typography>
              <Button
                variant="contained"
                component={NextLink}
                href={`/application/${application.id}/event/new`}
                startIcon={<AddCircleIcon />}
              >
                Add Event
              </Button>
            </Stack>
            {!!application.events && application.events.length > 0 && (
              <EventsList applicationId={application.id} events={application.events} />
            )}

            <Typography variant="h4" component="h3" gutterBottom sx={{ mt: 4 }}>
              Stats
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
              {!!application.searchSource && `Found through ${searchSourceLabel(application.searchSource)}`}
              {`${application.searchSource ? `, applied` : `Applied`} on ${application.createdAt.toLocaleDateString()}`}
              {!!application.resume && ` with resume ${resumeVersionLabel(application.resume)}`}.
            </Typography>
            <Typography variant="body2" component="p">
              {`Applied ${timeSinceApplication} ${timeSinceApplication === 1 ? `day` : `days`} ago`}
            </Typography>
            {timeSinceFirstResponse !== null && (
              <Typography variant="body2" component="p">
                {`First response ${timeSinceFirstResponse} ${timeSinceFirstResponse === 1 ? `day` : `days`} ago - ${timeSinceApplication - timeSinceFirstResponse} day response time`}
              </Typography>
            )}
            {timeSinceLastAction !== null && (
              <Typography variant="body2" component="p">
                {`Last activity ${timeSinceLastAction} ${timeSinceLastAction === 1 ? `day` : `days`} ago - ${timeSinceApplication - (timeSinceLastAction || 0)} day span`}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              p: 2,
              bgcolor: "grey.100",
              borderTop: 1,
              borderTopColor: "grey.200",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button component={NextLink} href="/" startIcon={<ArrowBackIcon />}>
              Back to List
            </Button>
            <Stack direction="row" spacing={2}>
              <Button
                component={NextLink}
                href={`/application/${application.id}/edit/`}
                variant="contained"
                color="secondary"
                startIcon={<EditIcon />}
              >
                Edit Job
              </Button>
              <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleDeleteClick}>
                Delete
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
      <DeleteConfirmation type="application" open={confirmIsOpen} onClose={handleClose} onConfirm={handleConfirm} />
    </Box>
  );
};

export default ApplicationDetail;
