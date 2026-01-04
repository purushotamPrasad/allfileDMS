"use client";

import React, {Dispatch, SetStateAction, useState, useEffect} from 'react';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PrimarySelectField, PrimaryTextField } from "qssence-common";
import { Box, Button, FormControl, Grid, AlertColor, IconButton, InputAdornment, Typography } from '@mui/material';
import { get, post } from '@/utils/ApiConfig';
import { useMediaQuery } from "@mui/material";
import {useDispatch} from 'react-redux';
import { PlanData } from '@/components/Redux/action';
import { IconMinus, IconPlus } from '@tabler/icons-react';

type AddPlantFormInputs = {
  name?:string;
  description?: string;
  features?: {
    name?: string;
  }[];
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



const CreatePlan: React.FC<AddCompanyProps> = ({setClose, setAlertHandler }) => {


  const dispatch = useDispatch()

  const [selectedPlan, setSelectedPlan] =useState("")

  const AddUserSchema = yup.object().shape({
     name: yup
      .string()
      .matches(/^[a-zA-Z\s]+$/, "Name should contain only alphabets")
      .required("Name is required"),
      description: yup
      .string(),
      features: yup.array().of(
        yup.object().shape({
          name: yup
            .string()
            .required("Feature is required"),
        })
      )
      .required("At least one branch is required"),
      
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
      name: "",
      description: "",
      features: [{name:""}]

    },
    
  });

   
  const isSmScreen = useMediaQuery('(max-width:768px)');

    const handlePlanChange = (fieldName: keyof AddPlantFormInputs, value: string) => {

      setSelectedPlan(value)

  };

    const [additionalFields, setAdditionalFields] = useState([
        { id: 0 },
      ]);

 

  const handleAddMore = () => {
    setAdditionalFields([
      ...additionalFields,
      { id: additionalFields.length },
    ]);
  };

  const handleRemoveMore = (deptIndex: number) => {
    setAdditionalFields((prevFields) =>
      prevFields.filter((_, index) => index !== deptIndex)
    );
  };

  const handleReset = () => {
    reset({
      name: "",
      description: "",
      features: [{name:""}],
    });
    setAdditionalFields([{ id: 0 }]); 
  };
      
  const onSubmit = async (data: AddPlantFormInputs) => {
    try {
      const response = await post<any>("/plans/create", data, setAlertHandler);
  
      if (response.data.success === true) {
        setAlertHandler({
          hasAlert: true,
          alertMessage: "Plan created successfully!",
          alertType: "success",
          alertTitle: "Success",
        });
        dispatch(PlanData(true));
        setClose(false);
        reset();
        setAdditionalFields([{ id: 0 }]);
      } else {
        setAlertHandler({
          hasAlert: true,
          alertMessage: response.data.message || "Something went wrong!",
          alertType: "error",
          alertTitle: "Error",
        });
      }
      setClose(false);
      reset();
    } catch (error: any) {
      console.log("Error fetching data:", error);
  
      if (error.response && error.response.status === 400) {
        setAlertHandler({
          hasAlert: true,
          alertMessage: error.response.data.message || "Bad Request",
          alertType: "error",
          alertTitle: "Error",
        });
        reset();
        setClose(false);
      } else {
        setAlertHandler({
          hasAlert: true,
          alertMessage: "An unexpected error occurred. Please try again.",
          alertType: "error",
          alertTitle: "Error",
        });
        reset();
        setClose(false);
      }
    }
  };
  

    return (
        <>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
          
          <Box>
            
             <Grid container spacing={{sm:2,md:2,xs:2}} display="flex" justifyContent="space-between">
              
             <Grid item xs={12} md={6} sm={isSmScreen?12:6}>

              <Controller
                name="name"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <PrimarySelectField
                    {...field}
                    id="name"
                    label={
                      <>
                        Select Plan Name<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                      </>
                    }
    
                    onChange={(e) => {
                      field.onChange(e); 
                      handlePlanChange("name", e.target.value as string); 
                    }}
    
                    hasError={Boolean(error)}
                    errorText={error?.message}
                    menuItems={[
                      { value: "Doqssence", label: "Doqssence" },
                      { value: "Elevate", label: "Elevate" },
                      { value: "Aspire", label: "Aspire" },
                    ]}
                    
                  />
                )}
              />

            </Grid>

            

            <Grid item xs={12} md={6} sm={isSmScreen?12:6}>
        
              <Controller
                  name="description"
                  control={control}
                render={({ field, fieldState: { error } }) => (

                    <PrimaryTextField
                    id="description"
                    label={
                      <>
                       Enter Description
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
            <Box>
          <Box style={{display:"flex", gridColumnGap:"10px", paddingBlock:"18px", alignItems:"center"}}>

          <Typography variant="h4" fontSize={"16px"} fontWeight={600}>
              Add Features
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
            </Box>

            <Grid container spacing={3} style={{display:'flex', alignItems:'end', marginBottom:"18px"}}>
          {additionalFields.map((state, featureIndex) => (
          

              <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:'flex', gridColumnGap:"8px", height:"fit-content", alignItems:'center'}}>
                <Controller
                  name={`features.${featureIndex}.name`}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <PrimaryTextField
                      id={`features-${featureIndex}`}
                      label={
                        <>
                        Enter Feature Name<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                        </>
                        }
                      haserror={Boolean(error)}
                      errortext={error?.message}
                      {...field}
                    />
                  )}
                />

            {featureIndex!==0 &&
                    <IconButton
                        id="my-icon-button"
                        onClick={() => handleRemoveMore(featureIndex)}
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
         
       </Box>
          
          </Box>
  
          <Box style={{display:"flex",justifyContent:"flex-end", gridColumnGap:"20px", paddingTop:"10px"}}>
     
          <Button    
             variant="outlined"
             size="small"
             type="reset"
             onClick={() => handleReset()}
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

export default CreatePlan;