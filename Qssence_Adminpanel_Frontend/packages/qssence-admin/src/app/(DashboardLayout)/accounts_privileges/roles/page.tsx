'use client'
import { TabComponent, CommonDialog, AlertHandler } from "qssence-common";
import Typography from "@mui/material/Typography"
import { useGlobalContext } from '@/app/Context/store';
import RoleGroup from "@/components/accounts_Privileges/roles/roleGroup";
import RolePermission from "@/components/accounts_Privileges/roles/rolePermission";
import { useEffect, useState } from "react";
import RoleUser from "@/components/accounts_Privileges/roles/roleUser";
import AddGroupInRole from "@/components/accounts_Privileges/roles/addGroupInRole";
import AddPermissionInRole from "@/components/accounts_Privileges/roles/addPermissionInRole";
import AddUserInRole from "@/components/accounts_Privileges/roles/addUserInRole";
import { AlertColor } from "@mui/material";

export default function Roles(roleData:any) {
    const {activeTab,setActiveTab,activeTabId,setActiveTabId}=useGlobalContext();
    const [buttonText, setButtonText] = useState("Role Users");
    const[open,setOpen]=useState(false);

    const [alertHandler, setAlertHandler] = useState({
        hasAlert: false,
        alertType: "success" as AlertColor,
        alertMessage: "",
        alertTitle: "",
    });

    const tabData = [
        {
            label: "Role Users",
            link: "/accounts_privileges/roles/all_roles",
            content: <RoleUser roleData={roleData} open={open} setAlertHandler={setAlertHandler}/>,
        },
        {
            label: "Role Group",
            link: "/accounts_privileges/roles/secured_roles",
            content: <RoleGroup roleData={roleData} open={open} setAlertHandler={setAlertHandler}/>
        },
        {
            label: "Role Permission",
            link: "",
            content: <RolePermission roleData={roleData} open={open} setAlertHandler={setAlertHandler}/>
        }
    ]

    useEffect(() => {
        if (activeTab === "Role Group") {
            setButtonText("Add Group")
        } else {
            if (activeTab === "Role Permission") {
                setButtonText("Add Permission")
            } else {
                 setButtonText("Add User") 
            }
        }
    }, [activeTab])
    
    return (
        <div>
            <AlertHandler alertHandler={alertHandler} />
           <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <Typography variant="h4" color="primary"> Roles</Typography>
            {/* <Roles/> */}
            <CommonDialog
                    buttonText={buttonText}
                    dialogTitle=""
                    dialogContent={buttonText === "Add Group" ? <AddGroupInRole open={open} setAlertHandler={setAlertHandler}
                    setOpen={setOpen}/> : buttonText === "Add Permission" ? <AddPermissionInRole open={open} setAlertHandler={setAlertHandler}
                    setOpen={setOpen}/> : <AddUserInRole open={open} setAlertHandler={setAlertHandler}
                    setOpen={setOpen}/>}
                    onSave={() => { console.log("save") }}
                    open={open}
                    setOpen={setOpen}
                />
            </div>
            <div style={{ marginTop: "1rem" }}>
                <TabComponent tabs={tabData} setActiveTab={setActiveTab} activeTab={activeTab} activeTabId={activeTabId} setActiveTabId={setActiveTabId}/>
            </div>
        </div>

    );
}