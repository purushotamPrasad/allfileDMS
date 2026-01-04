'use client'
import React, { useEffect, useState } from 'react';
import {
  GridColDef,
  GridRowId,
  GridValidRowModel,
} from '@mui/x-data-grid';
import { CommonDataGrid } from 'qssence-common';
import Box from "@mui/material/Box";
import { useRouter } from 'next/navigation';
import { AlertColor, useTheme } from '@mui/material';
import { getQueryParamAsString } from '@/utils/utilsFunction';
import { GridRowModel } from '@mui/x-data-grid';
import { del, get } from '@/utils/ApiConfig';

interface GroupData {
  id: string,
  groupId: string,
  name: string,
  description: string,
  status: string
}

interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle?: string;
}

interface listProps {
  open: boolean;
  roleData:any;
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
}

function RoleGroup({ roleData,open, setAlertHandler }: listProps) {
  const routers = useRouter();
  const theme = useTheme();
  const [selectedRowArray, setSelectedRowArray] = React.useState<GridValidRowModel[]>([]);
  const [groupData, setGroupData] = useState<GroupData[]>([]);
  const rid = getQueryParamAsString('rid');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get<any>(`/role/getAllGroupsByRoleId/${rid}`, {}, 'instance1',setAlertHandler);
        const formattedData = data.data.data.map((data: any, key: number) => {
          return {
            id: key + 1,
            groupId: data.id,
            name: data.name,
            description: "Lorem ipsum dolor sit amet consectetur",
            status: "Active"
          };
        });
        setGroupData(formattedData);
      } catch (error) {
        console.log(error);
      }
    };
    if (rid !== undefined && rid != "") {
      fetchData();
    }
  }, [rid, open]);

  const columnData: GridColDef[] = [
    {
      field: 'groupId',
      headerName: 'Group Id',
      type: 'number',
      width: 150,
      align: 'left',
      headerAlign: 'left',
      editable: false,
    },
    {
      field: 'groupName', headerName: 'Group Name', width: 250, flex: 1, editable: false,
      renderCell: (params) => (
        <Box
          style={{
            cursor: 'pointer', // Change color to blue on hover
          }}
          sx={{ "&:hover": { color: theme.palette.primary.main } }}
          // Set isHovered to false on mouse leave
          onClick={() => { routers.push(`/accounts_privileges/groups?gid=${params.row.groupId}`) }}
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
    {
      field: 'type',
      headerName: 'Type',
      flex: 1,
      width: 200,
      align: 'left',
      headerAlign: 'left',
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
              params.value === "Active"
                ? "#C6EFCE" // Background color for Active status
                : params.value === "Inactive"
                  ? "#F8D7DA" // Background color for Inactive status
                  : params.value === "Pending"
                    ? "#FFF3CD"
                    : "", // Default background color
            padding: "2px 10px",
            borderRadius: "5px",
          }}
        >
          {params.value}
        </Box>
      ),
    }
  ];

  const putApi = (newData: GridRowModel) => {
    console.log(newData, "update")
  }

  const deleteApi = async (id: number) => {
    console.log(groupData[id], "delete");
  }

  return (
    <CommonDataGrid rowData={groupData} columnData={columnData} setSelectedRowArray={setSelectedRowArray} putApi={putApi} deleteApi={deleteApi} enableEdit={false} getById={function (getData: GridRowId): void {
      throw new Error('Function not implemented.');
    } } />
  )
}
export default RoleGroup