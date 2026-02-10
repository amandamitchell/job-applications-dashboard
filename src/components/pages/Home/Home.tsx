import NextLink from "@/components/shared/NextLink";
import { SortOrder } from "@/generated/prisma/internal/prismaNamespace";
import { SortBy } from "@/types/types";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ApplicationsTable from "./ApplicationsTable/ApplicationsTable";

type HomeProps = {
  sortDir: SortOrder;
  sortBy: SortBy;
};

const Home = ({ children, sortBy, sortDir }: React.PropsWithChildren<HomeProps>) => {
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
        <ApplicationsTable sortBy={sortBy} sortDir={sortDir}>
          {children}
        </ApplicationsTable>
      </Container>
    </Box>
  );
};

export default Home;
