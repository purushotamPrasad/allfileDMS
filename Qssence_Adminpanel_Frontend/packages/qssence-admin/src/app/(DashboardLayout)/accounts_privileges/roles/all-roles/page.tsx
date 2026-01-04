"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/Context/store";
import { AlertHandler, CommonDialog } from "qssence-common";
import Typography from "@mui/material/Typography";
import AllUserRoleList from "@/components/accounts_Privileges/roles/allUserRoleList";
import AddRole from "@/components/accounts_Privileges/roles/addRole";
import { AlertColor } from "@mui/material";
import { del, get, put } from "@/utils/ApiConfig/index";
import Roles from "../page";

interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle?: string;
}

export default function AllRoles() {
  const { setActiveTab } = useGlobalContext();
  const [open, setOpen] = useState(false);
  const [tabData, setTabData] = useState(null);
  const [alertHandler, setAlertHandler] = useState<AlertHandlerState>({
    hasAlert: false,
    alertType: "success" as AlertColor,
    alertMessage: "",
    alertTitle: "",
  });

  const handleTabData = (row) => {
    setTabData(row);
    console.log(row, "rolesData");
  };

  useEffect(() => {
    setActiveTab("");
  }, [setActiveTab]);

  return (
    <div>
      {tabData?.roleId ? (
        <Roles roleData={tabData} />
      ) : (
        <>
          <AlertHandler alertHandler={alertHandler} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
               <h1 className="header_title primary_color paddingBlock">
              All Roles
            </h1>
            {/* <Roles/> */}
            <CommonDialog
              buttonText="Add Role"
              dialogTitle="Add Role"
              dialogContent={
                <AddRole setClose={setOpen} setAlertHandler={setAlertHandler} />
              }
              onSave={() => {
                console.log("save");
              }}
              open={open}
              setOpen={setOpen}
            />
          </div>
          <div
            style={{
              background: "#fff",
              minHeight: "90vh",
              padding: "1rem",
              borderRadius: "6px",
            }}
          >
            <AllUserRoleList
              setTabData={(e) => handleTabData(e)}
              open={open}
              setAlertHandler={setAlertHandler}
            />
          </div>
        </>
      )}
    </div>
  );
}
