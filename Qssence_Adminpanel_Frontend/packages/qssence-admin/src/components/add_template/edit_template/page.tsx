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
import { PrimaryTextField } from "qssence-common";
import { post } from "@/utils/ApiConfig"; // Assuming post function is defined correctly
import ColorIconUpload from "@/components/Icons/ColorIconUpload";
import { useMediaQuery } from "@mui/material";
import { IconX } from "@tabler/icons-react";

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
}

function EditTemplate({ setClose, setAlertHandler }: addPlantProps) {
  const AddUserSchema = yup.object().shape({
    documenttemplate: yup.string().required("Document template is required"),
    documenttype: yup.string().required("Document type is required"),
    documentSubtype: yup.string().required("Document subtype is required"),
    classification: yup.string().required("Classification is required"),
    documentFile: yup
      .mixed()
      .required("Document file is required")
      .test("fileType", "Only PDF, DOCX, and DOC files are allowed", (value) => {
        if (!value) return false; 
        const file = value as File; 
        const allowedTypes = [
          "application/pdf"
        ];
        return allowedTypes.includes(file.type); 
      }),
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
      documenttype: "",
      documentSubtype: "",
      classification: "",
      documentFile: null,
    },
  });

  const isSmScreen = useMediaQuery('(max-width:768px)');

  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

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

  return (
    <div>
      <form
      //  onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-6 mx-2"
      >
        <Grid container spacing={3}>
         
          <Grid item xs={12} sm={isSmScreen?6:4} md={4}>
            <Controller
              name="documenttype"
              control={control}
              rules={{ required: "Document type is required" }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <FormControl fullWidth error={Boolean(error)}>
                    <InputLabel id="documenttype-label">
                      Select document type
                    </InputLabel>
                    <Select
                      labelId="documenttype-label"
                      id="documenttype"
                      {...field}
                      label="Document Type"
                    >
                      <MenuItem value="type1">Type 1</MenuItem>
                      <MenuItem value="type2">Type 2</MenuItem>
                      <MenuItem value="type3">Type 3</MenuItem>
                    </Select>
                    {error && <FormHelperText>{error.message}</FormHelperText>}
                  </FormControl>
                </>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={isSmScreen?6:4} md={4}>
            <Controller
              name="documentSubtype"
              control={control}
              rules={{ required: "Document subtype is required" }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <FormControl fullWidth error={Boolean(error)}>
                    <InputLabel id="documentSubtype-label">
                      Select document subtype
                    </InputLabel>
                    <Select
                      labelId="documentSubtype-label"
                      id="documentSubtype"
                      {...field}
                      label="Document Subtype"
                    >
                      <MenuItem value="type1">Type 1</MenuItem>
                      <MenuItem value="type2">Type 2</MenuItem>
                      <MenuItem value="type3">Type 3</MenuItem>
                    </Select>
                    {error && <FormHelperText>{error.message}</FormHelperText>}
                  </FormControl>
                </>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={isSmScreen?6:4} md={4}>
            <Controller
              name="classification"
              control={control}
              rules={{ required: "Document type is required" }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <FormControl fullWidth error={Boolean(error)}>
                    <InputLabel id="classification-label">
                      Select Classification
                    </InputLabel>
                    <Select
                      labelId="classification-label"
                      id="classification"
                      {...field}
                      label="Document classification"
                    >
                      <MenuItem value="type1">Type 1</MenuItem>
                      <MenuItem value="type2">Type 2</MenuItem>
                      <MenuItem value="type3">Type 3</MenuItem>
                    </Select>
                    {error && <FormHelperText>{error.message}</FormHelperText>}
                  </FormControl>
                </>
              )}
            />
          </Grid>
        </Grid>

       

        <Grid container spacing={3}>
          <Grid item xs={6}>

          <Typography variant="h4" fontSize={"20px"}>
              Edit Template
            </Typography>
         
         <Box style={{display:"flex", gridColumnGap:"30px", alignItems:"center"}}>

         <Controller
            name="documentFile"
            control={control}
            rules={{
              required: "File is required",
            }}
            render={({ field, fieldState: { error } }) => (
              <div style={{position:"relative"}}>
             
                <input
                  type="file"
                  id="documentFiles"
                  accept=".pdf,.docx,.doc"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    field.onChange(e.target.files[0]); 
                    handleFileChange(e); 
                  }}
                />

                <label htmlFor="documentFiles">
                  <div
                    style={{
                      marginTop:"10px",
                      border: "1px solid lightgray",
                      padding: "30px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      position:'relative'
                    }}
                  >
                {filePreview && fileType === "application/pdf" ? (
                    <>
                  <div>
                  <embed src={filePreview}  type="application/pdf" />
                  </div>
                
                  </>
              
            ) :  <ColorIconUpload />}
                   
                  </div>
                </label>
                 {filePreview && fileType === "application/pdf" &&
                 
                 <div className="top_right_position" onClick={(e) => {
                  handleClose();
                    }}>
                        <IconX/>
                        </div>
                
                }

                {error && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    {error?.message}
                  </span>
                )}
              </div>
            )}
          />


            </Box>
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

export default EditTemplate;

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