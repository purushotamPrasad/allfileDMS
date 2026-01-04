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
import { post, put } from "@/utils/ApiConfig"; // Assuming post function is defined correctly
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useMediaQuery } from "@mui/material";
import {useDispatch} from 'react-redux';
import { GroupData, RoleData } from "@/components/Redux/action";

type AddPlantFormInputs = {
  name?: string;
  description?: string;
};

interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle: string | undefined;  // Allowing undefined for alertTitle
}


interface addPlantProps {
  setClose: Dispatch<SetStateAction<boolean>>;
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
  viewData:any;
}

function EditGroup({ setClose, setAlertHandler,viewData }: addPlantProps) {
    const AddUserSchema = yup.object().shape({
        name: yup
          .string()
          .matches(/^[a-zA-Z\s]+$/, "Group name should contain only alphabets")
          .required("Role name is required"),
          description: yup
          .string()
          .matches(/^[a-zA-Z\s]+$/, "Description should contain only alphabets")
          .required("Description is required"),
         
   
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
       name: viewData.name,
       description: viewData.description,
    },
  });


 const isSmScreen = useMediaQuery('(max-width:768px)');

 const dispatch=useDispatch()

  const onSubmit = async (data: AddPlantFormInputs) => {


    const updatedData = {
      ...data,
      groupsId: viewData.groupsId,
    };
  
    console.log("ViewData:", viewData);
    console.log("EditedData:", updatedData);
      
    try {
     
      const response = await put<any>(
        `/groups/update/${viewData.groupsId}`,
        updatedData,
        setAlertHandler
      );

      if (response.data.success === true) {

        setAlertHandler({
          hasAlert: true,
          alertMessage: response.data.message,
          alertType: "success",
          alertTitle: "Success",
        });

        dispatch(GroupData(true))
         setClose(false);

      } else {
        setClose(true);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };


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
                name="name"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <PrimaryTextField
                    id="name"
                    label={
                        <>
                         Enter Group Name<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
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
                name="description"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <PrimaryTextField
                    id="description"
                    multiline
                    label={
                        <>
                          Enter Description<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
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
    </div>
  );
}

export default EditGroup;