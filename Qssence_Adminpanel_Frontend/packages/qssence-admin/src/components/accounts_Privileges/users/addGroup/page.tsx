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
import { get, post } from "@/utils/ApiConfig"; // Assuming post function is defined correctly
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import { Showgroup } from "@/components/Redux/action";

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
  openRole:boolean;
  handleOpen:any;
}

function AddGroups({ setClose, setAlertHandler, openRole,handleOpen }: addPlantProps) {
    const AddUserSchema = yup.object().shape({
        name: yup
          .string()
          .matches(/^[a-zA-Z\s]+$/, {
            message: openRole
              ? "Role Name should contain only alphabets"
              : "Group Name should contain only alphabets",
          })
          .required(openRole ? "Role Name is required" : "Group Name is required"),
        description: yup
          .string()
          .matches(/^[a-zA-Z\s]+$/, {
            message: "Description should contain only alphabets",
          })
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
       name: "",
       description: "",
    },
  });


 const isSmScreen = useMediaQuery('(max-width:768px)');

 const dispatch =useDispatch()

  const onSubmit = async (data: AddPlantFormInputs) => {

    if(openRole)
    {
      try {
        let roleData = {
            "userRoleName": data.name,
            "description": data.description,
        };
        const response = await post<any>('/role/create', roleData, setAlertHandler);

        if (response.status === 201) {
            setAlertHandler({
                hasAlert: true,
                alertMessage: "Role created successfully!",
                alertType: "success",
                alertTitle: "Success",
            });
            dispatch(Showgroup(true))
            setClose(false);
            handleOpen()
        } else {
            setClose(true);
        }
    } catch (error) {
        console.log('Error fetching data:', error);
    }
    }
    else {
        try {
          const payload = {
            name: data.name,
            description: data.description,
          };
          const response = await post(`/groups/create`, payload, setAlertHandler);
          if (response.status === 201) {
            setAlertHandler({
              hasAlert: true,
              alertMessage: "Group created successfully!",
              alertType: "success",
              alertTitle: "Success",
            });
          }
         dispatch(Showgroup(true))
          setClose(false);
          handleOpen()

        } catch (error) {
          console.log("Error adding group:", error);
        }
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
                         Enter {openRole ? "Role Name":"Group Name"}<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
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

export default AddGroups;
