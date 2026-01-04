"use client";
import {
  AlertColor,
  Button,
  Grid,
  Typography,
  FormHelperText,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  Box,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { post, getData } from "@/utils/ApiConfig"; // Assuming post function is defined correctly
import ColorIconUpload from "@/components/Icons/ColorIconUpload";
import { useMediaQuery } from "@mui/material";
import { IconX } from "@tabler/icons-react";

interface AddTemplateFormInputs {
  documenttype: string;
  documentSubtype: string;
  classification: string;
  documentFile: File | null;
}

interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle: string | undefined; 
}

// Document type interfaces
interface DocumentType {
  id: string;
  name: string;
  subTypes: SubType[];
}

interface SubType {
  id: string;
  name: string;
  classifications: Classification[];
}

interface Classification {
  id: string;
  name: string;
}

interface addTemplateProps {
  setClose: Dispatch<SetStateAction<boolean>>;
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
}

function AddTemplate({ setClose, setAlertHandler }: addTemplateProps) {
  const AddUserSchema = yup.object().shape({
    documenttype: yup.string().required("Document type is required"),
    documentSubtype: yup.string().required("Document subtype is required"),
    classification: yup.string().required("Classification is required"),
    documentFile: yup
      .mixed()
      .required("Document file is required")
      .test("fileType", "Only PDF files are allowed", (value) => {
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

  // Document type state variables
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
  const [selectedDocumentType, setSelectedDocumentType] = useState<string>('');
  const [selectedSubType, setSelectedSubType] = useState<string>('');
  const [selectedClassification, setSelectedClassification] = useState<string>('');
  const [subTypes, setSubTypes] = useState<SubType[]>([]);
  const [classifications, setClassifications] = useState<Classification[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch document types from API
  const fetchDocumentTypes = async () => {
    setLoading(true);
    try {
      const response = await getData<any>(
        "/document-types/all",
        {},
        "instance1",
        setAlertHandler
      );
      
      if (response && response.data && response.data.data) {
        const data = response.data.data;
        const formattedData = data.map((docType: any) => ({
          id: docType.id || docType._id,
          name: docType.name,
          subTypes: Array.isArray(docType.subTypes) 
            ? docType.subTypes.map((sub: any) => ({
                id: sub.id || sub._id,
                name: sub.name,
                classifications: Array.isArray(sub.classifications)
                  ? sub.classifications.map((cls: any) => ({
                      id: cls.id || cls._id,
                      name: typeof cls === 'string' ? cls : cls.name
                    }))
                  : []
              }))
            : []
        }));
        setDocumentTypes(formattedData);
      }
    } catch (error) {
      console.log("Error fetching document types:", error);
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Failed to fetch document types",
        alertType: "error",
        alertTitle: "Error",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: AddTemplateFormInputs) => {
    try {
      // Get the IDs for the selected document type, subtype, and classification
      const selectedDocType = documentTypes.find(dt => dt.name === data.documenttype);
      const selectedSubType = subTypes.find(st => st.name === data.documentSubtype);
      const selectedClass = classifications.find(cls => cls.name === data.classification);

      if (!selectedDocType || !selectedSubType || !selectedClass || !data.documentFile) {
        setAlertHandler({
          hasAlert: true,
          alertMessage: "Please fill in all required fields and select a file",
          alertType: "error",
          alertTitle: "Validation Error",
        });
        return;
      }

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("documentTypeId", selectedDocType.id);
      formData.append("subTypeId", selectedSubType.id);
      formData.append("classificationId", selectedClass.id);
      formData.append("templateName", data.documentFile, data.documentFile.name);

      const response = await post<any>(
        "/templates/upload",
        formData,
        setAlertHandler
      );

      if (response.status === 200 || response.status === 201) {
        setAlertHandler({
          hasAlert: true,
          alertMessage: "Template uploaded successfully!",
          alertType: "success",
          alertTitle: "Success",
        });
        setClose(false);
        reset(); // Reset form
        setFilePreview(null);
        setFileType(null);
        setSelectedDocumentType('');
        setSelectedSubType('');
        setSelectedClassification('');
        setSubTypes([]);
        setClassifications([]);
      }
    } catch (error) {
      console.log("Error uploading template:", error);
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Failed to upload template. Please try again.",
        alertType: "error",
        alertTitle: "Error",
      });
    }
  };



  // Handle document type selection
  const handleDocumentTypeChange = (event: any, onChange: any) => {
    const selectedType = event.target.value;
    setSelectedDocumentType(selectedType);
    setSelectedSubType('');
    setSelectedClassification('');
    setClassifications([]);
    onChange(event); // Update form control

    if (selectedType) {
      const docType = documentTypes.find(dt => dt.name === selectedType);
      if (docType && docType.subTypes) {
        setSubTypes(docType.subTypes);
      } else {
        setSubTypes([]);
      }
    } else {
      setSubTypes([]);
    }
  };

  // Handle sub type selection
  const handleSubTypeChange = (event: any, onChange: any) => {
    const selectedSub = event.target.value;
    setSelectedSubType(selectedSub);
    setSelectedClassification('');
    setClassifications([]);
    onChange(event); // Update form control

    if (selectedSub) {
      const subType = subTypes.find(st => st.name === selectedSub);
      if (subType && subType.classifications) {
        setClassifications(subType.classifications);
      } else {
        setClassifications([]);
      }
    } else {
      setClassifications([]);
    }
  };

  // Handle classification selection
  const handleClassificationChange = (event: any, onChange: any) => {
    const selectedClass = event.target.value;
    setSelectedClassification(selectedClass);
    onChange(event); // Update form control
  };

  // Fetch document types on component mount
  useEffect(() => {
    fetchDocumentTypes();
  }, []);

  // Restore subTypes and classifications when document types are loaded and we have saved selections
  useEffect(() => {
    if (documentTypes.length > 0 && selectedDocumentType) {
      const docType = documentTypes.find(dt => dt.name === selectedDocumentType);
      if (docType && docType.subTypes) {
        setSubTypes(docType.subTypes);
        
        // If we have a saved subType, also restore classifications
        if (selectedSubType) {
          const subType = docType.subTypes.find(st => st.name === selectedSubType);
          if (subType && subType.classifications) {
            setClassifications(subType.classifications);
          }
        }
      }
    }
  }, [documentTypes, selectedDocumentType, selectedSubType]);



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setFilePreview(fileReader.result as string); 
        setFileType(file.type); 
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
        onSubmit={handleSubmit(onSubmit)}
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
                      disabled={loading}
                      onChange={(e) => handleDocumentTypeChange(e, field.onChange)}
                    >
                      <MenuItem value="">Select Document Type</MenuItem>
                      {loading ? (
                        <MenuItem value="Loading...">Loading Document Types...</MenuItem>
                      ) : (
                        documentTypes.map((docType) => (
                          <MenuItem key={docType.id} value={docType.name}>
                            {docType.name}
                          </MenuItem>
                        ))
                      )}
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
                      disabled={loading || !selectedDocumentType}
                      onChange={(e) => handleSubTypeChange(e, field.onChange)}
                    >
                      <MenuItem value="">Select Document Subtype</MenuItem>
                      {loading ? (
                        <MenuItem value="Loading...">Loading Subtypes...</MenuItem>
                      ) : (
                        subTypes.map((subType) => (
                          <MenuItem key={subType.id} value={subType.name}>
                            {subType.name}
                          </MenuItem>
                        ))
                      )}
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
              rules={{ required: "Classification is required" }}
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
                      disabled={loading || !selectedSubType}
                      onChange={(e) => handleClassificationChange(e, field.onChange)}
                    >
                      <MenuItem value="">Select Classification</MenuItem>
                      {loading ? (
                        <MenuItem value="Loading...">Loading Classifications...</MenuItem>
                      ) : (
                        classifications.map((classification) => (
                          <MenuItem key={classification.id} value={classification.name}>
                            {classification.name}
                          </MenuItem>
                        ))
                      )}
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
              Select Template
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
                  id="documentFile"
                  accept=".pdf,.docx,.doc"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    field.onChange(e.target.files[0]); 
                    handleFileChange(e); 
                  }}
                />

                <label htmlFor="documentFile">
                  <div
                    style={{
                      marginTop:"10px",
                      border: "1px solid lightgray",
                      padding: "30px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                {filePreview && fileType === "application/pdf" ? (
                  <div>
               <embed src={filePreview}  type="application/pdf" />
              </div>
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

export default AddTemplate;