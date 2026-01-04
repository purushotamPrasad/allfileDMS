"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  IconEdit,
  IconTrash,
  IconDeviceFloppy,
  IconX,
  IconEye,
  IconTemperature,
} from "@tabler/icons-react";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { IconPlus } from "@tabler/icons-react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import CommonDialog from "../commonDialog";
import { AlertColor } from "@mui/material";
import { useState } from "react";
import EditCompanyData from "../../../../qssence-superadmin/src/components/company/editCompany/page";
import { useRouter } from "next/navigation";

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}


interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle: string | undefined;  // Allowing undefined for alertTitle
}

interface CommonDataGridProps {
  rowData: GridRowsProp;
  columnData: GridColDef[];
  putApi: (editData: GridRowModel) => void;
  deleteApi: (deleteData: GridRowId) => void;
  getById: (getData: GridRowId) => void;
  enableEdit?: boolean;
  enableAction?: boolean;
}

export default function CommonDataLicenseGrid({
  rowData,
  columnData,
  putApi,
  deleteApi,
  enableEdit,
  enableAction,
  getById,
}: CommonDataGridProps) {
  const [loading, setLoading] = React.useState(true);
  const [rows, setRows] = React.useState(rowData);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const [selectedRows, setSelectedRows] = React.useState<GridValidRowModel[]>(
    []
  );

  const [alertHandler, setAlertHandler] = useState<AlertHandlerState>({
    hasAlert: false,
    alertType: "info", // or whatever default value
    alertMessage: "",
    alertTitle: "", // or undefined if it’s allowed
  });

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const router = useRouter()

  const handleEditClick = (row: any) => {
 
     router.push(`/company/user-license/edit/${row.id}`);

  };

const handleViewClick = (row: any) => {

    router.push(`/company/user-license/view/${row.id}`);

};

  const handleDeleteClick = (id: GridRowId) => {
    deleteApi(id);
  };


  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    putApi(newRow);
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  React.useEffect(() => {
    // Simulate loading for a second
    if (rows.length !== 0) {
      setLoading(false);
    } else {
      const timeout = setTimeout(() => {
        setLoading(false); // Hide loader after one second
      }, 1000);

      return () => clearTimeout(timeout); // Clean up the timeout
    }
  }, [rows]);

  const columns: GridColDef[] = [
    ...columnData,
    enableAction !== true && {
      field: "action",
      headerName: "Action",
      width: 100,
      type: "actions",
      cellClassName: "workflow-actions",
      getActions: ({ id, row }: any) => [
       
        <GridActionsCellItem
          key="view"
          icon={<IconEye height={18} width={18} />}
          label="View"
          className="textPrimary primary_color"
          onClick={() => handleViewClick(row)}
          color="inherit"
        />,
       
      <GridActionsCellItem
          key="edit"
          icon={<IconEdit height={18} width={18} />}
          label="Edit"
          className="textPrimary primary_color"
          onClick={() => handleEditClick(row)}
          color="inherit"
        />,
        <GridActionsCellItem
        key="delete"
        icon={<IconTrash height={18} width={18} />}
        label="Delete"
        className="textPrimary primary_color"
        onClick={() => handleDeleteClick(id)}
        color="inherit"
      />
      ],
    },
  ].filter(Boolean) as GridColDef[]; // Remove any falsy values (null or undefined)

  React.useEffect(() => {
    setRows(rowData);
  }, [rowData]);

  return (
    <Box
      sx={{
        height: "auto",
        // width: '100%',
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        loading={loading === true}
        localeText={{
          noRowsLabel: "No Data Available",
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
          panel: {
            sx: {
              top: "-120px !important",
              left: "100px!important",
            },
          },
        }}

      />

        

    </Box>
  );
}
