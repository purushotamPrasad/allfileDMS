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
import { post, postData } from "@/utils/ApiConfig"; // Assuming post function is defined correctly
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useMediaQuery } from "@mui/material";
import countries from "world-countries";

type AddPlantFormInputs = {
  plantName?: string;
  region?: string;
  country?: string;
  location?: string;
  workflowName?:string;
};

interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle?: string;
}

interface addPlantProps {
  setClose: Dispatch<SetStateAction<boolean>>;
  type:string;
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
  loadingData: (value: boolean) => void;
}

function AddWorkFlow({ setClose, type, setAlertHandler, loadingData }: addPlantProps) {
  const AddUserSchema = yup.object().shape({
    plantName: type === "Local" ? yup
      .string()
      .matches(/^[a-zA-Z\s]+$/, "Plant name should contain only alphabets")
      .required("Plant name is required") : yup.string().optional(),
    region: (type === "Region" || type === "Local") ? yup
      .string()
      .required("Region is required") : yup.string().optional(),
    country: type === "Local" ? yup
      .string()
      .required("Country name is required") : yup.string().optional(),
    workflowName: yup
      .string()
      .required("Workflow Name is required"),
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
      workflowName: "",
      region: "",
      country: "",
      plantName: "",
    },
  });

  const [countriesList, setCountriesList] = useState([]);

  const [selectedRegion, setSelectedRegion] = useState("");

 const isSmScreen = useMediaQuery('(max-width:768px)');

 const [plantList, setPlantList]=useState([])


  const onSubmit = async (data: AddPlantFormInputs) => {
   
    
    try {
      const response = await postData<any>(
        "/globalWorkflows/create",
         data,
        setAlertHandler
      );

      if (response.data.success === true) {
        setAlertHandler({
          hasAlert: true,
          alertMessage: "Workflow created successfully!",
          alertType: "success",
          alertTitle: "Success",
        });
        loadingData(true);
        setClose(false);
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
        id="workflow-create-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-6"
      >
        <Grid container spacing={3}>
          
           {(type==="Region" || type==="Local") &&
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
}

   {type==="Local" &&
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
}
{type==="Local" &&
          <Grid item xs={12} md={6} sm={isSmScreen?12:6}>
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
              hasError={Boolean(error)}
              errorText={error?.message}
              menuItems={plantList}
            />
          )}
        />
          </Grid>
}
          <Grid item xs={12} md={type==="Global"?12:6} sm={isSmScreen?12:type==="Global"?12:6}>
          <Controller
                name="workflowName"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <PrimaryTextField
                    id="workflowName"
                    label={
                      <>
                       Enter WorkFlow Name<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
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
              form="workflow-create-form"
              onClick={() => {
                console.log("Save button clicked!");
                console.log("Form errors:", errors);
              }}
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

export default AddWorkFlow;