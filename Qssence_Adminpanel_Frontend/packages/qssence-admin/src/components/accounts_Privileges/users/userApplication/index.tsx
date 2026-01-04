import { AlertColor, Checkbox, Grid, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";

interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle?: string;
}

interface listProps {
  open: boolean;
  userData: any;
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
}

const UserApplications = ({ userData, open, setAlertHandler }: listProps) => {
  const [checkboxes, setCheckboxes] = useState({
    allowAccess: false,
    dms: false,
    lms: false,
    qms: false,
  });

  const handleAllowAccessChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.target.checked;
    setCheckboxes({
      allowAccess: isChecked,
      dms: isChecked,
      lms: isChecked,
      qms: isChecked,
    });
  };

  const handleIndividualCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = event.target;
    setCheckboxes((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          md={10}
          sx={{
            borderBottom: "2px solid #23608E",
          }}
        >
          <Typography variant="h4">Application</Typography>
        </Grid>

        <Grid
          item
          xs={12}
          md={2}
          sx={{
            borderBottom: "2px solid #23608E",
          }}
        >
          <Typography variant="h4">Allow Access</Typography>
          <Checkbox
            checked={checkboxes.allowAccess}
            onChange={handleAllowAccessChange}
          />
        </Grid>

        <Grid item xs={12} md={10}>
          <Typography variant="h6">DMS</Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <Checkbox
            name="dms"
            checked={checkboxes.dms}
            onChange={handleIndividualCheckboxChange}
          />
        </Grid>

        <Grid item xs={12} md={10}>
          <Typography variant="h6">LMS</Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <Checkbox
            name="lms"
            checked={checkboxes.lms}
            onChange={handleIndividualCheckboxChange}
          />
        </Grid>

        <Grid item xs={12} md={10}>
          <Typography variant="h6">QMS</Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <Checkbox
            name="qms"
            checked={checkboxes.qms}
            onChange={handleIndividualCheckboxChange}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default UserApplications;
