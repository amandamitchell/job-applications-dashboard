import ApplicationsList from "@/components/pages/Home/ApplicationsList";
import NextLink from "@/components/shared/NextLink";
import { SortOrder } from "@/generated/prisma/internal/prismaNamespace";
import { ApplicationListData } from "@/lib/actions";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

type HomeProps = {
  applications: ApplicationListData;
  sortDir: SortOrder | undefined;
  sortBy: "createdAt";
};

const Home = ({ applications, sortDir, sortBy }: HomeProps) => {
  return (
    <Box sx={{ bgcolor: "background.default", px: 3 }}>
      <Container
        sx={{
          px: { xs: 0, md: 0 },
          py: 2,
          minHeight: "100vh",
        }}
        maxWidth="xl"
        component="main"
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h1" component="h1">
            Job Applications
          </Typography>
          <Button variant="contained" component={NextLink} href="/application/new">
            Add New
          </Button>
        </Stack>
        <ApplicationsList applications={applications} sortDir={sortDir} sortBy={sortBy} />
      </Container>
    </Box>
  );
};

export default Home;
