'use client'
import React, { Dispatch, SetStateAction, useEffect, useState, Suspense } from 'react';
import {
  GridColDef,
  GridValidRowModel,
  GridRowModel,
  GridRowId,
} from '@mui/x-data-grid';
import { CommonDataGrid, CommonDataGridAddRole } from 'qssence-common';
import { useRouter } from 'next/navigation';
import { AlertColor, Box, Button, Typography, useTheme } from '@mui/material';
import { getQueryParamAsString } from '@/utils/utilsFunction';
import { del, get, post, put } from '@/utils/ApiConfig';
import { useDispatch } from 'react-redux';
import { Showuserrole } from '@/components/Redux/action';

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

interface addRoleProps {
  open: boolean,
  setClose: Dispatch<SetStateAction<boolean>>;
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
}

function AddRoleInUser({ open, setClose ,setAlertHandler}: addRoleProps) {
  const routers = useRouter();
  const theme = useTheme();
  const [selectedRowArray, setSelectedRowArray] = React.useState<GridValidRowModel[]>([]);
  const [selectedRows, setSelectedRows] = React.useState<GridValidRowModel[]>([]);
  const [roleData, setRoleData] = useState<RoleData[]>([]);

  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowId[]>([]);

  const [loading, setLoading] = useState(true)

  const [memberId, setMemberId] = useState(null);
  
  const dispatch = useDispatch()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setMemberId(JSON.parse(storedUserId)); 
      }
    }
  }, []);

  useEffect(() => {

    const fetchData = async () => {
      try{
        const data = await get<any>('/role/getAll', {}, 'instance1',setAlertHandler);
        const formattedData = data.data.data.map((data: any, key: number) => {
          return {
            id: key + 1,
            roleId: data.userRoleId,
            name: data.userRoleName,
            description: data.description,
            userIds:data.userIds
          };
        });
        setRoleData(formattedData);
        setLoading(false)
      }catch(error){
        console.log(error);
      }
    };

    if(loading)
    {
      fetchData();
    }

  }, [loading]);

  const columnData: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 100, editable: false },
    {
      field: 'roleId',
      headerName: 'Role Id',
      type: 'number',
      width: 150,
      align: 'left',
      headerAlign: 'left',
      editable: false,
    },
    {
      field: 'name',
      headerName: 'Roles',
      type: 'text',
      width: 200,
      align: 'left',
      headerAlign: 'left',
      editable: false,
    },
    {
      field: 'description',
      headerName: 'Description',
      type: 'text',
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
  ];

  const handleAdd = async () => {
    try {
      const roleIds = selectedRowArray.map(item => item.roleId);
      let userdata = {
        "userId": memberId.userId, 
        "roleIds": roleIds
      };
      const response = await post<any>(`/user-role/assign`, userdata, setAlertHandler);
      setAlertHandler({
        hasAlert: true,
        alertMessage: "User added in role successfully.",
        alertType: "success",
        alertTitle: "Success",
      });
      setRowSelectionModel([]);
      setSelectedRows([]);
      setSelectedRowArray([]);
      dispatch(Showuserrole(true))
      setClose(false);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }

  const putApi = async(newData: GridRowModel) => {
    try{
      let payload={
        rolesId: newData?.roleId,
        name:  newData?.name,
        description: newData?.description
      }
      const response=await put(`/role/updateRoleById/${newData?.roleId}`, payload,setAlertHandler);
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Role details updated successfully.",
        alertType: "success",
        alertTitle: "Success",
      });
    }catch(error){
     console.log(error)
    }
  }

  const deleteApi = async(id: number) => {
    try {
      const response=await del(`/role/deleteRoleById/${roleData[id-1]?.roleId}`, {},null,setAlertHandler);
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
    <Suspense fallback={<div>loading</div>}>
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
              onClick={() => setClose(!open)}
            >
              Close
            </Button>
          </div>
        </div>
        <CommonDataGridAddRole 
        rowData={roleData} 
        columnData={columnData} 
        setSelectedRowArray={setSelectedRowArray}
        selectedRows={selectedRows}
        rowSelectionModel={rowSelectionModel}
        setRowSelectionModel={setRowSelectionModel}
        setSelectedRows={setSelectedRows} 
         putApi={putApi} deleteApi={deleteApi} 
         getById={function (getData: GridRowId): void {
          throw new Error('Function not implemented.');
        } }/>
      </div>
    </Suspense>
  )
}
export default AddRoleInUser