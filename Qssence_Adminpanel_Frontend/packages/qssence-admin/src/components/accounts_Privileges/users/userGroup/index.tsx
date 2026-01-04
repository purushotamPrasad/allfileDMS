"use client";
import React, { useEffect, useState, Suspense } from "react";
import { GridColDef, GridValidRowModel, GridRowModel, GridRowId } from "@mui/x-data-grid";
import { CommonDataGridUserGroup } from "qssence-common";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { AlertColor, useTheme, Switch, FormControlLabel, Button } from "@mui/material";
import { del, get, put } from "@/utils/ApiConfig";
import { useDispatch, useSelector} from "react-redux";
import { Showusergroup, UserData } from "@/components/Redux/action";
import { RootState } from "@/components/Redux/store";

interface UserGroupData {
  id: string;
  groupId: string;
  name: string;
  status: string;
  description: string;
}

interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle?: string;
}

interface listProps {
  open: boolean;
  userData: any;
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
}

function UserGroup({ userData, open, setAlertHandler }: listProps) {
  const routers = useRouter();
  const theme = useTheme();
  const [selectedRowArray, setSelectedRowArray] = React.useState<
    GridValidRowModel[]
  >([]);


  const [loading, setLoading] = useState(true)

  const showUserGroup = useSelector((state: RootState) => state.showUserGroup);

  // Static user group data
  const [userGroupData, setUserGroupData] = useState<UserGroupData[]>([]);

  const dispatch=useDispatch()

  const handleStatusToggle = async (id: any) => {


    try {
     
      const newStatus = id.status === null || id.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
  

      const response = await put<any>(`/UserGroup/update/user/${id.userId}/group/${id.groupId}/status/${newStatus}`, null, setAlertHandler);
  
      setAlertHandler({
        hasAlert: true,
        alertMessage: `User status updated to ${newStatus}.`,
        alertType: "success",
        alertTitle: "Success",
      });
  
      setUserGroupData((prevData) =>
        prevData.map((group) =>
          group.id === id.id
            ? {
                ...group,
                status: newStatus,
              }
            : group
        )
      );
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  useEffect(()=>
  {
  
      const fetchData = async () => {
          try {
            const data = await get<any>(
              `/UserGroup/${userData.userData.userId}`,
              {},
              "instance1",
              setAlertHandler
            );
            
            const formattedData =  {
    
              id:data.data.data.userId,
              userName: data.data.data.userName,
              groups:data.data.data.groups,
              status:data.data.data.status,         
          
            };

            const updatedData = formattedData.groups.map((group, index) => ({
              userId: formattedData.id,
              ...group,
              id: index + 1,
              status: group.status === null ? "ACTIVE" : group.status 
            }));
       
            setUserGroupData(updatedData)
            dispatch(Showusergroup(false))
            setLoading(false)

            
          } catch (error) {
            console.log("Error fetching data:", error);
          }
        };
          
     if(loading || showUserGroup)
     {
        fetchData()
     }

  },[loading, showUserGroup])


  const columnData: GridColDef[] = [
   
    {
      field: "groupName",
      headerName: "Group Names",
      width: 470,
      align: "left",
      headerAlign: "left",
      editable: false,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      width: 500,
      align: "left",
      headerAlign: "left",
      editable: false,
      renderCell: (params) => (
        <FormControlLabel
          control={
            <Switch
              checked={params.row.status === null || params.row.status === "ACTIVE"}
              onChange={() => handleStatusToggle(params.row)}
              color="primary"
            />
          }
          label={null}
          labelPlacement="end"
        />
      ),
    },
  ];

  const putApi = (newData: GridRowModel) => {
    console.log(newData, "Edited Data");
  };

  const deleteApi = async (id: any) => {

      try {
        const response = await del(
          `/UserGroup/remove/${id.userId}/group/${id.groupId}`,
          {},
          null,
          setAlertHandler
        );
        console.log(response, "delete response");
        setAlertHandler({
          hasAlert: true,
          alertMessage: "User removed from group successfully.",
          alertType: "success",
          alertTitle: "Success",
        });
       
      } catch (error) {
        console.log("Error deleting user:", error);
      }
      setLoading(true)
      // setUserGroupData((prevData) =>
      //   prevData.filter((group) => group.id !== id.id)
      // );

    
  };

  const handleCancel=()=>
  {
    dispatch(UserData(false))
    localStorage.removeItem("userId")
  }

  return (
    <Suspense fallback={<div>loading</div>}>
      <CommonDataGridUserGroup
        rowData={userGroupData}
        columnData={columnData}
        setSelectedRowArray={setSelectedRowArray}
        putApi={putApi}
        deleteApi={deleteApi}
        enableEdit={false} getById={function (getData: GridRowId): void {
          throw new Error("Function not implemented.");
        } }      />

       <Box mb={2} mt={3} display={"flex"} justifyContent={"flex-end"}>
              <Button
                style={{
                  color: "#23608E",
                  marginRight: "10px",
                  border: "1px solid #23608E",
                  borderRadius: "5px",
                  padding: "5px 20px",
                }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                style={{
                  color: "white",
                  backgroundColor: "#23608E",
                  padding: "5px 20px",
                }}
              >
                Save
              </Button>
            </Box>
        
    </Suspense>
  );
}

export default UserGroup;
