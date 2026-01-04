'use client'
import React, { useEffect, useState } from 'react';
import {
  GridColDef,
  GridRowId,
  GridValidRowModel
} from '@mui/x-data-grid';
import { CommonDataGrid } from 'qssence-common';
import { useRouter } from 'next/navigation';
import { AlertColor, Box, Button, Typography, useTheme } from '@mui/material';
import { GridRowModel } from '@mui/x-data-grid';
import { del, get, post, put } from '@/utils/ApiConfig';
import { getQueryParamAsString } from '@/utils/utilsFunction';

interface RoleData {
  id: string,
  roleId: string,
  name: string,
  description: string,
}

interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle?: string;
}

interface AddRole {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
}

function AddRoleInGroup({ open, setOpen, setAlertHandler }: AddRole) {
  const routers = useRouter();
  const theme = useTheme();
  const [selectedRowArray, setSelectedRowArray] = React.useState<GridValidRowModel[]>([]);
  const [roleData, setRoleData] = useState<RoleData[]>([]);
  const gid = getQueryParamAsString('gid');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get<any>('/role/getAllRoles', {}, 'instance1', setAlertHandler);
        const formattedData = data.data.data.map((data: any, key: number) => {
          return {
            id: key + 1,
            roleId: data.id,
            name: data.name,
            description: data.description,
          };
        });
        setRoleData(formattedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const columnData: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 100, editable: false },
    {
      field: 'name',
      headerName: 'Roles',
      type: 'text',
      width: 200,
      //flex: 1,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      renderCell: (params) => (
        <Box
          style={{
            cursor: 'pointer', // Change color to blue on hover
          }}
          sx={{ "&:hover": { color: theme.palette.primary.main } }}
          // Set isHovered to false on mouse leave
          onClick={() => { routers.push(`/accounts_privileges/roles?rid=${params.row.id}`) }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: 'description',
      headerName: 'Description',
      type: 'text',
      width: 200,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
  ];

  const handleAdd = async () => {
    try {
      let role = selectedRowArray[0];
      let userdata = {
        "groupId": gid
      };
      const response = await post<any>(`/group/assignRoleToGroup/${role.roleId}`, userdata, setAlertHandler);
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Role added successfully.",
        alertType: "success",
        alertTitle: "Success",
      });
      setOpen(false);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }

  const putApi = async (newData: GridRowModel) => {
    try {
      let payload = {
        rolesId: newData?.roleId,
        name: newData?.name,
        description: newData?.description
      }
      const response = await put(`/role/updateRoleById/${newData?.roleId}`, payload, setAlertHandler);
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Role details updated successfully.",
        alertType: "success",
        alertTitle: "Success",
      });
    } catch (error) {
      console.log(error)
    }
  }


  const deleteApi = async (id: number) => {
    try {
      const response = await del(`/role/deleteRoleById/${roleData[id - 1]?.roleId}`, {}, null, setAlertHandler);
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Role details deleted successfully.",
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
        <Typography variant="h4" color="primary">All Role</Typography>
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
      <CommonDataGrid rowData={roleData} columnData={columnData} setSelectedRowArray={setSelectedRowArray} putApi={putApi} deleteApi={deleteApi} getById={function (getData: GridRowId): void {
        throw new Error('Function not implemented.');
      } }  />
    </div>
  )
}
export default AddRoleInGroup