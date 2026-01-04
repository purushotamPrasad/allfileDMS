import {
  AlertColor,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  FormControlLabel,
  Typography,
  Grid,
  Box,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { PrimarySelectField, PrimaryTextField } from 'qssence-common';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { UserData } from "@/components/Redux/action";
import { get } from "@/utils/ApiConfig";


interface AddGroupFormInputs {
  userId: string;
  plantName: string;
  department:string;
  section:string;
  useraction:string;
  createdAt:string;
  username:string;
  designation:string;
  email:string;
  phone:string;
  region:string;
  country:string;
  timeZone:string;
  location:string;
}

interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle?: string;
}

interface listProps {
  open: boolean;
  userData: any;
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
}

const UserDetail = ({ userData, open, setAlertHandler }: listProps) => {
 
  const AddGroupSchema = yup.object().shape({
    userId: yup.string(),
    plantName: yup.string(),
    department:yup.string(),
    section: yup.string(),
    useraction: yup.string(),
    createdAt:yup.string(),
    username:yup.string().required("User Name is required"),
    designation:yup.string().required("Designation is required"),
    email:yup.string().required("Email Id is required"),
    phone:yup.string().required("Phone number is required"),
    region:yup.string().required("Region is required"),
    country:yup.string().required("Country is required"),
    timeZone:yup.string().required("TimeZone is required"),
    location:yup.string().required("Location is required"),

});

  const dispatch = useDispatch()

  const [emailVerified, setEmailVerified]=useState(false)

  const [selectDepartmentShow, setselectDepartmentShow] =useState(null)

  const [selectedPlant, setSelectedPlant] =useState([])


  const [selectPlantShow, setselectPlantShow] =useState(null)

  const [selectedDepartment, setSelectedDepartment] = useState([])

  const [showSelectdepartment, setshowSelectdepartment]=useState([])

  const [selectedSection, setSelectedSection] = useState([])

  const [selectSectionShow, setselectSectionShow] =useState(null)

  const [loading, setLoading] = useState(true)

  const [status, setStatus] = useState(userData.userData?.status==="Active"?true:false)

  const handleActionChange=(value)=>
  {

  }

  const handleEmailVerifiedToggle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
   // setEmailVerified(event.target.checked);
  };

  const handleStatusVerifiedToggle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
   // setEmailVerified(event.target.checked);
  };

  console.log("userData", userData)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
} = useForm({
    resolver: yupResolver(AddGroupSchema),
    criteriaMode: "all",
    mode: "onChange",
    reValidateMode: "onChange",
    delayError: 100,
    defaultValues: {
        userId: userData.userData?.id,
        plantName: userData.userData?.plantId,
        department:userData.userData?.departmentId,
        section:userData.userData?.sectionId,
        useraction:"",
        createdAt:new Date(
          new Date(userData.userData?.createdAt).getTime()
        ).toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata"
        }),
        username:userData.userData?.EmpName,
        designation:userData.userData?.designation,
        email:userData.userData?.email,
        phone:userData.userData?.mobile,
        region:userData.userData?.region,
        country:userData.userData?.country,
        timeZone:userData.userData?.timeZone,
        location:userData.userData?.location
    },
});

 const handleCancel=()=>
 {
    dispatch(UserData(false))
    localStorage.removeItem("userId")
 }

 useEffect(() => {

  const fetchData = async () => {
    try {

      const plantdata = await get<any>(
        "/plants/getAll",
        {},
        "instance1",
        setAlertHandler
      );
      

      const formattedPlantData = plantdata.data.data.map((data: any) => {
        return {
          label: data.plantName,
          value: data.id,
          id:data.id,
          plantName:data.plantName,
          department:data.department
        };
      });

      const selectedPlantdata = formattedPlantData.find(
        (plant: any) => plant.id === userData.userData?.plantId
      );
        
         setshowSelectdepartment(selectedPlantdata.department)
  
          const departmentNames = selectedPlant
          ? selectedPlantdata?.department.map((dept: any) => ({
              label: dept.departmentName,
              value: dept.departmentId,
            }))
          : [];
  
        setSelectedDepartment(departmentNames)

        const selectedDepartmentdata = selectedPlantdata.department.find(
          (department: any) => department.departmentId === userData.userData?.departmentId
        );
        
        const sectionNames = selectedDepartment
        ? selectedDepartmentdata?.section.map((sec: any) => ({
            label: sec.sectionName,
            value: sec.id,
          }))
        : [];

          setSelectedSection(sectionNames)

      setSelectedPlant(formattedPlantData)
      setLoading(false)

    } catch (error) {
      console.log(error);
    }
  };
  
     if(loading)
     {
       fetchData();
     }
    
}, [loading]);

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

const handlePlantChange = (value: string) => {

  setselectPlantShow(value)

};

const handleDepartmentChange = (value: string) => {
   
  setselectDepartmentShow(value)

};

