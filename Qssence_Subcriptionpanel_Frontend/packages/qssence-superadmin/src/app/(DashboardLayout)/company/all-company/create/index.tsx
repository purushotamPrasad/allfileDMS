"use client";

import React, {Dispatch, SetStateAction, useState, useEffect} from 'react';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PrimarySelectField, PrimaryTextField } from "qssence-common";
import { Box, Button, FormControl, Grid, AlertColor, IconButton, InputAdornment } from '@mui/material';
import { get, post } from '@/utils/ApiConfig';
import countries from "world-countries";
import { getTimeZones } from '@vvo/tzdb';
import { useMediaQuery } from "@mui/material";
import parsePhoneNumber from 'libphonenumber-js';
import {useDispatch} from 'react-redux';
import { IconEye, IconEyeCancel, IconEyeOff } from '@tabler/icons-react';
import { CompanyData } from '@/components/Redux/action';

type AddPlantFormInputs = {
  companyName?:string;
  region?: string;
  country?: string;
  timezone?:string;
  location?: string;
  companyEmailId?:string;
  password?:string;
  confirmpassword?:string;
  licenseNo?:string;
  phoneNo?:any;
};

interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle?: string;
}

interface AddCompanyProps {
  setClose: Dispatch<SetStateAction<boolean>>;
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
}

const getPhoneValidation = (selectedCountry) => {
  return yup
    .string()
    .test(
      'Phone number is not valid for this country',
      (value) => {
        if (!value) return false; 

        try {
          const phoneNumber = parsePhoneNumber(value, selectedCountry);
          return phoneNumber?.isValid(); 
        } catch (error) {
          return false;
        }
      }
    )
    .required('Mobile Number is required');
};

