"use client";
import React, { useEffect, useState } from "react";
import { GridColDef, GridValidRowModel, GridRowModel } from "@mui/x-data-grid";
import { CommonDataGridQmsWorkflow } from "qssence-common";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { AlertColor, useTheme } from "@mui/material";
import { del, get, put } from "@/utils/ApiConfig/index";
import { IconAd, IconAnalyze, IconBuildingWarehouse, IconEdit, IconFile3d, IconServer } from "@tabler/icons-react";
import {useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/components/Redux/store";
import { PlantData, WorkflowConnectivityData, WorkflowData } from "@/components/Redux/action";


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
  value: any;
  selectedField:any;
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
}

function AllQmsWorkflowDataList({ selectedField, value, open, setAlertHandler }: listProps) {
  const routers = useRouter();
  const theme = useTheme();
  const [selectedRowArray, setSelectedRowArray] = React.useState<
    GridValidRowModel[]
  >([]);
  const [userData, setUserData] = useState<UserData[]>([]);
  const [params, setparams] = useState({});
  const dispatch = useDispatch()
  const [openPlants, setOpenPlants]=useState(true)

  const currentPlant = useSelector((state: RootState) => state.currentPlant);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const data = await get<any>(
          "/plants/getAll",
          {},
          "instance1",
          setAlertHandler
        );
       

        const formattedData = data.data.data.map((plant: any, index:any) => {

          return {
            index: index+1,
            id:plant.id,
            plantName: plant.plantName,
            location:plant.location,
            region:plant.region,
            country:plant.country,
            department: plant.department.map((dept: any) => ({
              departmentId: dept.departmentId,
              departmentName: dept.departmentName,
              section: dept.section.map((sec: any) => ({
                id: sec.id,
                sectionName: sec.sectionName,
              })),
            })),
            
          };
        });

        dispatch(PlantData(false))
        setOpenPlants(false)
        
        console.log("formattedData",formattedData)

        if(selectedField && value==="Region Workflow")
        {
            const filteredData = formattedData
            .filter(item => item.region === selectedField) 
             .map((item, index) => ({ ...item, index: index + 1 }));
            setUserData(filteredData);
        }
        else if(value==="Global Workflow") {
           setUserData(formattedData);
        }
        else {
          setUserData(formattedData);
        }

      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    if(openPlants || currentPlant || selectedField)
      {
          fetchData();
      }
  }, [openPlants,open, currentPlant, selectedField]);


  const handleState=(data)=>
  {
      dispatch(WorkflowData(data))
      localStorage.setItem("Stage", value)
      routers.push("/workflow/qms-workflow/addWorkFlowState")
  }

  const handleTimline=(data)=>
    { 
        localStorage.setItem("Stage", value)
        routers.push("/workflow/qms-workflow/timeline")
    }

  const handleWorkflow=(data)=>
  {
     dispatch(WorkflowConnectivityData(data))
     routers.push("/workflow/qms-workflow/workflowConnectivity")
  }
 

  const columnGlobalData: GridColDef[] = [
    {
      field: "index",
      headerName: "SL No.",
      width:100,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "workflowName",
      headerName: "WorkFlow Name",
      flex:1,
      align: "left",
      headerAlign: "left",
      editable: false,
    },
    {
        field: "timeLine",
        headerName: "No. of Timeline",
        flex:1,
        align: "center",
        headerAlign: "center",
        editable: false,
        renderCell: (params) => (
            <IconAnalyze
              style={{ cursor: "pointer", height: "40%", color:"rgba(11, 74, 111, 1)" }}
              onClick={()=>handleTimline(params.id)}
            />
          ),
      },
    {
      field: "state",
      headerName: "No. of State",
      flex:1,
      align: "center",
      headerAlign: "center",
      editable: false,
      renderCell: (params) => (
        <IconServer
          style={{ cursor: "pointer", height: "40%", color:"rgba(11, 74, 111, 1)" }}
          onClick={()=>handleState(params.id)}
        />
      ),
    },
    {
      field: "workflowConnectivity",
      headerName: "WorkFlow Connectivity",
      flex:1,
      align: "center",
      headerAlign: "center",
      editable: false,
      renderCell: (params) => (
        <IconFile3d
          style={{ cursor: "pointer", height: "40%", color:"rgba(11, 74, 111, 1)" }}
          onClick={()=>handleWorkflow(params.id)}
        />
      ),
    },
    {
      field: "queryMember",
      headerName: "Query Member",
      flex:1,
      align: "center",
      headerAlign: "center",
      editable: false,
    },
   
  ];

  const columnRegionData: GridColDef[] = [
    {
      field: "index",
      headerName: "SL No.",
      width:100,
      align: "left",
      headerAlign: "left",
    },
    {
        field: "region",
        headerName: "Region",
        flex:1,
        align: "left",
        headerAlign: "left",
        editable: false,
      },
    {
      field: "workflowName",
      headerName: "WorkFlow Name",
      flex:1,
      align: "left",
      headerAlign: "left",
      editable: false,
    },
    {
        field: "timeLine",
        headerName: "No. of Timeline",
        flex:1,
        align: "center",
        headerAlign: "center",
        editable: false,
        renderCell: (params) => (
            <IconAnalyze
              style={{ cursor: "pointer", height: "40%", color:"rgba(11, 74, 111, 1)" }}
              onClick={()=>handleTimline(params.id)}
            />
          ),
      },
    {
      field: "state",
      headerName: "No. of State",
      flex:1,
      align: "center",
      headerAlign: "center",
      editable: false,
      renderCell: (params) => (
        <IconServer
          style={{ cursor: "pointer", height: "40%", color:"rgba(11, 74, 111, 1)" }}
          onClick={()=>handleState(params.id)}
        />
      ),
    },
    {
      field: "workflowConnectivity",
      headerName: "WorkFlow Connectivity",
      flex:1,
      align: "center",
      headerAlign: "center",
      editable: false,
      renderCell: (params) => (
        <IconFile3d
          style={{ cursor: "pointer", height: "40%", color:"rgba(11, 74, 111, 1)" }}
          onClick={()=>handleWorkflow(params.id)}
        />
      ),
    },
    {
      field: "queryMember",
      headerName: "Query Member",
      flex:1,
      align: "center",
      headerAlign: "center",
      editable: false,
    },
   
  ];

  const columnLocalData: GridColDef[] = [
    {
      field: "index",
      headerName: "SL No.",
      width:80,
      align: "left",
      headerAlign: "left",
    },
    {
        field: "region",
        headerName: "Region",
        width:100,
        align: "left",
        headerAlign: "left",
        editable: false,
    },
    {
        field: "country",
        headerName: "Country",
        width:130,
        align: "left",
        headerAlign: "left",
        editable: false,
    },
    {
        field: "plantName",
        headerName: "Plant Name",
        flex:1,
        align: "left",
        headerAlign: "left",
        editable: false,
    },
  
    {
      field: "workflowName",
      headerName: "WorkFlow Name",
      flex:1,
      align: "left",
      headerAlign: "left",
      editable: false,
    },
    {
        field: "timeLine",
        headerName: "No. of Timeline",
        flex:1,
        align: "center",
        headerAlign: "center",
        editable: false,
        renderCell: (params) => (
            <IconAnalyze
              style={{ cursor: "pointer", height: "40%", color:"rgba(11, 74, 111, 1)" }}
              onClick={()=>handleTimline(params.id)}
            />
          ),
      },
    {
      field: "state",
      headerName: "No. of State",
      flex:1,
      align: "center",
      headerAlign: "center",
      editable: false,
      renderCell: (params) => (
        <IconServer
          style={{ cursor: "pointer", height: "40%", color:"rgba(11, 74, 111, 1)" }}
          onClick={()=>handleState(params.id)}
        />
      ),
    },
    {
      field: "workflowConnectivity",
      headerName: " Workflow Connectivity",
      flex:1,
      align: "center",
      headerAlign: "center",
      editable: false,
      renderCell: (params) => (
        <IconFile3d
          style={{ cursor: "pointer", height: "40%", color:"rgba(11, 74, 111, 1)" }}
          onClick={()=>handleWorkflow(params.id)}
        />
      ),
    },
    {
        field: "location",
        headerName: "Location",
        flex:1,
        align: "left",
        headerAlign: "left",
        editable: false,
      },
      {
        field: "queryMember",
        headerName: "Query Member",
        flex:1,
        align: "center",
        headerAlign: "center",
        editable: false,
      },  
   
  ];

  const putApi = async (newData: GridRowModel) => {
    try {
      const divisions = newData?.divisions
        .split(", ")
        .map((division: string, index: number) => ({
          divisionName: division,
          location: newData?.locations.split(", ")[index],
        }));

      let payload = divisions;

      const response = await put(
        `/plants/update/${newData?.id}`,
        payload,
        setAlertHandler
      );

      setAlertHandler({
        hasAlert: true,
        alertMessage: "Department and location details updated successfully.",
        alertType: "success",
        alertTitle: "Success",
      });
    } catch (error) {
      console.log("Error updating plant:", error);
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Failed to update department and location details.",
        alertType: "error",
        alertTitle: "Error",
      });
    }
  };

  const deleteApi = async (id: number) => {
    try {
      const response = await del(
        `/plants/${id}`,
        {},
        null,
        setAlertHandler
      );
      setOpenPlants(true)
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Plants  deleted successfully.",
        alertType: "success",
        alertTitle: "Success",
      });
    } catch (error) {
      console.log("Error deleting plants:", error);
    }
  };

  const getUsersApi = async (row: any) => {
    console.log("users", row?.userId);
    try {
      const data = await get<any>(
        `/plants/getById/${row?.userId}`,
        {},
        "instance1",
        setAlertHandler
      );

      setAlertHandler({
        hasAlert: true,
        alertMessage: "Plant retrieved successfully.",
        alertType: "success",
        alertTitle: "Success",
      });
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <CommonDataGridQmsWorkflow
      rowData={userData}
      columnData={value==="Global Workflow"?columnGlobalData:value==="Region Workflow"?columnRegionData:columnLocalData}
      setSelectedRowArray={setSelectedRowArray}
      putApi={putApi}
      deleteApi={deleteApi}
      getById={getUsersApi}
    />
        
  );
}

export default AllQmsWorkflowDataList