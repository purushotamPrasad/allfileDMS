"use client"
import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const ToggleUIWithConfirmation = () => {
  const [enabled, setEnabled] = useState(false);
  const [confirmDisable, setConfirmDisable] = useState(false);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setEnabled(true);
    } else {
      setConfirmDisable(true);
    }
  };

  const handleCancelDisable = () => {
    setConfirmDisable(false);
  };

  const handleConfirmDisable = () => {
    setConfirmDisable(false);
    setEnabled(false);
  };

  return (
    <div>
      <FormControlLabel
        control={
          <Switch
            checked={enabled}
            onChange={handleSwitchChange}
            color="primary"
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
        label={enabled ? 'Disabled' : 'Enabled'}
      />
      <Dialog
      sx={{p:"1"}}
        open={confirmDisable}
        onClose={handleCancelDisable}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Disable provider?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to disable the provider
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDisable} color="primary">
            Cancel
          </Button>
          <Button  variant="contained" onClick={handleConfirmDisable} color="primary" autoFocus>
            Yes, Disable
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ToggleUIWithConfirmation;
