"use client";
import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { AlertColor, useTheme } from "@mui/material";
import { del, get, put } from "@/utils/ApiConfig/index";
import {CommonDataGrid} from "qssence-common"
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

interface UserData {
  id: string;
  plantName: string;
  divisions: string;
  locations: string;
}

interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle?: string;
}

interface listProps {
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
}

function AllTaskList({ setAlertHandler }: listProps) {
  const routers = useRouter();
  const theme = useTheme();
 
  const [userData, setUserData] = useState<UserData[]>([]);
  const [params, setparams] = useState({});

 

  const columnData: GridColDef[] = [
 
    {
      field: "Id",
      headerName: "Task",
      align: "center",
      flex: 1,
      headerAlign: "center",
      editable: true,
    },
    {
        field: "record",
        headerName: "Record ID",
        align: "center",
        flex: 1,
        headerAlign: "center",
        editable: true,
      },
      {
        field: "due date",
        headerName: "Due Date",
        align: "center",
        flex: 1,
        headerAlign: "center",
        editable: true,
      },

      {
        field: "assigned",
        headerName: "Assigned to",
        align: "center",
        flex: 1,
        headerAlign: "center",
        editable: true,
      },
      {
        field: "status",
        headerName: "Status",
        align: "center",
        flex: 1,
        headerAlign: "center",
        editable: true,
      },

  ];

  const putApi = async (newData: GridRowModel) => {
    // try {
    //   let payload = {
    //     firstname: newData?.firstname,
    //     lastname: newData?.lastname,
    //     userId: newData?.userId,
    //     userName: newData?.userName,
    //     description: newData?.description,
    //   };
    //   const response = await put(
    //     `/user/updateUserById/${newData?.userId}`,
    //     payload,
    //     setAlertHandler
    //   );
    //   setAlertHandler({
    //     hasAlert: true,
    //     alertMessage: "User details updated successfully.",
    //     alertType: "success",
    //     alertTitle: "Success",
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const deleteApi = async (id: number) => {
    // try {
    //   const response = await del(
    //     `/user/deleteUserById/${userData[id - 1] && userData[id - 1]?.id}`,
    //     {},
    //     null,
    //     setAlertHandler
    //   );
    //   setAlertHandler({
    //     hasAlert: true,
    //     alertMessage: "User details deleted successfully.",
    //     alertType: "success",
    //     alertTitle: "Success",
    //   });
    // } catch (error) {
    //   console.log("Error deleting user:", error);
    // }
  };

  const getByIdApi = async (row: any) => {
    console.log("users", row?.userId);
    // try {
    //   const data = await get<any>(
    //     `/user/getUserById/${row?.userId}`,
    //     {},
    //     "instance1",
    //     setAlertHandler
    //   );
   
    //   setAlertHandler({
    //     hasAlert: true,
    //     alertMessage: "get Role successfully.",
    //     alertType: "success",
    //     alertTitle: "Success",
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  };



  return (
   <CommonDataGrid 
      rowData={userData}
      columnData={columnData}
      putApi={putApi}
      deleteApi={deleteApi}
      getById={getByIdApi} />
  );
}

export default AllTaskList;