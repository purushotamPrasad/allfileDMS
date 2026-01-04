"use client";
import React, { useEffect, useState } from "react";
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import { CommonDataGrid, PrimaryMultiSelectField } from "qssence-common";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import {
  AlertColor,
  Typography,
  ListItem,
  List,
  ListItemText,
  Grid,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { getQueryParamAsString } from "@/utils/utilsFunction";
import { GridRowModel } from "@mui/x-data-grid";
import { del, get } from "@/utils/ApiConfig";
import { IconUsersGroup } from "@tabler/icons-react";
import { Router } from "next/router";
import { Controller } from "react-hook-form";

interface UserData {
  id: number;
  userId: string;
  employeeId: number;
  userName: string;
  email: string;
  status: string;
  role: string;
}

interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle?: string;
}

interface listProps {
  open: boolean;
  groupData: any;
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
}

interface OptionInterface {
  label: string;
  value: string;
}

  type GroupType = {
  name: string;
  users:string;
};

type GroupId = {
  groupsId: number;
};

function GroupUser({ groupData, open, setAlertHandler }: listProps) {

  const routers = useRouter();

  const [members, setMembers] = useState([]);

  const [userGroupData, setUserGroupData] = useState<OptionInterface[]>([]);

  const [singlegroup, setSingleGroup] = useState<GroupType | null>(null);
  
  const [loading, setLoading] = useState(true);

   const [selectedGroupMembers, setSelectedGroupMembers] = useState([]);

  const handleSelect = (selectedItem) => {
    setSelectedGroupMembers((prev) => [...prev, selectedItem]);
  };

  const handleRemove = (removedItem) => {
    setSelectedGroupMembers((prev) =>
      prev.filter((item) => item !== removedItem)
    );
  };

 useEffect(() => {

  const fetchData = async () => {
    if (typeof window !== "undefined") {
      const storedSingleGroup = localStorage.getItem("Selectedgroup");

      if (storedSingleGroup) {
        const parsedGroup = JSON.parse(storedSingleGroup);
     

        try {
          const [usersRes, groupRes] = await Promise.all([
            get<any>("/user/getAll", {}, "instance1", setAlertHandler),
            get<any>(`/groups/getById/${parsedGroup.groupsId}`, {}, "instance1", setAlertHandler)
          ]);

          const groupsData = groupRes.data.data;
          const groupUserIds = groupsData.userIds; 

          const usersData = usersRes.data.data;

          const filteredEmployees = usersData
            .filter((user: any) => groupUserIds.includes(user.userId))
            .map((user: any) => ({
              label: `${user.userFirstName} ${user.userMiddleName} ${user.userLastName}`.trim(),
              value: user.userId,
            }));

          const allId = filteredEmployees.map(emp => emp.value);

          setSelectedGroupMembers(allId);
          setUserGroupData(filteredEmployees);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

   if(loading)
   {
        fetchData();
   }

}, [loading]);



  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedMember = localStorage.getItem("users");
      const storedSingleGroup = localStorage.getItem("Selectedgroup");
      if (storedMember) {
        setMembers(JSON.parse(storedMember)); 
      }

      if(storedSingleGroup)
      {
        setSingleGroup(JSON.parse(storedSingleGroup)); 
      }
    }
  }, []);

  const handleRemoveUser=()=>{
  
    setSelectedGroupMembers([]);

  }

  useEffect(() => {

    const allIds = userGroupData.map(user => user.value);
    const removeIds = allIds.filter(id => !selectedGroupMembers.includes(id));
    localStorage.setItem("removeUsersInGroup", JSON.stringify(removeIds))

}, [selectedGroupMembers, userGroupData]);





  return (
    <>
      <Box>
        <Typography variant="h5" color={"primary"}>
          Groups
        </Typography>
        <Typography variant="h4" mt={1} mb={3}>
          Bulk Add Group Members
        </Typography>
        <Typography variant="body1" mt={1}>
          This page allows you to edit the user memberships for each group.
        </Typography>
        <Typography variant="body1" mt={1}>
          You can add to and remove users from multiple groups at a time. When
          selecting multiple groups please note:
        </Typography>
        <List>
          <List sx={{ marginTop: "-10px" }}>
            <ListItem sx={{ marginBottom: "-15px" }}>
              <ListItemText
               primary={
                <ul style={{paddingLeft:"10px"}}>
                     <li style={{listStyleType:"disc"}}>
                     All the common users in the selected groups are displayed under the 'All' level and the remaining disparate users are displayed under the level with its group name.
                  </li>
                </ul>
              }
              
                primaryTypographyProps={{ variant: "body1" }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                sx={{ marginBottom: "-15px" }}
                primary={
                  <ul style={{paddingLeft:"10px"}}>
                    <li style={{listStyleType:"disc"}}>
                    <strong>Removing Users</strong> - Removing user(s) listed
                    in the all “All” section will remove the selected user(s)
                    from all of the selected groups. However if user(s) are
                    selected under a specific group name(s) the selected user(s)
                    will be removed from the group its listed under
                    </li>
                  </ul>
                }
                primaryTypographyProps={{ variant: "body1" }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <ul style={{paddingLeft:"10px"}}>
                       <li style={{listStyleType:"disc"}}>
                    <strong>Adding Users</strong> - All user(s) to be added
                    are added to all of the selected group(s)
                    </li>
                  </ul>
                }
                primaryTypographyProps={{ variant: "body1" }}
              />
            </ListItem>
          </List>
        </List>
        <Typography variant="body1">
          <strong>Step 1:</strong> Select group(s) to edit and refresh the
          members list
        </Typography>
        <Typography variant="body1" mt={1}>
          <strong>Step 2:</strong> Select user(s) to leave OR join the selected
          group and click on the corresponding button
        </Typography>
      </Box>

      <Box>
        <Grid container spacing={1} mt={5}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight={"bold"}>
              Group Name
            </Typography>
            <TextField
              label="selected group"
              variant="outlined"
              value={singlegroup?.name || ''}
              sx={{ marginTop: "5px", width: "90%" }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight={"bold"} >
              Group Members
            </Typography>
              <Box style={{ marginTop: "5px", width: "90%" }}>
               <PrimaryMultiSelectField
                label={<>Selected User Name</>}
                id="groupMember"
                errorText={""}
                menuItems={userGroupData}
                selectedItems={selectedGroupMembers}
                onSelect={handleSelect}
                onRemove={handleRemove}
                
              />
              </Box>
            <Button
              style={{
                backgroundColor: "#E4EDF6",
                color: "#000",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "5px",
              }}
              onClick={handleRemoveUser}
            >
              Remove selected users
            </Button>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight={"bold"}>
              Add members to selected groups(s)
            </Typography>
            <TextField
              label="Members"
              variant="outlined"
              multiline
              rows={4}
              sx={{ marginTop: "5px", width: "90%" }}
              value={members.map((member) => member.EmpName).join("\n")} // Newline for each name
              InputProps={{ readOnly: true }} 
            />
            <Box
              sx={{
                position: "absolute",
                bottom: "166px",
                right: "50px",
               
              }}
              className="primary_color"
            >
              <IconUsersGroup
                cursor={"pointer"}
                onClick={() =>
                  routers.push("/accounts_privileges/groups/groupMember")
                }
               
              />
            </Box>
            <Typography variant="h6" mt={2}>
              Being typing to finds users
            </Typography>
            <Button
              onClick={() =>
                routers.push("/accounts_privileges/groups/groupMember")
              }
              style={{
                backgroundColor: "#E4EDF6",
                color: "#000",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "5px",
                marginBottom: "5rem",
              }}
            >
              Add selected users
            </Button>
          </Grid>
        </Grid>

      </Box>
    </>
  );
}

export default GroupUser;

/*   <TextField
              label="Name of users in selected group"
              variant="outlined"
              value={singlegroup?.users}
              sx={{ marginTop: "5px", width: "90%" }}
            /> */
