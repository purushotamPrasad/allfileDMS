"use client";
import { TabComponent, CommonDialog, AlertHandler } from "qssence-common";
import Typography from "@mui/material/Typography";
import { useGlobalContext } from "@/app/Context/store";
import GroupUser from "@/components/accounts_Privileges/groups/groupUser";
import GroupPermission from "@/components/accounts_Privileges/groups/groupPermission";
import { useEffect, useState } from "react";
import GroupRole from "@/components/accounts_Privileges/groups/groupRole";
import AddUserInGroup from "@/components/accounts_Privileges/groups/addUserInGroup";
import AddPermissionInGroup from "@/components/accounts_Privileges/groups/addPermissionInGroup";
import AddRoleInGroup from "@/components/accounts_Privileges/groups/addRoleInGroup";
import { AlertColor, Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { del, post } from "@/utils/ApiConfig";



type GroupType = {
  groupsId: number;
};

type UserType = {
  userId: number;
};


export default function Groups(groupData :any) {
  const { activeTab, setActiveTab, activeTabId, setActiveTabId } =
    useGlobalContext();
  const [buttonText, setButtonText] = useState("Group Role");
  const [open, setOpen] = useState(false);
  const [alertHandler, setAlertHandler] = useState({
    hasAlert: false,
    alertType: "success" as AlertColor,
    alertMessage: "",
    alertTitle: "",
  });

  const router = useRouter()

  const tabData = [
    {
      label: "Group",
      link: "",
      content: (
        <GroupUser
          groupData={groupData}
          open={open}
          setAlertHandler={setAlertHandler}
        />
      ),
    },
  ];

  const [groupId, setGroupId] = useState<GroupType | null>(null);

  const [userId, setUserId] = useState<UserType | null>(null);


    useEffect(() => {
      if (typeof window !== "undefined") {
        const storedMember = localStorage.getItem("users");
        const storedSingleGroup = localStorage.getItem("Selectedgroup");

        if (storedMember) {

          const parsedMembers = JSON.parse(storedMember);
          const userIds = parsedMembers.map((member: any) => member.userId);
          setUserId(userIds); 

        }
  
        if(storedSingleGroup)
        {
          setGroupId(JSON.parse(storedSingleGroup)); 
        }

      }
    }, []);

 
  const handleCancel=()=>
  {
     router.push("/accounts_privileges/groups/all-group")
  }

  const handleSave= async()=>{
     
    const removeUser = JSON.parse(localStorage.getItem("removeUsersInGroup"));

    if(removeUser.length!==0)
    {
      
        try {
          const payload = removeUser;
          const response = await del(`/groups/removeUsers/${groupId.groupsId}`,payload, payload, setAlertHandler);
          if (response.status === 200) {
            setAlertHandler({
              hasAlert: true,
              alertMessage: "User has been successfully removed to the group.",
              alertType: "success",
              alertTitle: "Success",
            });

              localStorage.removeItem("users");
              localStorage.removeItem("Selectedgroup");
              localStorage.removeItem("removeUsersInGroup");
              
              router.push("/accounts_privileges/groups/all-group")
          }
         
        } catch (error) {
          console.log("Error adding group:", error);
        }
    }
  
    else {
     try {
          const payload = userId;
          const response = await post(`/groups/addUsers/${groupId.groupsId}`, payload, setAlertHandler);
          if (response.status === 200) {
            setAlertHandler({
              hasAlert: true,
              alertMessage: "User has been successfully assigned to the group.",
              alertType: "success",
              alertTitle: "Success",
            });

              localStorage.removeItem("users");
              localStorage.removeItem("Selectedgroup")
              localStorage.removeItem("removeUsersInGroup");
              
              router.push("/accounts_privileges/groups/all-group")
          }
         
        } catch (error) {
          console.log("Error adding group:", error);
        }
      }

  }

  useEffect(() => {
    if (activeTab === "Group Member") {
      setButtonText("Add User");
    } else {
      if (activeTab === "Group Permission") {
        setButtonText("Add Permission");
      } else {
        setButtonText("Add Role");
      }
    }
  }, [activeTab]);

  return (
    <div>
      <AlertHandler alertHandler={alertHandler} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBlock:"4px"
        }}
      >
         <h1 className="header_title primary_color paddingBlock">
              Groups
            </h1>
       
          <Box sx={{ display: "flex",gridColumnGap:"20px" }}>
          <Button variant="contained" className="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </div>
      <div>
        <TabComponent
          tabs={tabData}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          activeTabId={activeTabId}
          setActiveTabId={setActiveTabId}
        />
      </div>
    </div>
  );
}

/* <CommonDialog
          buttonText={buttonText}
          dialogTitle=""
          dialogContent={
            buttonText === "Add User" ? (
              <AddUserInGroup
                open={open}
                setAlertHandler={setAlertHandler}
                setOpen={setOpen}
              />
            ) : buttonText === "Add Permission" ? (
              <AddPermissionInGroup
                open={open}
                setAlertHandler={setAlertHandler}
                setOpen={setOpen}
              />
            ) : (
              <AddRoleInGroup
                open={open}
                setAlertHandler={setAlertHandler}
                setOpen={setOpen}
              />
            )
          }
          onSave={() => {
            console.log("save");
          }}
          open={open}
          setOpen={setOpen}
        />*/