const handleSectionChange = (value: string) => {

   setselectSectionShow(value)
  
  };


  return (
    <>
      <div>
        <div
          style={{
            width: "100%",
            backgroundColor: "transparent",
            padding: "40px 20px",
            border: "1px solid lightgray",
            borderRadius: "5px",
          }}
        >
          {/* User ID */}
          <Grid container spacing={3} style={{display:'flex', alignItems:"center"}}>
            <Grid item xs={12} md={2}>
              <Typography
                sx={{
                  fontWeight: "600",
                }}
              >
                User Id 
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
            <Controller
              name="userId"
              control={control}
              render={({ field, fieldState: { error } }) => (
                  <PrimaryTextField
                      id="userId"
                      label="User Id"
                      haserror={Boolean(error)}
                      errortext={error?.message}
                      {...field} 
                      InputProps={{
                        readOnly: true,
                      }}
                  />
                  
              )}
              />
            </Grid>
      
            <Grid item xs={12} md={2}>
            <Typography
                sx={{
                  fontWeight: "600",
                }}
              >
                Plant Name 
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
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
              <Typography
                sx={{
                  fontWeight: "600",
                }}
              >
                Department 
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
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
            <Typography
                sx={{
                  fontWeight: "600",
                }}
              >
                Section 
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
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
              <Typography
                sx={{
                  fontWeight: "600",
                }}
              >
                Required User action 
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
            <Controller
              name="useraction"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <PrimarySelectField
                {...field}
                id="useraction"
                label={
                  <>
                    Select User Action
                  </>
                }
      
                onChange={(e) => {
                  field.onChange(e); 
                  handleActionChange(e.target.value as string); 
                }}
      
                hasError={Boolean(error)}
                errorText={error?.message}
                menuItems={[
                  { value: "Approve", label: "Approve" },
                  { value: "Reject", label: "Reject" },
                  { value: "Pending", label: "Pending" },
                ]}
                
              />
              )}
              />
            </Grid>
      

        
            <Grid item xs={12} md={2}>
            <Typography
                sx={{
                  fontWeight: "600",
                }}
              >
                Date of Joining 
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
            <Controller
              name="createdAt"
              control={control}
              render={({ field, fieldState: { error } }) => (
                  <PrimaryTextField
                      id="createdAt"
                      label="Date of Joining"
                      haserror={Boolean(error)}
                      errortext={error?.message}
                      {...field} 
                      InputProps={{
                        readOnly: true,
                      }}
                  />
              )}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <Typography
                sx={{
                  fontWeight: "600",
                }}
              >
                Email Verified 
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
            <FormControlLabel
                control={
                  <Switch
                    checked={emailVerified}
                    onChange={handleEmailVerifiedToggle}
                    color="primary"
                  />
                }
                label="Yes"
              />
            </Grid>
      

        
            <Grid item xs={12} md={2}>
            <Typography
                sx={{
                  fontWeight: "600",
                }}
              >
                Status 
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
            <FormControlLabel
                control={
                  <Switch
                    checked={status}
                    onChange={handleStatusVerifiedToggle}
                    color="primary"
                  />
                }
                label="Yes"
              />
            </Grid>

            </Grid>

        </div>
      </div>
      <div style={{ margin: "20px 0px" }}>
        <Typography
          color={"primary"}
          sx={{
            fontWeight: "600",
            fontSize: "1.2rem",
            marginBottom: "10px",
            marginTop: "15px",
          }}
        >
          General Info
        </Typography>
        
          
            <div
              style={{
                width: "100%",
                backgroundColor: "transparent",
                padding: "40px 20px",
                border: "1px solid lightgray",
                borderRadius: "5px",
              }}
            >
              {/* User ID */}
              <Grid container spacing={3} style={{display:'flex', alignItems:"center"}}>
              <Grid item xs={12} md={2}>
              <Typography
                sx={{
                  fontWeight: "600",
                }}
              >
                User Name
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
            <Controller
              name="username"
              control={control}
              render={({ field, fieldState: { error } }) => (
                  <PrimaryTextField
                      id="username"
                      label="username"
                      haserror={Boolean(error)}
                      errortext={error?.message}
                      {...field} 
                  />
              )}
              />
            </Grid>
      
            <Grid item xs={12} md={2}>
            <Typography
                sx={{
                  fontWeight: "600",
                }}
              >
               Designation
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
            <Controller
              name="designation"
              control={control}
              render={({ field, fieldState: { error } }) => (
                  <PrimaryTextField
                      id="designation"
                      label="Designation"
                      haserror={Boolean(error)}
                      errortext={error?.message}
                      {...field} 
                  />
              )}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography
                sx={{
                  fontWeight: "600",
                }}
              >
                Email
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState: { error } }) => (
                  <PrimaryTextField
                      id="email"
                      label="Email Id"
                      haserror={Boolean(error)}
                      errortext={error?.message}
                      {...field} 
                  />
              )}
              />
            </Grid>
      

        
            <Grid item xs={12} md={2}>
            <Typography
                sx={{
                  fontWeight: "600",
                }}
              >
                Mobile No. 
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState: { error } }) => (
                  <PrimaryTextField
                      id="phone"
                      label="Mobile No."
                      haserror={Boolean(error)}
                      errortext={error?.message}
                      {...field} 
                  />
              )}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <Typography
                sx={{
                  fontWeight: "600",
                }}
              >
                Region
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
            <Controller
              name="region"
              control={control}
              render={({ field, fieldState: { error } }) => (
                  <PrimaryTextField
                      id="region"
                      label="Region"
                      haserror={Boolean(error)}
                      errortext={error?.message}
                      {...field} 
                  />
              )}
              />
            </Grid>
      
            <Grid item xs={12} md={2}>
            <Typography
                sx={{
                  fontWeight: "600",
                }}
              >
               Country
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
            <Controller
              name="country"
              control={control}
              render={({ field, fieldState: { error } }) => (
                  <PrimaryTextField
                      id="country"
                      label="Country"
                      haserror={Boolean(error)}
                      errortext={error?.message}
                      {...field} 
                  />
              )}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <Typography
                sx={{
                  fontWeight: "600",
                }}
              >
                Time Zone
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
            <Controller
              name="timeZone"
              control={control}
              render={({ field, fieldState: { error } }) => (
                  <PrimaryTextField
                      id="timeZone"
                      label="Time Zone"
                      haserror={Boolean(error)}
                      errortext={error?.message}
                      {...field} 
                  />
              )}
              />
            </Grid>
      

        
            <Grid item xs={12} md={2}>
            <Typography
                sx={{
                  fontWeight: "600",
                }}
              >
                Location 
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
            <Controller
              name="location"
              control={control}
              render={({ field, fieldState: { error } }) => (
                  <PrimaryTextField
                      id="location"
                      label="Location"
                      haserror={Boolean(error)}
                      errortext={error?.message}
                      {...field} 
                  />
              )}
              />
            </Grid>

              </Grid>
            </div>
            <Box mb={2} mt={3} display={"flex"} justifyContent={"flex-end"}>
              <Button
                style={{
                  color: "#23608E",
                  marginRight: "10px",
                  border: "1px solid #23608E",
                  borderRadius: "5px",
                  padding: "5px 20px",
                }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                style={{
                  color: "white",
                  backgroundColor: "#23608E",
                  padding: "5px 20px",
                }}
              >
                Save
              </Button>
            </Box>
    
   
      </div>
    </>
  );
};

