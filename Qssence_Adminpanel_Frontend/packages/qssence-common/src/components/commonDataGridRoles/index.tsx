"use client";
import * as React from "react";
import { useState } from "react";
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
  IconFilePlus,
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
import { ArrowRightIcon } from "@mui/x-date-pickers/icons";
import CommonDialogPlants from "../commonDialogPlants";
import { AlertColor } from "@mui/material";
import EditRole from "../../../../qssence-admin/src/components/accounts_Privileges/roles/editRole/page";


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
  setSelectedRowArray: (selectedRows: GridValidRowModel[]) => void;
  putApi: (editData: GridRowModel) => void;
  deleteApi: (deleteData: GridRowId) => void;
  getById: (getData: GridRowId) => void;
  enableEdit?: boolean;
  enableAction?: boolean;
}

export default function CommonDataGridRoles({
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


  const [open, setOpen] = useState(false);

  const [view, setView] = useState(false); 

  const [alertHandler, setAlertHandler] = useState<AlertHandlerState>({
    hasAlert: false,
    alertType: "info", // or whatever default value
    alertMessage: "",
    alertTitle: "", // or undefined if it’s allowed
  });

  // State for dialog
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogData, setDialogData] = React.useState<any>(null);

  const [viewData, setViewData]=useState<any>()

  const workflows = [
    { id: 1, name: "Global Workflow" },
    { id: 2, name: "Region Workflow" },
    { id: 3, name: "Local Workflow" },
  ];

  const [selectedWorkflow, setSelectedWorkflow] = useState(1);

  const handleClick = (id: any, index: any) => {

    setSelectedWorkflow(id); 
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => {
    
    setViewData(id)
    setView(false)
    setOpen(true); 
   
  };

  const handleViewClick = (id: GridRowId) => {
   
    setViewData(id)
     setView(true)
     setOpen(true); 
   
  };

  const handleSaveClick = (id: GridRowId) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => {

    // setRows(rows.filter((row) => row.id !== id));
    deleteApi(id);

  };

  // Function to handle opening dialog
  const handleGetClick = (row: any) => {
    console.log("common row Data", row);
    // getById(row);
    setDialogData(row); // Set data for the dialog
    setOpenDialog(true); // Open dialog
  };

  const handleCancelClick = (id: GridRowId) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
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
      field: "workflow", // This is the new field for the edit column
      headerName: "Workflow", // This will add the "Edit" header
      width: 100,
      type: "actions",
      cellClassName: "edit-actions",
      getActions: ({ id, row }: any) => {
       
        const actions = [];
        if (enableEdit !== false) {
          actions.push(
            <GridActionsCellItem
            key="workflow"
            icon={<IconFilePlus height={18} width={18} />}
            label="Workflow"
            className="textPrimary primary_color"
            onClick={() => handleGetClick(id)}
            color="inherit"
          />,
          );
        }
        return actions;
      },
    },
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
        onClick={() => handleDeleteClick(row)}
        color="inherit"
      />
      ],
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
                <CommonDialogPlants
                  buttonText={view?"View Role":"Edit Role"}
                  dialogTitle={view?"View Role":"Edit Role"}
                  dialogContent={
                    <EditRole
                      setClose={setOpen}
                      setAlertHandler={setAlertHandler}
                      view={view}
                      viewData={viewData}
                    />
                  }
                  onSave={() => {
                    console.log("save");
                  }}
                  open={open}
                  setOpen={setOpen}
                />
              )}

      {/* Dialog Component for Popup */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "60%",
            width: "90%",
            minWidth: "40%",
          },
        }}
      >
         <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: "24px",
              paddingTop: "0.5rem",
            }}
          >
          <DialogTitle
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            paddingRight: "24px",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          <div style={{display:'flex', gridColumnGap:"20px"}}>
      {workflows.map((workflow, index) => (
        <div
          key={workflow.id}
          onClick={() => handleClick(workflow.id, index)}
          style={{
            backgroundColor: selectedWorkflow === workflow.id ? "#0B4A6F" : "white",
            padding: "10px",
            color: selectedWorkflow === workflow.id ? "white" : "#0B4A6F",
            border: "1px solid #0B4A6F",
            borderRadius: "5px",
            cursor: "pointer",
            
          }}
        >
          {workflow.name}
        </div>
      ))}
    </div>
        </DialogTitle>

          <IconX height={20} width={20} style={{cursor:'pointer'}} onClick={handleCloseDialog} />
          </div>

        <DialogContent>
         
        {dialogData && (
          <>
            {selectedWorkflow === 1 && (
              <Box style={{ display: "grid", gridRowGap: "10px" }}>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  1. Create Workflow
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  2. Permission Workflow
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  3. CAPA Workflow
                </p>
              </Box>
            )}

            {selectedWorkflow === 2 && (
              <Box style={{ display: "grid", gridRowGap: "10px" }}>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  1. Create Region Workflow
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  2. Permission Region Workflow
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  3. CAPA Region Workflow
                </p>
              </Box>
            )}

        {selectedWorkflow === 3 && (
              <Box style={{ display: "grid", gridRowGap: "10px" }}>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  1. Create Local Workflow
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  2. Permission Local Workflow
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  3. CAPA Local Workflow
                </p>
              </Box>
            )}
          </>
        )}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: "#23608E" }}>
            Workflow Config
            <>
              <ArrowRightIcon />
            </>
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}


