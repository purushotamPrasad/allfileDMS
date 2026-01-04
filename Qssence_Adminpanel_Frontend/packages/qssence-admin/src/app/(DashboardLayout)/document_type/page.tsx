"use client";
import React, { useEffect, useState } from "react";
import { AlertHandler, CommonDialog, TabComponent } from "qssence-common";
import Typography from "@mui/material/Typography";
import AddUser from "@/components/accounts_Privileges/users/addUser";
import { useGlobalContext } from "@/app/Context/store";
import UserGroup from "@/components/accounts_Privileges/users/userGroup";
import UserPermission from "@/components/accounts_Privileges/users/userPermission";
import AddGroupInUser from "@/components/accounts_Privileges/users/addGroupInUser";
import AddPermissionInUser from "@/components/accounts_Privileges/users/addPermissionInUser";
import UserRole from "@/components/accounts_Privileges/users/userRole";
import AddRoleInUser from "@/components/accounts_Privileges/users/addRoleInUser";
import { getQueryParamAsString } from "@/utils/utilsFunction";
import { AlertColor } from "@mui/material";
import UserDetail from "@/components/accounts_Privileges/users/userDetail";
import UserApplications from "@/components/accounts_Privileges/users/userApplication";

export default function Plants(plantsData: any) {
  const { activeTab, setActiveTab, activeTabId, setActiveTabId } =
    useGlobalContext();
  const [buttonText, setButtonText] = useState("Add User");
  const [open, setOpen] = useState(false);
  const uid = getQueryParamAsString("uid");
  const [alertHandler, setAlertHandler] = useState({
    hasAlert: false,
    alertType: "success" as AlertColor,
    alertMessage: "",
    alertTitle: "",
  });

  const tabData = [
    {
      label: "User Detail",
      link: "",
      content: (
        <UserDetail
          userData={plantsData}
          open={open}
          setAlertHandler={setAlertHandler}
        />
      ),
    },
    {
      label: "User Group",
      link: "",
      content: (
        <UserGroup
          userData={plantsData}
          open={open}
          setAlertHandler={setAlertHandler}
        />
      ),
    },

    {
      label: "User Role",
      link: "",
      content: (
        <UserRole
          userData={plantsData}
          open={open}
          setAlertHandler={setAlertHandler}
        />
      ),
    },
    {
      label: "User Permission",
      link: "",
      content: (
        <UserPermission
          userData={plantsData}
          open={open}
          setAlertHandler={setAlertHandler}
        />
      ),
    },
    {
      label: "Applications",
      link: "",
      content: (
        <UserApplications
          userData={plantsData}
          open={open}
          setAlertHandler={setAlertHandler}
        />
      ),
    },
  ];

  useEffect(() => {
    if (activeTab === "User Group") {
      setButtonText("Add Group");
    } else {
      if (activeTab === "User Permission") {
        setButtonText("Add Permission");
      } else {
        if (activeTab === "User Role") {
          setButtonText("Add Role");
        } else {
          setButtonText("Add User");
        }
      }
    }
  }, [activeTab]);

  return (
    <div>
      <AlertHandler alertHandler={alertHandler} />
      <div
        style={{
          marginTop: "4px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" color="primary">
          Users
        </Typography>
        {/* <SplitButton text="Add User" options={options} link=""/> */}
        <CommonDialog
          buttonText={buttonText}
          dialogTitle=""
          dialogContent={
            buttonText === "Add Group" ? (
              <AddGroupInUser
                open={open}
                setClose={setOpen}
                setAlertHandler={setAlertHandler}
              />
            ) : buttonText === "Add Permission" ? (
              <AddPermissionInUser
                open={open}
                setClose={setOpen}
                setAlertHandler={setAlertHandler}
              />
            ) : buttonText === "Add Role" ? (
              <AddRoleInUser
                open={open}
                setClose={setOpen}
                setAlertHandler={setAlertHandler}
              />
            ) : (
              <AddUser setClose={setOpen} setAlertHandler={setAlertHandler} />
            )
          }
          onSave={() => {
            console.log("save");
          }}
          open={open}
          setOpen={setOpen}
        />
      </div>
      <div style={{ marginTop: "1rem" }}>
        <TabComponent
          tabs={tabData}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          activeTabId={activeTabId}
          setActiveTabId={setActiveTabId}
        />
      </div>
    </div>
  );
}
