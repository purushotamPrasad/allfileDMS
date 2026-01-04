"use client";
import { AlertColor, Button, Grid, IconButton, InputAdornment, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CommonDialogUser, PrimaryMultiSelectField, PrimarySelectField, PrimaryTextField } from "qssence-common";
import { get, post } from "@/utils/ApiConfig";
import { IconPlus } from "@tabler/icons-react";
import countries from "world-countries";
import AddGroups from "../addGroup/page";
import { useDispatch, UseDispatch, useSelector } from "react-redux";
import { ListUserData, Showgroup } from "@/components/Redux/action";
import { RootState } from "@/components/Redux/store";

interface AddUserFormInputs {
  selectPlant: any;
  firstName: string;
  middleName: string;
  lastName: string;
  userName: string;
  phoneNumber: string;
  email: string;
  designation: string;
  profilePhoto: any;
  selectGroup: string[];
  selectRole:string[];
  selectDepartment: any;
  selectRegion: string;
  selectCountry: string;
  selectSection:any;
  address: string;
}

interface OptionInterface {
  label: string;
  value: string;
}

interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle?: string;
}

interface addUserProps {
  setClose: Dispatch<SetStateAction<boolean>>;
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
}
function AddUser({ setClose, setAlertHandler }: addUserProps) {
  const [userGroupData, setUserGroupData] = useState<OptionInterface[]>([]);
  const [roleData, setRoleData] = useState<OptionInterface[]>([]);
  const [divisionData, setdivisionData] = useState<OptionInterface[]>([]);
  const [locationData, setlocationData] = useState<OptionInterface[]>([]);
  {
    /* ********* Add User Validation Schema Using Yup ******** */
  }

  const [selectedRegion, setSelectedRegion] = useState("");

  const [countriesList, setCountriesList] = useState([]);

  const [open, setOpen] = useState(false);

  const [openRole, setOpenRole] = useState(false)

  const [selectedPlant, setSelectedPlant] =useState([])

  const [selectPlantShow, setselectPlantShow] =useState(null)

  const [selectCountry, setSelectCountry] = useState("")

  const [selectedDepartment, setSelectedDepartment] = useState([])

  const [showSelectdepartment, setshowSelectdepartment]=useState([])

  const [selectDepartmentShow, setselectDepartmentShow] =useState(null)

  const [selectedSection, setSelectedSection] = useState([])

  const dispatch = useDispatch()

  const viewGroup = useSelector((state: RootState) => state.viewGroup);


  const AddUserSchema = yup.object().shape({
    firstName: yup
      .string()
      .matches(/^[a-zA-Z\s]+$/, "First name should contain only alphabets")
      .required("First name is required"),
    middleName: yup
      .string(),
    lastName: yup
      .string()
      .matches(/^[a-zA-Z\s]+$/, "Last name should contain only alphabets")
      .required("Last name is required"),
    address: yup.string().required("Address is required"),
    phoneNumber: yup
      .string()
      .matches(
        /^[6-9][0-9]*$/,
        "Phone number should start with 6 or greater and contain only numbers"
      )
      .required("Contact number is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
      selectGroup: yup
      .array()
      .of(
        yup.string()
      ),
      selectRole: yup
      .array()
      .of(
        yup.string()
      ),
    selectRegion: yup.string().required("Region is required"),
    selectCountry: yup.string().required("Country is required"),
    selectSection: yup.number().required("Section is required"),
    selectDepartment: yup.number().required("Department is required"),
    selectPlant: yup.number().required("Plant is required"),
    profilePhoto: yup.string(),
    designation: yup.string().required("Designation is required"),
  });

  {
    /* ********* Define React Hook Form  ******** */
  }

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
      firstName: "",
      middleName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      designation: "",
      profilePhoto: "",
      selectGroup: [],
      selectRole: [],
      selectDepartment: null,
      selectRegion:"",
      selectCountry:"",
      selectPlant:null,
      address:"",
      selectSection:null,
    },
  });

  const handleOpen=()=>setClose(true)

      const handleAddGroup=()=>
      {
        setClose(false);
        setOpen(true); 
        setOpenRole(false)
      }

      const handleAddRole=()=>
      {
        setClose(false);
        setOpen(true); 
        setOpenRole(true)
      }

      const handleFileChange = (e, field: any) => {
        const file = e.target.files?.[0];
        if (file) {
          field.onChange(file.name); 
        }
    
      };


    const handleCountryChange = (value: string) => {

      setSelectCountry(value)

    };

    const handlePlantChange = (value: string) => {

      setselectPlantShow(value)

    };

