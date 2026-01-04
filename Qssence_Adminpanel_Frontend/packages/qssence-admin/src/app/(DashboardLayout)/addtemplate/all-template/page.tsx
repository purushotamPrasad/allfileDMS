"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/Context/store";
import { AlertHandler, CommonDialogTemplate } from "qssence-common";
import Typography from "@mui/material/Typography";
import { AlertColor } from "@mui/material";
import Users from "../page";
import AddTemplate from "@/components/add_template/addTemplate/page";
import AllTemplateDataList from "@/components/add_template/allTemplateDataList/page";

export default function AllTemplate() {
  const { setActiveTab } = useGlobalContext();
  const [open, setOpen] = useState(false);
  const [tabData, setTabData] = useState(null);
  const [alertHandler, setAlertHandler] = useState({
    hasAlert: false,
    alertType: "success" as AlertColor,
    alertMessage: "",
    alertTitle: "",
  });

  const handleTabData = (row) => {
    setTabData(row);
  };

  useEffect(() => {
    setActiveTab("");
  }, [setActiveTab]);

  return (
    <div>
      {tabData ? (
        <Users plantsData={tabData} />
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
              Document Template
              </h1>
            {/* <Users/> */}
            <CommonDialogTemplate
              buttonText="Template"
              dialogTitle="Select Document Template"
              dialogContent={
                <AddTemplate
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
              minHeight: "90vh",
              padding: "1rem",
              borderRadius: "6px",
            }}
          >
            <AllTemplateDataList
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
