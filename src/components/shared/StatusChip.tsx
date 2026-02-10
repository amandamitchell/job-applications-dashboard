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
  if (status === Status.APPLIED || status === Status.RECRUITER_CONVO) {
    return <Chip size={size} label={statusLabel(status)} color="info" icon={<AddCircleIcon />} />;
  }

  if (status === Status.INTERVIEWING || status === Status.RECRUITER_SUBMIT) {
    return <Chip size={size} label={statusLabel(status)} color="warning" icon={<AccountCircleIcon />} />;
  }

  if (status === Status.OFFERED || status === Status.ACCEPTED) {
    return <Chip size={size} label={statusLabel(status)} color="success" icon={<CheckCircleIcon />} />;
  }

  if (status === Status.REJECTED || status === Status.WITHDRAWN || status === Status.CLOSED) {
    return <Chip size={size} label={statusLabel(status)} color="error" icon={<CancelIcon />} />;
  }

  return <></>;
};

export default StatusChip;
