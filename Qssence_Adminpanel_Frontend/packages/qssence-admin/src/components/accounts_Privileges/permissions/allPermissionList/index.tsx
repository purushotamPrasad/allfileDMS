"use client";
import React, { useState } from "react";
import { GridColDef, GridValidRowModel, GridRowModel } from "@mui/x-data-grid";
import { CommonDataGrid } from "qssence-common";
import { useRouter } from "next/navigation";
import { AlertColor, Box, useTheme } from "@mui/material";

interface PermissionData {
  id: string;
  permissionId: string;
  permission: string;
  type: string;
  accessLevel: string;
}

interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle?: string;
}

interface listProps {
  open: boolean;
  setTabData: any;
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
}

function AllUserPermissionList({
  setTabData,
  open,
  setAlertHandler,
}: listProps) {
  const routers = useRouter();
  const theme = useTheme();

  const [selectedRowArray, setSelectedRowArray] = useState<GridValidRowModel[]>(
    []
  );

  // Static permission data
  const [permissionData, setPermissionData] = useState<PermissionData[]>([
    {
      id: "1",
      permissionId: "PERM001",
      permission: "View Users",
      type: "USER",
      accessLevel: "CAN_VIEW",
    },
    {
      id: "2",
      permissionId: "PERM002",
      permission: "Edit Users",
      type: "ROLE",
      accessLevel: "CAN_MODIFY",
    },
    {
      id: "3",
      permissionId: "PERM003",
      permission: "Delete Users",
      type: "GROUP",
      accessLevel: "CAN_DELETE",
    },
    {
      id: "4",
      permissionId: "PERM004",
      permission: "Create Users",
      type: "USER",
      accessLevel: "CAN_CREATE",
    },
  ]);

  const columnData: GridColDef[] = [
    { field: "id", headerName: "Id", width: 150, editable: false },
    {
      field: "permission",
      headerName: "Permission",
      type: "text",
      width: 200,
      align: "left",
      headerAlign: "left",
      editable: true,
      renderCell: (params) => (
        <Box
          style={{ cursor: "pointer" }}
          sx={{ "&:hover": { color: theme.palette.primary.main } }}
          onClick={() => {
            routers.push(
              `/accounts_privileges/permission?pid=${params.row.permissionId}`
            );
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "type",
      headerName: "Type",
      type: "singleSelect",
      width: 200,
      flex: 1,
      align: "left",
      headerAlign: "left",
      editable: true,
      valueOptions: ["USER", "ROLE", "GROUP"],
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      type: "singleSelect",
      width: 200,
      flex: 1,
      align: "left",
      headerAlign: "left",
      editable: true,
      valueOptions: ["CAN_MODIFY", "CAN_DELETE", "CAN_CREATE", "CAN_VIEW"],
    },
  ];

  const putApi = async (newData: GridRowModel) => {
    try {
      // Static update logic can go here
      let payload = {
        permissionName: newData?.permission,
        permissionType: newData?.type,
        permissionAccessLevel: newData?.accessLevel,
      };
      console.log("Updated data:", payload);
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Permission details updated successfully.",
        alertType: "success",
        alertTitle: "Success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteApi = async (id: number) => {
    try {
      console.log(
        "Deleted permission ID:",
        permissionData[id - 1]?.permissionId
      );
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Permission details deleted successfully.",
        alertType: "success",
        alertTitle: "Success",
      });
    } catch (error) {
      console.log("Error deleting permission:", error);
    }
  };

  const getPermissionApi = async (row: any) => {
    console.log("permission", row);
    try {
      // Static fetch logic
      const data = permissionData.find(
        (item) => item.permissionId === row?.permissionId
      );
      setTabData({ permissionId: row?.permissionId, data });
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Fetched Role successfully.",
        alertType: "success",
        alertTitle: "Success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CommonDataGrid
      rowData={permissionData}
      columnData={columnData}
      setSelectedRowArray={setSelectedRowArray}
      putApi={putApi}
      deleteApi={deleteApi}
      getById={getPermissionApi}
    />
  );
}

export default AllUserPermissionList;
