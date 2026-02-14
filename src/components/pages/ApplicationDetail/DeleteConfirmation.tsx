import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

type DeleteConfirmationProps = {
  type: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteConfirmation = ({ type, open, onClose, onConfirm }: DeleteConfirmationProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{`Are you sure you want to delete this ${type}?`}</DialogTitle>
      <DialogActions>
        <Button variant="contained" onClick={onConfirm} autoFocus>
          Delete
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmation;
