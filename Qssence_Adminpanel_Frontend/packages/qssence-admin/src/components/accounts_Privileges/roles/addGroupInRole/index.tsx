'use client'
import React, { useEffect, useState } from 'react';
import {
  GridColDef,
  GridValidRowModel,
  GridRowModel,
  GridRowId,
} from '@mui/x-data-grid';
import { CommonDataGrid } from 'qssence-common';
import Box from "@mui/material/Box";
import { useRouter } from 'next/navigation';
import { Typography, useTheme, Button, AlertColor } from '@mui/material';
import { del, get, post, put } from '@/utils/ApiConfig';
import { getQueryParamAsString } from '@/utils/utilsFunction';

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

interface AddGroup {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
}


function AddGroupInRole({ open, setOpen, setAlertHandler }: AddGroup) {
  const routers = useRouter();
  const theme = useTheme()
  const [selectedRowArray, setSelectedRowArray] = React.useState<GridValidRowModel[]>([]);
  const [groupData, setGroupData] = useState<GroupData[]>([]);
  const rid = getQueryParamAsString('rid');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get<any>('/group/getAllGroups', {}, 'instance1', setAlertHandler);
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

    fetchData();
  }, []);

  const columnData: GridColDef[] = [
    {
      field: 'id',
      headerName: ' Id',
      type: 'number',
      width: 100,
      align: 'left',
      headerAlign: 'left',
      editable: false,
    },
    {
      field: 'name', headerName: 'Group Name', width: 250, flex: 1, editable: true,
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
      field: 'description',
      headerName: 'Description',
      type: 'text',
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
      align: 'left',
      headerAlign: 'left',
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

  const handleAdd = async () => {
    try {
      let group = selectedRowArray[0];
      const response = await post<any>(`/role/assignGroupToRole/${rid}/${group.groupId}`, {}, setAlertHandler);
      setOpen(false);
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Group added successfully.",
        alertType: "success",
        alertTitle: "Success",
      });
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }

  const putApi = async (newData: GridRowModel) => {
    try {
      let payload = {
        groupsId: newData?.groupId,
        name: newData?.name,
        description: newData?.description
      }
      const response = await put(`/group/updateGroupById/${newData?.groupId}`, payload, setAlertHandler);
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Group details updated successfully.",
        alertType: "success",
        alertTitle: "Success",
      });
    } catch (error) {
      console.log(error)
    }
  }

  const deleteApi = async (id: number) => {
    try {
      const response = await del(`/group/deleteGroupById/${groupData[id - 1]?.groupId}`, {}, null, setAlertHandler);
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Group details deleted successfully.",
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
        <Typography variant="h4" color="primary">All Group</Typography>
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
      <CommonDataGrid rowData={groupData} columnData={columnData} setSelectedRowArray={setSelectedRowArray} putApi={putApi} deleteApi={deleteApi} getById={function (getData: GridRowId): void {
        throw new Error('Function not implemented.');
      } } />
    </div>
  )
}
export default AddGroupInRole