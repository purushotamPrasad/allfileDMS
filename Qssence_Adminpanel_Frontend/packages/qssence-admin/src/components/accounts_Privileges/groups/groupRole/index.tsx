'use client'
import React, { useEffect, useState } from 'react';
import {
  GridColDef,
  GridValidRowModel,
  GridRowModel,
  GridRowId
} from '@mui/x-data-grid';
import { CommonDataGrid } from 'qssence-common';
import { useRouter } from 'next/navigation';
import {AlertColor, Box, useTheme} from '@mui/material';
import { getQueryParamAsString } from '@/utils/utilsFunction';
import { del, get } from '@/utils/ApiConfig';

interface RowData {
  id: string,
  roleId:string,
  roles: string,
  description: string
}

interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle?: string;
}

interface listProps {
  open:boolean;
  groupData:any;
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
}

function GroupRole({groupData , open,setAlertHandler}:listProps) {
  const routers = useRouter();
  const theme=useTheme();
  const [selectedRowArray, setSelectedRowArray] =React.useState<GridValidRowModel[]>([]);
  const [roleData, setRoleData ] = useState<RowData[]>([]);
  const gid = getQueryParamAsString('gid');

  useEffect(() => {
    const fetchData = async () => {

      try{
        const data = await get<any>(`/group/getAllRolesByGroupId/${gid}`, {}, 'instance1',setAlertHandler);
        const formattedData = data.data.data.map((data: any, key: number) => {
          return {
            id: key+1,
            roleId: data.id,
            roles: data.name,
            desciption:data.description,
          };
        });
        setRoleData(formattedData);
      }catch(error){
        console.log(error);
      }
    };
    if(gid!==undefined&&gid!==""){
      fetchData();
    }
  }, [gid,open]);
 
  const columnData: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 100, editable: false },
    {
      field: 'roles',
      headerName: 'Roles',
      type: 'text',
      width: 200,
      //flex: 1,
      align: 'left',
      headerAlign: 'left',
      editable: false,
      renderCell: (params) => (
        <Box
          style={{
            cursor: 'pointer', // Change color to blue on hover
          }}
          sx={{"&:hover": {color:theme.palette.primary.main}}}
         // Set isHovered to false on mouse leave
          onClick={() => {routers.push(`/accounts_privileges/roles?rid=${params.row.id}`)}}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: 'desciption',
      headerName: 'Description',
      type: 'text',
      width: 200,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      editable: false,
    },
  ];

  const putApi=(newData:GridRowModel)=>{
    console.log(newData,"update")
  }

  const deleteApi=async(id:number)=>{
    try {
      const response = await del(`/role/deleteRoleByGroupIdAndRoleId/${gid}`,{},{
        roleId:roleData[id-1]?.roleId
      },setAlertHandler);
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
    <CommonDataGrid rowData={roleData} columnData={columnData} setSelectedRowArray={setSelectedRowArray} putApi={putApi} deleteApi={deleteApi} enableEdit={false} getById={function (getData: GridRowId): void {
      throw new Error('Function not implemented.');
    } }/>
  )
}
export default GroupRole