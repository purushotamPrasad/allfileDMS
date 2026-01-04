"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/Context/store";
import { AlertHandler, CommonDialog} from "qssence-common";
import Typography from "@mui/material/Typography";
import AllUserPermissionList from "@/components/accounts_Privileges/permissions/allPermissionList";
import AddPermission from "@/components/accounts_Privileges/permissions/addPermission";
import { AlertColor } from "@mui/material";
import Permission from "../page";

export default function AllPermission() {
  const { setActiveTab } = useGlobalContext();
  const [tabData, setTabData] = useState(null);
  const [open, setOpen] = useState(false);
  const [alertHandler, setAlertHandler] = useState({
    hasAlert: false,
    alertType: "success" as AlertColor,
    alertMessage: "",
    alertTitle: "",
  });

  const handleTabData = (row) => {
    setTabData(row);
    console.log(row, "lee");
  };

  useEffect(() => {
    setActiveTab("");
  }, [setActiveTab]);
  return (
    <div>
    
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
              All Permission
            </h1>
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
          </div>
          <div
            style={{
              background: "#fff",
              minHeight: "73vh",
              borderRadius: "6px",
            }}
          >
           <Permission/>
          </div>
        </>
      
    </div>
  );
}
/* 

  {tabData?.permissionId ? (
        <Permission permissionData={tabData} />
      ) : (

<AllUserPermissionList
              setTabData={(e) => handleTabData(e)}
              open={open}
              setAlertHandler={setAlertHandler}
            />*/