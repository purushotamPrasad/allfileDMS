"use client";
import React, { useEffect, useState } from "react";
import { GridColDef, GridValidRowModel, GridRowModel } from "@mui/x-data-grid";
import { CommonDataGridDocument, CommonDataGridDocumentFlow } from "qssence-common";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { AlertColor, useTheme } from "@mui/material";
import { del, get, put } from "@/utils/ApiConfig/index";
import { IconFileText, IconEye, IconInputSearch, IconArticle } from "@tabler/icons-react";


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
  open: boolean;
  setTabData: any;
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
}

function AllDocumentDataFlowList({ setTabData, open, setAlertHandler }: listProps) {
  const router = useRouter();
  const theme = useTheme();
  const [selectedRowArray, setSelectedRowArray] = React.useState<
    GridValidRowModel[]
  >([]);
  const [userData, setUserData] = useState<UserData[]>([]);
  const [params, setparams] = useState({});

  const handleArticle=()=>
  {
     router.push('/meta_data/all_meta_data')
  }

  const handleTemplate=()=>
    {
       router.push('/addtemplate/all-template')
    }
  
   const handleWorkflowName=()=>
    {
       
    } 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get<any>(
          "/plants/getAllPlants",
          {},
          "instance1",
          setAlertHandler
        );
        console.log("data", data);

        const formattedData = data.data.map((plant: any) => {
          const firstDivision = plant.divisions[0];
          const secondDivision = plant.divisions[1];

          const divisionNames = [
            firstDivision?.divisionName,
            secondDivision?.divisionName,
          ]
            .filter((name) => name)
            .join(", ");

          const locationNames = [
            firstDivision?.location,
            secondDivision?.location,
          ]
            .filter((location) => location)
            .join(", ");

          return {
            id: plant.id,
            plantName: plant.plantName,
            divisions: divisionNames,
            locations: locationNames,
          };
        });

        console.log("formattedData", formattedData);
        setUserData(formattedData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [open]);

  //static data
  const rows = [
    {
      id: 1,
      type: "Type 1",
      subtype: "Subtype A",
      classification: "Class 1",
      workflowName:"Sop Creation 1",
      queryMember:"Ravish Kumar"
    },
    {
      id: 2,
      type: "Type 2",
      subtype: "Subtype B",
      classification: "Class 2",
      workflowName:"Sop Creation 2",
      queryMember:"Nikhil Sharma"
    },
    {
      id: 3,
      type: "Type 3",
      subtype: "Subtype C",
      classification: "Class 3",
      workflowName:"Sop Creation 3",
      queryMember:"Mukesh Kumar"
    },
    {
      id: 4,
      type: "Type 4",
      subtype: "Subtype D",
      classification: "Class 4",
      workflowName:"Sop Creation 4",
      queryMember:"Vishal Kumar"
    },
  ];

  const columnData: GridColDef[] = [
    {
      field: "id",
      headerName: "SL No.",
      width:80,
      align: "left",
      headerAlign: "left",
      editable: false,
    },
    {
      field: "type",
      headerName: "Type",
      flex:1,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "subtype",
      headerName: "Sub Type",
      flex:1,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "classification",
      headerName: "Classification",
      flex: 1,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "metadata",
      headerName: "Metadata",
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: false, // We don't need this to be editable
      renderCell: (params) => (
        <IconArticle
          style={{ cursor: "pointer", height: "40%", color:"rgba(11, 74, 111, 1)" }}
          onClick={handleArticle}
        />
      ),
    },
    {
      field: "templete",
      headerName: "Templete",
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: false,
      renderCell: (params) => (
        <IconFileText
          style={{ cursor: "pointer", height: "40%",color:"rgba(11, 74, 111, 1)"  }}
          onClick={handleTemplate}
        />
      ),
    },
    {
      field: "workflowName",
      headerName: "Workflow Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "queryMember",
      headerName: "Query Member",
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: false,
    },
  ];

  const putApi = async (newData: GridRowModel) => {
    try {
      let payload = {
        firstname: newData?.firstname,
        lastname: newData?.lastname,
        userId: newData?.userId,
        userName: newData?.userName,
        description: newData?.description,
      };
      const response = await put(
        `/user/updateUserById/${newData?.userId}`,
        payload,
        setAlertHandler
      );
      setAlertHandler({
        hasAlert: true,
        alertMessage: "User details updated successfully.",
        alertType: "success",
        alertTitle: "Success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteApi = async (id: number) => {
    try {
      const response = await del(
        `/user/deleteUserById/${userData[id - 1] && userData[id - 1]?.id}`,
        {},
        null,
        setAlertHandler
      );
      setAlertHandler({
        hasAlert: true,
        alertMessage: "User details deleted successfully.",
        alertType: "success",
        alertTitle: "Success",
      });
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  const getUsersApi = async (row: any) => {
    console.log("users", row?.userId);
    try {
      const data = await get<any>(
        `/user/getUserById/${row?.userId}`,
        {},
        "instance1",
        setAlertHandler
      );
      setTabData({ userId: row?.userId, data });
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
    <CommonDataGridDocumentFlow
      rowData={rows}
      columnData={columnData}
      setSelectedRowArray={setSelectedRowArray}
      putApi={putApi}
      deleteApi={deleteApi}
      getById={getUsersApi}
    />
  );
}

export default AllDocumentDataFlowList;
