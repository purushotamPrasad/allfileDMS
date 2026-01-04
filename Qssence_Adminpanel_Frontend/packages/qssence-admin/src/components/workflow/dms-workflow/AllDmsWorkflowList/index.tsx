"use client";
import React, { useEffect, useState } from "react";
import { GridColDef, GridValidRowModel, GridRowModel } from "@mui/x-data-grid";
import { CommonDataGridWorkflow } from "qssence-common";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { AlertColor, useTheme } from "@mui/material";
import { del, delData, get, getData, put } from "@/utils/ApiConfig/index";
import { IconAd, IconBuildingWarehouse, IconEdit, IconFile3d, IconServer } from "@tabler/icons-react";
import {useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/components/Redux/store";
import { PlantData, WorkflowConnectivityData, WorkflowData } from "@/components/Redux/action";


interface UserData {
  index: number;
  id: number;
  workflowName: string;
  state: number;
  states: any[];
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
  loadingData?: boolean;
}

function AllDmsWorkflowDataList({ selectedField, value, open, setAlertHandler, loadingData }: listProps) {
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

  

  const fetchData = async () => {
    try {
      const data = await getData<any>(
        "/globalWorkflows/getAll",
        {},
        "instance1",
        setAlertHandler
      );
     

      const formattedData = data.data.data.map((workflow: any, index:any) => {

        return {
          index: index+1,
          id: workflow.id,
          workflowName: workflow.workflowName,
          state: workflow.states.length,
          states: workflow.states || []
        };
      });

      setOpenPlants(false)
       dispatch(PlantData(false))

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

  useEffect(() => {
    if(openPlants || currentPlant || selectedField)
      {
          fetchData();
      }
  }, [openPlants,open, currentPlant, selectedField]);

  // Refresh data when loadingData is true
  useEffect(() => {
    if (loadingData) {
      console.log("Refreshing workflow data due to loadingData change");
      fetchData();
    }
  }, [loadingData]);


  const handleState=(workflowId)=>
  {
      // Find the complete workflow data by ID
      const workflowData = userData.find(workflow => workflow.id === workflowId);
      if (workflowData) {
          dispatch(WorkflowData(workflowData))
          localStorage.setItem("Stage", value)
          routers.push("/workflow/dms-workflow/addWorkFlowState")
      }
  }

  const handleWorkflow=(workflowId)=>
  {
     // Find the complete workflow data by ID
     const workflowData = userData.find(workflow => workflow.id === workflowId);
     if (workflowData) {
         dispatch(WorkflowConnectivityData(workflowData))
         routers.push("/workflow/dms-workflow/workflowConnectivity")
     }
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
      const response = await delData(
        `/globalWorkflows/${id}`,
        {},
        null,
        setAlertHandler
      );
      setOpenPlants(true)
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Workflow  deleted successfully.",
        alertType: "success",
        alertTitle: "Success",
      });
    } catch (error) {
      console.log("Error deleting workflow:", error);
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
    <CommonDataGridWorkflow
      rowData={userData}
      columnData={value==="Global Workflow"?columnGlobalData:value==="Region Workflow"?columnRegionData:columnLocalData}
      setSelectedRowArray={setSelectedRowArray}
      putApi={putApi}
      deleteApi={deleteApi}
      getById={getUsersApi}
    />
        
  );
}

export default AllDmsWorkflowDataList;

/*    renderCell: (params) => (
        <div>
          {params.value.split(", ").map((section, idx) => (
            <p key={idx}>{section}</p>
          ))}
        </div>
      ),
      
       renderCell: (params) => (
        <div>
          {params.value.split(", ").map((dept, idx) => (
            <p key={idx}>{dept}</p>
          ))}
        </div>
      ),
      
      */
