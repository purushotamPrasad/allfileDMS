'use client'
import React, { useEffect, useState } from 'react';
import {
  GridColDef,
  GridValidRowModel,
  GridRowModel
} from '@mui/x-data-grid';
import { CommonDataGrid } from 'qssence-common';
import Box from "@mui/material/Box";
import { useRouter } from 'next/navigation';
import { AlertColor, Button, Typography, useTheme } from '@mui/material';
import { GridRowId } from '@mui/x-data-grid';
import { del, get, post } from '@/utils/ApiConfig';
import { getQueryParamAsString } from '@/utils/utilsFunction';

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

interface AddUser {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
}

function AddUserInGroup({ open, setOpen ,setAlertHandler}: AddUser) {
  const routers = useRouter();
  const theme = useTheme();
  const [selectedRowArray, setSelectedRowArray] = React.useState<GridValidRowModel[]>([]);
  const [userData, setUserData] = useState<UserData[]>([]);
  const gid = getQueryParamAsString('gid');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get<any>('/user/getAllUsers', {}, 'instance1',setAlertHandler);
        const formattedData = data.data.data.map((data: any, key: number) => {
          let status = data.status ? "Active" : "Inactive";
          return {
            id: key,
            userId: data.id,
            employeeId: data.username,
            userName: data.fullName,
            email: data.email,
            status: status,
            role: "Admin",
          };
        });
        setUserData(formattedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const columnData: GridColDef[] = [
    {
      field: 'employeeId',
      headerName: 'Employee Id',
      type: 'number',
      width: 150,
      align: 'left',
      headerAlign: 'left',
      editable: false,
    },
    {
      field: 'userName', headerName: 'User Name', width: 250, flex: 1, editable: true,
      renderCell: (params) => (
        <Box
          style={{
            cursor: 'pointer', // Change color to blue on hover
          }}
          sx={{ "&:hover": { color: theme.palette.primary.main } }}
          // Set isHovered to false on mouse leave
          onClick={() => { routers.push(`/accounts_privileges/users?uid=${params.row.employeeId}`) }}
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
      editable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      width: 200,
      editable: true,
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
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Admin', 'QMS', 'DMS', 'LMS'],
    },
  ];

  const handleAdd = async () => {
    try {
      let user = selectedRowArray[0];
      let userdata = {
        "groupId": gid
      };
      const response = await post<any>(`/group/addUserToGroupByUserId/${user?.userId}`, userdata,setAlertHandler);
      setAlertHandler({
        hasAlert: true,
        alertMessage: "User added successfully.",
        alertType: "success",
        alertTitle: "Success",
      });
        setOpen(false);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }

  const putApi = (newData: GridRowModel) => {
    console.log(newData, "update")
  }

  const deleteApi = async (id: GridRowId) => {
    try {
      const response = await del(`/user/deleteUserById/${userData[id] && userData[id]?.userId}`, {},null,setAlertHandler);
      setAlertHandler({
        hasAlert: true,
        alertMessage: "User details deleted successfully.",
        alertType: "success",
        alertTitle: "Success",
      });
    } catch (error) {
      console.log('Error deleting user:', error);
    }
  }
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <Typography variant="h4" color="primary">All User</Typography>
        <div>
          <Button
            variant="contained"
            size="small"
            sx={{
              height: "35px",
              fontWeight: 700,
            }}
            onClick={handleAdd}
          >
            Add
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="outlined"
            size="small"
            sx={{
              height: "35px",
              fontWeight: 700,
            }}
            onClick={() => setOpen(!open)}
          >
            Close
          </Button>
        </div>
      </div>
      <CommonDataGrid rowData={userData} columnData={columnData} setSelectedRowArray={setSelectedRowArray} putApi={putApi} deleteApi={deleteApi} getById={function (getData: GridRowId): void {
        throw new Error('Function not implemented.');
      } } />
    </div>
  )
}
export default AddUserInGroup;