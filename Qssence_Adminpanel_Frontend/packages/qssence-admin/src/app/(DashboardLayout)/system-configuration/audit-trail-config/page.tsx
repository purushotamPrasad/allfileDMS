'use client'
import { TabComponent, AlertHandler } from "qssence-common";
import Typography from "@mui/material/Typography"
import { useGlobalContext } from '@/app/Context/store';
import { useState } from "react";
import { AlertColor } from "@mui/material";
import EventTab from "@/components/system-Configuration/AuditTrailConfig/eventTab";
import TimingTab from "@/components/system-Configuration/AuditTrailConfig/timingTab";
import Content from "@/components/system-Configuration/AuditTrailConfig/content";
import AuditAccess from "@/components/system-Configuration/AuditTrailConfig/auditAccess";

export default function AuditTrailConfig() {
    const { activeTab, setActiveTab, activeTabId, setActiveTabId } = useGlobalContext();
    const [alertHandler, setAlertHandler] = useState({
        hasAlert: false,
        alertType: "success" as AlertColor,
        alertMessage: "",
        alertTitle: "",
      });

    const tabData = [
        {
            label: "Event",
            link: "",
            content: <EventTab/>
        },
        {
            label: "Timing",
            link: "",
            content: <TimingTab/>
        },
        {
            label: "Content",
            link: "",
            content: <Content/>
        },
        {
            label: "Audit Access",
            link: "",
            content: <AuditAccess/>
        }
    ]
    
    return (
        <div>
            <AlertHandler alertHandler={alertHandler} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h1 className="header_title primary_color paddingBlock">
                Audit Trail Config
              </h1>
            </div>
            <div>
                <TabComponent tabs={tabData} setActiveTab={setActiveTab} activeTab={activeTab} activeTabId={activeTabId} setActiveTabId={setActiveTabId} />
            </div>
        </div>

    );
}