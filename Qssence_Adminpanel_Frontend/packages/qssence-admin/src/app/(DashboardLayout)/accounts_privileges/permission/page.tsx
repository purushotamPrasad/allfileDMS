"use client";
import { TabComponent, CommonDialog, AlertHandler } from "qssence-common";
import Typography from "@mui/material/Typography";
import { useGlobalContext } from "@/app/Context/store";
import AddPermission from "@/components/accounts_Privileges/permissions/addPermission";
import { useState } from "react";
import { AlertColor } from "@mui/material";
import AdminPermission from "@/components/accounts_Privileges/permissions/adminPermission";
import ApplicationPermission from "@/components/accounts_Privileges/permissions/applicationPermission";

export default function Permission(permissionData:any) {
  const { activeTab, setActiveTab, activeTabId, setActiveTabId } =
    useGlobalContext();
  const [open, setOpen] = useState(false);
  const [alertHandler, setAlertHandler] = useState({
    hasAlert: false,
    alertType: "success" as AlertColor,
    alertMessage: "",
    alertTitle: "",
  });

  const tabData = [
    {
      label: "Admin",
      link: " ",
      content: (
        <AdminPermission
          permissionData={permissionData}
          open={open}
          setAlertHandler={setAlertHandler}
        />
      ),
    },
    {
      label: "Application",
      link: "'",
      content: (
        <ApplicationPermission
          permissionData={permissionData}
          open={open}
          setAlertHandler={setAlertHandler}
        />
      ),
    },
  ];
  return (
    <div>
        <TabComponent
          tabs={tabData}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          activeTabId={activeTabId}
          setActiveTabId={setActiveTabId}
        />
      </div>
  );
}

/*  <AlertHandler alertHandler={alertHandler} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" color="primary">
          {" "}
          Permission
        </Typography>
        <CommonDialog
          buttonText="Add Permission"
          dialogTitle="Add Permission"
          dialogContent={
            <AddPermission
              setClose={setOpen}
              setAlertHandler={setAlertHandler}
            />
          }
          onSave={() => {
            console.log("save");
          }}
          open={open}
          setOpen={setOpen}
        />
      </div>*/