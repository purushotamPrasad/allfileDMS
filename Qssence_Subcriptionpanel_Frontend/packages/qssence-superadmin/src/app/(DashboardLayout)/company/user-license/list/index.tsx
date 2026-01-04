"use client";
import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { AlertColor, useTheme } from "@mui/material";
import { del, get, put } from "@/utils/ApiConfig/index";
import {CommonDataLicenseGrid} from "qssence-common"
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

function AllUserLicenseList({ setAlertHandler }: listProps) {

  const routers = useRouter();
  const theme = useTheme();
 
  const [userData, setUserData] = useState<UserData[]>([]);

  const [userLicenseData, setUserLicenseData] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get<any>("/licenses/getAll", {}, "instance1", setAlertHandler);
        
        const formattedData = data.data.data.map((sub: any) => ({
          id: sub.licenseId,
          licenseKey: sub.licenseKey,
          companyId:sub.companyId,
          companyName: sub.companyName,
          location: sub.location,
          email: sub.email,
          purchaseDate: new Date(new Date(sub.purchaseDate).getTime() + 5.5 * 60 * 60 * 1000).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          expiryDate:new Date(new Date(sub.expiryDate).getTime() + 5.5 * 60 * 60 * 1000).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          description:sub.description,
          purchaseCost: sub.purchaseCost,
          totalUserAccess: sub.totalUserAccess,
          adminAccountAllowed:sub.adminAccountAllowed,
          userAccountAllowed:sub.userAccountAllowed,
          plans:sub.plans,
          productName:sub.plans.map((plan: any) => plan.name).join(' + ')
          
        }));
       
        setUserData(formattedData);
        setUserLicenseData(false)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (userLicenseData) {

      fetchData();
    }

  }, []);


  const columnData: GridColDef[] = [
    {
      field: "id",
      headerName: "License Id",
      align: "center",
      flex: 1,
      headerAlign: "center",
      editable: true,
    },
    {
      field: "companyId",
      headerName: "Company Id",
      align: "center",
      flex: 1,
      headerAlign: "center",
      editable: true,
    },
    {
      field: "companyName",
      headerName: "Company Name",
      align: "center",
      flex: 1,
      headerAlign: "center",
      editable: true,
    },
    {
        field: "licenseKey",
        headerName: "License Key",
        align: "center",
        flex: 1,
        headerAlign: "center",
        editable: true,
      },
      {
        field: "productName",
        headerName: "Product Name",
        align: "center",
        flex: 1,
        headerAlign: "center",
        editable: true,
      },

      {
        field: "totalUserAccess",
        headerName: "User Access",
        align: "center",
        flex: 1,
        headerAlign: "center",
        editable: true,
      },
      {
        field: "purchaseDate",
        headerName: "Purchased Date",
        align: "center",
        flex: 1,
        headerAlign: "center",
        editable: true,
      },

      {
        field: "expiryDate",
        headerName: "Expire Date",
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
   <CommonDataLicenseGrid
      rowData={userData}
      columnData={columnData}
      putApi={putApi}
      deleteApi={deleteApi}
      getById={getByIdApi} />
  );
}

export default AllUserLicenseList;