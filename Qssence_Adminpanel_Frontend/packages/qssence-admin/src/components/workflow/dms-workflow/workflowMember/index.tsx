"use client";
import React, { useEffect, useState } from "react";
import { GridColDef, GridValidRowModel, GridRowModel } from "@mui/x-data-grid";
import { CommonDataGridPickupUsers, PrimarySelectField } from "qssence-common";
import { useRouter } from "next/navigation";
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
import {useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import countries from "world-countries";


type UserData = {
  id: number;
  EmpName: string;
  division: string;
  location: string;
  DateOfJoining: string;
  department: string;
  section: string;
  plantName: string;
  region?: string;
  country?: string;
};

interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle?: string;
}

interface listProps {
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
}

function AllUserDataList({ setAlertHandler }: listProps) {
  const router = useRouter();
  const theme = useTheme();
  const [selectedRowArray, setSelectedRowArray] = React.useState<
    GridValidRowModel[]
  >([]);
  // const [userData, setUserData] = useState<UserData[]>([]);
  // console.log("userData", userData);

  const AddUserSchema = yup.object().shape({
    selectGroup: yup.string().required("Group is required"),
    region: yup.string(),
    country: yup.string(),
    plantName: yup.string(),
  });


  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(AddUserSchema),
    criteriaMode: "all",
    mode: "onChange",
    reValidateMode: "onChange",
    delayError: 100,
    defaultValues: {
      selectGroup:"",
      region: "",
      country: "",
      plantName: "",
    },
  });


  const [params, setparams] = useState({});
  
  // State variables for filtering
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedPlant, setSelectedPlant] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [countriesList, setCountriesList] = useState<{ value: string; label: string }[]>([]);
  const [plantList, setPlantList] = useState<{ value: string; label: string }[]>([]);
  const [groupList, setGroupList] = useState<{ value: string; label: string }[]>([]);
  const [allGroupUsers, setAllGroupUsers] = useState<UserData[]>([]);
  const [plantData, setPlantData] = useState<any[]>([]);

  


  // Handle countries based on selected region
  useEffect(() => {
    if (selectedRegion) {
      if(selectedRegion==="North America"||selectedRegion==="South America"||selectedRegion==="Caribbean")
      {
        const filteredCountries = countries
          .filter((country) => country.subregion === selectedRegion)
          .map((country) => ({
            value: country.name.common, 
            label: country.name.common, 
          }));
        setCountriesList(filteredCountries);
      }
      else {
        const filteredCountries = countries
          .filter((country) => country.region === selectedRegion)
          .map((country) => ({
            value: country.name.common, 
            label: country.name.common, 
          }));
        setCountriesList(filteredCountries);
      }
    } else {
      setCountriesList([]);
    }
  }, [selectedRegion]);

  // Handle plants based on selected country
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const plantdata = await get<any>(
          "/plants/getAll",
          {},
          "instance1",
          setAlertHandler
        );
        
        const formattedPlantData = plantdata.data.data
          .filter((data: any) => data.country.trim() === selectedCountry)
          .map((data: any) => {
            return {
              label: data.plantName,
              value: data.id,
            };
          });

        setPlantList(formattedPlantData);
      } catch (error) {
        console.log(error);
      }
    };
    
    if(selectedCountry !== "") {
      fetchPlants();
    }
  }, [selectedCountry]);

  // Fetch plant data
  const fetchPlantData = async () => {
    try {
      const response = await get<any>(
        "/plants/getAll",
        {},
        "instance1",
        setAlertHandler
      );
      
      setPlantData(response.data.data);
    } catch (error) {
      console.log("Error fetching plant data:", error);
    }
  };

  // Fetch groups on component mount
  useEffect(() => {
    fetchGroups();
    fetchPlantData();
    
    // Load existing selected members for current state
    const currentState = localStorage.getItem("currentWorkflowState") || "1";
    const existingMemberData = localStorage.getItem(`selectedMemberData_State${currentState}`);
    
    if (existingMemberData) {
      try {
        const parsedData = JSON.parse(existingMemberData);
        setSelectedRowArray(parsedData);
        console.log("Loaded existing members for state:", currentState, parsedData);
      } catch (error) {
        console.log("Error parsing existing member data:", error);
      }
    }
  }, []);

  // Apply filters when allGroupUsers changes
  useEffect(() => {
    if (allGroupUsers.length > 0) {
      applyFilters();
    }
  }, [allGroupUsers, selectedRegion, selectedCountry, selectedPlant]);

  const handleBack=()=>
  {
    router.push(`/workflow/dms-workflow/addWorkFlowState`); 
  }

  const handleSave = () => {
    // Here you can add logic to save the selected users
    console.log("Selected users:", selectedRowArray);
    
    // Get selected member names
    const selectedMemberNames = selectedRowArray.map((member: any) => member.EmpName).join(", ");
    
    // Get current state/order from URL params or localStorage
    const currentState = localStorage.getItem("currentWorkflowState") || "1";
    
    // Store selected member names for specific state
    localStorage.setItem(`selectedMemberNames_State${currentState}`, selectedMemberNames);
    localStorage.setItem(`selectedMemberCount_State${currentState}`, selectedRowArray.length.toString());
    localStorage.setItem(`selectedMemberData_State${currentState}`, JSON.stringify(selectedRowArray));
    
    // Store selected group ID for specific state
    if (selectedGroup) {
      localStorage.setItem(`selectedGroupId_State${currentState}`, selectedGroup);
    }
    
    // Navigate back to the previous page
    router.push(`/workflow/dms-workflow/addWorkFlowState`);
  }

  // Handler functions for filtering
  const handleRegionChange = (value: string) => {
    setSelectedRegion(value);
    setSelectedCountry("");
    setSelectedPlant("");
    applyFilters();
  };

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setSelectedPlant("");
    applyFilters();
  };

  const handlePlantChange = (value: string) => {
    setSelectedPlant(value);
    applyFilters();
  };

  const handleGroupChange = (value: string) => {
    setSelectedGroup(value);
    if (value) {
      fetchUsersByGroup(value);
    } else {
      setAllGroupUsers([]);
      setUserData([]);
    }
  };

  // Apply filters based on selected criteria
  const applyFilters = () => {
    if (allGroupUsers.length === 0) return;

    let filteredUsers = [...allGroupUsers];

    // Filter by region
    if (selectedRegion) {
      filteredUsers = filteredUsers.filter(user => 
        user.region && user.region.toLowerCase() === selectedRegion.toLowerCase()
      );
    }

    // Filter by country
    if (selectedCountry) {
      filteredUsers = filteredUsers.filter(user => 
        user.country && user.country.toLowerCase() === selectedCountry.toLowerCase()
      );
    }

    // Filter by plant
    if (selectedPlant) {
      // Find the selected plant name from plantData
      const selectedPlantData = plantData.find((p: any) => p.id === selectedPlant);
      const selectedPlantName = selectedPlantData ? selectedPlantData.plantName : "";
      
      filteredUsers = filteredUsers.filter(user => 
        user.plantName && user.plantName.toLowerCase() === selectedPlantName.toLowerCase()
      );
    }

    setUserData(filteredUsers);
  };

  // Fetch groups data
  const fetchGroups = async () => {
    try {
      const response = await get<any>(
        "/groups/getAll",
        {},
        "instance1",
        setAlertHandler
      );
      
      console.log("Groups response:", response.data.data);
      
      const formattedGroups = response.data.data.map((group: any) => ({
        value: group.groupsId || group.id,
        label: group.groupsName || group.name,
      }));
      
      console.log("Formatted groups:", formattedGroups);
      setGroupList(formattedGroups);
    } catch (error) {
      console.log("Error fetching groups:", error);
    }
  };

  // Fetch users based on selected group
  const fetchUsersByGroup = async (groupId: string) => {
    try {
      const response = await get<any>(
        `/user/getAll`,
        {},
        "instance1",
        setAlertHandler
      );
      
   
      
            // Filter users by group ID
      const usersInGroup = response.data.data.filter((user: any) => {
        
        // Check if user has groupIds array and if the selected groupId exists in it
        const hasGroup = user.groupIds && user.groupIds.some((userGroupId: any) => {
          return userGroupId === groupId || userGroupId === parseInt(groupId);
        });
        
        return hasGroup;
      });
      
   
      
      const formattedUsers = usersInGroup.map((user: any, key: number) => {
        // Find plant name from userPlantId
        const plant = plantData.find((p: any) => p.id === user.userPlantId);
        const plantName = plant ? plant.plantName : "N/A";
        
        // Find department name from userDepartmentId
        let departmentName = "N/A";
        let sectionName = "N/A";
        
        if (plant && user.userDepartmentId) {
          const department = plant.department.find((dept: any) => dept.departmentId === user.userDepartmentId);
          if (department) {
            departmentName = department.departmentName;
            
            // Find section name from userSectionId
            if (user.userSectionId) {
              const section = department.section.find((sec: any) => sec.id === user.userSectionId);
              if (section) {
                sectionName = section.sectionName;
              }
            }
          }
        }
        
        return {
          id: key + 1,
          userId: user.id,
          EmpName: user.userFirstName + " " + user.userMiddleName + " " + user.userLastName,
          division: user.division || "N/A",
          location: user.location || "N/A",
          DateOfJoining: user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          }) : "N/A",
          department: departmentName,
          section: sectionName,
          plantName: plantName,
          region: user.region || "N/A",
          country: user.country || "N/A",
        };
      });
      

      console.log("Formatted users:", formattedUsers);

      setAllGroupUsers(formattedUsers);
      setUserData(formattedUsers);
    } catch (error) {
      console.log("Error fetching users by group:", error);
      // If API fails, set empty array
      setAllGroupUsers([]);
      setUserData([]);
    }
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
      field: "department",
      headerName: "Department",
      flex: 1,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "section",
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
      field: "location",
      headerName: "Location",
      flex: 1,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    
    {
      field: "DateOfJoining",
      headerName: "Date of Joining",
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
    <>
    <Box style={{padding:"20px 40px", display:"flex", gridColumnGap:"20px",alignItems:'center'}}>
      <IconArrowNarrowLeft style={{cursor:"pointer"}} onClick={handleBack}/>
      <Typography variant="h4" style={{padding:"0px"}}>Member Picker</Typography>
     
      </Box>
      <Box
        sx={{ backgroundColor: "white", padding: "10px 40px", borderRadius: "5px" }}
     
      >
        <Grid container spacing={3} >
          <Grid item xs={12} md={2} mt={3}>
         
                          <Controller
                name="selectGroup"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <PrimarySelectField
                    {...field}
                    label={
                      <>
                       Select Group<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                      </>
                    }
                    id="selectGroup"
                    onChange={(e) => {
                      field.onChange(e);
                      handleGroupChange(e.target.value as string);
                    }}
                    hasError={Boolean(error)}
                    errorText={error?.message}
                    menuItems={groupList}
                  />
                )}
              />
          </Grid>

          <Grid item xs={12} md={2} mt={3}>
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
                    handleRegionChange(e.target.value as string); 
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

          <Grid item xs={12} md={2} mt={3}>
            <Controller
              name="country"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <PrimarySelectField
                  {...field}
                  id="country"
                  label={
                    <>
                      Select Country<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
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

          <Grid item xs={12} md={2} mt={3}>
            <Controller
              name="plantName"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <PrimarySelectField
                  {...field}
                  id="plantName"
                  label={
                    <>
                      Select Plant<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                    </>
                  }
                  onChange={(e) => {
                    field.onChange(e); 
                    handlePlantChange(e.target.value as string); 
                  }}
                  hasError={Boolean(error)}
                  errorText={error?.message}
                  menuItems={plantList}
                />
              )}
            />
          </Grid>
        </Grid>

       
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginBlock: "20px",
          }}
        >
         
          <button
            onClick={handleSave}
            disabled={selectedRowArray.length === 0}
            style={{
              backgroundColor: selectedRowArray.length === 0 ? "#cccccc" : "#0B4A6F",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: selectedRowArray.length === 0 ? "not-allowed" : "pointer",
              height: "fit-content",
              fontSize: "14px",
              fontFamily: "sans-serif",
              opacity: selectedRowArray.length === 0 ? 0.6 : 1,
            }}
          >
            Save
          </button>
        </Box>
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
