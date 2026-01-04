"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  IconEdit,
  IconTrash,
  IconDeviceFloppy,
  IconX,
  IconEye,
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
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id, row }: any) => {
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
        }
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

      {/* Dialog Component for Popup */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "80%",
            width: "90%",
            minWidth: "60%",
          },
        }}
      >
        <DialogTitle
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: "1rem",
            paddingTop: "0.5rem",
            fontSize: "12px",
            fontWeight: "500",
          }}
        >
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            View
          </div>
          <Button
            onClick={handleCloseDialog}
            sx={{
              minWidth: "auto",
              padding: "0.2rem",
              color: "gray",
            }}
          >
            <IconX height={20} width={20} />
          </Button>
        </DialogTitle>
        <DialogContent>
          {dialogData && (
            <Box>
            
              <div
                style={{ display: "flex", alignItems: "center", gap: "10rem" }}
              >
                <div style={{ marginTop: "1rem" }}>
                  <p
                    style={{
                      fontSize: "1rem",
                      fontFamily: "sans-serif",
                      marginBottom: "5px",
                    }}
                  >
                    Document type
                  </p>
                  <p
                    style={{
                      fontSize: "1rem",
                      fontFamily: "sans-serif",
                      marginBottom: "5px",
                    }}
                  >
                    Document Subtype
                  </p>
                  <p
                    style={{
                      fontSize: "1rem",
                      fontFamily: "sans-serif",
                      marginBottom: "5px",
                    }}
                  >
                    Classification
                  </p>
                  <p
                    style={{
                      fontSize: "1rem",
                      fontFamily: "sans-serif",
                      marginBottom: "5px",
                    }}
                  >
                    No. of Fields
                  </p>
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <p
                    style={{
                      fontSize: "1rem",
                      fontFamily: "sans-serif",
                      marginBottom: "5px",
                    }}
                  >
                    : {dialogData?.documentType}
                  </p>
                  <p
                    style={{
                      fontSize: "1rem",
                      fontFamily: "sans-serif",
                      marginBottom: "5px",
                    }}
                  >
                    : {dialogData?.subType}
                  </p>
                  <p
                    style={{
                      fontSize: "1rem",
                      fontFamily: "sans-serif",
                      marginBottom: "5px",
                    }}
                  >
                    : {dialogData?.classification}
                  </p>
                  <p
                    style={{
                      fontSize: "1rem",
                      fontFamily: "sans-serif",
                    }}
                  >
                    : {dialogData?.fieldCount}
                  </p>
                </div>
              </div>
              <p
                style={{
                  fontWeight: "600",
                  fontFamily: "sans-serif",
                  marginTop: "1rem",
                }}
              >
                Meta Data Heading: {dialogData?.headingName}
              </p>

              {/* Table starts here */}
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
                    <th
                      style={{
                        padding: "10px",
                      }}
                    >
                      Required
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dialogData?.metadataFields?.map((field: any, index: number) => (
                    <tr
                      key={index}
                      style={{
                        border: "1px solid #23608E",
                      }}
                    >
                      <td style={{ padding: "10px" }}>{dialogData?.headingName}</td>
                      <td style={{ padding: "10px" }}>{field.fieldName}</td>
                      <td style={{ padding: "10px" }}>{field.fieldType}</td>
                      <td style={{ padding: "10px" }}>
                        {field.minLength && field.maxLength 
                          ? `${field.minLength} & ${field.maxLength}`
                          : field.minLength 
                            ? `${field.minLength} & -`
                            : field.maxLength 
                              ? `- & ${field.maxLength}`
                              : '-'
                        }
                      </td>
                      <td style={{ padding: "10px" }}>{field.width}</td>
                      <td style={{ padding: "10px" }}>{field.required ? 'Yes' : 'No'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

/* checkboxSelection
        onRowSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRows = rows.filter((row) => selectedIDs.has(row.id));
          setSelectedRows(selectedRows);
          setSelectedRowArray(selectedRows);
        }} */