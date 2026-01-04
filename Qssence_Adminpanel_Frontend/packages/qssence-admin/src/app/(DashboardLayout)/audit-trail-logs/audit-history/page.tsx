"use client";
import { TabComponent, AlertHandler, ResizablePopup } from "qssence-common";
import Typography from "@mui/material/Typography";
import { useGlobalContext } from "@/app/Context/store";
import { useState } from "react";
import { AlertColor, Button } from "@mui/material";
import { IconFileExport } from "@tabler/icons-react";
import Login from "@/components/audit_trail_log/login";
import System from "@/components/audit_trail_log/system";
import Modification from "@/components/audit_trail_log/modification";
import Permission from "@/components/audit_trail_log/permission";
import Workflow from "@/components/audit_trail_log/workflow";
import Notification from "@/components/audit_trail_log/notification";

export default function AuditHistory() {
  const { activeTab, setActiveTab, activeTabId, setActiveTabId } =
    useGlobalContext();
  const [buttonText, setButtonText] = useState("Group Role");
  const [filterUI, setFilterUI] = useState(false);
  const [alertHandler, setAlertHandler] = useState({
    hasAlert: false,
    alertType: "success" as AlertColor,
    alertMessage: "",
    alertTitle: "",
  });

  const tabData = [
    {
      label: "System",
      link: "",
      content: <System filterUI={filterUI} />,
    },
    {
      label: "Login",
      link: "",
      content: <Login filterUI={filterUI} />,
    },
    {
      label: "Modification",
      link: "",
      content: <Modification filterUI={filterUI} />,
    },
    {
      label: "Permission",
      link: "",
      content: <Permission filterUI={filterUI} />,
    },
    {
      label: "Workflow",
      link: "",
      content: <Workflow filterUI={filterUI} />,
    },
    {
      label: "Notification",
      link: "",
      content: <Notification filterUI={filterUI} />,
      //  content: <ResizablePopup />
    },
  ];

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
          Audit History
        </Typography>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <TabComponent
          tabs={tabData}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          activeTabId={activeTabId}
          setActiveTabId={setActiveTabId}
          showExport={true}
          showFilter={true}
          filterUI={filterUI}
          setFilterUI={setFilterUI}
        />
      </div>
    </div>
  );
}
