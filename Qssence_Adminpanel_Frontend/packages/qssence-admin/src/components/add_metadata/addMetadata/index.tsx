"use client";
import {
  AlertColor,
  Button,
  Grid,
  Typography,
  IconButton,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PrimarySelectField, PrimaryTextField } from "qssence-common";
import { post } from "@/utils/ApiConfig"; // Assuming post function is defined correctly
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useMediaQuery } from "@mui/material";

type AddPlantFormInputs = {
  title?:string;
  attributes?:string;
  fieldname?: string;
  width?: string;
  selectline?:string
  maxlenght?:number;
  minlength?:number;
  metaType?: {
    metaType?: string;
  }[];
  checkboxType?: {
    checkboxType?: string;
  }[];
  radioType?: {
    radioType?: string;
  }[];

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
}

function AddMetadata({ setClose, setAlertHandler }: addPlantProps) {
    const AddUserSchema = yup.object().shape({
        title: yup
          .string()
          .matches(/^[a-zA-Z\s]+$/, {
            message:"Title should contain only alphabets"
          })
          .required("Title is required"),
          attributes: yup
          .string()
          .required("Select at least 1 attributes"),
          fieldname: yup
          .string()
          .matches(/^[a-zA-Z\s]+$/, {
            message:"Fieldname should contain only alphabets"
          })
          .required("Fieldname is required"),
          selectline: yup
          .string(),
          width: yup
          .string()
          .required("Select at least 1 width size"),
          maxlength: yup
          .number(),
          minlength: yup
          .number(),
          metaType: yup.array().of(
            yup.object().shape({
              metaType: yup
                .string(),
            })
          ),
          checkboxType: yup.array().of(
            yup.object().shape({
              checkboxType: yup
                .string(),
            })
          ),
          radioType: yup.array().of(
            yup.object().shape({
              radioType: yup
                .string(),
            })
          ),
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
       title: "",
       attributes: "",
       fieldname:"",
       width:""
    },
  });


 const isSmScreen = useMediaQuery('(max-width:768px)');

 const [selectedField, setSelectedField] = useState('');

 const [additionalFields, setAdditionalFields] = useState([
    { id: 0 },
  ]);

 const handleAddMore = () => {
    setAdditionalFields([
      ...additionalFields,
      { id: additionalFields.length},
    ]);
  };
  
  
  const handleRemoveMore = (deptIndex: number) => {
    setAdditionalFields((prevFields) =>
      prevFields.filter((_, index) => index !== deptIndex)
    );
  };

  const handleChange = (value: string) => {
    console.log(value)
    console.log("hj")
    setSelectedField(value);
  };

  console.log("selectedField",selectedField)

  const onSubmit = async (data: AddPlantFormInputs) => {

    setClose(false);

    // try {
    //   const userdata = {
    //     plantName: data.name,
    //     department: data.description,
    //   };

    //   const response = await post<any>(
    //     "/plants/createPlant",
    //     userdata,
    //     setAlertHandler
    //   );

    //   console.log(response);
    //   setClose(false);
    //   setAlertHandler({
    //     hasAlert: true,
    //     alertMessage: "Plant created successfully!",
    //     alertType: "success",
    //     alertTitle: "Success",
    //   });
    //   // if (response.status === 200) {
    //   //   setAlertHandler({
    //   //     hasAlert: true,
    //   //     alertMessage: "Plant created successfully!",
    //   //     alertType: "success",
    //   //     alertTitle: "Success",
    //   //   });
       
    //   //   setClose(false);
    //   // } else {
    //   //   setClose(true);
    //   // }
    // } catch (error) {
    //   console.log("Error fetching data:", error);
    // }
  };





  useEffect(() => {
    const iconButton = document.getElementById("my-icon-button");
    if (iconButton) {
      iconButton.style.backgroundColor = "#0B4A6F";
    }
  }, []);

  return (
    <div style={{maxHeight:"70vh", overflow:"scroll"}}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-6"
      >
        <Grid container spacing={3}>
        

          <Grid item xs={12} md={6} sm={isSmScreen?12:6}>
        
           <Controller
                name="title"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <PrimaryTextField
                    id="title"
                    label={
                        <>
                          Enter MetaData Heading <span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                        </>
                      }
                    haserror={Boolean(error)}
                    errortext={error?.message}
                    {...field}
                  />
                )}
              />
          </Grid>

          <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
          <Controller
            name="attributes"
            control={control}
            render={({ field, fieldState: { error } }) => (
                <PrimarySelectField
                {...field}
                id="attributes"
                label={
                    <>
                    Select Type (Attributes)
                    <span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                    </>
                }

                onChange={(e) => {
                    field.onChange(e); 
                    handleChange(e.target.value as string); 
                  }}

                hasError={Boolean(error)}
                errorText={error?.message}
              
                
                menuItems={[
                    { value: "Text Field", label: "Text Field" },
                    { value: "Numeric Field", label: "Numeric Field" },
                    { value: "Date Field", label: "Date Field" },
                    { value: "Dropdown List", label: "Dropdown List" },
                    { value: "Checkbox", label: "Checkbox" },
                    { value: "Radio Button", label: "Radio Button" },
                    { value: "File Upload Field", label: "File Upload Field" },
                    { value: "Hyperlink Field", label: "Hyperlink Field" },
                ]}
                />
            )}
            />

        </Grid> 

          <Grid item xs={12} md={6} sm={isSmScreen?12:6}>
          <Controller
                name="fieldname"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <PrimaryTextField
                    id="fieldname"
                    multiline
                    label={
                        <>
                          Enter Data Field Name<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                        </>
                      }
                    haserror={Boolean(error)}
                    errortext={error?.message}
                    {...field}
                  />
                )}
              />
          </Grid>

       
        
        {selectedField==="Text Field" && 

       <Grid item xs={12} md={6} sm={isSmScreen?12:6}>
      
        <Controller
              name="selectline"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <PrimarySelectField
                  id="selectline"
                  label={<>
                    Select Line<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                  </>}
                  hasError={Boolean(error)}
                  errorText={error?.message}
                  {...field}  
                  menuItems={[
                    { value: "Single Line", label: "Single Line" },
                    { value: "Multi Line", label: "Multi Line" },
                  ]}         
                  />
              )}
            />
      </Grid>
       
       }

      {(selectedField==="Numeric Field" || selectedField==="Text Field") && 
      <>
     <Grid item xs={12} md={6} sm={isSmScreen?12:6}>
      <Controller
                name="minlength"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <PrimaryTextField
                    id="minlength"
                    multiline
                    label={
                        <>
                          Enter Min Length<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                        </>
                      }
                    type="number"
                    haserror={Boolean(error)}
                    errortext={error?.message}
                    {...field}
                  />
                )}
              />
    </Grid>

    <Grid item xs={12} md={6} sm={isSmScreen?12:6}>
      <Controller
                name="maxlength"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <PrimaryTextField
                    id="maxlength"
                    multiline
                    label={
                        <>
                          Enter Max Length
                        </>
                      }
                      type="number"
                    haserror={Boolean(error)}
                    errortext={error?.message}
                    {...field}
                  />
                )}
              />
      </Grid>
      </>
      
      } 

   {selectedField === "Dropdown List" && 
        additionalFields.map((documentType, deptIndex) => (
        
            <Grid item xs={12} md={6} sm={isSmScreen?12:6}>
                <Box
                  style={{
                    display: 'flex',
                    gridColumnGap: '10px',
                  }}
                >
                 
                </Box>
                
                <Box style={{display:"flex", gridColumnGap:"10px", alignItems:"center"}}>
              
                 <Controller
                name={`metaType.${deptIndex}.metaType`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <PrimaryTextField
                    id={`metaType-${deptIndex}`}
                    multiline
                    label={
                        <>
                          Enter List Name
                        </>
                      }
                    haserror={Boolean(error)}
                    errortext={error?.message}
                    {...field}
                  />
                )}
              />

                   <Box style={{display:"flex", gridColumnGap:'6px'}}>
                   {deptIndex < 1 && (    <IconButton
                      onClick={handleAddMore}
                      style={{
                        color: 'white',
                        backgroundColor: '#073b54',
                        borderRadius: '50%',
                        padding: '1px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transform: 'scale(0.9)',
                        height:"fit-content", 
                      }}
                    >
                      <IconPlus />
                    </IconButton>)}

                    {deptIndex > 0 && (
                    <IconButton
                      onClick={() => handleRemoveMore(deptIndex)}
                      style={{
                        color: 'white',
                        backgroundColor: '#073b54',
                        borderRadius: '50%',
                        padding: '1px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transform: 'scale(0.9)',
                      }}
                    >
                      <IconMinus />
                    </IconButton>
                  )}
                 </Box>
                    </Box>
              
              </Grid>
          
        ))}

    {selectedField === "Checkbox" && 
        additionalFields.map((documentType, deptIndex) => (
        
     
            <Grid item xs={12} md={6} sm={isSmScreen?12:6}>
                <Box
                  style={{
                    display: 'flex',
                    gridColumnGap: '10px',
                  }}
                >
                
                
                 
                </Box>
                
                <Box style={{display:"flex", gridColumnGap:"10px", alignItems:"center"}}>

                <Controller
                name={`checkboxType.${deptIndex}.checkboxType`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <PrimaryTextField
                    id={`checkboxType-${deptIndex}`}
                    multiline
                    label={
                        <>
                          Enter Checkbox Label Name
                        </>
                      }
                    haserror={Boolean(error)}
                    errortext={error?.message}
                    {...field}
                  />
                )}
              />

                   <Box style={{display:"flex", gridColumnGap:'6px'}}>
                   {deptIndex < 1 && (  <IconButton
                      onClick={handleAddMore}
                      style={{
                        color: 'white',
                        backgroundColor: '#073b54',
                        borderRadius: '50%',
                        padding: '1px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transform: 'scale(0.9)',
                        height:"fit-content", 
                      }}
                    >
                      <IconPlus />
                    </IconButton>)}

                    {deptIndex > 0 && (
                    <IconButton
                      onClick={() => handleRemoveMore(deptIndex)}
                      style={{
                        color: 'white',
                        backgroundColor: '#073b54',
                        borderRadius: '50%',
                        padding: '1px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transform: 'scale(0.9)',
                      }}
                    >
                      <IconMinus />
                    </IconButton>
                  )}
                 </Box>
                    </Box>
              
              </Grid>
          
        ))}

   {selectedField === "Radio Button" && 
        additionalFields.map((documentType, deptIndex) => (
        
            <Grid item xs={12} md={6} sm={isSmScreen?12:6}>
                <Box
                  style={{
                    display: 'flex',
                    gridColumnGap: '10px',
                  }}
                > 
                </Box>
                
                <Box style={{display:"flex", gridColumnGap:"10px", alignItems:"center"}}>
                
                <Controller
                name={`radioType.${deptIndex}.radioType`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <PrimaryTextField
                    id={`radioType-${deptIndex}`}
                    multiline
                    label={
                        <>
                          Enter Radio Label Name
                        </>
                      }
                    haserror={Boolean(error)}
                    errortext={error?.message}
                    {...field}
                  />
                )}
              />
                   <Box style={{display:"flex", gridColumnGap:'6px'}}>
                   {deptIndex < 1 && (    <IconButton
                      onClick={handleAddMore}
                      style={{
                        color: 'white',
                        backgroundColor: '#073b54',
                        borderRadius: '50%',
                        padding: '1px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transform: 'scale(0.9)',
                        height:"fit-content", 
                      }}
                    >
                      <IconPlus />
                    </IconButton>)}

                    {deptIndex > 0 && (
                    <IconButton
                      onClick={() => handleRemoveMore(deptIndex)}
                      style={{
                        color: 'white',
                        backgroundColor: '#073b54',
                        borderRadius: '50%',
                        padding: '1px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transform: 'scale(0.9)',
                      }}
                    >
                      <IconMinus />
                    </IconButton>
                  )}
                 </Box>
                    </Box>
              
              </Grid>
          
        ))}


         <Grid item xs={12} md={6} sm={isSmScreen?12:6}>
      
      <Controller
            name="width"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <PrimarySelectField
                id="width"
                label={<>
                  Select Width<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                </>}
                hasError={Boolean(error)}
                errorText={error?.message}
                {...field}  
                menuItems={[
                  { value: "One-fourth Width", label: "One-fourth Width" },
                  { value: "Half Width", label: "Half Width" },
                  { value: "Full Width", label: "Full Width" },
                ]}         
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

export default AddMetadata;