"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { IconDeviceFloppy, IconX, IconEye, IconEdit, IconTrash } from "@tabler/icons-react";
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
import { useDispatch } from "react-redux";
import { UserData } from "../../../../qssence-admin/src/components/Redux/action";

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
  setTabData:any;
  setSelectedRowArray: (selectedRows: GridValidRowModel[]) => void;
  putApi: (editData: GridRowModel) => void;
  deleteApi: (deleteData: GridRowId) => void;
  getById: (getData: GridRowId) => void;
  enableEdit?: boolean;
  enableAction?: boolean;
}

export default function CommonDataGridUsers({
  rowData,
  columnData,
  setSelectedRowArray,
  setTabData,
  putApi,
  deleteApi,
  enableEdit,
  enableAction,
  getById,
}: CommonDataGridProps) {
  const [loading, setLoading] = React.useState(true);
  const [rows, setRows] = React.useState(rowData);
  const dispatch=useDispatch()
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
  //  setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (row: GridRowId) => {

    localStorage.setItem("userId",JSON.stringify(row))
    dispatch(UserData(true))
    setTabData(row)

  };

  const handleDeleteClick = (id: GridRowId) => {

    deleteApi(id);
  };

  const handleGetClick = (row: any) => {
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
      field: "action",
      headerName: "Action",
      width: 100,
      type: "actions",
      cellClassName: "workflow-actions",
      getActions: ({ id,row }: any) => [
       
        <GridActionsCellItem
          key="view"
          icon={<IconEdit height={18} width={18} />}
          label="View"
          className="textPrimary primary_color"
          onClick={() => handleSaveClick(row)}
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
