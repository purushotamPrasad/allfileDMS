import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { IconPlus } from "@tabler/icons-react";
import { IconX } from "@tabler/icons-react";

interface CommonDialogProps {
  buttonText: string;
  dialogTitle: string;
  dialogContent: React.ReactNode;
  onSave: () => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CommonDialogTemplate: React.FC<CommonDialogProps> = ({
  buttonText,
  dialogTitle,
  dialogContent,
  onSave,
  open,
  setOpen,
}: CommonDialogProps) => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen}
        style={{ color: "white", backgroundColor: "#23608E" }}
      >
        <IconPlus height={18} width={18} /> &nbsp;
        {buttonText}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "80%",
            width: "40%",
            minWidth: "60%",
          },
        }}
      >
        {dialogTitle !== "" ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: "2rem",
              paddingTop: "0.5rem",
            }}
          >
            <DialogTitle sx={{ fontSize: "20px", fontWeight: "700", paddingBottom:"0px" }}>
              {dialogTitle}
            </DialogTitle>
            <IconX height={20} width={20} style={{cursor:"pointer"}} onClick={handleClose} />
          </div>
        ) : null}

        <DialogContent>{dialogContent}</DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default CommonDialogTemplate;
