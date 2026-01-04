"use client";
import {
  AlertColor,
  Button,
  Grid,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PrimarySelectField, PrimaryTextField } from "qssence-common";
import { post } from "@/utils/ApiConfig"; // Assuming post function is defined correctly
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useMediaQuery } from "@mui/material";
import countries from "world-countries";
import { PlantData } from "@/components/Redux/action";
import {useDispatch} from 'react-redux';

type AddPlantFormInputs = {
  plantName?: string;
  region?: string;
  country?: string;
  location?: string;
  department?: {
    departmentName?: string;
    section?: {
      sectionName?: string;
    }[];
  }[];
};

interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle?: string;
}

interface addPlantProps {
  setClose: Dispatch<SetStateAction<boolean>>;
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
}

function AddPlantsDivisions({ setClose, setAlertHandler }: addPlantProps) {
  const AddUserSchema = yup.object().shape({
    plantName: yup
      .string()
      .matches(/^[a-zA-Z\s]+$/, "Plant name should contain only alphabets")
      .required("Plant name is required"),
      region: yup
      .string()
      .required("Region is required"),
      country: yup
      .string()
      .required("Country name is required"),
      location: yup
      .string()
      .required("Location is required"),
    department: yup.array().of(
      yup.object().shape({
        departmentName: yup
          .string()
          .matches(/^[a-zA-Z\s]+$/, "Department should contain only alphabets")
          .required("Department name is required"),
          section: yup.array().of(
            yup.object().shape({
                sectionName: yup
                .string()
                .matches(/^[a-zA-Z\s]+$/, "Section should contain only alphabets")
                .required("Section name is required"),
            })
          ).required("At least one section is required"),
      })
    ).required("At least one division is required"),
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
      plantName: "",
      location: "",
      department: [{ departmentName: "", section: [{ sectionName: "" }] }],
    },
  });

  const [countriesList, setCountriesList] = useState([]);

  const [selectedRegion, setSelectedRegion] = useState("");

 const isSmScreen = useMediaQuery('(max-width:768px)');

 const dispatch = useDispatch()

  const onSubmit = async (data: AddPlantFormInputs) => {

     //console.log("data", data)
    try {
     

      const response = await post<any>(
        "/plants/create",
         data,
        setAlertHandler
      );

      console.log(response);
      // setClose(false);
      // setAlertHandler({
      //   hasAlert: true,
      //   alertMessage: "Plant created successfully!",
      //   alertType: "success",
      //   alertTitle: "Success",
      // });
      if (response.data.success === true) {
        setAlertHandler({
          hasAlert: true,
          alertMessage: "Plant created successfully!",
          alertType: "success",
          alertTitle: "Success",
        });
        dispatch(PlantData(true))
        setClose(false);
        reset()
        setAdditionalFields(  [{ id: 0, sections: [{ id: 0 }] }])
      } else {
        setClose(true);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const [additionalFields, setAdditionalFields] = useState([
    { id: 0, sections: [{ id: 0 }] },
  ]);

  const handleAddMore = () => {
    setAdditionalFields([
      ...additionalFields,
      { id: additionalFields.length, sections: [{ id: 0 }] },
    ]);
  };

  const handleChange = (fieldName: keyof AddPlantFormInputs, value: string) => {
     setSelectedRegion(value)
  };



  const handleRemoveMore = (deptIndex: number) => {
    setAdditionalFields((prevFields) =>
      prevFields.filter((_, index) => index !== deptIndex)
    );
  };
  
  
  const handleAddSection = (deptIndex: number) => {
    setAdditionalFields((prevFields) =>
      prevFields.map((dept, index) =>
        index === deptIndex
          ? {
              ...dept,
              sections: [...dept.sections, { id: dept.sections.length }],
            }
          : dept
      )
    );
  };

  const handleRemoveSection = (deptIndex: number, sectionIndex: number) => {
    setAdditionalFields((prevFields) =>
      prevFields.map((dept, index) =>
        index === deptIndex
          ? {
              ...dept,
              sections: dept.sections.filter((_, secIndex) => secIndex !== sectionIndex),
            }
          : dept
      )
    );
  };

  const handleReset=()=>
  {
     reset()
     setAdditionalFields(  [{ id: 0, sections: [{ id: 0 }] }])

  }
  
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


  useEffect(() => {
    const iconButton = document.getElementById("my-icon-button");
    if (iconButton) {
      iconButton.style.backgroundColor = "#0B4A6F";
    }
  }, []);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-6"
      >
        <Grid container spacing={3}>
          

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

          // onChange={(e) => {
          //   handleChange(e);  
          // }}
          onChange={(e) => {
            field.onChange(e); // Update react-hook-form state
            handleChange("region", e.target.value as string); // Cast to string
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
              hasError={Boolean(error)}
              errorText={error?.message}
              menuItems={countriesList}
            />
          )}
        />
      </Grid>

          <Grid item xs={12} md={6} sm={isSmScreen?12:6}>
            <Controller
              name="plantName"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <PrimaryTextField
                  id="plantName"
                  label={
                    <>
                     Enter Plants Name<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
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

        </Grid>
        
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={12} style={{display:"flex", gridColumnGap:"4px"}}>
            <Typography variant="h4" fontSize={"1.2rem"} fontWeight={600}>
              Department
            </Typography>
            <IconButton
              id="my-icon-button"
              onClick={handleAddMore}
              style={{
                color: "white",
                backgroundColor: "#073b54",
                borderRadius: "50%",
                padding: "1px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "5px",
              }}
            >
              <IconPlus />
            </IconButton>
          </Grid>
         
        </Grid>

  {additionalFields.map((department, deptIndex) => (
    <div key={department.id}>
    <Grid container spacing={3} style={{display:'flex', alignItems:'center'}}>
      <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
        <Controller
          name={`department.${deptIndex}.departmentName`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <PrimaryTextField
              id={`Department-${deptIndex}`}
              label={
                <>
                 Enter Department Name<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                </>
                }
              haserror={Boolean(error)}
              errortext={error?.message}
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex", gridColumnGap:"30px"}}>
        <Box style={{display:"flex", gridColumnGap:"4px", height:"fit-content"}}>
      <Typography variant="h4" fontSize={"16px"} fontWeight={600}>
              Section
            </Typography>
            <IconButton
              id="my-icon-button"
              onClick={() => handleAddSection(deptIndex)}
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
            </Box>

          {deptIndex!==0 &&  <Box style={{display:"flex", gridColumnGap:"4px", height:"fit-content"}}>
            <Typography variant="h4" fontSize={"16px"} fontWeight={600}>
              Department
            </Typography>
            <IconButton
              id="my-icon-button"
              onClick={() => handleRemoveMore(deptIndex)}
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
              <IconMinus  height={18} width={18} />
            </IconButton>
           </Box>
}
      </Grid>
    </Grid>

  
      <Grid container spacing={3} style={{paddingTop:"24px"}} >
      {department.sections.map((section, sectionIndex) => (
        <Grid item key={section.id} xs={12}  sm={isSmScreen?12:6} md={6} style={{display:'flex', gridColumnGap:"4px", height:"fit-content", alignItems:'center'}}>
          <Controller
            name={`department.${deptIndex}.section.${sectionIndex}.sectionName`}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <PrimaryTextField
                id={`Section-${deptIndex}-${sectionIndex}`}
                label={
                  <>
                   Enter Section Name<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                  </>
                  }
                haserror={Boolean(error)}
                errortext={error?.message}
                {...field}
              />
            )}
          />
         {sectionIndex!==0 &&
          <IconButton
              id="my-icon-button"
              onClick={() => handleRemoveSection(deptIndex,sectionIndex)}
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
              <IconMinus height={18} width={18}/>
            </IconButton>
}
        </Grid>
      ))}
      </Grid>
   
  </div>
))}

      
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
              onClick={handleReset}
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
                //  mt: 2,
                mb: { xs: 3, md: 3 },
                height: "45px",
                fontWeight: 700,
                
              }}
              style={{backgroundColor:"rgba(11, 74, 111, 1)"}}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default AddPlantsDivisions;
