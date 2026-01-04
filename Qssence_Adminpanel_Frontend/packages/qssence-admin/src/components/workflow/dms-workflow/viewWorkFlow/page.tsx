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
import { post, postData, putData, getData } from "@/utils/ApiConfig"; // Assuming post function is defined correctly
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useMediaQuery } from "@mui/material";
import countries from "world-countries";
import { useDispatch } from "react-redux";
import { PlantData } from "@/components/Redux/action";

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
  workflowEdit: any;
}

function ViewWorkFlow({ setClose, type, setAlertHandler, workflowEdit }: addPlantProps) {
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
      workflowName: workflowEdit?.workflowName || "",
      region: workflowEdit?.region || "",
      country: workflowEdit?.country || "",
      plantName: workflowEdit?.plantName || "",
    },
  });

  const dispatch = useDispatch()

  const [countriesList, setCountriesList] = useState([]);

  const [selectedRegion, setSelectedRegion] = useState(workflowEdit?.region || "");

 const isSmScreen = useMediaQuery('(max-width:768px)');



  const onSubmit = async (data: AddPlantFormInputs) => {
   
    try {
      const response = await putData<any>(
        `/globalWorkflows/${workflowEdit.id}`,
         data,
        setAlertHandler
      );

      if (response.data.success === true) {
        setAlertHandler({
          hasAlert: true,
          alertMessage: "Workflow updated successfully!",
          alertType: "success",
          alertTitle: "Success",
        });
        dispatch(PlantData(true))    
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

  // Reset form with workflowEdit data when it changes
  useEffect(() => {
    if (workflowEdit) {
      reset({
        workflowName: workflowEdit.workflowName || "",
        region: workflowEdit.region || "",
        country: workflowEdit.country || "",
        plantName: workflowEdit.plantName || "",
      });
      setSelectedRegion(workflowEdit.region || "");
    }
  }, [workflowEdit, reset]);



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
          <div><span style={{fontWeight:700, fontSize:"18px"}}>Region:</span> <span style={{fontSize:"16px"}}>{workflowEdit.region}</span></div>
          </Grid>
}

   {type==="Local" &&
          <Grid item xs={12} md={6} sm={isSmScreen ? 12 : 6}>
         <div><span style={{fontWeight:700, fontSize:"18px"}}>Country:</span> <span style={{fontSize:"16px"}}>{workflowEdit.country}</span></div>
      </Grid>
}

{type==="Local" &&
          <Grid item xs={12} md={6} sm={isSmScreen?12:6}>
            <div><span style={{fontWeight:700, fontSize:"18px"}}>Plant Name:</span> <span style={{fontSize:"16px"}}>{workflowEdit.plantName}</span></div>
          </Grid>
}

          <Grid item xs={12} md={type==="Global"?12:6} sm={isSmScreen?12:type==="Global"?12:6}>
           <div><span style={{fontWeight:700, fontSize:"18px"}}>Workflow Name:</span> <span style={{fontSize:"16px"}}>{workflowEdit.workflowName}</span></div>
          </Grid>

        </Grid>
        
      </form>
    </div>
  );
}

export default ViewWorkFlow;