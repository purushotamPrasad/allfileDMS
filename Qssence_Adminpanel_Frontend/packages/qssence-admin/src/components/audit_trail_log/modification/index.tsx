'use client'
import React, { useState } from 'react';
import {
  GridColDef,
  GridRowId,
  GridRowsProp,
  GridValidRowModel
} from '@mui/x-data-grid';
import { CommonDataGrid } from 'qssence-common';
import Box from "@mui/material/Box";
import { useRouter } from 'next/navigation';
import { AlertColor, useTheme } from '@mui/material';
import { GridRowModel } from '@mui/x-data-grid';
import Filter from './filter';

interface ModificationTabData {
  id: string,
  IndentityModificationId: string,
  name: string,
  description: string,
  status: string
}

// interface AlertHandlerState {
//   hasAlert: boolean;
//   alertType: AlertColor;
//   alertMessage: string;
//   alertTitle?: string;
// }

interface listProps {
  filterUI: boolean
  // setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
}

function Modification({ filterUI }: listProps) {
  const routers = useRouter();
  const theme = useTheme();
  const [selectedRowArray, setSelectedRowArray] = React.useState<GridValidRowModel[]>([]);
  const [ModificationTabData, setModificationTabData] = useState<ModificationTabData[]>([]);

  const rowData: GridRowsProp = [
    {
      id: 1,
      ModificationId: 123456,
      name: "Aditya@gmail.com",
      event: "Title",
      documentId: "QS-094537",
      timeStamp: "14 Apr 2024 6:42 ",
      description: "Update User Information"
    },
    {
      id: 2,
      ModificationId: 123456,
      name: "Ayush@gmail.com",
      event: "Version",
      documentId: "QS-094537",
      timeStamp: "14 Apr 2024 6:42 ",
      description: "Modify User Identity"
    },]
  const columnData: GridColDef[] = [
    {
      field: 'name', headerName: 'User Name', width: 250, flex: 1, editable: false,
      renderCell: (params) => (
        <Box
          style={{
            cursor: 'pointer', // Change color to blue on hover
          }}
        // sx={{ "&:hover": { color: theme.palette.primary.main } }}
        // Set isHovered to false on mouse leave
        // onClick={() => { routers.push(`/Modification-configuration/SSO-Configurations/provider-details/?ModificationId=${params.row.ModificationId}`) }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: 'event',
      headerName: 'Event',
      type: 'text',
      width: 200,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      editable: false,
    },
    {
      field: 'documentId',
      headerName: 'Document ID',
      type: 'text',
      width: 200,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      editable: false,
    },
    {
      field: 'timeStamp',
      headerName: 'Time Stamp',
      type: 'text',
      width: 200,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      editable: false,
    },
    {
      field: 'description',
      headerName: 'Description',
      type: 'text',
      width: 200,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      editable: false,
    },
  ];

  const putApi = async (newData: GridRowModel) => {
  }

  const deleteApi = async (id: number) => {
  }

  return (
    <Box style={{ display: "flex", gap: "0.5rem" }}>
      <Box sx={{
        px: filterUI ? 3 : 0,
        pt: filterUI ? 2 : 0,
        background: "#fff",
        width: filterUI ? "70%" : "100%",
        transition: "width 0.5s",
        overflow: "hidden", // Hide overflow content during transition
      }} >
        <CommonDataGrid rowData={rowData} columnData={columnData} setSelectedRowArray={setSelectedRowArray} putApi={putApi} deleteApi={deleteApi} enableAction={true} getById={function (getData: GridRowId): void {
          throw new Error('Function not implemented.');
        } } />
      </Box>
      <Box sx={{
        px: filterUI ? 3 : 0,
        pt: filterUI ? 2 : 0,
        background: "#fff",
        width: filterUI ? "30%" : "0",
        display: filterUI ? "block" : "none",
        transition: "width 0.5s",
        overflow: "hidden", // Hide overflow content during transition
      }}>
        <div>Filter</div>
        <Filter />
      </Box>
    </Box>
  )
}
export default Modification