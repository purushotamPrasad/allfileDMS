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
import { IconMinus, IconPlus, IconUsersGroup } from "@tabler/icons-react";
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";



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

function AddDocumentFlow({ setClose, setAlertHandler }: addPlantProps) {
  const AddUserSchema = yup.object().shape({
    workflowName: yup
    .string()
    .matches(/^[a-zA-Z\s]+$/, "Workflow Name should contain only alphabets")
    .required("Workflow Name is required"),
    stateName: yup
    .string()
    .required("State Name is required"),
    query: yup
    .string()
    .required("Select one query member"),
    documentType: yup.array().of(
      yup.object().shape({
        documentType: yup
          .string()
          .matches(/^[a-zA-Z\s]+$/, "Document Type should contain only alphabets")
          .required("Document Type is required"),
          subType: yup.array().of(
            yup.object().shape({
              subType: yup
                .string()
                .matches(/^[a-zA-Z\s]+$/, "Sub Type should contain only alphabets")
                .required("Sub Type is required"),
                classification: yup.array().of(
                  yup.object().shape({
                      classification: yup
                      .string()
                      .matches(/^[a-zA-Z\s]+$/, "Classification should contain only alphabets")
                      .required("Classification is required"),
                      
                  })
                ).required("At least one classification is required"),

            })
          ).required("At least one subtype is required"),
      })
    ).required("At least one department is required"),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(AddUserSchema),
    criteriaMode: "all",
    mode: "onChange",
    reValidateMode: "onChange",
    delayError: 100,
    defaultValues: {
      documentType: [{ documentType: "", subType: [{ subType: "", classification: [{ classification: "" }] }] }],
      workflowName:""
    },
  });


 const isSmScreen = useMediaQuery('(max-width:768px)');

 const routers = useRouter();

 /*
  const onSubmit = async (data: AddPlantFormInputs) => {
    try {
      const userdata = {
        plantName: data.plantName,
        department: data.department,
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
*/
 
  // Remove all add/remove handlers for Document Type, Sub Type, Classification




  const handleAddWorkflow=()=>
  {
      routers.push("/workflow/dms-workflow")
  }
  
  


  useEffect(() => {
    const iconButton = document.getElementById("my-icon-button");
    if (iconButton) {
      iconButton.style.backgroundColor = "#0B4A6F";
    }
  }, []);


  const documentTypeOptions = [
    { value: "Policy", label: "Policy" },
    { value: "Manual", label: "Manual" },
    { value: "SOP", label: "SOP" },
    { value: "Form", label: "Form" },
  ];
  const subTypeOptionsMap: Record<string, { value: string; label: string }[]> = {
    Policy: [
      { value: "HR", label: "HR" },
      { value: "Finance", label: "Finance" },
    ],
    Manual: [
      { value: "Technical", label: "Technical" },
      { value: "User", label: "User" },
    ],
    SOP: [
      { value: "Process", label: "Process" },
      { value: "Safety", label: "Safety" },
    ],
    Form: [
      { value: "Application", label: "Application" },
      { value: "Feedback", label: "Feedback" },
    ],
  };
  const classificationOptionsMap: Record<string, { value: string; label: string }[]> = {
    HR: [
      { value: "Confidential", label: "Confidential" },
      { value: "Internal", label: "Internal" },
    ],
    Finance: [
      { value: "Public", label: "Public" },
      { value: "Internal", label: "Internal" },
    ],
    Technical: [
      { value: "Restricted", label: "Restricted" },
      { value: "Internal", label: "Internal" },
    ],
    User: [
      { value: "Public", label: "Public" },
      { value: "Internal", label: "Internal" },
    ],
    Process: [
      { value: "Internal", label: "Internal" },
      { value: "External", label: "External" },
    ],
    Safety: [
      { value: "Confidential", label: "Confidential" },
      { value: "Public", label: "Public" },
    ],
    Application: [
      { value: "Internal", label: "Internal" },
      { value: "External", label: "External" },
    ],
    Feedback: [
      { value: "Public", label: "Public" },
      { value: "Internal", label: "Internal" },
    ],
  };

  return (
    <div>
      <form
        // onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-6"
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={12} style={{display:"flex", gridColumnGap:"4px"}}>
            <Typography variant="h4" fontSize={"18px"}>
             Document Type
            </Typography>
          </Grid>
        </Grid>
 
   
        <Grid container spacing={3} style={{ display: "flex", alignItems: "center" }}>
      <Grid item xs={12} md={12} style={{paddingTop:"18px"}}>

      <Controller
                  name="documentType.0.documentType"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <PrimarySelectField
                      {...field}
                      id="documentType-0"
                      label={
                        <>
                          Select Document Type<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                        </>
                      }
                      hasError={Boolean(error)}
                      errorText={error?.message}
                      menuItems={documentTypeOptions}
                      onChange={e => {
                        field.onChange(e);
                        setValue("documentType.0.subType.0.subType", "");
                        setValue("documentType.0.subType.0.classification.0.classification", "");
                      }}
                    />
                  )}
                />
      </Grid>
     </Grid>
         
             
            <Grid container spacing={3} style={{paddingTop:"18px"}} >
        <Grid item xs={12} md={6}>
          <Box style={{display:'flex', gridColumnGap:"10px", paddingBottom:"18px"}}>
            <Typography variant="h4" fontSize={"16px"}>
              Sub Type
            </Typography>
          </Box>
          <Controller
            name="documentType.0.subType.0.subType"
            control={control}
            render={({ field, fieldState: { error } }) => {
              const selectedDocType = control._formValues?.documentType?.[0]?.documentType;
              const subTypeOptions = selectedDocType ? subTypeOptionsMap[selectedDocType] || [] : [];
              return (
                <PrimarySelectField
                  {...field}
                  id="subType-0-0"
                  label={
                    <>
                      Select Sub Type<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                    </>
                  }
                  hasError={Boolean(error)}
                  errorText={error?.message}
                  menuItems={subTypeOptions}
                  onChange={e => {
                    field.onChange(e);
                    setValue("documentType.0.subType.0.classification.0.classification", "");
                  }}
                />
              );
            }}
          />
        </Grid>
        {/* Classification Select */}
        <Grid item xs={12} md={6}>
          <Box style={{display:'flex', gridColumnGap:"10px",paddingBottom:"18px"}}>
            <Typography variant="h4" fontSize={"16px"}>
              Classification
            </Typography>
          </Box>
          <Controller
            name="documentType.0.subType.0.classification.0.classification"
            control={control}
            render={({ field, fieldState: { error } }) => {
              const selectedSubType = control._formValues?.documentType?.[0]?.subType?.[0]?.subType;
              const classificationOptions = selectedSubType ? classificationOptionsMap[selectedSubType] || [] : [];
              return (
                <PrimarySelectField
                  {...field}
                  id="classification-0-0-0"
                  label={
                    <>
                      Select Classification<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                    </>
                  }
                  hasError={Boolean(error)}
                  errorText={error?.message}
                  menuItems={classificationOptions}
                />
              );
            }}
          />
        </Grid>
      </Grid>
          
     

          <Grid container spacing={3} style={{display:'flex', alignItems:'center', paddingTop:'18px'}}>
           <Grid item xs={12} md={6} sm={isSmScreen?12:6}>
                  
                  <Typography variant="h4" fontSize={"16px"} style={{paddingBottom:'10px'}}>
                      Workflow Name
                    </Typography>

                  <Controller
                    name="workflowName"
                    control={control}
                    
                    render={({ field, fieldState: { error } }) => (
                    
                <PrimarySelectField
                  {...field}
                  id="workflowName"
                  label={
                    <>
                      Select WorkFlow Name<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                    </>
                  }
                
                  hasError={Boolean(error)}
                  errorText={error?.message}
                  menuItems={[
                    { value: "SOP creation1", label: "SOP creation1" },
                    { value: "SOP creation2", label: "SOP creation2" },
                    { value: "SOP creation3", label: "SOP creation3" },
                    { value: "SOP creation4", label: "SOP creation4" },
                  ]}
                  
                />
              )}
            />
            </Grid>
              
           
                  
          <Grid item xs={12} md={6} sm={isSmScreen?12:6} style={{display:"flex", gridColumnGap:"4px", height:'fit-content', alignItems:"center",paddingTop:"60px"}}>
           
            <Typography variant="h4" fontSize={"16px"}>
             Add Workflow Name
            </Typography>
            <IconButton
              id="my-icon-button"
              onClick={handleAddWorkflow}
              style={{
                color: "white",
                backgroundColor: "#073b54",
                borderRadius: "50%",
                padding: "1px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "5px",
                transform:"scale(0.8)"
              }}
            >
              <IconPlus />
            </IconButton>
          </Grid>
          </Grid>

          <Grid container spacing={3} style={{display:'flex', alignItems:'center', paddingTop:'18px'}}>

          

           <Grid item xs={12} md={6} sm={isSmScreen?12:6}>
                  
              <Typography variant="h4" fontSize={"16px"} style={{paddingBottom:'10px'}}>
                  State Name
              </Typography>
                  
                  <Box style={{display:"flex", gridColumnGap:"30px", alignItems:"center"}}>

                  <Typography variant="h4" fontSize={"14px"}>
                    Draft
                 </Typography>
     
                  <Controller
                    name="stateName"
                    control={control}
                    
                    render={({ field, fieldState: { error } }) => (
                    
                <PrimarySelectField
                  {...field}
                  id="stateName"
                  label={
                    <>
                      Select Member Name<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                    </>
                  }
                
                  hasError={Boolean(error)}
                  errorText={error?.message}
                  menuItems={[
                    { value: "SOP creation1", label: "SOP creation1" },
                    { value: "SOP creation2", label: "SOP creation2" },
                    { value: "SOP creation3", label: "SOP creation3" },
                    { value: "SOP creation4", label: "SOP creation4" },
                  ]}
                  
                />
              )}
            />
            </Box>
            </Grid>

            <Grid item xs={12} md={6} sm={isSmScreen?12:6}>
                  
                  <Typography variant="h4" fontSize={"16px"} style={{paddingBottom:'10px'}}>
                      Query Member
                  </Typography>
                      
                      <Box style={{display:"flex", gridColumnGap:"10px", alignItems:"end"}}>
         
                      <Controller
                        name="query"
                        control={control}
                        
                        render={({ field, fieldState: { error } }) => (
                        <PrimaryTextField
                        id="query"
                        label={`Select Query Member`}
                        haserror={Boolean(error)}
                        errortext={error?.message}
                        {...field}
                      />
                  
                  )}
                />
                <IconUsersGroup
                cursor={"pointer"}
                className="primary_color"
                onClick={() =>
                  routers.push("/accounts_privileges/groups/groupMember")
                }
               
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