const CreateCompany: React.FC<AddCompanyProps> = ({setClose, setAlertHandler }) => {

  const dispatch = useDispatch()

  const [selectedCountry, setSelectCountry] =useState("")

  const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const AddUserSchema = yup.object().shape({
    companyName: yup
      .string()
      .matches(/^[a-zA-Z\s]+$/, "Company name should contain only alphabets")
      .required("Company name is required"),
      region: yup
      .string()
      .required("Region is required"),
      country: yup
      .string()
      .required("Country name is required"),
      location: yup
      .string()
      .required("Location is required"),
       timezone: yup
      .string()
      .required("Time Zone is required"),
      companyEmailId: yup
      .string()
      .matches( /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,  
      "Invalid email address")
      .required("Email Id is required"),
      phoneNo: getPhoneValidation(selectedCountry),
      licenseNo: yup
      .string()
      .required("License Number is required"),
      password: yup
      .string()
      .required("Password is required")
      .matches(passwordValidation, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.")
       .min(8, "Password must be at least 8 characters long"),
      confirmpassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref('password'), null], "Passwords must match"),
  
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(AddUserSchema),
    criteriaMode: "all",
    mode: "onChange",
    reValidateMode: "onChange",
    delayError: 100,
    defaultValues: {
      companyName: "",
      location: "",
      password:"",
      confirmpassword:"",
      licenseNo:"",
      phoneNo:"",
      companyEmailId:"",
      region:"",
      country:"",
      timezone:""

    },
  });

   
  const isSmScreen = useMediaQuery('(max-width:768px)');

  const [countriesList, setCountriesList] = useState([]);

  const [selectedRegion, setSelectedRegion] = useState("");

  const [timeZonesData, setTimeZonesData] = useState([]);
   
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };
  const toggleConfirmPasswordVisibility=()=>
  {
    setShowConfirmPassword(prevState => !prevState);
  }
   
     const handleRegionChange = (fieldName: keyof AddPlantFormInputs, value: string) => {
      setSelectedRegion(value)
   };

   const handleCountryChange = (fieldName: keyof AddPlantFormInputs, value: string) => {

        setSelectCountry(value)
    };


   useEffect(() => {

    const fetchTimeZones = async () => {
      try {
        const timeZones = await getTimeZones();  
        
        const timeZoneData = timeZones.filter(zone => zone.countryName===selectedCountry)

        const filteredCountries = timeZoneData.map((zone) => {
        
          const match = zone.rawFormat.match(/^([+-]\d{2}:\d{2})\s+(.+)$/);
          const value = match ? `${match[1]} ${zone.name}` : zone.name;  
        
          return {
            value: value, 
            label: value, 
          };
        });

         setTimeZonesData(filteredCountries)
         
      } catch (error) {
        console.error('Error fetching time zones:', error);
      }
    };

  if(selectedCountry)
  {
    fetchTimeZones();
  }
   
  }, [selectedCountry]);



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
        
        
   const onSubmit = async (data: AddPlantFormInputs) => {

       try {
        
         const response = await post<any>(
           "/company/create",
            data,
           setAlertHandler
         );
     
         if (response.data.success === true) {
           setAlertHandler({
             hasAlert: true,
             alertMessage: "Company created successfully!",
             alertType: "success",
             alertTitle: "Success",
           });
           dispatch(CompanyData(true))
           setClose(false);
         } else {
           setClose(true);
         }
       } catch (error) {
         console.log("Error fetching data:", error);
       }
     };    

    return (
        <>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
          
          <Box>
            
             <Grid container spacing={{sm:2,md:2,xs:2}} display="flex" justifyContent="space-between">
              
             <Grid item xs={12} md={6} sm={isSmScreen?12:6}>

              <Controller
                name="companyName"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <PrimaryTextField
                    id="companyName"
                    label={
                      <>
                       Enter Company Name<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                      </>
                      }
                    haserror={Boolean(error)}
                    errortext={error?.message}
                    {...field}
                  />
                )}
              />

            </Grid>

            

            <Grid item xs={12} md={6} sm={isSmScreen?12:6}>
        
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
                  field.onChange(e); // Update react-hook-form state
                  handleRegionChange("region", e.target.value as string); // Cast to string
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
            
          <Grid item xs={12} md={6} sm={isSmScreen ? 12 : 6}>
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
                    field.onChange(e); // Update react-hook-form state
                    handleCountryChange("country", e.target.value as string); // Cast to string
                  }}

                  hasError={Boolean(error)}
                  errorText={error?.message}
                  menuItems={countriesList}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6} sm={isSmScreen ? 12 : 6}>
            <Controller
              name="timezone"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <PrimarySelectField
                  {...field}
                  id="timezone"
                  label={
                    <>
                      Select Time Zone
                      <span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                    </>
                  }
                  hasError={Boolean(error)}
                  errorText={error?.message}
                  menuItems={timeZonesData}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6} sm={isSmScreen?12:6}>
          <Controller
                name="location"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <PrimaryTextField
                    id="location"
                    label={
                      <>
                       Enter Location<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                      </>
                      }
                    haserror={Boolean(error)}
                    errortext={error?.message}
                    {...field}
                  />
                )}
              />
          </Grid>
            
          <Grid item xs={12} md={6} sm={isSmScreen?12:6}>
            <Controller
                name="licenseNo"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <PrimaryTextField
                    id="licenseNo"
                    label={
                      <>
                       Enter License No<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                      </>
                      }
                    haserror={Boolean(error)}
                    errortext={error?.message}
                    {...field}
                  />
                )}
              />
           </Grid>

           <Grid item xs={12} md={6} sm={isSmScreen?12:6}>
           
           <Controller
                name="phoneNo"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <PrimaryTextField
                    id="phoneNo"
                    label={
                      <>
                       Enter Mobile No<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                      </>
                      }
                    haserror={Boolean(error)}
                    errortext={error?.message}
                    {...field}
                  />
                )}
              />

            </Grid>


            <Grid item xs={12} md={6} sm={isSmScreen?12:6}>

            <Controller
                name="companyEmailId"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <PrimaryTextField
                    id="companyEmailId"
                    label={
                      <>
                       Enter Email Id <span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                      </>
                      }
                    haserror={Boolean(error)}
                    errortext={error?.message}
                    {...field}
                  />
                )}
              />
           
           </Grid>

           <Grid item xs={12} md={6} sm={isSmScreen ? 12 : 6}>
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <PrimaryTextField
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  label={
                    <>
                      Enter Password <span style={{ color: "rgba(240, 68, 56, 1)" }}>*</span>
                    </>
                  }
                  haserror={Boolean(error)}
                  errortext={error?.message}
                  {...field}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          aria-label="Toggle password visibility"
                        >
                          {showPassword ? <IconEye width={18} height={18} style={{color:"#000000"}}/> : <IconEyeOff width={18} height={18} style={{color:"#000000"}}/>}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>


            <Grid item xs={12} md={6} sm={isSmScreen?12:6}>
            
            <Controller
                name="confirmpassword"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <PrimaryTextField
                    id="confirmpassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    label={
                      <>
                       Enter Confirm Password<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                      </>
                      }
                    haserror={Boolean(error)}
                    errortext={error?.message}
                    {...field}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={toggleConfirmPasswordVisibility}
                            aria-label="Toggle confirm password visibility"
                          >
                            {showConfirmPassword ? <IconEye width={18} height={18}  style={{color:"#000000"}}/> : <IconEyeOff width={18} height={18} style={{color:"#000000"}}/>}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

            </Grid>
             
          
          </Grid>
          
          </Box>
  

          <Box style={{display:"flex",justifyContent:"flex-end", gridColumnGap:"20px", paddingTop:"10px"}}>
     
          <Button    
             variant="outlined"
             size="small"
             type="reset"
             onClick={() => reset()}
             sx={{
               // mt: {xs:0,md:2},
               mb: { xs: 0, md: 3 },
               height: "45px",
               fontWeight: 700,
             }}>
            Reset
          </Button>
          <Button   variant="contained"
              size="small"
              type="submit"
              sx={{
                //  mt: 2,
                mb: { xs: 3, md: 3 },
                height: "45px",
                fontWeight: 700,
                
              }}
              style={{backgroundColor:"rgba(11, 74, 111, 1)"}}>
            Save
          </Button>
          </Box>
       
          </form>
        </>
    )
}

export default CreateCompany;