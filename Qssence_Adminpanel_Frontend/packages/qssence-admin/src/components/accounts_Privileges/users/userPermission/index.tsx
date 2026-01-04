"use client";
import React, { useEffect, useState } from "react";
import { GridColDef, GridValidRowModel, GridRowModel } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import {
  AlertColor,
  Box,
  useTheme,
  Typography,
  TextField,
  Divider,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
} from "@mui/material";
import { getQueryParamAsString } from "@/utils/utilsFunction";
import { del, get } from "@/utils/ApiConfig";

interface PermissionData {
  id: string;
  permissionId: string;
  permission: string;
  type: string;
  accessLevel: string;
}

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

function UserPermission({ userData, open, setAlertHandler }: listProps) {
  const [project, setProject] = useState("");
  const [role, setRole] = useState("");
  const [qmsPermissions, setQmsPermissions] = useState<string[]>([]);
  const [qmsPermission, setQmsPermission] = useState<string[]>([]);

  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProject(e.target.value);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value);
  };

  const handlePermissionChange =
    (permission: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        setQmsPermissions((prev) => [...prev, permission]);
      } else {
        setQmsPermissions((prev) => prev.filter((perm) => perm !== permission));
      }
    };

  const handlePermissionChange1 =
    (permission: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        setQmsPermission((prev) => [...prev, permission]);
      } else {
        setQmsPermission((prev) => prev.filter((perm) => perm !== permission));
      }
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      project,
      role,
      qmsPermissions,
    };
    console.log("Form Data:", formData);
  };

  return (
    <>
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={2}>
            <Typography variant="h4" marginTop={3}>
              01. Project
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Project"
              value={project}
              onChange={handleProjectChange}
              fullWidth
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="h4" marginTop={3}>
              Role
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Role"
              value={role}
              onChange={handleRoleChange}
              fullWidth
              margin="normal"
              required
            />
          </Grid>
        </Grid>
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" sx={{ mt: 5, color: "#23608E" }}>
            QMS Permissions
          </Typography>
          <Divider sx={{ width: "16%" }} />
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={4}>
              <Typography variant="h4">Dashboards and Reports:</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h4">Workflow:</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h4">Document:</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ mt: 4 }}
                control={
                  <Checkbox
                    checked={qmsPermissions.includes("readDashboard")}
                    onChange={handlePermissionChange("readDashboard")}
                  />
                }
                label="Read Dashboard and Reports"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ mt: 4 }}
                control={
                  <Checkbox
                    checked={qmsPermissions.includes("start")}
                    onChange={handlePermissionChange("start")}
                  />
                }
                label="Start"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ mt: 4 }}
                control={
                  <Checkbox
                    checked={qmsPermissions.includes("cancelCheckout")}
                    onChange={handlePermissionChange("cancelCheckout")}
                  />
                }
                label="Cancel Checkout"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-40px" }}
                control={
                  <Checkbox
                    checked={qmsPermissions.includes("deleteDashboard")}
                    onChange={handlePermissionChange("deleteDashboard")}
                  />
                }
                label="Delete Dashboard"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-40px" }}
                control={
                  <Checkbox
                    checked={qmsPermissions.includes("participate")}
                    onChange={handlePermissionChange("participate")}
                  />
                }
                label="Participate"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-40px" }}
                control={
                  <Checkbox
                    checked={qmsPermissions.includes("downloadDocument")}
                    onChange={handlePermissionChange("downloadDocument")}
                  />
                }
                label="Download Document"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-50px" }}
                control={
                  <Checkbox
                    checked={qmsPermissions.includes("shareDashboards")}
                    onChange={handlePermissionChange("shareDashboards")}
                  />
                }
                label="Share Dashboards"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-50px" }}
                control={
                  <Checkbox
                    checked={qmsPermissions.includes("readUnderstand")}
                    onChange={handlePermissionChange("readUnderstand")}
                  />
                }
                label="Read and Understand"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-50px" }}
                control={
                  <Checkbox
                    checked={qmsPermissions.includes("downloadRendition")}
                    onChange={handlePermissionChange("downloadRendition")}
                  />
                }
                label="Download Rendition"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-60px" }}
                control={
                  <Checkbox
                    checked={qmsPermissions.includes("scheduleReports")}
                    onChange={handlePermissionChange("scheduleReports")}
                  />
                }
                label="Schedule Reports"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-60px" }}
                control={
                  <Checkbox
                    checked={qmsPermissions.includes("eSignature")}
                    onChange={handlePermissionChange("eSignature")}
                  />
                }
                label="eSignature"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-60px" }}
                control={
                  <Checkbox
                    checked={qmsPermissions.includes("bulkDelete")}
                    onChange={handlePermissionChange("bulkDelete")}
                  />
                }
                label="Bulk Delete"
              />
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  sx={{ marginTop: "-20px" }}
                  control={
                    <Checkbox
                      checked={qmsPermissions.includes("bulkUpdate")}
                      onChange={handlePermissionChange("bulkUpdate")}
                    />
                  }
                  label="Bulk Update"
                />
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={2}>
            <Typography variant="h4" marginTop={3}>
              Project
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Project"
              value={project}
              onChange={handleProjectChange}
              fullWidth
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="h4" marginTop={3}>
              Role
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Role"
              value={role}
              onChange={handleRoleChange}
              fullWidth
              margin="normal"
              required
            />
          </Grid>
        </Grid>
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" sx={{ mt: 5, color: "#23608E" }}>
            QMS Permissions
          </Typography>
          <Divider sx={{ width: "16%" }} />
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={4}>
              <Typography variant="h4">Dashboards and Reports:</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h4">Workflow:</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h4">Document:</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ mt: 4 }}
                control={
                  <Checkbox
                    checked={qmsPermission.includes("readDashboard")}
                    onChange={handlePermissionChange1("readDashboard")}
                  />
                }
                label="Read Dashboards and Reports"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ mt: 4 }}
                control={
                  <Checkbox
                    checked={qmsPermission.includes("start")}
                    onChange={handlePermissionChange1("start")}
                  />
                }
                label="Start"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ mt: 4 }}
                control={
                  <Checkbox
                    checked={qmsPermission.includes("cancelCheckout")}
                    onChange={handlePermissionChange1("cancelCheckout")}
                  />
                }
                label="Cancel Checkout"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-40px" }}
                control={
                  <Checkbox
                    checked={qmsPermission.includes("deleteDashboard")}
                    onChange={handlePermissionChange1("deleteDashboard")}
                  />
                }
                label="Delete Dashboards"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-40px" }}
                control={
                  <Checkbox
                    checked={qmsPermission.includes("participate")}
                    onChange={handlePermissionChange1("participate")}
                  />
                }
                label="Participate"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-40px" }}
                control={
                  <Checkbox
                    checked={qmsPermission.includes("downloadDocument")}
                    onChange={handlePermissionChange1("downloadDocument")}
                  />
                }
                label="Download Document"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-50px" }}
                control={
                  <Checkbox
                    checked={qmsPermission.includes("shareDashboards")}
                    onChange={handlePermissionChange1("shareDashboards")}
                  />
                }
                label="Share Dashboards"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-50px" }}
                control={
                  <Checkbox
                    checked={qmsPermission.includes("readUnderstand")}
                    onChange={handlePermissionChange1("readUnderstand")}
                  />
                }
                label="Read and Understand"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-50px" }}
                control={
                  <Checkbox
                    checked={qmsPermission.includes("downloadRendition")}
                    onChange={handlePermissionChange1("downloadRendition")}
                  />
                }
                label="Download Rendition"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-60px" }}
                control={
                  <Checkbox
                    checked={qmsPermission.includes("scheduleReports")}
                    onChange={handlePermissionChange1("scheduleReports")}
                  />
                }
                label="Schedule Reports"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-60px" }}
                control={
                  <Checkbox
                    checked={qmsPermission.includes("eSignature")}
                    onChange={handlePermissionChange1("eSignature")}
                  />
                }
                label="eSignature"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-60px" }}
                control={
                  <Checkbox
                    checked={qmsPermission.includes("bulkDelete")}
                    onChange={handlePermissionChange1("bulkDelete")}
                  />
                }
                label="Bulk Delete"
              />
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  sx={{ marginTop: "-20px" }}
                  control={
                    <Checkbox
                      checked={qmsPermission.includes("bulkUpdate")}
                      onChange={handlePermissionChange1("bulkUpdate")}
                    />
                  }
                  label="Bulk Update"
                />
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}
export default UserPermission;