export default AddDocumentFlow;

/* 





  <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
        <Controller
          name={`documentType.${deptIndex}.subType.${subIndex}.subType`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <PrimaryTextField
              id={`subType-${deptIndex}`}
              label="Sub Type"
              haserror={Boolean(error)}
              errortext={error?.message}
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex", gridColumnGap:"30px"}}>
        <Box style={{display:"flex", gridColumnGap:"4px", height:"fit-content"}}>
      <Typography variant="h4" fontSize={"16px"}>
              Classification
            </Typography>
            <IconButton
              id="my-icon-button"
              onClick={() => handleAddClassification(deptIndex, subTypeIndex)}
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
            <Typography variant="h4" fontSize={"16px"}>
              Sub Type
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
 





{additionalFields.map((department, deptIndex) => (
    <div key={department.id}>
    <Grid container spacing={3} style={{display:'flex', alignItems:'center'}}>
      <Grid item xs={12} sm={isSmScreen?12:6} md={6}>
        <Controller
          name={`documentType.${deptIndex}.subType`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <PrimaryTextField
              id={`subType-${deptIndex}`}
              label="Sub Type"
              haserror={Boolean(error)}
              errortext={error?.message}
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={isSmScreen?12:6} md={6} style={{display:"flex", gridColumnGap:"30px"}}>
        <Box style={{display:"flex", gridColumnGap:"4px", height:"fit-content"}}>
      <Typography variant="h4" fontSize={"16px"}>
              Classification
            </Typography>
            <IconButton
              id="my-icon-button"
              onClick={() => handleAddClassification(deptIndex, subTypeIndex)}
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
            <Typography variant="h4" fontSize={"16px"}>
              Sub Type
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
            name={`documentType.${deptIndex}.subType.${sectionIndex}.subType`}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <PrimaryTextField
                id={`Section-${deptIndex}-${sectionIndex}`}
                label={`Section ${sectionIndex + 1}`}
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






<Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={12} style={{display:"flex", gridColumnGap:"4px"}}>
            <Typography variant="h4" fontSize={"18px"}>
              Sub Type
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
         
        </Grid> */
