import NextLink from "@/components/shared/NextLink";
import StatusChip from "@/components/shared/StatusChip";
import { EventType } from "@/generated/prisma/enums";
import { ApplicationDetailData } from "@/lib/actions";
import {
  compTypeLabel,
  employmentTypeLabel,
  eventTypeLabel,
  formatRecruiterInfo,
  interviewTypeLabel,
  locationTypeLabel,
} from "@/lib/format";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CancelIcon from "@mui/icons-material/Cancel";
import CelebrationIcon from "@mui/icons-material/Celebration";
import EditIcon from "@mui/icons-material/Edit";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import EventIcon from "@mui/icons-material/Event";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import PaidIcon from "@mui/icons-material/Paid";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PlaceIcon from "@mui/icons-material/Place";
import ReplyIcon from "@mui/icons-material/Reply";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

type ApplicationDetailProps = {
  application: NonNullable<ApplicationDetailData>;
};

const ApplicationDetail = ({ application }: ApplicationDetailProps) => {
  const recrutierInfo = formatRecruiterInfo({
    recruiter: application.recruiter,
    recruitingCo: application.recruitingCo,
  });

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
            {!!application.events && application.events.length > 0 && (
              <>
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
                <TableContainer>
                  <Table sx={{ border: 1, borderColor: "divider" }}>
                    <TableBody>
                      {application.events.map((event) => (
                        <TableRow key={`${event.type}-${event.createdAt}`}>
                          <TableCell>
                            {event.type === EventType.APPLICATION && <MoveToInboxIcon color="primary" />}
                            {event.type === EventType.INTERVIEW && <EventIcon color="primary" />}
                            {event.type === EventType.SCHEDULE_REQUEST && <EditCalendarIcon color="secondary" />}
                            {event.type === EventType.FOLLOW_UP && <ReplyIcon color="secondary" />}
                            {event.type === EventType.FOLLOW_UP_SELF && <ReplyIcon color="primary" />}
                            {event.type === EventType.OFFER && <CelebrationIcon color="secondary" />}
                            {event.type === EventType.REJECTION && <CancelIcon color="secondary" />}
                            {event.type === EventType.AUTO_REJECTION && <CancelIcon color="secondary" />}
                            {event.type === EventType.WITHDRAWAL && <CancelIcon color="primary" />}
                          </TableCell>
                          <TableCell>{event.createdAt.toDateString()}</TableCell>
                          <TableCell>{eventTypeLabel(event.type)}</TableCell>
                          <TableCell>{!!event.interviewType && interviewTypeLabel(event.interviewType)}</TableCell>
                          <TableCell>{event.notes}</TableCell>
                          <TableCell align="right">
                            <Button
                              component={NextLink}
                              href={`/application/${application.id}/event/edit/${event.id}`}
                              variant="outlined"
                              color="secondary"
                              startIcon={<EditIcon />}
                              sx={{ whiteSpace: "nowrap" }}
                            >
                              Edit Event
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
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
              {/* <Button variant="outlined" startIcon={<DeleteIcon />}>
                                Delete
                            </Button> */}
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ApplicationDetail;
