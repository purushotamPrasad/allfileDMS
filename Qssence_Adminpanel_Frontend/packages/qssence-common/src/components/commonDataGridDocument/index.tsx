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
import { ArrowRightIcon } from "@mui/x-date-pickers/icons";
import { useState } from "react";
import CommonDialogPlants from "../commonDialogPlants";
import { AlertColor } from "@mui/material";
import EditDocumentType from "../../../../qssence-admin/src/components/document_type/editDocumentType/page";

interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle: string | undefined;  // Allowing undefined for alertTitle
}

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

// function EditToolbar(props: EditToolbarProps) {
//   const { setRows, setRowModesModel } = props;
//   const handleClick = () => {
//     const id = randomId();
//     setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }]);
//     setRowModesModel((oldModel) => ({
//       ...oldModel,
//       [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
//     }));
//   };



//   return (
//     <GridToolbarContainer>
//       <Button
//         color="primary"
//         startIcon={<IconPlus height={18} width={18} />}
//         onClick={handleClick}
//       >
//         Add record
//       </Button>
//     </GridToolbarContainer>
//   );
// }

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

export default function CommonDataGridDocument({
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

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => {

    setView(false)
    setOpen(true);
    // setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleViewClick=(id: GridRowId)=>
  {
      setView(true)
      setOpen(true); 
  }

  const handleSaveClick = (id: GridRowId) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => {
    setRows(rows.filter((row) => row.id !== id));
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
      field: "actions",
      type: "actions",
      headerName: "Action",
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
              onClick={() => handleViewClick(id)}
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
            icon={<IconTrash height={18}  width={18} />}
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
        height: "90vh",
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
        <DialogTitle
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            paddingRight: "2rem",
            paddingTop: "0.5rem",
            fontSize: "12px",
            fontWeight: "500",
          }}
        >
          <div
            style={{
              backgroundColor: "#0B4A6F",
              padding: "10px",
              color: "white",
              border: "1px solid #0B4A6F",
              borderRadius: "5px",
              fontFamily: "sans-serif",
            }}
          >
            Global Workflow
          </div>

          <div
            style={{
              backgroundColor: "#0B4A6F",
              padding: "10px",
              color: "white",
              border: "1px solid #0B4A6F",
              borderRadius: "5px",
              fontFamily: "sans-serif",
            }}
          >
            Region Workflow
          </div>
          <div
            style={{
              backgroundColor: "#0B4A6F",
              padding: "10px",
              color: "white",
              border: "1px solid #0B4A6F",
              borderRadius: "5px",
              fontFamily: "sans-serif",
            }}
          >
            Local Workflow
          </div>
        </DialogTitle>
        
        <DialogContent>
          {dialogData && (
            <Box>
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  fontFamily: "sans-serif",
                }}
              >
                1. Create Task
              </p>
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  fontFamily: "sans-serif",
                }}
              >
                2. Permission Workflow
              </p>
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  fontFamily: "sans-serif",
                }}
              >
                3. CAPA Workflow
              </p>
            </Box>
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

/*   const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit; 

  if (isInEditMode) {
          return [
            <GridActionsCellItem
              key="save"
              icon={<IconDeviceFloppy height={18} width={18} />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={() => handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key="cancel"
              icon={<IconX height={18} width={18} />}
              label="Cancel"
              className="textPrimary"
              onClick={() => handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

*/