const handleDepartmentChange = (value: string) => {

  setselectDepartmentShow(value)
 

};


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

  const handleChange = (value: string) => {
    setSelectedRegion(value)
 };

  const onSubmit = async (data: AddUserFormInputs) => {


    const SelectGroup = data.selectGroup.map((item) => parseInt(item, 10));
    const SelectRole = data.selectRole.map((item) => parseInt(item, 10));


    try {
      let userdata = {
          userFirstName: data.firstName,
          userMiddleName: data.middleName,
          userLastName: data.lastName,
           userMobileNumber:data.phoneNumber,
           userEmailId:data.email,
           region:data.selectRegion,
           country:data.selectCountry,
           userAddress:data.address,
           location:data.address,
           designation:data.designation,
           userPlantId:data.selectPlant,
           userDepartmentId:data.selectDepartment,
           userSectionId:data.selectSection,
           groupIds:SelectGroup,
           roleIds:SelectRole
        
      };
 
      const response = await post<any>(
        "/user/create",
         userdata,
        setAlertHandler
      );
      if (response.data.success === true) {
        setAlertHandler({
          hasAlert: true,
          alertMessage: "User created successfully!",
          alertType: "success",
          alertTitle: "Success",
        });
       dispatch(ListUserData(true))
       reset()
        setClose(false);
      } else {
        setClose(true);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

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

  console.log("viewGroup", viewGroup)

    useEffect(()=>
      {
         if(selectDepartmentShow || viewGroup)
         
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

              const fetchData = async () => {
                try {
          
                  const data = await get<any>(
                    "/groups/getAll",
                    {},
                    "instance1",
                    setAlertHandler
                  );
                  const formattedData = data.data.data.map((data: any, key: number) => {
                    return {
                      label: data.name,
                      value: data.groupsId,
                    };
                  });
            
                  // setdivisionData(formattedData);
                  setUserGroupData(formattedData);
                  const roleData = await get<any>(
                    "/role/getAll",
                    {},
                    "instance1",
                    setAlertHandler
                  );
                  const roleFormattedData = roleData.data.data.map(
                    (data: any, key: number) => {
                      return {
                        label: data.userRoleName,
                        value: data.userRoleId,
                      };
                    }
                  );
                  dispatch(Showgroup(false))
                  setRoleData(roleFormattedData);
                } catch (error) {
                  console.log(error);
                }
              };

              fetchData();
         
         }
       
      },[selectDepartmentShow,viewGroup]) 


  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-6"
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
          <Controller
            name="firstName"
            control={control}
            rules={{ required: "First Name is required" }} // Add validation rule
            render={({ field, fieldState: { error } }) => (
              <PrimaryTextField
                id="firstName"
                label={
                  <>
                    Enter First Name<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                  </>
                }
                haserror={Boolean(error)} 
                errortext={error?.message} 
                {...field} 
              />
            )}
          />
        


          </Grid>
          <Grid item xs={12} md={4}>
            <Controller
              name="middleName"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <PrimaryTextField
                  id="middleName"
                  label="Enter Middle Name"
                  haserror={false}
                  {...field} // Spread field props (input props like onChange, onBlur, value)
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Controller
              name="lastName"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <PrimaryTextField
                  id="lastName"
                  label={
                    <>
                      Enter Last Name<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                    </>
                  }
                  haserror={Boolean(error)}
                  errortext={error?.message}
                  {...field} // Spread field props (input props like onChange, onBlur, value)
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <PrimaryTextField
                  id="phoneNumber"
                  label={
                    <>
                     Enter Mobile Number<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                    </>
                  }
                  haserror={Boolean(error)}
                  errortext={error?.message}
                  {...field} // Spread field props (input props like onChange, onBlur, value)
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <PrimaryTextField
                  id="email"
                  label={
                    <>
                     Enter Email Id<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                    </>
                  }
                  haserror={Boolean(error)}
                  errortext={error?.message}
                  {...field} // Spread field props (input props like onChange, onBlur, value)
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Controller
              name="address"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <PrimaryTextField
                  id="address"
                  label={
                    <>
                     Enter Address<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                    </>
                  }
                  multiline
                  haserror={Boolean(error)}
                  errortext={error?.message}
                  {...field} // Spread field props (input props like onChange, onBlur, value)
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="selectRegion"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <PrimarySelectField
                  {...field}
                  label={
                    <>
                     Select Region<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                    </>
                  }
                  id="selectRegion"
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
        </Grid>
        <Grid container spacing={3}>

      

          <Grid item xs={12} md={6}>
            <Controller
              name="selectCountry"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <PrimarySelectField
                  {...field}
                  label={
                    <>
                     Select Country<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                    </>
                  }
                  onChange={(e) => {
                    field.onChange(e); 
                    handleCountryChange(e.target.value as string); 
                  }}

                  id="selectCountry"
                  hasError={Boolean(error)}
                  errorText={error?.message}
                  menuItems={countriesList}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="selectPlant"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <PrimarySelectField
                  {...field}
                  label={
                    <>
                     Select Plant<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                    </>
                  }
                  id="selectPlant"
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
         
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Controller
              name="selectDepartment"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <PrimarySelectField
                  {...field}
                  label={
                    <>
                     Select Department<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                    </>
                  }
                  onChange={(e) => {
                    field.onChange(e); 
                    handleDepartmentChange(e.target.value as string); 
                  }}
                  id="selectDepartment"
                  hasError={Boolean(error)}
                  errorText={error?.message}
                  menuItems={selectedDepartment}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="selectSection"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <PrimarySelectField
                  {...field}
                  label={
                    <>
                     Select Section<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                    </>
                  }
                  id="selectSection"
                  hasError={Boolean(error)}
                  errorText={error?.message}
                  menuItems={selectedSection}
                />
              )}
            />
          </Grid>
        </Grid>
        

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
          <Controller
            name="selectGroup"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <PrimaryMultiSelectField
              label={<>Select Group</>}
              id="selectGroup"
              hasError={Boolean(error)}
              errorText={error?.message}
              menuItems={userGroupData}
              selectedItems={field.value || []}
              onSelect={(selectedItem) => {
                const updatedSelection = [...field.value, selectedItem];
                field.onChange(updatedSelection); 
              }}
              onRemove={(removedItem) => {
                const updatedSelection = field.value.filter((item) => item !== removedItem);
                field.onChange(updatedSelection); 
              }}
            />
            
            )}
