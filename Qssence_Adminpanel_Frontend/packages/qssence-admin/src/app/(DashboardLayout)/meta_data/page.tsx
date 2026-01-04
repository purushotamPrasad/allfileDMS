"use client";
import { TabComponent, CommonDialog, AlertHandler } from "qssence-common";
import Typography from "@mui/material/Typography";
import { useGlobalContext } from "@/app/Context/store";
import GroupUser from "@/components/accounts_Privileges/groups/groupUser";
import GroupPermission from "@/components/accounts_Privileges/groups/groupPermission";
import { useEffect, useState } from "react";
import GroupRole from "@/components/accounts_Privileges/groups/groupRole";
import AddUserInGroup from "@/components/accounts_Privileges/groups/addUserInGroup";
import AddPermissionInGroup from "@/components/accounts_Privileges/groups/addPermissionInGroup";
import AddRoleInGroup from "@/components/accounts_Privileges/groups/addRoleInGroup";
import { AlertColor } from "@mui/material";

export default function Groups(groupData: any) {
  const { activeTab, setActiveTab, activeTabId, setActiveTabId } =
    useGlobalContext();
  const [buttonText, setButtonText] = useState("Group Role");
  const [open, setOpen] = useState(false);
  const [alertHandler, setAlertHandler] = useState({
    hasAlert: false,
    alertType: "success" as AlertColor,
    alertMessage: "",
    alertTitle: "",
  });

  const tabData = [
    {
      label: "Group",
      link: "",
      content: (
        <GroupUser
          groupData={groupData}
          open={open}
          setAlertHandler={setAlertHandler}
        />
      ),
    },
  ];

  useEffect(() => {
    if (activeTab === "Group Member") {
      setButtonText("Add User");
    } else {
      if (activeTab === "Group Permission") {
        setButtonText("Add Permission");
      } else {
        setButtonText("Add Role");
      }
    }
  }, [activeTab]);

  return (
    <div>
      <AlertHandler alertHandler={alertHandler} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" color="primary">
          {" "}
          Groups
        </Typography>
        <CommonDialog
          buttonText={buttonText}
          dialogTitle=""
          dialogContent={
            buttonText === "Add User" ? (
              <AddUserInGroup
                open={open}
                setAlertHandler={setAlertHandler}
                setOpen={setOpen}
              />
            ) : buttonText === "Add Permission" ? (
              <AddPermissionInGroup
                open={open}
                setAlertHandler={setAlertHandler}
                setOpen={setOpen}
              />
            ) : (
              <AddRoleInGroup
                open={open}
                setAlertHandler={setAlertHandler}
                setOpen={setOpen}
              />
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
