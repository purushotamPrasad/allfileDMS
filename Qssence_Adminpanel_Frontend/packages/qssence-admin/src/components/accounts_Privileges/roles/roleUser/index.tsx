'use client'
import React, { useEffect, useState } from 'react';
import {
  GridColDef,
  GridValidRowModel,
  GridRowId,
  GridRowModel
} from '@mui/x-data-grid';
import { CommonDataGrid } from 'qssence-common';
import Box from "@mui/material/Box";
import { useRouter } from 'next/navigation';
import { AlertColor, useTheme } from '@mui/material';
import { getQueryParamAsString } from '@/utils/utilsFunction';
import { get } from '@/utils/ApiConfig';

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
  open:boolean;
  roleData : any;
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
}

function RoleUser({roleData ,open,setAlertHandler}:listProps) {
  const routers = useRouter();
  const theme = useTheme();
  const [selectedRowArray, setSelectedRowArray] = React.useState<GridValidRowModel[]>([]);
  const [userData, setUserData] = useState<UserData[]>([]);
  const rid = getQueryParamAsString('rid');

  useEffect(() => {
    const fetchData = async () => {
      try{
        const data = await get<any>( `/user/getAllUsersByRoleId/${rid}`, {}, 'instance1',setAlertHandler);
        const formattedData = data.data.data.map((data: any, key: number) => {
          let status = data.status ? "Active" : "Inactive";
          return {
            id: key+1,
            userId: data.id,
            employeeId: data.username,
            userName: data.fullName,
            email: data.email,
            status: status,
            role: "Admin",
          };
        });
        setUserData(formattedData);
      }catch(error){
        console.log(error);
      }
    };
    if (rid !== undefined && rid !== "") {
      fetchData();
    }
  }, [rid,open]);

  const columnData: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Employee Id',
      type: 'number',
      width: 150,
      align: 'left',
      headerAlign: 'left',
      editable: false,
    },
    {
      field: 'userName', headerName: 'Name', width: 250, flex: 1, editable: false,
      renderCell: (params) => (
        <Box
          style={{
            cursor: 'pointer', // Change color to blue on hover
          }}
          sx={{ "&:hover": { color: theme.palette.primary.main } }}
          // Set isHovered to false on mouse leave
          onClick={() => { routers.push(`/accounts_privileges/users?uid=${params.row.userId}`) }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'email',
      width: 200,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      width: 200,
      editable: false,
      renderCell: (params) => (
        <Box
          style={{
            color:
              params.value === "Active"
                ? "#389E0D" // Color for Active status
                : params.value === "Inactive"
                  ? "#FF4D4F" // Color for Inactive status
                  : params.value === "Pending"
                    ? "#FAAD14"
                    : "", // Default color
            backgroundColor:
              params.value === "Active" || params.value === "active"
                ? "#C6EFCE" // Background color for Active status
                : params.value === "Inactive" || params.value === "inactive"
                  ? "#F8D7DA" // Background color for Inactive status
                  : params.value === "Pending" || params.value === "pending"
                    ? "#FFF3CD"
                    : "", // Default background color
            padding: "2px 10px",
            borderRadius: "5px",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 150,
      editable: false,
      type: 'singleSelect',
      valueOptions: ['Admin', 'QMS', 'DMS', 'LMS'],
    },
  ];

  const putApi = (newData: GridRowModel) => {
    console.log(newData, "update")
  }

  const deleteApi = (id: GridRowId) => {
    console.log(userData[id], "delete");
  }

  return (
    <CommonDataGrid rowData={userData} columnData={columnData} setSelectedRowArray={setSelectedRowArray} putApi={putApi} deleteApi={deleteApi} enableEdit={false} getById={function (getData: GridRowId): void {
      throw new Error('Function not implemented.');
    } }/>
  )
}
export default RoleUser;