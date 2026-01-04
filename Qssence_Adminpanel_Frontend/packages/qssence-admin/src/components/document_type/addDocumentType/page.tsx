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
import { IconMinus, IconPlus, IconUsersGroup } from "@tabler/icons-react";
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";

type AddPlantFormInputs = {

  documentType?: {
    name?: string;
    subTypes?: {
      name?: string;
      classifications?: {
        name?: string;
      }[];
    }[];
  }[];
};

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

function AddDocumentType({ setClose, setAlertHandler }: addPlantProps) {
  const AddUserSchema = yup.object().shape({
    documentType: yup.array().of(
      yup.object().shape({
        name: yup
          .string()
          .matches(/^[^0-9]+$/, "Document Type should not contain numbers")
          .required("Document Type is required"),
          subTypes: yup.array().of(
            yup.object().shape({
              name: yup
                .string()
                .matches(/^[^0-9]+$/, "Document Type should not contain numbers")
                .required("Sub Type is required"),
                classifications: yup.array().of(
                  yup.object().shape({
                      name: yup
                      .string()
                      .matches(/^[^0-9]+$/, "Document Type should not contain numbers")
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
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    resolver: yupResolver(AddUserSchema),
    criteriaMode: "all",
    mode: "onChange",
    reValidateMode: "onChange",
    delayError: 100,
    defaultValues: {
      documentType: [{ name: "", subTypes: [{ name: "", classifications: [{ name: "" }] }] }]
    },
  });


 const isSmScreen = useMediaQuery('(max-width:768px)');

 const routers = useRouter();

  const onSubmit = async (data: AddPlantFormInputs) => {
    try {
      console.log("Form data:", data);
      
      // Send single object instead of array
      const docType = data.documentType?.[0]; // Get first (and only) document type
      const raw = {
        name: docType.name,
        subTypes: docType.subTypes?.map((subType) => ({
          name: subType.name,
          classifications: subType.classifications?.map((classification) => ({
            name: classification.name
          }))
        }))
      };

      const response = await postData<any>(
        "/document-types/create",
        raw,
        setAlertHandler
      );

      setAlertHandler({
        hasAlert: true,
        alertMessage: "Document type created successfully!",
        alertType: "success",
        alertTitle: "Success",
      });
      
      setClose(false);
    } catch (error) {
      console.log("Error submitting form:", error);
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Failed to create document type",
        alertType: "error" as AlertColor,
        alertTitle: "Error",
      });
    }
  };


  const [additionalFields, setAdditionalFields] = useState([
    { id: 0, subType: [{ id: 0, classification: [{ id: 0,  }] }] },
  ]);

  // const handleAddMore = () => {
  //   setAdditionalFields([
  //     ...additionalFields,
  //     { id: additionalFields.length, subType: [{ id: 0, classification: [{ id: 0 }] }] },
  //   ]);
  // };

 
  // const handleRemoveMore = (deptIndex: number) => {
  //   setAdditionalFields((prevFields) =>
  //     prevFields.filter((_, index) => index !== deptIndex)
  //   );
  // };
  
  const handleAddSubType = (sectionIndex: number) => {
    // Update additionalFields state
    const updatedAdditionalFields = additionalFields.map((section, i) =>
      i === sectionIndex
        ? {
            ...section,
            subType: [...section.subType, { id: section.subType.length, classification: [{ id: 0 }] }],
          }
        : section
    );
    setAdditionalFields(updatedAdditionalFields);

    // Update react-hook-form data
    const currentValues = getValues();
    const updatedValues = {
      ...currentValues,
      documentType: currentValues.documentType.map((docType: any, i: number) =>
        i === sectionIndex
          ? {
              ...docType,
              subTypes: [...docType.subTypes, { name: "", classifications: [{ name: "" }] }]
            }
          : docType
      )
    };
    reset(updatedValues);
  };

  const handleRemoveSubType = (sectionIndex: number, subTypeIndex: number) => {
    // Update additionalFields state
    const updatedAdditionalFields = additionalFields.map((section, i) =>
      i === sectionIndex
        ? {
            ...section,
            subType: section.subType.filter((_, j) => j !== subTypeIndex),
          }
        : section
    );
    setAdditionalFields(updatedAdditionalFields);

    // Update react-hook-form data
    const currentValues = getValues();
    const updatedValues = {
      ...currentValues,
      documentType: currentValues.documentType.map((docType: any, i: number) =>
        i === sectionIndex
          ? {
              ...docType,
              subTypes: docType.subTypes.filter((_: any, j: number) => j !== subTypeIndex)
            }
          : docType
      )
    };
    reset(updatedValues);
  };

  // Add a classification within a specific subtype
  const handleAddClassification = (sectionIndex: number, subTypeIndex: number) => {
    // Update additionalFields state
    const updatedAdditionalFields = additionalFields.map((section, i) =>
      i === sectionIndex
        ? {
            ...section,
            subType: section.subType.map((sub, j) =>
              j === subTypeIndex
                ? { ...sub, classification: [...sub.classification, { id: sub.classification.length }] }
                : sub
            ),
          }
        : section
    );
    setAdditionalFields(updatedAdditionalFields);

    // Update react-hook-form data
    const currentValues = getValues();
    const updatedValues = {
      ...currentValues,
      documentType: currentValues.documentType.map((docType: any, i: number) =>
        i === sectionIndex
          ? {
              ...docType,
              subTypes: docType.subTypes.map((subType: any, j: number) =>
                j === subTypeIndex
                  ? {
                      ...subType,
                      classifications: [...subType.classifications, { name: "" }]
                    }
                  : subType
              )
            }
          : docType
      )
    };
    reset(updatedValues);
  };

  // Remove a classification within a specific subtype
  const handleRemoveClassification = (
    sectionIndex: number,
    subTypeIndex: number,
    classificationIndex: number
  ) => {
    // Update additionalFields state
    const updatedAdditionalFields = additionalFields.map((section, i) =>
      i === sectionIndex
        ? {
            ...section,
            subType: section.subType.map((sub, j) =>
              j === subTypeIndex
                ? {
                    ...sub,
                    classification: sub.classification.filter((_, k) => k !== classificationIndex),
                  }
                : sub
            ),
          }
        : section
    );
    setAdditionalFields(updatedAdditionalFields);

    // Update react-hook-form data
    const currentValues = getValues();
    const updatedValues = {
      ...currentValues,
      documentType: currentValues.documentType.map((docType: any, i: number) =>
        i === sectionIndex
          ? {
              ...docType,
              subTypes: docType.subTypes.map((subType: any, j: number) =>
                j === subTypeIndex
                  ? {
                      ...subType,
                      classifications: subType.classifications.filter((_: any, k: number) => k !== classificationIndex)
                    }
                  : subType
              )
            }
          : docType
      )
    };
    reset(updatedValues);
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
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={12} style={{display:"flex", gridColumnGap:"4px"}}>
            <Typography variant="h4" fontSize={"18px"}>
             Document Type
            </Typography>
          </Grid>
          </Grid>
          {additionalFields.map((documentType, deptIndex) => (
      <div key={documentType.id}>

    <Grid container spacing={3} style={{ display: "flex", alignItems: "center" }}>
      <Grid item xs={12} md={12} style={{paddingTop:"18px"}}>

        <Controller
          name={`documentType.${deptIndex}.name`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <PrimaryTextField
              id={`documentType-${deptIndex}`}
              label={`Enter Document Type`}
              haserror={Boolean(error)}
              errortext={error?.message}
              {...field}
            />
          )}
        />
      </Grid>
     </Grid>
     
      {documentType.subType.map((subType, subIndex) => (
        <div key={subType.id}>
           <Grid container spacing={3} style={{paddingTop:"18px"}} >
           <Grid item xs={12} md={6}>
            <Box style={{display:'flex', gridColumnGap:"10px", paddingBottom:"18px"}}>
          <Typography variant="h4" fontSize={"16px"}>
             Sub Type
            </Typography>
            <IconButton
              id="my-icon-button"
              onClick={() => handleAddSubType(deptIndex)}
              style={{
                color: "white",
                backgroundColor: "#073b54",
                borderRadius: "50%",
                padding: "1px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transform:"scale(0.8)"
             
              }}
            >
              <IconPlus />
            </IconButton>
            {subIndex > 0 && (
              <IconButton onClick={() => handleRemoveSubType(deptIndex, subIndex)}   style={{
                color: "white",
                backgroundColor: "#073b54",
                borderRadius: "50%",
                padding: "1px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transform:"scale(0.8)"
             
              }}>
                <IconMinus />
              </IconButton>
            )}
           </Box>
         
            <Controller
              name={`documentType.${deptIndex}.subTypes.${subIndex}.name`}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <PrimaryTextField
                  id={`subType-${deptIndex}-${subIndex}`}
                  label={`Enter Sub Type`}
                  haserror={Boolean(error)}
                  errortext={error?.message}
                  {...field}
                />
              )}
            />
          </Grid>

        


          {subType.classification.map((classification, classIndex) => (
          
               <Grid item xs={12} md={6}>
            <Box style={{display:'flex', gridColumnGap:"10px",paddingBottom:"18px"}}>

            <Typography variant="h4" fontSize={"16px"}>
            Classification
            </Typography>
              <IconButton
                style={{
                  color: "white",
                  backgroundColor: "#073b54",
                  borderRadius: "50%",
                  padding: "1px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transform:"scale(0.8)"
              
                }}
                onClick={() => handleAddClassification(deptIndex, subIndex)}
              >
                <IconPlus/>
              </IconButton>
              {classIndex > 0 && (
                <IconButton
                style={{
                  color: "white",
                  backgroundColor: "#073b54",
                  borderRadius: "50%",
                  padding: "1px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transform:"scale(0.8)"
                }}
                  onClick={() =>
                    handleRemoveClassification(deptIndex, subIndex, classIndex)
                  }
                >
                  <IconMinus />
                </IconButton>
              )}
            </Box>
                <Controller
                  name={`documentType.${deptIndex}.subTypes.${subIndex}.classifications.${classIndex}.name`}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <PrimaryTextField
                      id={`classification-${deptIndex}-${subIndex}-${classIndex}`}
                      label={`Enter Classification`}
                      haserror={Boolean(error)}
                      errortext={error?.message}
                      {...field}
                    />
                  )}
                />

       </Grid>
       
          ))}
    
          </Grid>
              </div>
            ))}

        </div>
      ))}


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

export default AddDocumentType;

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
