"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/Context/store";
import { AlertHandler, CommonDialogDocument } from "qssence-common";
import Typography from "@mui/material/Typography";
import { AlertColor } from "@mui/material";
import Users from "../page";
import AddDocumentType from "@/components/document_type/addDocumentType/page";
import AllDocumentDataList from "@/components/document_type/AllDocumentDataList/page";

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

  const handleAddDialogClose = () => {
    setOpen(false);
    // Trigger refresh in AllDocumentDataList by passing a refresh flag
    // The AllDocumentDataList will detect this and refresh its data
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
                All Document Type
              </h1>
         
            {/* <Users/> */}
            <CommonDialogDocument
              buttonText="Document Type"
              dialogTitle="Create Document Type"
              dialogContent={
                <AddDocumentType
                  setClose={handleAddDialogClose}
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
            <AllDocumentDataList
            setTabData={(e) => handleTabData(e)}
            open={open}
            setAlertHandler={setAlertHandler}
            refreshTrigger={open} loadingData={false}            />
          </div>
        </>
    </div>
  );
}
