import { Skeleton, TableBody, TableCell, TableRow } from "@mui/material";

const ApplicationsTableBodySkeleton = () => {
  return (
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
  );
};

export default ApplicationsTableBodySkeleton;
