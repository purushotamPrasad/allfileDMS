"use client";
import { AlertHandler } from "qssence-common";
import Typography from "@mui/material/Typography";
import { useGlobalContext } from "@/app/Context/store";
import { useEffect, useState } from "react";
import { AlertColor } from "@mui/material";
import Groups from "../page";
import AllMetaDataList from "@/components/meta_data/allMetaDataList";

export default function AllMetaData() {
  const { setActiveTab } = useGlobalContext();
  const [open, setOpen] = useState(false); // This controls dialog opening
  const [tabData, setTabData] = useState(null);
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
      {tabData?.groupId ? (
        <Groups groupData={tabData} />
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
              Field Title
            </h1>

          </div>
          <div
            style={{
              background: "#fff",
              minHeight: "90vh",
              borderRadius: "6px",
            }}
          >
            <AllMetaDataList
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
