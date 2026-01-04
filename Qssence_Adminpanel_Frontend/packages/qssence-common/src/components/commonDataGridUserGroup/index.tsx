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

export default function CommonDataGridUserRole({
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
  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => {
    // setRows(rows.filter((row) => row.id !== id));
    deleteApi(id);
  };

  const handleGetClick = (row: any) => {
    console.log("common row Data", row);
    getById(row);
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
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id, row }: any) => {
      
        const actions = [];
        actions.push(
          <GridActionsCellItem
            key="delete"
            icon={<IconTrash height={18} width={18} className="primary_color" />}
            label="Delete"
            onClick={() => handleDeleteClick(row)}
            color="inherit"
          />
        );

        return actions;
      },
    },
  ].filter(Boolean) as GridColDef[]; // Remove any falsy values (null or undefined)

  React.useEffect(() => {
    setRows(rowData);
  }, [rowData]);

  return (
    <Box
      sx={{
        height: rows.length === 0 ? "300px" : "auto",
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
