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
import EditTemplate from "../../../../qssence-admin/src/components/add_template/edit_template/page";
import CommonDialogTemplate from "../commonDialogTemplate";
import { useEffect } from "react";
import CommonDialogWorkflowData from "../commonDialogWorkflowData";
import EditWorkflow from "../../../../qssence-admin/src/components/workflow/dms-workflow/editWorkFlow/page";
import ViewWorkFlow from "../../../../qssence-admin/src/components/workflow/dms-workflow/viewWorkFlow/page";



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

export default function CommonDataGridWorkflow({
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

  const [workflow, setWorkflow] = useState<any>(null);

  const [workflowEdit, setWorkflowEdit] = useState<any>(null);

  useEffect(() => {
    const workflowdata = localStorage.getItem("tabpanel");
    setWorkflow(workflowdata);
  }, []);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (row: any) => {

    setOpen(true); 
    setWorkflowEdit(row);

    // setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  

  const handleSaveClick = (id: GridRowId) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => {
    setRows(rows.filter((row) => row.id !== id));
    deleteApi(id);
  };

  // Function to handle opening dialog
  const handleGetClick = (row: any) => {

    setView(true); 
    setWorkflowEdit(row);

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
              onClick={() => handleEditClick(row)}
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
            <CommonDialogWorkflowData
              dialogTitle={
                workflow === "Global Workflow"
                  ? "Edit Global Workflow"
                  : workflow === "Region Workflow"
                      ? "Edit Region Workflow"
                      : "Edit Local Workflow"
                  }
                  dialogContent={
                    workflow === "Global Workflow" ? (
                      <EditWorkflow
                        type="Global"
                        workflowEdit={workflowEdit}
                        setAlertHandler={setAlertHandler as React.Dispatch<React.SetStateAction<any>>}
                        setClose={setOpen}
                      
                      />
                    ) : workflow === "Region Workflow" ? (
                      <EditWorkflow
                        type="Region"
                        workflowEdit={workflowEdit}
                        setAlertHandler={setAlertHandler as React.Dispatch<React.SetStateAction<any>>}
                        setClose={setOpen}
                       
                      />
                    ) : (
                      <EditWorkflow
                        type="Local"
                        workflowEdit={workflowEdit}
                        setAlertHandler={setAlertHandler as React.Dispatch<React.SetStateAction<any>>}
                        setClose={setOpen}
                
                      />
                    )
                  }
                  open={open}
                  setOpen={setOpen}
                  onSave={() => {
                    console.log("save");
                  }}
                />
              )}

{view && (
            <CommonDialogWorkflowData
              dialogTitle={
                workflow === "Global Workflow"
                  ? "View Global Workflow"
                  : workflow === "Region Workflow"
                      ? "View Region Workflow"
                      : "View Local Workflow"
                  }
                  dialogContent={
                    workflow === "Global Workflow" ? (
                      <ViewWorkFlow
                        type="Global"
                        workflowEdit={workflowEdit}
                        setAlertHandler={setAlertHandler as React.Dispatch<React.SetStateAction<any>>}
                        setClose={setView}
                      
                      />
                    ) : workflow === "Region Workflow" ? (
                      <ViewWorkFlow
                        type="Region"
                        workflowEdit={workflowEdit}
                        setAlertHandler={setAlertHandler as React.Dispatch<React.SetStateAction<any>>}
                        setClose={setView}
                       
                      />
                    ) : (
                      <ViewWorkFlow
                        type="Local"
                        workflowEdit={workflowEdit}
                        setAlertHandler={setAlertHandler as React.Dispatch<React.SetStateAction<any>>}
                        setClose={setView}
                
                      />
                    )
                  }
                  open={view}
                  setOpen={setView}
                  onSave={() => {
                    console.log("save");
                  }}
                />
              )}


    </Box>
  );
}

/* 

    <p
                style={{
                  fontWeight: "600",
                  fontFamily: "sans-serif",
                }}
              >
                S.no. - 01
              </p>

  <p
                style={{
                  fontWeight: "600",
                  fontFamily: "sans-serif",
                  marginTop: "1rem",
                }}
              >
                Meta Data Heading:
              </p>

  <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: "1rem",
                  fontFamily: "sans-serif",
                  textAlign: "left",
                }}
              >
                <thead
                  style={{
                    border: "1px solid #23608E",
                    backgroundColor: "#f0f4f8",
                  }}
                >
                  <tr>
                    <th
                      style={{
                        padding: "10px",
                      }}
                    >
                      Heading
                    </th>
                    <th
                      style={{
                        padding: "10px",
                      }}
                    >
                      Data Field
                    </th>
                    <th
                      style={{
                        padding: "10px",
                      }}
                    >
                      Data Type
                    </th>
                    <th
                      style={{
                        padding: "10px",
                      }}
                    >
                      Min & Max Length
                    </th>
                    <th
                      style={{
                        padding: "10px",
                      }}
                    >
                      Width
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    style={{
                      border: "1px solid #23608E",
                    }}
                  >
                    <td style={{ padding: "10px" }}>General</td>
                    <td style={{ padding: "10px" }}>Data Field</td>
                    <td style={{ padding: "10px" }}>Text</td>
                    <td style={{ padding: "10px" }}>06 & 15</td>
                    <td style={{ padding: "10px" }}>Full</td>
                  </tr>
                  <tr
                    style={{
                      border: "1px solid #23608E",
                    }}
                  >
                    <td style={{ padding: "10px" }}>General</td>
                    <td style={{ padding: "10px" }}>Data Field</td>
                    <td style={{ padding: "10px" }}>Number</td>
                    <td style={{ padding: "10px" }}>02 & 10</td>
                    <td style={{ padding: "10px" }}>One Third</td>
                  </tr>
                  <tr
                    style={{
                      border: "1px solid #23608E",
                    }}
                  >
                    <td style={{ padding: "10px" }}>General</td>
                    <td style={{ padding: "10px" }}>Data Field</td>
                    <td style={{ padding: "10px" }}>Text</td>
                    <td style={{ padding: "10px" }}>04 & 24</td>
                    <td style={{ padding: "10px" }}>Full</td>
                  </tr>
                </tbody>
              </table>

const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
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
        }*/
