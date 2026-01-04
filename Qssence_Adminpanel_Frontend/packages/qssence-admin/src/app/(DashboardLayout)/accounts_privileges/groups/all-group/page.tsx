"use client";
import { AlertHandler, CommonDialog } from "qssence-common";
import Typography from "@mui/material/Typography";
import UserGroupList from "@/components/accounts_Privileges/groups/allGroupList";
import { useGlobalContext } from "@/app/Context/store";
import { useEffect, useState } from "react";
import AddGroup from "@/components/accounts_Privileges/groups/addGroup";
import { AlertColor } from "@mui/material";
import Groups from "../page";

export default function AllGroups() {
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
              All Groups
            </h1>
            {/* <CommonDialog
              buttonText="Add Group"
              dialogTitle="Add Group"
              dialogContent={
                <AddGroup
                  setClose={setOpen}
                  setAlertHandler={setAlertHandler}
                />
              }
              onSave={() => {
                console.log("save");
              }}
              open={open}
              setOpen={setOpen}
            /> */}
          </div>
          <div
            style={{
             
              background: "#fff",
              minHeight: "90vh",
              padding: "1rem",
              borderRadius: "6px",
            }}
          >
            <UserGroupList
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
