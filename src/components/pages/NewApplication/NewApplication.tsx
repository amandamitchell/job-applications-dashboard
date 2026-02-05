import ApplicationForm from "@/components/shared/ApplicationForm";
import {
  Box,
  Button,
  Chip,
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

const NewApplication = () => {
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
            New Job Application
          </Typography>
          <ApplicationForm />
        </Paper>
      </Container>
    </Box>
  );
};

export default NewApplication;
