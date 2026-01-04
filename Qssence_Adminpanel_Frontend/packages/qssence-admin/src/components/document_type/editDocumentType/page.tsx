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
import { getData, putData } from "@/utils/ApiConfig";
import { get } from "@/utils/ApiConfig";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";

type AddPlantFormInputs = {

  documentType?: {
    id: number;
    name?: string;
    subTypes?: {
      id?: number;
      name?: string;
      classifications?: {
        id?: number;
        name?: string;
      }[];
    }[];
  }[];
};

interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle: string | undefined; 
}

interface addPlantProps {
  setClose: Dispatch<SetStateAction<boolean>>;
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
  docTypeData: any;
}

function EditDocumentType({ setClose, setAlertHandler, docTypeData}: addPlantProps) {
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
                .matches(/^[^0-9]+$/, "Sub Type should not contain numbers")
                .required("Sub Type is required"),
                classifications: yup.array().of(
                  yup.object().shape({
                      name: yup
                      .string()
                      .matches(/^[^0-9]+$/, "Classification should not contain numbers")
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
      documentType: [{ name: docTypeData?.name || "", subTypes: [{ name: "", classifications: [{ name: "" }] }] }],
    },
  });

 const isSmScreen = useMediaQuery('(max-width:768px)');

 const [loading, setLoading] = useState(true);

 console.log("docTypeData", docTypeData)

 useEffect(() => {
  const fetchAndSetData = async () => {
    
    if (docTypeData && docTypeData.name) {
      const formData = {
        documentType: [
          {
            id: Number(docTypeData.id), 
            name: docTypeData.name || "",
            subTypes: Array.isArray(docTypeData.subTypes) 
              ? docTypeData.subTypes.map((sub: any) => ({
                  id: Number(sub.id), 
                  name: sub.name || sub.subType || "",
                  classifications: Array.isArray(sub.classifications)
                    ? sub.classifications.map((cls: any) => ({ 
                        id: Number(cls.id), 
                        name: typeof cls === "string" ? cls : cls.name || cls.classification || cls.label || "" 
                      }))
                    : [],
                }))
              : [],
          },
        ],
      };
      
      console.log("Form data from props:", formData);
      reset(formData);
      
      if (formData.documentType[0].subTypes.length > 0) {
        const updatedAdditionalFields = [{
          id: 0,
          subType: formData.documentType[0].subTypes.map((subType: any, index: number) => ({
            id: index,
            classification: subType.classifications.map((cls: any, clsIndex: number) => ({
              id: clsIndex
            }))
          }))
        }];
        setAdditionalFields(updatedAdditionalFields);
      }
      
      setLoading(false);
      return;
    }

    if (docTypeData && docTypeData.id) {
      try {
        const response = await getData(
          `/document-types/${docTypeData.id}`,
          {},
          "instance1",
          setAlertHandler
        );
        
        const data = (response as { data?: { data?: any } })?.data?.data;
        
        if (data && typeof data === 'object') {
          const formData = {
            documentType: [
              {
                id: Number(data.id), // Ensure id is a number
                name: data.name || data.documentType || data.type || "",
                subTypes: Array.isArray(data.subTypes) 
                  ? data.subTypes.map((sub: any) => ({
                      id: Number(sub.id), // Ensure id is a number
                      name: sub.name || sub.subType || "",
                      classifications: Array.isArray(sub.classifications)
                        ? sub.classifications.map((cls: any) => ({ 
                            id: Number(cls.id), // Ensure id is a number
                            name: typeof cls === "string" ? cls : cls.name || cls.classification || cls.label || "" 
                          }))
                        : [],
                    }))
                  : [],
              },
            ],
          };
          
          reset(formData);
          
          // Update additionalFields state to match the loaded data
          if (formData.documentType[0].subTypes.length > 0) {
            const updatedAdditionalFields = [{
              id: 0,
              subType: formData.documentType[0].subTypes.map((subType: any, index: number) => ({
                id: index,
                classification: subType.classifications.map((cls: any, clsIndex: number) => ({
                  id: clsIndex
                }))
              }))
            }];
            setAdditionalFields(updatedAdditionalFields);
          }
        }
        setLoading(false);
      } catch (error) {
        console.log("Error fetching document type by id:", error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };
  
  if (loading) {
    fetchAndSetData();
  }
}, [loading, docTypeData, reset, setAlertHandler]);

  const onSubmit = async (data: AddPlantFormInputs) => {
    try {
    
      // Send single object instead of array
      const docType = data.documentType?.[0]; // Get first (and only) document type
      const transformedData = {
        id: Number(docType.id),
        name: docType.name,
        subTypes: docType.subTypes?.map((subType) => ({
          id: subType.id ? Number(subType.id) : undefined, 
          name: subType.name,
          classifications: subType.classifications?.map((classification) => ({
            id: classification.id ? Number(classification.id) : undefined, 
            name: classification.name
          }))
        }))
      };

      const raw = transformedData;

      const response = await putData<any>(
        `document-types/${docTypeData.id}`,
        raw,
        setAlertHandler
      );

      if (response) {
        setClose(false);
        setAlertHandler({
          hasAlert: true,
          alertMessage: "Document Type updated successfully!",
          alertType: "success",
          alertTitle: "Success",
        });
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

 const routers = useRouter();

  const [additionalFields, setAdditionalFields] = useState([
    { id: 0, subType: [{ id: 0, classification: [{ id: 0,  }] }] },
  ]);


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
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
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

export default EditDocumentType;