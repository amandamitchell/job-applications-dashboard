import { Status } from "@/generated/prisma/enums";
import { statusLabel } from "@/lib/format";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Chip } from "@mui/material";

type StatusChipProps = {
  status: Status;
  size?: "small" | "medium";
};

const StatusChip = ({ status, size = "medium" }: StatusChipProps) => {
  if (status === Status.APPLIED) {
    return <Chip size={size} label={statusLabel(Status.APPLIED)} color="info" icon={<AddCircleIcon />} />;
  }

  if (status === Status.INTERVIEWING) {
    return <Chip size={size} label={statusLabel(Status.INTERVIEWING)} color="warning" icon={<AccountCircleIcon />} />;
  }

  if (status === Status.OFFERED) {
    return <Chip size={size} label={statusLabel(Status.OFFERED)} color="success" icon={<CheckCircleIcon />} />;
  }

  if (status === Status.REJECTED) {
    return <Chip size={size} label={statusLabel(Status.REJECTED)} color="error" icon={<CancelIcon />} />;
  }

  if (status === Status.WITHDRAWN) {
    return <Chip size={size} label={statusLabel(Status.WITHDRAWN)} color="error" icon={<CancelIcon />} />;
  }

  if (status === Status.ACCEPTED) {
    return <Chip size={size} label={statusLabel(Status.ACCEPTED)} color="success" icon={<CheckCircleIcon />} />;
  }

  if (status === Status.CLOSED) {
    return <Chip size={size} label={statusLabel(Status.CLOSED)} color="error" icon={<CancelIcon />} />;
  }

  return <></>;
};

export default StatusChip;
