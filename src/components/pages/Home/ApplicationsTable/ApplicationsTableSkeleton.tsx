import { Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const ApplicationsTableSkeleton = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Employer</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>3rd Party Recruiter</TableCell>
            <TableCell>Date Applied</TableCell>
            <TableCell>Last Response</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {new Array(5).fill("").map((_, i) => (
            <TableRow key={i}>
              {new Array(6).fill("").map((_, j) => (
                <TableCell key={j}>
                  <Skeleton variant="text" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ApplicationsTableSkeleton;
