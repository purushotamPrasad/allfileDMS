"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { AlertColor, Switch, useTheme } from "@mui/material";
import { del, get, put } from "@/utils/ApiConfig/index";
import { CommonDataCompanyPlanGrid } from "qssence-common";
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

function AllCompanyPlanList({ setAlertHandler }: ListProps) {
  const routers = useRouter();
  const theme = useTheme();


  const [userData, setUserData] = useState<UserData[]>([]);
  const [openCompanyPlan, setOpenCompanyPlan] = useState(true);
  const currentCompany = useSelector((state: RootState) => state.currentCompany);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get<any>("company-plan/companies-with-plans/getAll", {}, "instance1", setAlertHandler);
        
        const formattedData = data.data.data.map((sub: any) => ({
          id: sub.id,
          companyId: sub.id,
          companyName: sub.companyName,
          location: sub.location,
          email: sub.email,
          plans: sub.plans.map((plan: any) => plan.name).join(', '),
          companyPlan:sub.plans
        }));

        setUserData(formattedData);
        setOpenCompanyPlan(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (openCompanyPlan) {
      fetchData();
    }
  }, [openCompanyPlan]);


 

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
      field: "email",
      headerName: "Email Id",
      align: "center",
      flex: 1,
      headerAlign: "center",
      editable: true,
    },
    {
      field: "plans",
      headerName: "Plan Assignee",
      align: "center",
      flex: 1,
      headerAlign: "center",
      editable: true,
    },
    {
      field: "location",
      headerName: "Location",
      align: "center",
      flex: 1,
      headerAlign: "center",
      editable: true,
    },
  
 
  ];


  const deleteApi = async (id: number) => {
    try {
      await del(`/company-plan/remove-all/${id}`, {}, null, setAlertHandler);
  
      setOpenCompanyPlan(true);
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Company's plan deleted successfully.",
        alertType: "success",
        alertTitle: "Success",
      });
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  return (
    <CommonDataCompanyPlanGrid
      rowData={userData}
      columnData={columnData}
      putApi={() => {}}
      deleteApi={deleteApi}
      getById={() => {}}
    />
  );
}

export default AllCompanyPlanList;