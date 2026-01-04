"use client";
import {
  AlertColor,
  Button,
  Grid,
  Typography,
  IconButton,
  FormHelperText,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  TextField,
  Box,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PrimaryMultiSelectField, PrimarySelectField, PrimaryTextField } from "qssence-common";
import { post } from "@/utils/ApiConfig"; // Assuming post function is defined correctly
import ColorIconUpload from "@/components/Icons/ColorIconUpload";
import { useMediaQuery } from "@mui/material";
import { IconEdit, IconEye, IconUsersGroup, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";


interface AddPlantFormInputs {
  plantName: string;
  divisions: { divisionName: string; location: string }[];
}

interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle: string | undefined; 
}

interface addPlantProps {
  setClose: Dispatch<SetStateAction<boolean>>;
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
  view:any;
}

interface OptionInterface {
  label: string;
  value: string;
}

function EditWorkflowTimeline({ setClose, setAlertHandler, view }: addPlantProps) {

  const routers = useRouter();

  const AddUserSchema = yup.object().shape({
    selectTimeline: yup.string(),
    timelineName: yup.string(),
    metadataField: yup
    .array()
    .of(
      yup.string()
    )

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
     selectTimeline: "",
      timelineName: "",
    },
  });

  const isSmScreen = useMediaQuery('(max-width:768px)');

  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  const [userGroupData, setUserGroupData] = useState<OptionInterface[]>([]);

  const onSubmit = async (data: AddPlantFormInputs) => {
    try {
      const userdata = {
        plantName: data.plantName,
        divisions: data.divisions,
      };

      const response = await post<any>(
        "/plants/createPlant",
        userdata,
        setAlertHandler
      );

      console.log(response);
      setClose(false);
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Plant created successfully!",
        alertType: "success",
        alertTitle: "Success",
      });
      // if (response.status === 200) {
      //   setAlertHandler({
      //     hasAlert: true,
      //     alertMessage: "Plant created successfully!",
      //     alertType: "success",
      //     alertTitle: "Success",
      //   });

      //   setClose(false);
      // } else {
      //   setClose(true);
      // }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const [additionalFields, setAdditionalFields] = useState([{ id: 0 }]);

  const handleAddMore = () => {
    setAdditionalFields([...additionalFields, { id: additionalFields.length }]);
  };

  useEffect(() => {
    const iconButton = document.getElementById("my-icon-button");
    if (iconButton) {
      iconButton.style.backgroundColor = "#0B4A6F";
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("file")
    const file = e.target.files?.[0];
    console.log("file", file)
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setFilePreview(fileReader.result as string); 
        setFileType(file.type); 
        console.log("file", file)
      };

      if (file.type === "application/pdf") {
        fileReader.readAsDataURL(file); 
      } 
    }
  };

 const handleClose=()=>
 {
    setFilePreview(null)
    setFileType(null)
 }

 const handleEditTimeline=()=>
 {

 }

  return (
    <div>
      <form
      //  onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-6 mx-2"
      >
        <Grid container spacing={3}>
         
          <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <Controller
              name="timelineName"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                <PrimaryTextField
                id="timelineName"
                label="Timeline Name"
                haserror={Boolean(error)}
                errortext={error?.message}
                {...field} 
                />
                </>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
          <Controller
            name="selectTimeline"
            control={control}
            render={({ field, fieldState: { error } }) => (
                <PrimarySelectField
                    {...field}
                    label="Select Timeline"
                    id="Select Timeline"
                    hasError={Boolean(error)}
                    errorText={error?.message}
                    menuItems={[
                        { label: "Details", value: "Details" },
                        { label: "Products/Batches", value: "Products/Batches" },
                        { label: "CAPA", value: "CAPA" },
                    ]}
                />
            )}
                        />
          </Grid>

          <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{position:"relative"}}>
          <Controller
        name="metadataField"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <PrimaryTextField
              id="metadataField"
              label="Metadata Field"
              haserror={Boolean(error)}
              errortext={error?.message}
              {...field}
            />
      {!view && (
        <IconButton
          id="my-icon-buttons"
          onClick={handleEditTimeline}
          style={{
            color: "#073b54",
            borderRadius: "50%",
            padding: "0px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: "scale(0.8)",
            position: "absolute",
            right:"8px",
            top:"36px"
          }}
        >
          <IconEdit />
        </IconButton>
      )}
    </>
  )}
/>

            
          </Grid>


          <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex", gridColumnGap:"8px", alignItems:"center"}}>
          <Typography variant="h4" fontSize={"16px"}>
              Workflow
            </Typography>
            
            <IconButton
              id="my-icon-button"
              onClick={handleEditTimeline}
              style={{
                color: "white",
                backgroundColor: "#073b54",
                borderRadius: "50%",
                padding: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "5px",
                transform:"scale(0.8)"
              }}
            >
             {view?<IconEye />:<IconEdit/>} 
            </IconButton>
          </Grid>

          <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
            <Controller
              name="metadataField"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                <PrimaryTextField
                id="metadataField"
                label="API Endpoint"
                haserror={Boolean(error)}
                errortext={error?.message}
                {...field} 
                />
                </>
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

export default EditWorkflowTimeline;

/*  <Grid item xs={12}>
            <Controller
              name="documenttemplate"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <PrimaryTextField
                  id="documenttemplate"
                  label="Here we are  creating Document Templates (Step 6)"
                  haserror={Boolean(error)}
                  errortext={error?.message}
                  {...field}
                />
              )}
            />
          </Grid>*/