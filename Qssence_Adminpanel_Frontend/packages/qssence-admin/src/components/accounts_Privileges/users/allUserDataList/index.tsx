"use client";
import React, { useEffect, useState } from "react";
import { GridColDef, GridValidRowModel, GridRowModel } from "@mui/x-data-grid";
import { CommonDataGridUsers } from "qssence-common";
import { useRouter } from "next/navigation";
import { AlertColor, useTheme } from "@mui/material";
import { del, get, put } from "@/utils/ApiConfig/index";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/components/Redux/store";
import { ListUserData } from "@/components/Redux/action";

interface UserData {
  id: number;
  userId: string;
  employeeId: number;
  userName: string;
  email: string;
  status: string;
  role: string;
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

function AllUserDataList({ setTabData, open, setAlertHandler }: listProps) {
  const routers = useRouter();
  const theme = useTheme();
  const [selectedRowArray, setSelectedRowArray] = React.useState<
    GridValidRowModel[]
  >([]);
  const [usersData, setUsersData] = useState<UserData[]>([]);
  const [params, setparams] = useState({});

  const [openCustomer, setOpenCustomer] = useState(true)

  const dispatch = useDispatch()

  const listUser = useSelector((state: RootState) => state.listUser);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await get<any>("user/getAll", {}, "instance1", setAlertHandler);
    
        const users = userResponse.data.data.map((cur: any) => ({
          id: cur.userEmployeeId,
          userId: cur.userId,
          EmpName: `${cur.userFirstName} ${cur.userMiddleName} ${cur.userLastName}`,
          plantId: cur.userPlantId,  
          departmentId: cur.userDepartmentId,
          sectionId: cur.userSectionId,
          region: cur.region,
          location: cur.location,
          status: cur.status === "ACTIVE" ? "Active" : "Inactive",
          country: cur.country,
          designation: cur.designation,
          mobile: cur.userMobileNumber,
          email: cur.userEmailId,
          timeZone: cur.timeZone,
          roleId: cur.roleIds,
          groupId: cur.groupIds,
          address: cur.userAddress,
          createdAt: cur.createdAt,
        }));
  
        const uniquePlantIds: string[] = Array.from(
          new Set(users.map((user) => user.plantId as string))
        );
    
        const plantDataPromises = uniquePlantIds.map(plantId =>
          get<any>(`/plants/getById/${plantId}`, {}, "instance1", setAlertHandler)
        );
    
        const plantResponses = await Promise.all(plantDataPromises);
    
        const plantDataMap = new Map();
        plantResponses.forEach((response, index) => {
          const plant = response.data.data;
          plantDataMap.set(uniquePlantIds[index], {
            plantName: plant.plantName,
            departments: plant.department.map((dept: any) => ({
              departmentId: dept.departmentId,
              departmentName: dept.departmentName,
              sections: dept.section.map((sec: any) => ({
                sectionId: sec.id,
                sectionName: sec.sectionName,
              })),
            })),
          });
        });
    
        const mergedData = users.map(user => {
          const plant = plantDataMap.get(user.plantId);
    
          const department = plant.departments.find(dept => dept.departmentId === user.departmentId);
          const departmentName = department ? department.departmentName : null;
    
          const section = department ? department.sections.find(sec => sec.sectionId === user.sectionId) : null;
          const sectionName = section ? section.sectionName : null;
    
          return {
            ...user,
            plantName: plant.plantName,
            departmentName: departmentName,
            sectionName: sectionName,
          };
        });
        dispatch(ListUserData(false))
        setUsersData(mergedData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    
      if (openCustomer || listUser) {
        fetchUserData();
      }
   
  }, [openCustomer, listUser]);

  const columnData: GridColDef[] = [
    {
      field: "id",
      headerName: "Employee Id",
      flex: 1,
      align: "left",
      headerAlign: "left",
      editable: false,
    },
    {
      field: "EmpName",
      headerName: "Employee Name",
      flex:1,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "plantName",
      headerName: "Plant Name",
      flex: 1,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "departmentName",
      headerName: "Department",
      flex: 1,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "sectionName",
      headerName: "Section",
      flex: 1,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "region",
      headerName: "Region",
      flex: 1,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "country",
      headerName: "Country",
      flex:1,
      align: "left",
      headerAlign: "left",
      editable: true,
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
    console.log(newData, "userData");
    // Yha First name Last ka issue hai
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

  const deleteApi = async (id: any) => {

    try {
      const response = await del(
        `/user/delete/${id.userId}`,
        {},
        null,
        setAlertHandler
      );
      setOpenCustomer(true)
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
      // Fetch APi
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
    <CommonDataGridUsers
      rowData={usersData}
      setTabData={setTabData}
      columnData={columnData}
      setSelectedRowArray={setSelectedRowArray}
      putApi={putApi}
      deleteApi={deleteApi}
      getById={getUsersApi}
    />
  );
}
export default AllUserDataList;
