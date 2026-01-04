"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/Context/store";
import { AlertHandler, CommonDialogDocument } from "qssence-common";
import Typography from "@mui/material/Typography";
import { AlertColor } from "@mui/material";
import AllDocumentDataFlowList from "@/components/document_flow/AllDocumentFlowList/page";
import AddDocumentFlow from "@/components/document_flow/addDocumentFlow/page";


export default function AllDocumentType() {
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
                All Document Flow
              </h1>
         
            {/* <Users/> */}
            <CommonDialogDocument
              buttonText="Document Flow"
              dialogTitle="Create Document Flow"
              dialogContent={
                <AddDocumentFlow
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
            <AllDocumentDataFlowList
              setTabData={(e) => handleTabData(e)}
              open={open}
              setAlertHandler={setAlertHandler}
            />
          </div>
        </>
     
  );
}