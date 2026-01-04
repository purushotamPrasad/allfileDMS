"use client";
import React, { useState, useEffect, Suspense } from "react";
import { GridColDef, GridValidRowModel, GridRowModel, GridRowId } from "@mui/x-data-grid";
import { CommonDataGridUsersRole } from "qssence-common";
import { useRouter } from "next/navigation";
import {
  AlertColor,
  Box,
  useTheme,
  Switch,
  FormControlLabel,
  Button,
} from "@mui/material";
import { del, get, put } from "@/utils/ApiConfig";
import { useDispatch, useSelector } from "react-redux";
import { Showuserrole, UserData } from "@/components/Redux/action";
import { RootState } from "@/components/Redux/store";

interface RoleData {
  id: string;
  roleId: string;
  name: string;
  status: string;
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

function UserRole({ userData, open, setAlertHandler }: listProps) {
  const routers = useRouter();
  const theme = useTheme();
  const [selectedRowArray, setSelectedRowArray] = React.useState<
    GridValidRowModel[]
  >([]);
  const [roleData, setRoleData] = useState<RoleData[]>([]);

  const [loading, setLoading] = useState(true)

  const showRoleGroup = useSelector((state: RootState) => state.showRoleGroup);

  const dispatch = useDispatch()

  // Static data to replace API call
  const staticRoleData: RoleData[] = [];

  const handleStatusToggle = async (id: any) => {

    const newStatus = id.status === null || id.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
  
    const response = await put<any>(`/user-role/update/user/${id.userId}/role/${id.roleId}/status/${newStatus}`, null, setAlertHandler);

    setAlertHandler({
      hasAlert: true,
      alertMessage: `User status updated to ${newStatus}.`,
      alertType: "success",
      alertTitle: "Success",
    });

    setRoleData((prevRoleData) =>
      prevRoleData.map((role) =>
        role.id === id.id
          ? {
              ...role,
              status: newStatus,
            }
          : role
      )
    );
  };



 
  useEffect(()=>
    {
        const fetchData = async () => {
          try {
          
            const roledata = await get<any>(
              `/user-role/${userData.userData.userId}`,
              {},
              "instance1",
              setAlertHandler
            );
              
          const formattedRoleData =  {
  
              id:roledata.data.data.userId,
              userName: roledata.data.data.userName,
              roles:roledata.data.data.roles,
              status:roledata.data.data.status,         
        
          };

          const updatedData = formattedRoleData.roles.map((role, index) => ({
            userId: formattedRoleData.id,
            ...role,
            id: index + 1,
            status: role.status === null ? "ACTIVE" : role.status 
          }));
          
          setRoleData(updatedData)
          dispatch(Showuserrole(false))
          setLoading(false)
        } catch (error) {
          console.log("Error fetching data:", error);
        }
      };
      
        if(loading || showRoleGroup)
        {
          fetchData(); 
        }
            
        
    },[loading, showRoleGroup])
 

  const columnData: GridColDef[] = [
    { field: "roleName", headerName: "RoleName", width: 470, editable: false },
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
              checked={params.value === "ACTIVE"}
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
    console.log(newData, "update");
  };

  const deleteApi = async (id: any) => {
    try {
      const response = await del(
        `/user-role/remove/${id.userId}/role/${id.roleId}`,
        {},
        null,
        setAlertHandler
      );
      console.log(response, "delete response");
      setAlertHandler({
        hasAlert: true,
        alertMessage: "User removed from role successfully.",
        alertType: "success",
        alertTitle: "Success",
      });
     
    } catch (error) {
      console.log("Error deleting user:", error);
    }
      setLoading(true)

    //   setRoleData((prevData) =>
    //   prevData.filter((group) => group.id !== id.id)
    // );

  };

const handleCancel=()=>
{
  dispatch(UserData(false))
}

  return (
    <Suspense fallback={<div>loading</div>}>
      <CommonDataGridUsersRole
        rowData={roleData}
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

export default UserRole;
