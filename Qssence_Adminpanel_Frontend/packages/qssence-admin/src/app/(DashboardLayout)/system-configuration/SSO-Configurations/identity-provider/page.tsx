'use client'
import { AlertHandler, SplitButton } from "qssence-common";
import Typography from "@mui/material/Typography";
import { useGlobalContext } from '@/app/Context/store';
import { useEffect, useState } from "react";
import { AlertColor } from "@mui/material";
import IndentityProviderList from "@/components/system-Configuration/SSOConfig/indentyProviderList";

export default function IdentityProvider() {
    const { setActiveTab } = useGlobalContext();
    const [open, setOpen] = useState(false);
    const [alertHandler, setAlertHandler] = useState({
        hasAlert: false,
        alertType: "success" as AlertColor,
        alertMessage: "",
        alertTitle: "",
    });
    const ProviderOptions = [
        {
            text: "Microsoft AD",
            link: "/system-configuration/SSO-Configurations/providers/?id=Microsoft-AD",
        },
        {
            text: "SAML",
            link: "/system-configuration/SSO-Configurations/providers/?id=SAML",
        }
    ]

    useEffect(() => {
        setActiveTab("")
    }, [setActiveTab])
    return (
        <div>
            <AlertHandler alertHandler={alertHandler} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
             <h1 className="header_title primary_color paddingBlock">
                 Identity Providers
              </h1>
                <SplitButton text="Add Providers" options={ProviderOptions} />
            </div>
            <div style={{ marginTop: "1rem", background: "#fff", minHeight: "73vh" }}>
                <IndentityProviderList open={open} setAlertHandler={setAlertHandler} />
            </div>
        </div>
    );
}