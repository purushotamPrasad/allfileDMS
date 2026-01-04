import { getQueryParamAsString } from "@/utils/utilsFunction";
import {
  AlertColor,
  Box,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Checkbox,
  FormControlLabel,
  SelectChangeEvent,
} from "@mui/material";
import axios from "axios"; // Replace http with axios for requests
import React, { useEffect, useState } from "react";

interface listProps {
  open: boolean;
  permissionData: any;
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
}

interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle?: string;
}

const ApplicationPermission = ({
  permissionData,
  open,
  setAlertHandler,
}: listProps) => {
  const [Data, setData] = useState("");
  const uid = getQueryParamAsString("uid");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/group/getGroupByUserId/${uid}` // Assuming you're fetching groups by user id
        );
        const formattedData = data.map((data: any, key: number) => ({
          id: key + 1,
          groupId: data.id,
          name: data.name,
          description: "Lorem ipsum dolor sit amet consectetur",
          status: "Active",
        }));
        setData(formattedData);
      } catch (error) {
        console.log(error);
      }
    };

    if (uid) {
      fetchData();
    }
  }, [uid, open]);

  const [role, setRole] = useState("");
  const [group, setGroup] = useState("");
  const [fullPermission, setFullPermission] = useState(false);
  const [dmsPermissions, setDmsPermissions] = useState<string[]>([]);

  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  const handleGroupChange = (event: SelectChangeEvent) => {
    setGroup(event.target.value as string);
  };

  const handlePermissionChange =
    (permission: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        setDmsPermissions((prev) => [...prev, permission]);
      } else {
        setDmsPermissions((prev) => prev.filter((perm) => perm !== permission));
      }
    };

  const handleFullPermissionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFullPermission(e.target.checked);
    if (e.target.checked) {
      setDmsPermissions([
        "All",
        "AllWorkflow",
        "AllDoc",
        "ReadDashboardReports",
        "Start",
        "CancelCheckout",
        "CreateDashboard",
        "Participate",
        "DownloadDashboard",
        "DeleteDashboard",
        "ReadUnderstand",
        "DownloadRendition",
        "ShareDashboard",
        "eSignature",
        "BulkDelete",
        "ScheduleReports",
        "Query",
        "BulkUpdate",
        "AdministerDashboard",
        "AllowWorkflowAdmin",
        "AlwaysAllowUnclassified",
        "DisplayApiDashboard",
        "Cancel",
        "DmsFileManager",
        "ReadGroupMember",
        "ViewActive",
        "Reassign",
        "UpdateParticipants",
        "EmailParticipant",
        "UpdateWorkflowDates",
        "ReplaceWorkflowOwner",
      ]);
    } else {
      setDmsPermissions([]);
    }
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Typography variant="h5" fontSize={16}>
            Role
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select value={role} onChange={handleRoleChange}>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="guest">Guest</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={5}>
          <Typography variant="h5" fontSize={16}>
            Groups
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Groups</InputLabel>
            <Select value={group} onChange={handleGroupChange}>
              <MenuItem value="group1">Group 1</MenuItem>
              <MenuItem value="group2">Group 2</MenuItem>
              <MenuItem value="group3">Group 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} md={2}>
          <Typography
            variant="h4"
            color={"primary"}
            fontSize={16}
            borderBottom={"1px solid blue"}
            width={"fit-content"}
          >
            DMS Permissions
          </Typography>
        </Grid>
        <Grid item xs={12} md={2} mt={-1}>
          <Box display={"flex"}>
            <Checkbox
              checked={fullPermission}
              onChange={handleFullPermissionChange}
            />
            <Typography mt={1.5} variant="h6">
              Full permission
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid>
        <form>
          <Grid container spacing={3} sx={{ mt: 0 }}>
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
                sx={{ mt: 2 }}
                control={
                  <Checkbox
                    checked={dmsPermissions.includes("All")}
                    onChange={handlePermissionChange("All")}
                  />
                }
                label="All"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ mt: 2 }}
                control={
                  <Checkbox
                    checked={dmsPermissions.includes("AllWorkflow")}
                    onChange={handlePermissionChange("AllWorkflow")}
                  />
                }
                label="All Workflow"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ mt: 2 }}
                control={
                  <Checkbox
                    checked={dmsPermissions.includes("AllDoc")}
                    onChange={handlePermissionChange("AllDoc")}
                  />
                }
                label="All"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-40px" }}
                control={
                  <Checkbox
                    checked={dmsPermissions.includes("ReadDashboardReports")}
                    onChange={handlePermissionChange("ReadDashboardReports")}
                  />
                }
                label="Read Dashboards and Reports"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-40px" }}
                control={
                  <Checkbox
                    checked={dmsPermissions.includes("Start")}
                    onChange={handlePermissionChange("Start")}
                  />
                }
                label="Start"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-40px" }}
                control={
                  <Checkbox
                    checked={dmsPermissions.includes("CancelCheckout")}
                    onChange={handlePermissionChange("CancelCheckout")}
                  />
                }
                label="Cancel Checkout"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-50px" }}
                control={
                  <Checkbox
                    checked={dmsPermissions.includes("CreateDashboard")}
                    onChange={handlePermissionChange("CreateDashboard")}
                  />
                }
                label="Create Dashboards"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-50px" }}
                control={
                  <Checkbox
                    checked={dmsPermissions.includes("Participate")}
                    onChange={handlePermissionChange("Participate")}
                  />
                }
                label="Participate"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-50px" }}
                control={
                  <Checkbox
                    checked={dmsPermissions.includes("DownloadDashboard")}
                    onChange={handlePermissionChange("DownloadDashboard")}
                  />
                }
                label="Download Document"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-60px" }}
                control={
                  <Checkbox
                    checked={dmsPermissions.includes("DeleteDashboard")}
                    onChange={handlePermissionChange("DeleteDashboard")}
                  />
                }
                label="Delete Dashboards"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-60px" }}
                control={
                  <Checkbox
                    checked={dmsPermissions.includes("ReadUnderstand")}
                    onChange={handlePermissionChange("ReadUnderstand")}
                  />
                }
                label="Read and Understand"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-60px" }}
                control={
                  <Checkbox
                    checked={dmsPermissions.includes("DownloadRendition")}
                    onChange={handlePermissionChange("DownloadRendition")}
                  />
                }
                label="Download Rendition"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-70px" }}
                control={
                  <Checkbox
                    checked={dmsPermissions.includes("ShareDashboard")}
                    onChange={handlePermissionChange("ShareDashboard")}
                  />
                }
                label="Share Dashboards"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-70px" }}
                control={
                  <Checkbox
                    checked={dmsPermissions.includes("eSignature")}
                    onChange={handlePermissionChange("eSignature")}
                  />
                }
                label="eSignature"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-70px" }}
                control={
                  <Checkbox
                    checked={dmsPermissions.includes("BulkDelete")}
                    onChange={handlePermissionChange("BulkDelete")}
                  />
                }
                label="Bulk Delete"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-80px" }}
                control={
                  <Checkbox
                    checked={dmsPermissions.includes("ScheduleReports")}
                    onChange={handlePermissionChange("ScheduleReports")}
                  />
                }
                label="Schedule Reports"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-80px" }}
                control={
                  <Checkbox
                    checked={dmsPermissions.includes("Query")}
                    onChange={handlePermissionChange("Query")}
                  />
                }
                label="Query"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-80px" }}
                control={
                  <Checkbox
                    checked={dmsPermissions.includes("BulkUpdate")}
                    onChange={handlePermissionChange("BulkUpdate")}
                  />
                }
                label="Bulk Update"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-90px" }}
                control={
                  <Checkbox
                    checked={dmsPermissions.includes("AdministerDashboard")}
                    onChange={handlePermissionChange("AdministerDashboard")}
                  />
                }
                label="Administer Dashboards"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-90px" }}
                control={
                  <Checkbox
                    checked={dmsPermissions.includes("AllowWorkflowAdmin")}
                    onChange={handlePermissionChange("AllowWorkflowAdmin")}
                  />
                }
                label="Allow Workflow Admin"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-90px" }}
                control={
                  <Checkbox
                    checked={dmsPermissions.includes("AlwaysAllowUnclassified")}
                    onChange={handlePermissionChange("AlwaysAllowUnclassified")}
                  />
                }
                label="Always Allow Unclassified"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-100px" }}
                control={
                  <Checkbox
                    checked={dmsPermissions.includes("DisplayApiDashboard")}
                    onChange={handlePermissionChange("DisplayApiDashboard")}
                  />
                }
                label="Display Api Dashboards"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-100px" }}
                control={
                  <Checkbox
                    checked={dmsPermissions.includes("Cancel")}
                    onChange={handlePermissionChange("Cancel")}
                  />
                }
                label="Cancel"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-100px" }}
                control={
                  <Checkbox
                    checked={dmsPermissions.includes("DmsFileManager")}
                    onChange={handlePermissionChange("DmsFileManager")}
                  />
                }
                label="DMS File Manager"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                sx={{ marginTop: "-110px" }}
                control={
                  <Checkbox
                    checked={dmsPermissions.includes("ReadGroupMember")}
                    onChange={handlePermissionChange("ReadGroupMember")}
                  />
                }
                label="Read Group Membership"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                sx={{ marginTop: "-110px" }}
                control={
                  <Checkbox
                    checked={dmsPermissions.includes("ViewActive")}
                    onChange={handlePermissionChange("ViewActive")}
                  />
                }
                label="View Active"
              />
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  sx={{ marginTop: "-70px" }}
                  control={
                    <Checkbox
                      checked={dmsPermissions.includes("Reassign")}
                      onChange={handlePermissionChange("Reassign")}
                    />
                  }
                  label="Reassign"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  sx={{ marginTop: "-30px" }}
                  control={
                    <Checkbox
                      checked={dmsPermissions.includes("UpdateParticipants")}
                      onChange={handlePermissionChange("UpdateParticipants")}
                    />
                  }
                  label="Update Participants"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  sx={{ marginTop: "-5px" }}
                  control={
                    <Checkbox
                      checked={dmsPermissions.includes("EmailParticipant")}
                      onChange={handlePermissionChange("EmailParticipant")}
                    />
                  }
                  label="Email Participants"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  sx={{ marginTop: "-1px" }}
                  control={
                    <Checkbox
                      checked={dmsPermissions.includes("UpdateWorkflowDates")}
                      onChange={handlePermissionChange("UpdateWorkflowDates")}
                    />
                  }
                  label="Update Workflow Dates"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  sx={{ marginTop: "1px" }}
                  control={
                    <Checkbox
                      checked={dmsPermissions.includes("ReplaceWorkflowOwner")}
                      onChange={handlePermissionChange("ReplaceWorkflowOwner")}
                    />
                  }
                  label="Replace Workflow Owner"
                />
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Box>
  );
};

export default ApplicationPermission;
