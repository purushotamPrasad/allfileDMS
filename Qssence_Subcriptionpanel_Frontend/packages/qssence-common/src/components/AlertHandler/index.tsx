'use client'
import React, { useEffect, useState } from "react";
import Alert, { AlertColor } from '@mui/material/Alert';
// import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import { Snackbar } from "@mui/material";

interface AlertHandlerProps {
  alertHandler: {
    hasAlert: boolean;
    alertType: AlertColor;
    alertMessage: string;
    alertTitle?: string;
  };
}

const AlertHandler: React.FC<AlertHandlerProps> = ({ alertHandler }) => {
  const [show, setShow] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>("success");

  useEffect(() => {
    setShow(false);
    if (alertHandler.hasAlert) {
      setShow(true);
      setSeverity(alertHandler.alertType);
    }
  }, [alertHandler]);

  const handleClose = (_event: any ,reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setShow(false);
  }  

  const vertical = 'bottom';
  const horizontal = 'center';

  return (
    <Snackbar
      autoHideDuration={3000}
      open={show}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
      TransitionComponent={Slide}
    >
      <Alert
        variant="filled"
        severity={severity}
        // action={
        //   <IconButton
        //     aria-label="close"
        //     color="inherit"
        //     size="small"
        //     onClick={handleClose}
        //   >
        //     <CloseIcon fontSize="inherit" />
        //   </IconButton>
        // }
      >
        {alertHandler.alertMessage}
      </Alert>
    </Snackbar>
  );
}

export default AlertHandler;
