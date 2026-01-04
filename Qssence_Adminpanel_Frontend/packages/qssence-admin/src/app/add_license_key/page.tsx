"use client"

import { CommonDialogWorkflow, AlertHandler, PrimaryTextField } from "qssence-common";
import { useState } from "react"
import {  AlertColor,  Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { post, } from "@/utils/ApiConfig";
import { useRouter } from "next/navigation";

export default function AddLicenseKey() {

    const router = useRouter()

  type AddLicenseKeyFormInputs = {
        
        licenseKey?:any;
    };  

    const [open, setOpen]=useState(true)

        const AddUserSchema = yup.object().shape({
    
          licenseKey: yup
          .string()
          .required("License Key is required"),
          });

      const {
            control,
            watch,
            setValue,
            handleSubmit,
            formState: { errors },
            reset,
          } = useForm({
            resolver: yupResolver(AddUserSchema),
            criteriaMode: "all",
            mode: "onChange",
            reValidateMode: "onChange",
            delayError: 100
          });

    const [alertHandler, setAlertHandler] = useState({
        hasAlert: false,
        alertType: "success" as AlertColor,
        alertMessage: "",
        alertTitle: "",
    });
          
        const onSubmit = async (data: AddLicenseKeyFormInputs) => {
            

          const params = new URLSearchParams({ key: data.licenseKey }).toString();

            try {
     
                const userdata = {
                 key: data.licenseKey,
               };
    
               const response = await post<any>(
                `/license/import?${params}`,
                  {},
                 setAlertHandler,
               );
           
     
              if (response.status ===200) {
               
                 setAlertHandler({
                   hasAlert: true,
                   alertMessage: "License key verified successfully!",
                   alertType: "success",
                   alertTitle: "Success",
                 });
                 reset()
                 setOpen(false)
                 router.push("/home")
                 
               }
               else{
                 reset()
                  setAlertHandler({
                   hasAlert: true,
                   alertMessage:response.data.message ,
                   alertType: "error",
                   alertTitle: "Error",
                 });
                 setOpen(false)
               } 
             
            
            } catch (error) {
              console.log("Error fetching data:", error);
            }
  };     


    const handleCancel=()=>
    {
        reset()
        setOpen(false)
        router.push("/login")
    }

    return (
        <>
         <AlertHandler alertHandler={alertHandler} />
         {open && 
              <CommonDialogWorkflow
              dialogTitle={"License Activation Key"}
              
              dialogContent={
              <>

             <p className="license_key">Please enter the license key you received after purchase to activate your product.</p>
             <form style={{display:"grid", gridRowGap:"16px"}} onSubmit={handleSubmit(onSubmit)} noValidate>
           
        <Controller
          name="licenseKey"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <PrimaryTextField
              {...field}
              id="licenseKey"
              label={
                <>
                Enter Your License Key
                  <span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                </>
              }
              haserror={Boolean(error)}
              errortext={error?.message}
              InputLabelProps={{ shrink: true }} 
            />
          )}
      />
          

         <Box style={{ display: "flex", gridColumnGap: "20px", justifyContent:"flex-end", paddingBlock:"10px" }}>
              <Button
              variant="outlined"
              size="small"
              onClick={handleCancel}
              sx={{
                height: "45px",
                fontWeight: 700,
              }}
              style={{backgroundColor:"#ffffff", paddingInline:"30px"}}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              type="submit"
              sx={{
                height: "45px",
                fontWeight: 700,
                
              }}
              style={{backgroundColor:"rgba(11, 74, 111, 1)", paddingInline:"30px"}}
            >
              Save
            </Button>
            </Box>
            </form>
            </>
              }
              onSave={() => {
                console.log("save");
              }}
              open={open}
              setOpen={setOpen}
            />

           } 
        </>
    )

}