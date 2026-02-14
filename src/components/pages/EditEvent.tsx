import EventForm from "@/components/shared/EventForm";
import type { EventDetailData } from "@/lib/events";
import { Box, Container, Divider, Paper, Typography } from "@mui/material";

type EditEventProps = {
  applicationId: number;
  employer: string | null;
  title: string | null;
  event: EventDetailData | null;
};

const EditEvent = ({ applicationId, employer, title, event }: EditEventProps) => {
  return (
    <Box sx={{ bgcolor: "background.default", px: 3 }}>
      <Container
        sx={{
          px: { xs: 0, md: 0 },
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
        maxWidth="md"
        component="main"
      >
        <Paper
          sx={{
            flex: "1 1 100%",
            display: "flex",
            flexDirection: "column",
            py: { xs: 3, md: 4 },
            px: { xs: 3, sm: 4, md: 6 },
          }}
        >
          {!!employer && (
            <Typography variant="h1" component="h1">
              {employer}
            </Typography>
          )}
          {!!title && (
            <Typography variant="h2" component="h2" sx={{ mt: employer ? 1 : 0 }}>
              {title}
            </Typography>
          )}
          {(!!employer || !!title) && <Divider sx={{ mt: 2, mb: 3 }} />}

          <Typography variant="h3" component="h3" sx={{ mb: 3 }}>
            Add New Event
          </Typography>
          <EventForm applicationId={applicationId} event={event} />
        </Paper>
      </Container>
    </Box>
  );
};

export default EditEvent;
