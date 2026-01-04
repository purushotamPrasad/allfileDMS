"use client";
import React, { useEffect, useState } from "react";
import { GridColDef, GridValidRowModel, GridRowModel } from "@mui/x-data-grid";
import { CommonDataGridPickupUsers, PrimarySelectField } from "qssence-common";
import { useRouter } from "next/navigation";
import { Button, Popover, useMediaQuery } from "@mui/material";
import {
  AlertColor,
  useTheme,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Box,
} from "@mui/material";
import { del, get, put } from "@/utils/ApiConfig/index";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import countries from "world-countries";
import { Controller, useForm } from "react-hook-form";



type UserData = {
  id: number;
  EmpName: string;
  division: string;
  location: string;
  DateOfJoining: string;
  department: string;
  section:string;
  plantName: string;
};

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
  const router = useRouter();
  const theme = useTheme();
  const [selectedRowArray, setSelectedRowArray] = React.useState<
    GridValidRowModel[]
  >([]);
  // const [userData, setUserData] = useState<UserData[]>([]);
  // console.log("userData", userData);
  const [params, setparams] = useState({});
 
  const [loading, setLoading] =useState(true)

  const [users, setUsers]=useState([])

  
useEffect(() => {

  
  const fetchUserData = async () => {
      if (typeof window !== "undefined") {
      const storedSingleGroup = localStorage.getItem("Selectedgroup");

      if (storedSingleGroup) {
        const parsedGroup = JSON.parse(storedSingleGroup);
     
      try {
         const [userResponse, groupRes] = await Promise.all([
            get<any>("/user/getAll", {}, "instance1", setAlertHandler),
            get<any>(`/groups/getById/${parsedGroup.groupsId}`, {}, "instance1", setAlertHandler)
        ]);
      

      const convertToIST = (utcDate: string): string => {
        const options: Intl.DateTimeFormatOptions = {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        };
      
        return new Intl.DateTimeFormat("en-IN", options)
          .format(new Date(utcDate))
          .replace(/\//g, "/") 
          .replace(" am", " AM")
          .replace(" pm", " PM");
      };

          const groupsData = groupRes.data.data;
          const groupUserIds = groupsData.userIds; 
  
      const users = userResponse.data.data.filter((user: any) => !groupUserIds.includes(user.userId)).map((cur: any) => ({
        id: cur.userEmployeeId,
        userId: cur.userId,
        EmpName: `${cur.userFirstName} ${cur.userMiddleName} ${cur.userLastName}`,
        plantId: cur.userPlantId,  
        departmentId: cur.userDepartmentId,
        sectionId: cur.userSectionId,
        region: cur.region,
        country: cur.country,
        address: cur.userAddress,
        createdAt: convertToIST(cur.createdAt),
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
      const formattedData =mergedData.map((data: any, key: number) => {
        return {
          label: data.userFirstName + data.userMiddleName + data.userLastName,
          value: data.userFirstName + data.userMiddleName + data.userLastName,
        };
      });

      setSelectedEmployee(formattedData)
      setUsers(mergedData);
      setLoading(false)

  
    } catch (error) {
      console.log("Error fetching data:", error);
    } 
   }
  }
  };
  
    if (loading) {
      fetchUserData();
    }
   
   }, [loading]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
   
    criteriaMode: "all",
    mode: "onChange",
    reValidateMode: "onChange",
    delayError: 100,
  
  });

  const handleBack=()=>
  {
    router.back(); 
  }

  const [selectedField, setSelectedField] =useState("")

  const [selectCountry, setSelectCountry] = useState("")
  const [countriesList, setCountriesList] = useState([]);


  const [selectedPlant, setSelectedPlant] =useState([])


  const [selectPlantShow, setselectPlantShow] =useState(null)

  const [selectedDepartment, setSelectedDepartment] = useState([])

  const [selectedEmployee, setSelectedEmployee] = useState([])

  const [showSelectdepartment, setshowSelectdepartment]=useState([])

  const [selectDepartmentShow, setselectDepartmentShow] =useState(null)

  const [selectSectionShow, setselectSectionShow] =useState(null)

  const [selectEmployeeShow, setselectEmployeeShow] =useState(null)

  const [selectedSection, setSelectedSection] = useState([])

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");


  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);

  const id = openPopover ? "user-setup-popover" : undefined;

  const isSmScreen = useMediaQuery('(max-width:768px)');

  const handleChange = (value: string) => {

    setSelectedRegion(value)
    setSelectedField(value)
  
};



  const [userData, setUserData] = useState<UserData[]>([]);

  const columnData: GridColDef[] = [
    {
      field: "id",
      headerName: "Employee Id",
      type: "number",
      flex:1,
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
      flex: 1,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "address",
      headerName: "Location",
      flex: 1,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    
    {
      field: "createdAt",
      headerName: "Date of Joining",
      flex: 1,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
  ];

const handleCountryChange = (value: string) => {

  setSelectedCountry(value)
  setSelectCountry(value)

};

const handlePlantChange = (value: string) => {

  setselectPlantShow(value)

};

const handleDepartmentChange = (value: string) => {
   
  setselectDepartmentShow(value)

};

const handleSectionChange = (value: string) => {

  const fetchData = async () => {
    try {

      const data = await get<any>(
        "/user/getAll",
        {},
        "instance1",
        setAlertHandler
      );

      const usersData = data.data.data;

      const filteredEmployees = usersData
      .filter((user: any) => value === user.userSectionId) 
      .map((user: any) => ({
      label: `${user.userFirstName} ${user.userMiddleName} ${user.userLastName}`.trim(),
      value: user.userId,
    }));

     setSelectedEmployee(filteredEmployees);
  
    } catch (error) {
      console.log(error);
    }
  };

   fetchData();

  setselectSectionShow(value)
  
  };

const handleEmployeeChange =(value: string)=> {

  setselectEmployeeShow(value)

}



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

  useEffect(() => {

    let filteredData = users;

    if (selectedRegion) {
      filteredData = filteredData.filter(user => user.region === selectedRegion);
    }
  
    if (selectedCountry) {
      filteredData = filteredData.filter(user => user.country === selectedCountry);
    }
  
    if (selectPlantShow) {
      filteredData = filteredData.filter(user => user.plantId === selectPlantShow);
    }

    if (selectDepartmentShow) {
      filteredData = filteredData.filter(user => user.departmentId === selectDepartmentShow);
    }
  
    if (selectSectionShow) {
      filteredData = filteredData.filter(user => user.sectionId === selectSectionShow);

    }

    if(selectEmployeeShow)
    {
      filteredData = filteredData.filter(user => user.userId === selectEmployeeShow);
    }

    if(selectedRegion || selectedCountry || selectPlantShow || selectDepartmentShow || selectSectionShow || selectEmployeeShow)
    {
        setUserData(filteredData);
    }

  

  }, [selectedRegion, selectedCountry, selectedPlant, selectedDepartment, selectSectionShow, selectEmployeeShow, users]);
  

  useEffect(() => {
    if (selectedField) {
       if(selectedField==="North America"||selectedField==="South America"||selectedField==="Caribbean")
       {
      const filteredCountries = countries
        .filter((country) => country.subregion === selectedField)
        .map((country) => ({
          value: country.name.common, 
          label: country.name.common, 
        }));
      setCountriesList(filteredCountries);
       }
       else {
        const filteredCountries = countries
        .filter((country) => country.region === selectedField)
        .map((country) => ({
          value: country.name.common, 
          label: country.name.common, 
        }));
      setCountriesList(filteredCountries);
       }
    } else {
      setCountriesList([]);
    }
  }, [selectedField]);


  useEffect(() => {

    const fetchData = async () => {
      try {

        const plantdata = await get<any>(
          "/plants/getAll",
          {},
          "instance1",
          setAlertHandler
        );
        

        const formattedPlantData = plantdata.data.data
        .filter((data: any) => data.country.trim() === selectCountry)
        .map((data: any) => {
          return {
            label: data.plantName,
            value: data.id,
            id:data.id,
            plantName:data.plantName,
            department:data.department
          };
        });

        setSelectedPlant(formattedPlantData)

      } catch (error) {
        console.log(error);
      }
    };
     if(selectCountry!=="")
     {
        fetchData();
     }
   
  }, [selectCountry]);

    useEffect(()=>
    {
       if(selectPlantShow)
       
        {

          const selectedPlantdata = selectedPlant.find(
            (plant: any) => plant.id === selectPlantShow
          );

        
         setshowSelectdepartment(selectedPlantdata.department)

          const departmentNames = selectedPlant
          ? selectedPlantdata.department.map((dept: any) => ({
              label: dept.departmentName,
              value: dept.departmentId,
            }))
          : [];

            setSelectedDepartment(departmentNames)
       
       }
     
    },[selectPlantShow]) 



    useEffect(()=>
      {
         if(selectDepartmentShow)
         
          {
  
            const selectedDepartmentdata = showSelectdepartment.find(
              (department: any) => department.departmentId === selectDepartmentShow
            );
            
            const sectionNames = selectedDepartment
            ? selectedDepartmentdata?.section.map((sec: any) => ({
                label: sec.sectionName,
                value: sec.id,
              }))
            : [];
  
              setSelectedSection(sectionNames)

             
         }
       
 },[selectDepartmentShow]) 

  const handleSave=()=>
  {

     if(selectedRowArray.length!==0)
     {
        router.push("/accounts_privileges/groups")
        const existingData = localStorage.getItem("users");
        let usersArray = existingData ? JSON.parse(existingData) : [];
      
        if (!Array.isArray(usersArray)) {
          usersArray = [];
        }
        usersArray = [...usersArray, ...selectedRowArray];
        localStorage.setItem("users", JSON.stringify(usersArray));

     }

     else {

        setAnchorEl(event.currentTarget);
        setTimeout(() => {
          setAnchorEl(null);
        }, 1500);

     }

  }



  return (
    <>
    <Box style={{padding:"20px 40px", display:"flex", justifyContent:"space-between"}}>
      
      <Box style={{display:"flex", gridColumnGap:"20px",alignItems:'center'}}>
      <IconArrowNarrowLeft style={{cursor:"pointer"}} onClick={handleBack}/>
      <Typography variant="h4" style={{padding:"0px"}}>Member Picker</Typography>
      </Box>

       <Box>
       <Button variant="contained" color="primary" onClick={() => handleSave()}>Save</Button>
       <Popover
        id={id}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{ mt: 6 }}
      >
        <Typography sx={{ padding: 1.5, color:"#FF4D4F" }}>
          Select at least one user.
        </Typography>
      </Popover>
      </Box>

      </Box>
      <Box
        sx={{ backgroundColor: "white", padding: "30px 40px", borderRadius: "5px" }}>
       <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "20px",
          }}
        >
         
         <Typography variant="h4" style={{padding:"0px"}}>Search Employee</Typography>
        </Box>

          <Grid container spacing={3} paddingBottom="40px" >
          <Grid item xs={12} md={2}>
        
        
        <Controller
           name="region"
           control={control}
           render={({ field, fieldState: { error } }) => (
           
       <PrimarySelectField
         {...field}
         id="region"
         label={
           <>
             Select Region<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
           </>
         }

        
         onChange={(e) => {
           field.onChange(e); 
           handleChange(e.target.value as string); 
         }}

         hasError={Boolean(error)}
         errorText={error?.message}
         menuItems={[
           { value: "Asia", label: "Asia" },
           { value: "Africa", label: "Africa" },
           { value: "North America", label: "North America" },
           { value: "South America", label: "South America" },
           { value: "Europe", label: "Europe" },
           { value: "Oceania", label: "Oceania" },
           { value: "Antarctica", label: "Antarctica" },
         ]}
         
       />
     )}
   />
           
          </Grid>
          <Grid item xs={12} md={2}>
          <Controller
          name="country"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <PrimarySelectField
              {...field}
              id="country"
              label={
                <>
                  Select Country
                  <span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                </>
              }

              onChange={(e) => {
                field.onChange(e); 
                handleCountryChange(e.target.value as string); 
              }}

              hasError={Boolean(error)}
              errorText={error?.message}
              menuItems={countriesList}
            />
          )}
        />

          </Grid>

          <Grid item xs={12} md={2}>
          <Controller
          name="plantName"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <PrimarySelectField
              {...field}
              id="plantName"
              label={
                <>
                  Select Plant Name
                  <span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                </>
              }
              onChange={(e) => {
                field.onChange(e); 
                handlePlantChange(e.target.value as string); 
              }}
              hasError={Boolean(error)}
              errorText={error?.message}
              menuItems={selectedPlant}
            />
          )}
        />
            
          </Grid>

          <Grid item xs={12} md={2}>
          <Controller
          name="department"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <PrimarySelectField
              {...field}
              id="department"
              label={
                <>
                  Select Department Name
                  <span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                </>
              }
              onChange={(e) => {
                field.onChange(e); 
                handleDepartmentChange(e.target.value as string); 
              }}
              hasError={Boolean(error)}
              errorText={error?.message}
              menuItems={selectedDepartment}
            />
          )}
        />
           
          </Grid>
          <Grid item xs={12} md={2}>
          <Controller
          name="section"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <PrimarySelectField
              {...field}
              id="section"
              label={
                <>
                  Select Section Name
                  <span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                </>
              }
              onChange={(e) => {
                field.onChange(e); 
                handleSectionChange(e.target.value as string); 
              }}
              hasError={Boolean(error)}
              errorText={error?.message}
              menuItems={selectedSection}
            />
          )}
        />
            
          </Grid>

          <Grid item xs={12} md={2}>
          <Controller
          name="employee"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <PrimarySelectField
              {...field}
              id="employee"
              label={
                <>
                  Select Employee Name
                  <span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                </>
              }
              onChange={(e) => {
                field.onChange(e); 
                handleEmployeeChange(e.target.value as string); 
              }}
              hasError={Boolean(error)}
              errorText={error?.message}
              menuItems={selectedEmployee}
            />
          )}
        />
          </Grid>

        </Grid>

       
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginBlock: "20px",
          }}
        >
         
          <button
            style={{
              backgroundColor: "#0B4A6F",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              height: "fit-content",
              fontSize: "14px",
              fontFamily: "sans-serif",
            }}
          >
            Advance Search
          </button>
        </Box> */}
        <CommonDataGridPickupUsers
          rowData={userData}
          columnData={columnData}
          setSelectedRowArray={setSelectedRowArray}
          putApi={putApi}
          deleteApi={deleteApi}
          getById={getUsersApi}
        />
      </Box>
     
    </>
  );
}
export default AllUserDataList;

/*  <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography mt={3} variant="h6">
              In Group
            </Typography>
            <FormControl
              variant="outlined"
              fullWidth
              style={{ minWidth: 150, marginRight: "20px", marginTop: "5px" }}
            >
              <Select>
                <MenuItem value="Any">Any</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </FormControl>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "20px",
                marginTop: "10px",
              }}
            ></Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography mt={3} variant="h6">
              Users Per Page
            </Typography>
            <FormControl
              variant="outlined"
              style={{ minWidth: 150, marginRight: "20px", marginTop: "5px" }}
            >
              <Select>
                <MenuItem value="None">None</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </FormControl>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "20px",
                marginTop: "10px",
              }}
            ></Box>
          </Grid>
        </Grid>*/
