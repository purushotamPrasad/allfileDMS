"use client";
import React, { useEffect, useState } from "react";
import { GridColDef, GridValidRowModel, GridRowModel } from "@mui/x-data-grid";
import { CommonDataGridPlants, CommonDialogPlants } from "qssence-common";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { AlertColor, useTheme } from "@mui/material";
import { del, get, put } from "@/utils/ApiConfig/index";
import { IconBuildingWarehouse, IconEdit } from "@tabler/icons-react";
import {useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/components/Redux/store";
import { PlantData } from "@/components/Redux/action";

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

function AllPlantsDataList({ setTabData, open, setAlertHandler }: listProps) {
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
        setUserData(formattedData);


      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    if(openPlants || currentPlant)
      {
          fetchData();
      }
  }, [openPlants,open, currentPlant]);

 

  const columnData: GridColDef[] = [
    {
      field: "index",
      headerName: "SL No.",
      width:70,
      align: "left",
      headerAlign: "left",
    },
    // {
    //   field: "companyName",
    //   headerName: "Company Name",
    //   flex:1,
    //   align: "left",
    //   headerAlign: "left",
    //   editable: false,
    // },
     {
      field: "plantName",
      headerName: "Plant Name",
      flex:1,
      align: "left",
      headerAlign: "left",
      editable: false,
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
      field: "country",
      headerName: "Country",
      flex:1,
      align: "left",
      headerAlign: "left",
      editable: false,
    },
   
  
    {
      field: "location",
      headerName: "Location",
      flex: 1,
      align: "left",
      headerAlign: "left",
      editable: true,
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
      setTabData({ userId: row?.userId, data });
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
    <CommonDataGridPlants
      rowData={userData}
      columnData={columnData}
      setSelectedRowArray={setSelectedRowArray}
      putApi={putApi}
      deleteApi={deleteApi}
      getById={getUsersApi}
    />
        
  );
}

export default AllPlantsDataList;

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
