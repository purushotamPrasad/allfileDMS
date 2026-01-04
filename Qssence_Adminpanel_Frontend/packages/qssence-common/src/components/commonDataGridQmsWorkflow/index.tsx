"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  IconEdit,
  IconTrash,
  IconDeviceFloppy,
  IconX,
  IconEye,
  IconTemperature,
  IconArrowBack,
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
import { useState } from "react";
import CommonDialogPlants from "../commonDialogPlants";
import { AlertColor } from "@mui/material";
import EditWorkflow from "../../../../qssence-admin/src/components/workflow/qms-workflow/editWorkflow/page";
import CommonDialogWorkflow from "../commonDialogWorkflow";



interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle: string | undefined;  
}

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;
  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button
        color="primary"
        startIcon={<IconPlus height={18} width={18} />}
        onClick={handleClick}
      >
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

interface CommonDataGridProps {
  rowData: GridRowsProp;
  columnData: GridColDef[];
  setSelectedRowArray: (selectedRows: GridValidRowModel[]) => void;
  putApi: (editData: GridRowModel) => void;
  deleteApi: (deleteData: GridRowId) => void;
  getById: (getData: GridRowId) => void;
  enableEdit?: boolean;
  enableAction?: boolean;
}

export default function CommonDataGridQmsWorkflow({
  rowData,
  columnData,
  setSelectedRowArray,
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

  const [open, setOpen] = useState(false);

  const [view, setView] = useState(false);

  // State for dialog
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogData, setDialogData] = React.useState<any>(null);

  

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => {

    setOpen(true); 
    setView(false)

  };

    const handleDeleteClick = (id: GridRowId) => {
    setRows(rows.filter((row) => row.id !== id));
    deleteApi(id);
  };

  // Function to handle opening dialog
  const handleGetClick = (row: any) => {
    setOpen(true); 
    setView(true)
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
    if (rows.length !== 0) {
      setLoading(false);
    } else {
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [rows]);

  const columns: GridColDef[] = [
    ...columnData,
    enableAction !== true && {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id, row }: any) => {
        
        const actions = [];
        if (enableEdit !== false) {
          actions.push(
            <GridActionsCellItem
              key="get"
              icon={<IconEye height={18} width={18} />}
              label="GET"
              className="textPrimary primary_color"
              onClick={() => handleGetClick(row)}
              color="inherit"
            />
          );
          actions.push(
            <GridActionsCellItem
              key="edit"
              icon={<IconEdit height={18} width={18} />}
              label="Edit"
              className="textPrimary primary_color"
              onClick={() => handleEditClick(id)}
              color="inherit"
            />
          );
        }
        actions.push(
          <GridActionsCellItem
            key="delete"
            icon={<IconTrash height={18} width={18} />}
            label="Delete"
            onClick={() => handleDeleteClick(id)}
            className="textPrimary primary_color"
          />
        );

        return actions;
      },
    },
  ].filter(Boolean) as GridColDef[];

  React.useEffect(() => {
    setRows(rowData);
  }, [rowData]);

  // Function to handle closing the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogData(null);
  };

  return (
    <Box
      sx={{
        height: rows.length === 0 ? "300px" : "auto",
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

          {open && (
                <CommonDialogWorkflow
                  dialogTitle={view?"View Workflow":"Edit Workflow"}
                  dialogContent={
                    <EditWorkflow
                      setClose={setOpen}
                      setAlertHandler={setAlertHandler}
                      view={view}
                    />
                  }
                  onSave={() => {
                    console.log("save");
                  }}
                  open={open}
                  setOpen={setOpen}
                />
              )}

    </Box>
  );
}

