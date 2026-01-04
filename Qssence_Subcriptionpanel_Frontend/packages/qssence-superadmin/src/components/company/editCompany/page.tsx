"use client";

import React, {Dispatch, SetStateAction, useState, useEffect} from 'react';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PrimarySelectField, PrimaryTextField } from "qssence-common";
import { Box, Button, FormControl, Grid, AlertColor, IconButton, InputAdornment } from '@mui/material';
import { get, post, put } from '@/utils/ApiConfig';
import countries from "world-countries";
import { getTimeZones } from '@vvo/tzdb';
import { useMediaQuery } from "@mui/material";
import parsePhoneNumber from 'libphonenumber-js';
import { IconEye, IconEyeCancel, IconEyeOff } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { CompanyData } from '@/components/Redux/action';

type AddPlantFormInputs = {
  companyName?:string;
  region?: string;
  country?: string;
  timezone?:string;
  location?: string;
  companyEmailId?:string;
  licenseNo?:string;
  phoneNo?:any;
};

interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle: string | undefined;  
}


interface addPlantProps {
  setClose: Dispatch<SetStateAction<boolean>>;
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
  view:boolean;
  viewData:any;
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

export default function EditCompanyData({ setClose, setAlertHandler, view, viewData }: addPlantProps) {
    
    const dispatch=useDispatch()
  
    const [selectedCountry, setSelectCountry] =useState(view?"":viewData.country)
  
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
        companyName: view ? "" : viewData.companyName,
        location: view ? "" : viewData.location,
        licenseNo:view ? "" : viewData.licenseNo,
        phoneNo:view ? "" : viewData.phoneNo,
        companyEmailId: view ? "" : viewData.companyEmailId,
        region: view ? "" : viewData.region,
        country: view ? "" : viewData.country,
        timezone: view ? "" : viewData.timezone
        
      },
    });
  

    const isSmScreen = useMediaQuery('(max-width:768px)');
  
    const [countriesList, setCountriesList] = useState([]);
  
    const [selectedRegion, setSelectedRegion] = useState(view?"":viewData.region);
  
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
  
      const updatedData = {
        ...data,
        companyId: viewData.id,
        createdAt:viewData.updatedAt
      };

         try {
          
           const response = await put<any>(
             `/company/update/${viewData.id}`,
             updatedData,
             setAlertHandler
           );
       
           if (response.data.success === true) {
             setAlertHandler({
               hasAlert: true,
               alertMessage: "Company updated successfully!",
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
    <div>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          
          <Box>
            
             <Grid container spacing={{sm:2,md:2,xs:2}} display="flex" justifyContent="space-between">


            <Grid item xs={12} md={6} sm={isSmScreen?12:6} >
        
            {view &&
            
                <>
                <Box style={{display:"flex"}}>
                    <strong className="page_heading">Company Id:</strong>
                    <div className="page_title">{viewData.id}</div>
                </Box>
                </>  
            }

                </Grid>
                <Grid item xs={12} md={6} sm={isSmScreen?12:6}>
                    
                    {view &&
                    
                        <>
                        <Box style={{display:"flex"}}>
                            <strong className="page_heading">Status:</strong>
                            <div className="page_title">{viewData.status}</div>
                        </Box>
                        </>  
                    }

            </Grid>
              
             <Grid item xs={12} md={6} sm={isSmScreen?12:6}>

             {view?
          
              <>
              <Box style={{display:"flex"}}>
                 <strong className="page_heading">Company Name:</strong>
                 <div className="page_title">{viewData.companyName}</div>
               </Box>
               </>  
            :
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
            }
            </Grid>

            

            <Grid item xs={12} md={6} sm={isSmScreen?12:6}>
        
            {view?
            
                <>
                <Box style={{display:"flex"}}>
                    <strong className="page_heading">Region:</strong>
                    <div className="page_title">{viewData.region}</div>
                </Box>
                </>  
           :

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
        }
          </Grid>
            
          <Grid item xs={12} md={6} sm={isSmScreen ? 12 : 6}>

          {view?
            
            <>
            <Box style={{display:"flex"}}>
                <strong className="page_heading">Country:</strong>
                <div className="page_title">{viewData.country}</div>
            </Box>
            </>  
           :
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
            }
          </Grid>

          <Grid item xs={12} md={6} sm={isSmScreen ? 12 : 6}>

          {view?
            
            <>
            <Box style={{display:"flex"}}>
                <strong className="page_heading">Time Zone:</strong>
                <div className="page_title">{viewData.timezone}</div>
            </Box>
            </>  
           :

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
 }
          </Grid>

          <Grid item xs={12} md={6} sm={isSmScreen?12:6}>

          {view?
            
            <>
            <Box style={{display:"flex"}}>
                <strong className="page_heading">Location:</strong>
                <div className="page_title">{viewData.location}</div>
            </Box>
            </>  
           :

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
            }
          </Grid>
            
          <Grid item xs={12} md={6} sm={isSmScreen?12:6}>

          {view?
            
            <>
            <Box style={{display:"flex"}}>
                <strong className="page_heading">License No:</strong>
                <div className="page_title">{viewData.licenseNo}</div>
            </Box>
            </>  
           :

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
            }
           </Grid>

           <Grid item xs={12} md={6} sm={isSmScreen?12:6}>
           
           {view?
            
            <>
            <Box style={{display:"flex"}}>
                <strong className="page_heading">Mobile No:</strong>
                <div className="page_title">{viewData.phoneNo}</div>
            </Box>
            </>  
           :

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
            }
            </Grid>


            <Grid item xs={12} md={6} sm={isSmScreen?12:6}>

                 
           {view?
            
            <>
            <Box style={{display:"flex"}}>
                <strong className="page_heading">Email Id:</strong>
                <div className="page_title">{viewData.companyEmailId}</div>
            </Box>
            </>  
           :

            <Controller
                name="companyEmailId"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <PrimaryTextField
                    id="companyEmailId"
                    label={
                      <>
                       Enter Email Id<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                      </>
                      }
                    haserror={Boolean(error)}
                    errortext={error?.message}
                    {...field}
                  />
                )}
              />
            }
           </Grid>

          </Grid>
          
          </Box>
  

        {view?null:  <Box style={{display:"flex",justifyContent:"flex-end", gridColumnGap:"20px", paddingTop:"10px"}}>
     
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
  }
          </form>
    </div>
  );
}



