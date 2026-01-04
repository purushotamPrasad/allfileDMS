"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { AlertColor, Switch, useTheme } from "@mui/material";
import { del, get, put } from "@/utils/ApiConfig/index";
import { CommonDataGrid } from "qssence-common";
import { RootState } from "@/components/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  GridColDef,
} from "@mui/x-data-grid";
import { CompanyData } from "@/components/Redux/action";

interface UserData {
  id: string;
  companyName: string;
  location: string;
  licenseNo: string;
  phoneNo: string;
  country: string;
  status: string;
  companyEmailId: string;
  createdAt: string;
}

interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle?: string;
}

interface ListProps {
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
}

function AllCompanyList({ setAlertHandler }: ListProps) {
  const routers = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState<UserData[]>([]);
  const [openCompany, setOpenCompany] = useState(true);
  const currentCompany = useSelector((state: RootState) => state.currentCompany);

  useEffect(() => {
    if (!openCompany) {
      dispatch(CompanyData(true));
      setOpenCompany(true);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get<any>("/company/getAll", {}, "instance1", setAlertHandler);
        
        const formattedData = data.data.data.map((sub: any) => ({
          id: sub.companyId,
          companyId: sub.companyId,
          companyName: sub.companyName,
          location: sub.location,
          licenseNo: sub.licenseNo,
          phoneNo: sub.phoneNo,
          country: sub.country,
          status: sub.status,
          companyEmailId: sub.companyEmailId,
          createdAt: new Date(new Date(sub.createdAt).getTime() + 5.5 * 60 * 60 * 1000).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          region: sub.region,
          timezone: sub.timezone
        }));

        setUserData(formattedData);
        dispatch(CompanyData(false));
        setOpenCompany(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (openCompany || currentCompany) {
      fetchData();
    }
  }, [openCompany, currentCompany]);


  const handleStatusToggle = async (params: any) => {

    const newStatus = params.value === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    const { id, ...restRow } = params.row;
  
    try {
      const response = await put<any>(
        `/company/update/${params.id}`,  
        { ...restRow, status: newStatus },  
        setAlertHandler  
      );
  
      if (response.data.success === true) {
        setAlertHandler({
          hasAlert: true,
          alertMessage: "Company updated successfully!",
          alertType: "success",
          alertTitle: "Success",
        });
  
        dispatch(CompanyData(true));
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  


  const columnData: GridColDef[] = [
    {
      field: "id",
      headerName: "Company ID",
      align: "center",
      width: 100,
      headerAlign: "center",
      editable: false,
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
      field: "licenseNo",
      headerName: "License No.",
      align: "center",
      flex: 1,
      headerAlign: "center",
      editable: true,
    },
    {
      field: "phoneNo",
      headerName: "Mobile No.",
      align: "center",
      flex: 1,
      headerAlign: "center",
      editable: true,
    },
    {
      field: "companyEmailId",
      headerName: "Email Id",
      align: "center",
      flex: 1,
      headerAlign: "center",
      editable: true,
    },
    {
      field: "country",
      headerName: "Country",
      align: "center",
      flex: 1,
      headerAlign: "center",
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      align: "center",
      flex: 1,
      headerAlign: "center",
      editable: false,
    },
    {
      field: "status",
      headerName: "Status",
      align: "center",
      flex: 1,
      headerAlign: "center",
      editable: false,
      renderCell: (params) => (
        <Switch
          checked={params.value === "ACTIVE"}
          onChange={() => handleStatusToggle(params)}
          color="primary"
        />
      ),
    },
  ];


  const deleteApi = async (id: number) => {
    try {
      await del(`/company/delete/${id}`, {}, null, setAlertHandler);
      setOpenCompany(true);
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Company deleted successfully.",
        alertType: "success",
        alertTitle: "Success",
      });
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  return (
    <CommonDataGrid
      rowData={userData}
      columnData={columnData}
      putApi={() => {}}
      deleteApi={deleteApi}
      getById={() => {}}
    />
  );
}

export default AllCompanyList;