export default UserDetail;

/*
 <Grid item xs={12} md={3}>
                  <Typography
                    sx={{
                      marginTop: "28px",
                      marginBottom: "0px",
                      fontWeight: "600",
                    }}
                  >
                    User Name <span style={{ color: "red" }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <TextField variant="outlined" fullWidth margin="normal" />
                </Grid>
              </Grid>

        
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <Typography
                    sx={{
                      marginTop: "28px",
                      marginBottom: "0px",
                      fontWeight: "600",
                    }}
                  >
                    First Name
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <TextField
                    type="text"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>

          
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <Typography
                    sx={{
                      marginTop: "28px",
                      marginBottom: "0px",
                      fontWeight: "600",
                    }}
                  >
                    Last Name
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <TextField
                    type="text"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>

          
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <Typography
                    sx={{
                      marginTop: "28px",
                      marginBottom: "0px",
                      fontWeight: "600",
                    }}
                  >
                    Time Zone
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <TextField
                    type="datetime-local"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div
              style={{
                width: "100%",
                backgroundColor: "transparent",
                padding: "2rem 2rem 2rem 2rem",
                border: "1px solid lightgray",
                borderRadius: "5px",
              }}
            >
 
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <Typography
                    sx={{
                      marginTop: "28px",
                      marginBottom: "0px",
                      fontWeight: "600",
                    }}
                  >
                    Email
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <TextField
                    type="text"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                </Grid>
              </Grid>

     
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <Typography
                    sx={{
                      marginTop: "28px",
                      marginBottom: "0px",
                      fontWeight: "600",
                    }}
                  >
                    Status
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
               
                </Grid>
              </Grid>

    
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <Typography
                    sx={{
                      marginTop: "28px",
                      marginBottom: "0px",
                      fontWeight: "600",
                    }}
                  >
                    LifeCycle <span style={{ color: "red" }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <TextField
                    type="text"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <Typography
                    sx={{
                      marginTop: "28px",
                      marginBottom: "0px",
                      fontWeight: "600",
                    }}
                  >
                    Manager
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <TextField
                    type="text"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                </Grid>




<FormControlLabel
                control={
                  <Switch
                    checked={emailVerified}
                    onChange={handleEmailVerifiedToggle}
                    color="primary"
                  />
                }
                label="Yes"
              />
              
                 <FormControl fullWidth margin="normal">
                    <InputLabel>Select Status</InputLabel>
                    <Select value={userActions} label="Select Status">
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                    </Select>
                  </FormControl>
              
              */
