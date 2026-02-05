import ApplicationForm from "@/components/shared/ApplicationForm";
import { ApplicationDetailData } from "@/lib/actions";
import { Box, Container, Paper, Typography } from "@mui/material";

type EditApplicationProps = {
  application: NonNullable<ApplicationDetailData>;
};

const EditApplication = ({ application }: EditApplicationProps) => {
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
          <Typography variant="h1" component="h1" sx={{ mb: 4 }}>
            Edit Application
          </Typography>
          <ApplicationForm application={application} />
        </Paper>
      </Container>
    </Box>
  );
};

export default EditApplication;
