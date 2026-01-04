'use client'
import GroupRole from "@/components/accounts_Privileges/groups/groupRole";
import { AlertColor, Box, Button, Typography } from "@mui/material";
import { AlertHandler, BlankCardContainer, CardContainer, PageContainer, TabComponent } from "qssence-common";
import { useState } from "react";
import Home from "../../home/page";
import { useGlobalContext } from "@/app/Context/store";
import AuditTrailConfig from "../audit-trail-config/page";
import Policy from "./policy";
import GeneralSettings from "@/components/system-Configuration/SSOConfig/generalSettings";
import OpenIDConnectSettings from "@/components/system-Configuration/SSOConfig/openIDConnectSettings";
import AdvanceSettings from "@/components/system-Configuration/SSOConfig/advanceSettings";
interface TabInfo {
    label: string;
    link: string;
    content: React.ReactNode;
}
export default function IdentityProvider() {
    const { activeTab, setActiveTab, activeTabId, setActiveTabId } = useGlobalContext();
    const [alertHandler, setAlertHandler] = useState({
        hasAlert: false,
        alertType: "success" as AlertColor,
        alertMessage: "",
        alertTitle: "",
    });

    const tabs: TabInfo[] = [
        {
            label: "General settings",
            link: "",
            content: <Policy />
        },
        {
            label: "OpenID Connect settings",
            link: "",
            content: <OpenIDConnectSettings />
        },
        {
            label: "Advanced settings",
            link: "",
            content: <AdvanceSettings />
        }

    ];

    return(
        <PageContainer title="Authentication Settings" description="Authentication Settings" >
            <AlertHandler alertHandler={alertHandler} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
           
            <h1 className="header_title primary_color paddingBlock">
                  Authentication Settings
             </h1>
               
                <div className="flex flex-row space-x-2">
                    <Button
                        variant="outlined"
                        size="medium"
                        type="reset"
                        sx={{
                            fontWeight: 700,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        variant="contained"
                        size="medium"
                        type="submit"
                        sx={{
                            fontWeight: 700,
                        }}
                    >
                        Save
                    </Button>
                </div>
                {/* <SplitButton text="Add Providers" options={ProviderOptions} /> */}
            </div>
            <div style={{ marginTop: "1rem", minHeight: "72vh", borderRadius:"6px" }}>
                <TabComponent tabs={tabs} setActiveTab={setActiveTab} activeTab={activeTab} activeTabId={activeTabId} setActiveTabId={setActiveTabId} filterUI={true}/>
            </div>

        </PageContainer>
    )
}