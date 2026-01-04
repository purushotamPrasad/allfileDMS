import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {  IconArrowsDiagonalMinimize2,  IconFileText, IconX } from "@tabler/icons-react";
import { Badge, IconButton, Typography } from "@mui/material";

interface ResizablePopupProps {
    classes?: { resizable: string };
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    dialogContent: React.ReactNode;
    buttonText: string;
    dialogTitle: string;
    title:string;
}

const ResizablePopup: React.FC<ResizablePopupProps> = ({ classes,open,setOpen,title,dialogContent,dialogTitle,buttonText }) => {
    // const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleToggleWidth = () => {
        setFullWidth(!fullWidth);
    };

    return (
        <div>
            <IconButton
            size="large"
            aria-label="show 11 new notifications"
            color="inherit"
            aria-controls="msgs-menu"
            aria-haspopup="true"
            onClick={handleClickOpen}
            style={{padding:"0px"}}
          >
              <IconFileText size="21" stroke="1.5" />
          </IconButton>
            {/* <Button onClick={handleClickOpen}>{buttonText}</Button> */}
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={fullWidth === false}
                fullScreen={fullWidth === true}
                aria-labelledby="form-dialog-title"
                sx={{ "& .MuiDialog-paper": { minWidth: "70%" }}}
            >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <DialogTitle id="form-dialog-title" style={{ fontWeight: "700" }}>{dialogTitle}</DialogTitle>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", paddingRight: "24px" }}>
                        <IconArrowsDiagonalMinimize2 height={18} width={18} onClick={handleToggleWidth} />
                        <IconX height={18} width={18} onClick={handleClose} />
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 24px" }}>
                    <Typography style={{ fontSize: "14px" }}>{title}</Typography>
                    <Button variant="outlined">Setting </Button>
                </div>
                <DialogContent style={{ padding: "16px 0 0",height:fullWidth===true?"100%":"500px" }}>
                   {dialogContent}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ResizablePopup;
