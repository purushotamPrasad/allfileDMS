"use client";
import React, { useState, useEffect } from "react";
import { GridColDef, GridRowId, GridValidRowModel } from "@mui/x-data-grid";
import {  CommonDataGridRoles } from "qssence-common";
import { useRouter } from "next/navigation";
import { AlertColor, Box, useTheme } from "@mui/material";
import { GridRowModel } from "@mui/x-data-grid";
import { del, get, put } from "@/utils/ApiConfig";
import { RootState } from "@/components/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { RoleData } from "@/components/Redux/action";

interface RoleData {
  id: string;
  userRoleId: string;
  userRoleName: string;
  description: string;
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

function AllUserRoleList({ setTabData, open, setAlertHandler }: listProps) {
  const routers = useRouter();
  const theme = useTheme();
  const [selectedRowArray, setSelectedRowArray] = React.useState<
    GridValidRowModel[]
  >([]);
  const [roleData, setRoleData] = useState<RoleData[]>([]);

  const dispatch = useDispatch()
  const [openRoles, setOpenRoles]=useState(true)

  const currentRole = useSelector((state: RootState) => state.currentRole);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get<any>(
          "role/getAll",
          {},
          "instance1",
          setAlertHandler
        );
        console.log(data, "data");
        const formattedData = data.data.data.map((data: any, key: number) => {
          return {
            id: key + 1,
            userRoleId: data.userRoleId,
            userRoleName: data.userRoleName,
            description: data.description,
          };
        });
        dispatch(RoleData(false))
        setOpenRoles(false)
        setRoleData(formattedData);
      } catch (error) {
        console.log(error);
      }
    };
    if(openRoles||currentRole)
    {
      fetchData();
    }
      

  }, [open, openRoles, currentRole]);

  const columnData: GridColDef[] = [
    { field: "id", headerName: "SL No.", width: 100, editable: false },
    {
      field: "userRoleName",
      headerName: "Role Name",
      type: "text",
      width: 200,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      type: "text",
      flex: 1,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
  ];

  const putApi = async (newData: GridRowModel) => {
    try {
      let payload = {
        userRoleId: newData?.userRoleId,
        userRoleName: newData?.userRoleName,
        description: newData?.description,
      };
      const response = await put(
        `/roles/update/${newData?.userRoleId}`,
        payload,
        setAlertHandler
      );
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Role details updated successfully.",
        alertType: "success",
        alertTitle: "Success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteApi = async (id: any) => {

    const roleId = String(id.userRoleId).trim()

    try {
      const response = await del(
        `/role/delete/${roleId}`,
        {},
        null,
        setAlertHandler
      );
      console.log(response, "delete response");
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Role details deleted successfully.",
        alertType: "success",
        alertTitle: "Success",
      });
      setOpenRoles(true)
    } catch (error) {
      console.log("Error deleting user:", error);
    }

  };

  const getRoleApi = async (row: any) => {
    try {
      // Fetch APi
      const data = await get<any>(
        `/role/getRoleById/${row?.roleId}`,
        {},
        "instance1",
        setAlertHandler
      );
      setTabData({ roleId: row?.roleId, data });
      setAlertHandler({
        hasAlert: true,
        alertMessage: "get Role successfully.",
        alertType: "success",
        alertTitle: "Success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CommonDataGridRoles
      rowData={roleData}
      columnData={columnData}
      setSelectedRowArray={setSelectedRowArray}
      putApi={putApi}
      deleteApi={deleteApi}
      getById={getRoleApi}
    />
  );
}
export default AllUserRoleList;
