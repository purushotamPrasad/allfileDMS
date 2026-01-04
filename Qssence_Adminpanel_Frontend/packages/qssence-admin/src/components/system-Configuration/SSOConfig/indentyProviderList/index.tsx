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

interface IndentityProviderData {
  id: string,
  IndentityProviderId: string,
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
  open: boolean
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
}

function IndentityProviderList({ open, setAlertHandler }: listProps) {
  const routers = useRouter();
  const theme = useTheme();
  const [selectedRowArray, setSelectedRowArray] = React.useState<GridValidRowModel[]>([]);
  const [IndentityProviderData, setIndentityProviderData] = useState<IndentityProviderData[]>([]);

 const rowData: GridRowsProp = [
    {
      id: 1,
      providerId: 123456,
      name: "Microsoft AD",
      providerDetails: "Oidc",
    },
    {
      id: 2,
      providerId: 123456,
      name: "SAML",
      providerDetails: "saml",
    },]
  const columnData: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Provider Id',
      type: 'number',
      width: 150,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'name', headerName: ' Name', width: 250, flex: 1, editable: true,
      renderCell: (params) => (
        <Box
          style={{
            cursor: 'pointer', // Change color to blue on hover
          }}
          sx={{ "&:hover": { color: theme.palette.primary.main } }}
          // Set isHovered to false on mouse leave
          onClick={() => { routers.push(`/system-configuration/SSO-Configurations/provider-details/?providerid=${params.row.providerId}`) }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: 'providerDetails',
      headerName: 'Provider Details',
      type: 'text',
      width: 200,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
  ];

  const putApi = async (newData: GridRowModel) => {
  }

  const deleteApi = async (id: number) => {
  }

  return (
    <CommonDataGrid rowData={rowData} columnData={columnData} setSelectedRowArray={setSelectedRowArray} putApi={putApi} deleteApi={deleteApi} getById={function (getData: GridRowId): void {
      throw new Error('Function not implemented.');
    } } />
  )
}
export default IndentityProviderList