'use client'
import { TabComponent, CommonDialog, AlertHandler, ToggleUIWithConfirmation, ActionButton } from "qssence-common";
import Typography from "@mui/material/Typography"
import { useGlobalContext } from '@/app/Context/store';
import GroupUser from "@/components/accounts_Privileges/groups/groupUser";
import GroupPermission from "@/components/accounts_Privileges/groups/groupPermission";
import { useEffect, useState } from "react";
import GroupRole from "@/components/accounts_Privileges/groups/groupRole";
import AddUserInGroup from "@/components/accounts_Privileges/groups/addUserInGroup";
import AddPermissionInGroup from "@/components/accounts_Privileges/groups/addPermissionInGroup";
import AddRoleInGroup from "@/components/accounts_Privileges/groups/addRoleInGroup";
import { AlertColor } from "@mui/material";
import GeneralSettings from "@/components/system-Configuration/SSOConfig/generalSettings";
import OpenIDConnectSettings from "@/components/system-Configuration/SSOConfig/openIDConnectSettings";
import AdvanceSettings from "@/components/system-Configuration/SSOConfig/advanceSettings";

export default function ProviderDetails() {
    const { activeTab, setActiveTab, activeTabId, setActiveTabId } = useGlobalContext();
    const [buttonText, setButtonText] = useState("Group Role");
    const [open, setOpen] = useState(false);
    const [alertHandler, setAlertHandler] = useState({
        hasAlert: false,
        alertType: "success" as AlertColor,
        alertMessage: "",
        alertTitle: "",
    });

    const ActionOptions = [
        {
            text: "Delete",
            action: () => { console.log("action") }
        }
    ]

    const tabData = [
        {
            label: "General settings",
            link: "",
            content: <GeneralSettings />
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
    ]

    return (
        <div>
            <AlertHandler alertHandler={alertHandler} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h4" color="primary"> Provider Details</Typography>
                <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
                    <ToggleUIWithConfirmation />
                    <ActionButton text="Action" options={ActionOptions} />
                </div>
            </div>
            <div style={{ marginTop: "1rem" }}>
                <TabComponent tabs={tabData} setActiveTab={setActiveTab} activeTab={activeTab} activeTabId={activeTabId} setActiveTabId={setActiveTabId} />
            </div>
        </div>
    );
}