/>


          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="selectRole"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <PrimaryMultiSelectField
                label={<>Select Role</>}
                id="selectRole"
                hasError={Boolean(error)}
                errorText={error?.message}
                menuItems={roleData}
                selectedItems={field.value || []}
                onSelect={(selectedItem) => {
                  const updatedSelection = [...field.value, selectedItem];
                  field.onChange(updatedSelection); // Update selected values
                }}
                onRemove={(removedItem) => {
                  const updatedSelection = field.value.filter((item) => item !== removedItem);
                  field.onChange(updatedSelection); // Remove the value from selection
                }}
              />
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6} style={{display:"flex", gridColumnGap:"4px"}}>
            <Typography variant="h4" fontSize={"16px"}>
              Add Group
            </Typography>
            <IconButton
              id="my-icon-button"
              onClick={handleAddGroup}
              style={{
                color: "white",
                backgroundColor: "#073b54",
                borderRadius: "50%",
                padding: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "5px",
              }}
            >
              <IconPlus height={18} width={18} />
            </IconButton>
          </Grid>

          <Grid item xs={12} md={6} style={{display:"flex", gridColumnGap:"4px"}}>
            <Typography variant="h4" fontSize={"16px"}>
              Add Role
            </Typography>
            <IconButton
              id="my-icon-button"
              onClick={handleAddRole}
              style={{
                color: "white",
                backgroundColor: "#073b54",
                borderRadius: "50%",
                padding: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "5px",
              }}
            >
              <IconPlus height={18} width={18} />
            </IconButton>
          </Grid>
         
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Controller
              name="designation"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <PrimaryTextField
                  id="designation"
                  label={
                    <>
                      Enter Designation <span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                    </>
                  }
                  haserror={Boolean(error)}
                  errortext={error?.message}
                  {...field} // Spread field props (input props like onChange, onBlur, value)
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
          <Controller
            name="profilePhoto"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <PrimaryTextField
                id="profilePhoto"
                label={
                  <>
                    Upload User Photo <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                  </>
                }
                type="file" 
                haserror={Boolean(error)}
                errortext={error?.message}
                InputLabelProps={{
                  shrink: true, 
                }}
                inputProps={{
                  accept: "image/*", 
                }}
                // onChange={(e) => {
                  
                //   //const file = e.target.files?.[0];
                //  // field.onChange(file); // Pass the selected file to the form field
                // }}
                onChange={(e) => handleFileChange(e, field)}
              />
            )}
          />


          </Grid>
        </Grid>
       
        <Grid container spacing={3} className="mt-0">
          <Grid item xs={12} md={8}></Grid>
          <Grid
            item
            xs={12}
            md={4}
            className="flex flex-col md:flex-row md:space-x-6"
          >
            <Button
              variant="outlined"
              size="small"
              fullWidth
              type="reset"
              onClick={() => reset()}
              sx={{
                // mt: {xs:0,md:2},
                mb: { xs: 0, md: 3 },
                height: "45px",
                fontWeight: 700,
              }}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              size="small"
              fullWidth
              type="submit"
              sx={{
                // mt: 2,
                mb: { xs: 3, md: 3 },
                height: "45px",
                fontWeight: 700,
              }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
           
      {open && (
                <CommonDialogUser
                  buttonText={openRole?"Add Role":"Add Group"}
                  dialogTitle={openRole?"Add Role":"Add Group"}
                  dialogContent={
                    <AddGroups
                      setClose={setOpen}
                      setAlertHandler={setAlertHandler}
                      openRole={openRole}
                      handleOpen={handleOpen}
                    />
                  }
                  onSave={() => {
                    console.log("save");
                  }}
                  open={open}
                  setOpen={setOpen}
                  handleOpen={handleOpen}
                />
              )}

    </div>
  );
}

export default AddUser;
