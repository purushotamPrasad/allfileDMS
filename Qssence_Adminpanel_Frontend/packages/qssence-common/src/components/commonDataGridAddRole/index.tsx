"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridRowId,
  GridRowModel,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { useState } from "react";




interface CommonDataGridProps {
  rowData: GridRowsProp;
  columnData: GridColDef[];
  setSelectedRowArray: (selectedRows: GridValidRowModel[]) => void;
  selectedRows: GridValidRowModel[]; // Receive selectedRows as a prop
  setSelectedRows: (selectedRows: GridValidRowModel[]) => void;
  rowSelectionModel:GridRowId[];
  setRowSelectionModel:(rowSelectionModel: GridRowId[]) => void;
  putApi: (editData: GridRowModel) => void;
  deleteApi: (deleteData: GridRowId) => void;
  getById: (getData: GridRowId) => void;
  enableEdit?: boolean;
  enableAction?: boolean;
}

export default function CommonDataGridAddRole({
  rowData,
  columnData,
  setSelectedRowArray,
  selectedRows,
  setSelectedRows,
  rowSelectionModel,
  setRowSelectionModel,
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
 
  // const [rowSelectionModel, setRowSelectionModel] = useState<GridRowId[]>([]); 

  // const handleButtonClick = () => {
  
  //   setRowSelectionModel([]);
  //   setSelectedRows([]); 
  //   setSelectedRowArray([]);
  // };

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
    // enableAction !== true && {
    //   field: "actions",
    //   type: "actions",
    //   headerName: "Actions",
    //   width: 100,
    //   cellClassName: "actions",
    //   getActions: ({ id, row }: any) => {
    //     const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
    //     if (isInEditMode) {
    //       return [
    //         <GridActionsCellItem
    //           key="save"
    //           icon={<IconDeviceFloppy height={18} width={18} />}
    //           label="Save"
    //           sx={{
    //             color: "primary.main",
    //           }}
    //           onClick={() => handleSaveClick(id)}
    //         />,
    //         <GridActionsCellItem
    //           key="cancel"
    //           icon={<IconX height={18} width={18} />}
    //           label="Cancel"
    //           className="textPrimary"
    //           onClick={() => handleCancelClick(id)}
    //           color="inherit"
    //         />,
    //       ];
    //     }
    //     const actions = [];
    //     if (enableEdit !== false) {
    //       actions.push(
    //         <GridActionsCellItem
    //           key="get"
    //           icon={<IconEye height={18} width={18} />}
    //           label="GET"
    //           className="textPrimary"
    //           onClick={() => handleGetClick(row)}
    //           color="inherit"
    //         />
    //       );
    //       actions.push(
    //         <GridActionsCellItem
    //           key="edit"
    //           icon={<IconEdit height={18} width={18} />}
    //           label="Edit"
    //           className="textPrimary"
    //           onClick={() => handleEditClick(id)}
    //           color="inherit"
    //         />
    //       );
    //     }
    //     actions.push(
    //       <GridActionsCellItem
    //         key="delete"
    //         icon={<IconTrash height={18} width={18} />}
    //         label="Delete"
    //         onClick={() => handleDeleteClick(id)}
    //         color="inherit"
    //       />
    //     );

    //     return actions;
    //   },
    // },
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
      {/* <button onClick={handleButtonClick}>Reset Selection</button> */}
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
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
        checkboxSelection
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={(newSelection) => {
          setRowSelectionModel(newSelection);
          const selectedIDs = new Set(newSelection);
          const selectedRows = rows.filter((row) => selectedIDs.has(row.id));
          setSelectedRows(selectedRows);
          setSelectedRowArray(selectedRows);
        }}
      />
    </Box>
  );
}
