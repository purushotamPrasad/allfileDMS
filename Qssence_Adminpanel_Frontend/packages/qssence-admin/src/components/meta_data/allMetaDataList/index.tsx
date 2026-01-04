"use client";
import React, { useEffect, useState } from "react";
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import { CommonDataGridAllMetaDataList } from "qssence-common";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import {
  AlertColor,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
  FormControl,
  InputLabel,
  Button,
  FormControlLabel,
  Checkbox,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Divider,
  DialogContentText,
} from "@mui/material";
import { GridRowModel } from "@mui/x-data-grid";
import { del, get, put, post, getData, postData } from "@/utils/ApiConfig";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IconMinus, IconPlus, IconEdit, IconTrash, IconX } from "@tabler/icons-react";

interface GroupData {
  id: string;
  name: string;
  description: string;
  groupsId: string;
  userIds: number[];
}

interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle?: string;
}

interface AddGroupFormInputs {
  name: string;
  description: string;
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

interface SavedMetaData {
  id: string;
  heading: string;
  fields: MetaDataField[];
  documentType: string;
  subType: string;
  classification: string;
  timestamp: Date;
}

interface MetaDataField {
  id: string;
  name: string;
  type: string;
  width: string;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  lineType?: string;
  options?: string[];
}

const AddGroupSchema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/,
      "Group name should contain only alphabets"
    )
    .required("Group name is required"),
  description: yup
    .string()
    .matches(
      /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/,
      "Description should contain only alphabets"
    )
    .required("Description is required"),
});
interface listProps {
  open: boolean;
  setTabData: any;
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
}

function AllMetaDataList({ setTabData, open, setAlertHandler }: listProps) {
  const routers = useRouter();
  const theme = useTheme();
  const [selectedRowArray, setSelectedRowArray] = React.useState<
    GridValidRowModel[]
  >([]);
  const [groupData, setGroupData] = useState<GroupData[]>([]);
  const [metadataList, setMetadataList] = useState<any[]>([]);

  const [showPopup, setShowPopup] = useState(false);
  const [savedMetaData, setSavedMetaData] = useState<SavedMetaData[]>(() => {
    // Load saved metadata from localStorage on component mount
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('savedMetaData');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [editingField, setEditingField] = useState<{metaDataId: string, fieldId: string, field: MetaDataField} | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{metaDataId: string, fieldId: string} | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);


  const [isloading, setIsLoading] = useState(true)
  // Remove duplicate loading state declaration (already declared elsewhere)

  // Form state for metadata
  const [metaDataHeading, setMetaDataHeading] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('metaDataHeading') || '';
    }
    return '';
  });
  const [dataFieldName, setDataFieldName] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('dataFieldName') || '';
    }
    return '';
  });
  const [selectedField, setSelectedField] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedField') || '';
    }
    return '';
  });
  const [fieldWidth, setFieldWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('fieldWidth') || '';
    }
    return '';
  });
  const [isRequired, setIsRequired] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('isRequired');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });
  const [minLength, setMinLength] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('minLength') || '';
    }
    return '';
  });
  const [maxLength, setMaxLength] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('maxLength') || '';
    }
    return '';
  });
  const [lineType, setLineType] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lineType') || '';
    }
    return '';
  });
  const [fieldOptions, setFieldOptions] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fieldOptions');
      return saved ? JSON.parse(saved) : [''];
    }
    return [''];
  });

  const [additionalFields, setAdditionalFields] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fieldOptions');
      const options = saved ? JSON.parse(saved) : [''];
      return options.map((_, index) => ({ id: index }));
    }
    return [{ id: 0 }];
  });

  // Document type state variables
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
  const [selectedDocumentType, setSelectedDocumentType] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedDocumentType') || '';
    }
    return '';
  });
  const [selectedSubType, setSelectedSubType] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedSubType') || '';
    }
    return '';
  });
  const [selectedClassification, setSelectedClassification] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedClassification') || '';
    }
    return '';
  });
  const [subTypes, setSubTypes] = useState<SubType[]>([]);
  const [classifications, setClassifications] = useState<Classification[]>([]);
  const [loading, setLoading] = useState(false);

  // Helper function to save metadata to localStorage
  const saveMetaDataToStorage = (data: SavedMetaData[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('savedMetaData', JSON.stringify(data));
    }
  };

  // Helper function to save form selections to localStorage
  const saveFormSelectionsToStorage = (documentType: string, subType: string, classification: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedDocumentType', documentType);
      localStorage.setItem('selectedSubType', subType);
      localStorage.setItem('selectedClassification', classification);
    }
  };

  // Helper function to save form fields to localStorage
  const saveFormFieldsToStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('metaDataHeading', metaDataHeading);
      localStorage.setItem('dataFieldName', dataFieldName);
      localStorage.setItem('selectedField', selectedField);
      localStorage.setItem('fieldWidth', fieldWidth);
      localStorage.setItem('isRequired', JSON.stringify(isRequired));
      localStorage.setItem('minLength', minLength);
      localStorage.setItem('maxLength', maxLength);
      localStorage.setItem('lineType', lineType);
      localStorage.setItem('fieldOptions', JSON.stringify(fieldOptions));
    }
  };

  const handleAddMore = () => {
    const newAdditionalFields = [
      ...additionalFields,
      { id: additionalFields.length},
    ];
    const newFieldOptions = [...fieldOptions, ''];
    setAdditionalFields(newAdditionalFields);
    setFieldOptions(newFieldOptions);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('fieldOptions', JSON.stringify(newFieldOptions));
    }
  };

 
  const handleRemoveMore = (deptIndex: number) => {
    const newAdditionalFields = additionalFields.filter((_, index) => index !== deptIndex);
    const newFieldOptions = fieldOptions.filter((_, index) => index !== deptIndex);
    
    setAdditionalFields(newAdditionalFields);
    setFieldOptions(newFieldOptions);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('fieldOptions', JSON.stringify(newFieldOptions));
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...fieldOptions];
    newOptions[index] = value;
    setFieldOptions(newOptions);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('fieldOptions', JSON.stringify(newOptions));
    }
  };

  const handleChange = (event) => {
    setSelectedField(event.target.value);
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedField', event.target.value);
    }
  };

  // Handle document type selection
  const handleDocumentTypeChange = (event) => {
    const selectedType = event.target.value;
    setSelectedDocumentType(selectedType);
    setSelectedSubType('');
    setSelectedClassification('');
    setClassifications([]);

    // Save to localStorage
    saveFormSelectionsToStorage(selectedType, '', '');

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
  const handleSubTypeChange = (event) => {
    const selectedSub = event.target.value;
    setSelectedSubType(selectedSub);
    setSelectedClassification('');

    // Save to localStorage
    saveFormSelectionsToStorage(selectedDocumentType, selectedSub, '');

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
  const handleClassificationChange = (event) => {
    const selectedClass = event.target.value;
    setSelectedClassification(selectedClass);

    // Save to localStorage
    saveFormSelectionsToStorage(selectedDocumentType, selectedSubType, selectedClass);
  };

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(AddGroupSchema),
    criteriaMode: "all",
    mode: "onChange",
    reValidateMode: "onChange",
    delayError: 100,
    defaultValues: {
      name: "",
      description: "",
    }, // Apply Yup validation schema
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get<any>(
          "/groups/getAll",
          {},
          "instance1",
          setAlertHandler
        );
        const formattedData = data.data.data.map((data: any, key: any) => {
          return {
            id: key + 1,
            groupsId: data.groupsId,
            name: data.name,
            description: data.description,
            userIds: data.userIds.length,
          };
        });
        console.log("formatedData", formattedData);
        setGroupData(formattedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [open]);

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

  // Fetch metadata list
  const fetchMetadataList = async () => {
    try {
      const response = await getData<any>(
        "/metadata/all",
        {},
        "instance1",
        setAlertHandler
      );
      
      if (response && response.data && response.data.data) {
        const data = response.data.data;
        const formattedData = data.map((item: any, index: number) => ({
          id: index + 1,
          headingName: item.headingName || 'N/A',
          fieldCount: item.metadataFields ? item.metadataFields.length : 0,
          documentType: item.documentTypeName || 'N/A',
          subType: item.subTypeName || 'N/A',
          classification: item.classificationName || 'N/A',
          metadataFields: item.metadataFields || []
        }));
        setMetadataList(formattedData);
        setIsLoading(false)
      }
    } catch (error) {
      console.log("Error fetching metadata list:", error);
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Failed to fetch metadata list",
        alertType: "error",
        alertTitle: "Error",
      });
    }
  };

  // Fetch metadata list on component mount
  useEffect(() => {
    if(isloading){
      fetchMetadataList();
    }

  }, [isloading]);

  const columnData: GridColDef[] = [
    {
      field: "id",
      headerName: "SL No.",
      type: "text",
      width: 100,
      align: "left",
      headerAlign: "left",
      editable: false,
    },
    {
      field: "headingName",
      headerName: "Heading Name",
      type: "text",
      width: 300,
      align: "left",
      headerAlign: "left",
      editable: false,
    },
    {
      field: "fieldCount",
      headerName: "No. of Fields",
      type: "number",
      width: 150,
      align: "left",
      headerAlign: "left",
      editable: false,
    },
    {
      field: "documentType",
      headerName: "Document Type",
      type: "text",
      width: 200,
      align: "left",
      headerAlign: "left",
      editable: false,
    },
    {
      field: "subType",
      headerName: "Sub Type",
      type: "text",
      width: 200,
      align: "left",
      headerAlign: "left",
      editable: false,
    },
    {
      field: "classification",
      headerName: "Classification",
      type: "text",
      width: 200,
      align: "left",
      headerAlign: "left",
      editable: false,
    },
  ];

  const putApi = async (newData: GridRowModel) => {
    try {
      let payload = {
        groupsId: newData.groupsId,
        name: newData.name,
        description: newData.description,
      };
      const response = await put(
        `/groups/update/${newData.groupsId}`,
        payload,
        setAlertHandler
      );
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Group details updated successfully.",
        alertType: "success",
        alertTitle: "Success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteApi = async (id: number) => {
    try {
      const response = await del(
        `groups/deleteGroup/${groupData[id - 1]?.groupsId}`,
        {},
        null,
        setAlertHandler
      );
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Group details deleted successfully.",
        alertType: "success",
        alertTitle: "Success",
      });
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  const getGroupApi = async (row: any) => {
    try {
      const data = await get<any>(
        `/groups/getById/${row.groupsId}`,
        {},
        "instance1",
        setAlertHandler
      );
      setTabData({ groupsId: row.groupsId, data });
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Get Group successfully.",
        alertType: "success",
        alertTitle: "Success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addGroupApi: SubmitHandler<AddGroupFormInputs> = async (data) => {
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

        // Fetch updated data immediately after adding a group
        const updatedData = await get<any>(
          "/groups/getAll",
          {},
          "instance1",
          setAlertHandler
        );
        const formattedData = updatedData.data.data.map((data: any) => {
          return {
            id: data.groupsId,
            name: data.name,
            description: data.description,
            userIds: data.userIds.length,
          };
        });
        setGroupData(formattedData);
      }
      reset();
    } catch (error) {
      console.log("Error adding group:", error);
    }
  };

  const handleSave = () => {
    if (!metaDataHeading.trim() || !dataFieldName.trim() || !selectedDocumentType || !selectedSubType || !selectedClassification) {
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Please select document type, subtype, classification and fill in all required fields",
        alertType: "error",
        alertTitle: "Validation Error",
      });
      return;
    }

    const newField: MetaDataField = {
      id: Date.now().toString(),
      name: dataFieldName,
      type: selectedField,
      width: fieldWidth,
      required: isRequired,
      minLength: minLength ? parseInt(minLength) : undefined,
      maxLength: maxLength ? parseInt(maxLength) : undefined,
      lineType: lineType || undefined,
      options: selectedField === "Dropdown List" || selectedField === "Checkbox" || selectedField === "Radio Button" 
        ? fieldOptions.filter(opt => opt.trim() !== '') 
        : undefined,
    };

    // Check if heading already exists
    const existingIndex = savedMetaData.findIndex(item => item.heading === metaDataHeading);
    
    if (existingIndex >= 0) {
      // Add field to existing heading
      const updatedData = [...savedMetaData];
      updatedData[existingIndex].fields.push(newField);
      setSavedMetaData(updatedData);
      saveMetaDataToStorage(updatedData);
    } else {
      // Create new heading with field
      const newMetaData: SavedMetaData = {
        id: Date.now().toString(),
        heading: metaDataHeading,
        fields: [newField],
        documentType: selectedDocumentType,
        subType: selectedSubType,
        classification: selectedClassification,
        timestamp: new Date(),
      };
      const newData = [...savedMetaData, newMetaData];
      setSavedMetaData(newData);
      saveMetaDataToStorage(newData);
    }

    // Reset form
    setDataFieldName('');
    setFieldWidth('');
    setIsRequired(false);
    setMinLength('');
    setMaxLength('');
    setLineType('');
    setFieldOptions(['']);
    setAdditionalFields([{ id: 0 }]);
  

    setAlertHandler({
      hasAlert: true,
      alertMessage: "Metadata saved successfully!",
      alertType: "success",
      alertTitle: "Success",
    });
  };

  const handleShow = () => {
    if (savedMetaData.length === 0) {
      setAlertHandler({
        hasAlert: true,
        alertMessage: "No saved metadata to show",
        alertType: "warning",
        alertTitle: "No Data",
      });
      return;
    }
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setEditingField(null);
    setDeleteConfirm(null);
    setIsEditMode(false);
  };

  const handleConfirmAndSubmit = async () => {
    try {
      // Transform saved metadata to API format
      const apiData = {
        documentTypeId: 1, // You may need to get actual IDs from your document types
        subTypeId: 1,      // You may need to get actual IDs from your subtypes
        classificationId: 1, // You may need to get actual IDs from your classifications
        headings: savedMetaData.map((metaData, index) => ({
          headingName: metaData.heading,
          fields: metaData.fields.map((field, fieldIndex) => {
            const fieldData: any = {
              fieldName: field.name,
              fieldType: getFieldTypeForAPI(field.type),
              width: getWidthValue(field.width),
              required: field.required,
              displayOrder: fieldIndex + 1
            };

            // Only add minLength if it's not null
            if (field.minLength !== null && field.minLength !== undefined) {
              fieldData.minLength = field.minLength;
            }

            // Only add maxLength if it's not null
            if (field.maxLength !== null && field.maxLength !== undefined) {
              fieldData.maxLength = field.maxLength;
            }

            // Only add selectLine if it's not null
            if (field.lineType) {
              fieldData.selectLine = field.lineType;
            }

            // Only add options if it's not null
            if (field.options && field.options.length > 0) {
              fieldData.options = field.options.join(',');
            }

            return fieldData;
          })
        }))
      };

      const response = await postData("/metadata/bulk-create", apiData, setAlertHandler);
      
      if (response.status === 201 || response.status === 200) {
        setAlertHandler({
          hasAlert: true,
          alertMessage: "Metadata submitted successfully!",
          alertType: "success",
          alertTitle: "Success",
        });

        setIsLoading(true)

        if (typeof window !== 'undefined') {
          localStorage.removeItem('savedMetaData');
          localStorage.removeItem('selectedDocumentType');
          localStorage.removeItem('selectedSubType');
          localStorage.removeItem('selectedClassification');
          localStorage.removeItem('metaDataHeading');
          localStorage.removeItem('dataFieldName');
          localStorage.removeItem('selectedField');
          localStorage.removeItem('fieldWidth');
          localStorage.removeItem('isRequired');
          localStorage.removeItem('minLength');
          localStorage.removeItem('maxLength');
          localStorage.removeItem('lineType');
          localStorage.removeItem('fieldOptions');
        }
        setSavedMetaData([]);
        setSelectedDocumentType('');
        setSelectedSubType('');
        setSelectedClassification('');
        setSubTypes([]);
        setClassifications([]);
        setMetaDataHeading('');
        setDataFieldName('');
        setSelectedField('');
        setFieldWidth('');
        setIsRequired(false);
        setMinLength('');
        setMaxLength('');
        setLineType('');
        setFieldOptions(['']);
        setAdditionalFields([{ id: 0 }]);

        // Close popup after successful submission
        setShowPopup(false);
      }
      
    } catch (error) {
      console.error(error);
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Failed to submit metadata. Please try again.",
        alertType: "error",
        alertTitle: "Error",
      });
    }
  };

  const getFieldTypeForAPI = (fieldType: string): string => {
    switch (fieldType) {
      case "Text Field":
        return "TEXT";
      case "Numeric Field":
        return "NUMERIC";
      case "Date Field":
        return "DATE";
      case "Dropdown List":
        return "DROPDOWN";
      case "Checkbox":
        return "CHECKBOX";
      case "Radio Button":
        return "RADIO";
      case "File Upload Field":
        return "FILE_UPLOAD";
      case "Hyperlink Field":
        return "HYPERLINK";
      default:
        return "TEXT";
    }
  };

  const getWidthValue = (width: string): string => {
    switch (width) {
      case "One-fourth Width":
        return "ONE_FOURTH";
      case "Half Width":
        return "HALF";
      case "Full Width":
        return "FULL";
    }
  };

  const handleEditField = (metaDataId: string, fieldId: string, field: MetaDataField) => {
    setEditingField({ metaDataId, fieldId, field });
    setIsEditMode(true);
    
    // Close the show popup
    setShowPopup(false);
    
    // Populate form with field data - Set heading to "General" when editing
    setMetaDataHeading("General");
    setDataFieldName(field.name);
    setSelectedField(field.type);
    setFieldWidth(field.width);
    setIsRequired(field.required);
    setMinLength(field.minLength?.toString() || '');
    setMaxLength(field.maxLength?.toString() || '');
    setLineType(field.lineType || '');
    setFieldOptions(field.options || ['']);
    setAdditionalFields(field.options ? field.options.map((_, index) => ({ id: index })) : [{ id: 0 }]);
  };

  const handleDeleteField = (metaDataId: string, fieldId: string) => {
    setDeleteConfirm({ metaDataId, fieldId });
  };

  const confirmDeleteField = () => {
    if (deleteConfirm) {
      const updatedMetaData = savedMetaData.map(metaData => {
        if (metaData.id === deleteConfirm.metaDataId) {
          return {
            ...metaData,
            fields: metaData.fields.filter(field => field.id !== deleteConfirm.fieldId)
          };
        }
        return metaData;
      }).filter(metaData => metaData.fields.length > 0); // Remove empty metadata groups

      setSavedMetaData(updatedMetaData);
      saveMetaDataToStorage(updatedMetaData);
      setDeleteConfirm(null);
      
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Field deleted successfully!",
        alertType: "success",
        alertTitle: "Success",
      });
    }
  };

  const cancelDeleteField = () => {
    setDeleteConfirm(null);
  };

  const handleConfirmEdit = () => {
    if (editingField) {
      // Update the field in the saved metadata
      const updatedMetaData = savedMetaData.map(metaData => {
        if (metaData.id === editingField.metaDataId) {
          return {
            ...metaData,
            fields: metaData.fields.map(field => 
              field.id === editingField.fieldId 
                ? {
                    ...field,
                    name: dataFieldName,
                    type: selectedField,
                    width: fieldWidth,
                    required: isRequired,
                    minLength: minLength ? parseInt(minLength) : undefined,
                    maxLength: maxLength ? parseInt(maxLength) : undefined,
                    lineType: lineType || undefined,
                    options: selectedField === "Dropdown List" || selectedField === "Checkbox" || selectedField === "Radio Button" 
                      ? fieldOptions.filter(opt => opt.trim() !== '') 
                      : undefined,
                  }
                : field
            )
          };
        }
        return metaData;
      });

      setSavedMetaData(updatedMetaData);
      saveMetaDataToStorage(updatedMetaData);
      setEditingField(null);
      setIsEditMode(false);
      
      // Reset form
      setMetaDataHeading('');
      setDataFieldName('');
      setSelectedField('');
      setFieldWidth('');
      setIsRequired(false);
      setMinLength('');
      setMaxLength('');
      setLineType('');
      setFieldOptions(['']);
      setAdditionalFields([{ id: 0 }]);

      setAlertHandler({
        hasAlert: true,
        alertMessage: "Field updated successfully!",
        alertType: "success",
        alertTitle: "Success",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setIsEditMode(false);
    
    // Reset form
    setMetaDataHeading('');
    setDataFieldName('');
    setSelectedField('');
    setFieldWidth('');
    setIsRequired(false);
    setMinLength('');
    setMaxLength('');
    setLineType('');
    setFieldOptions(['']);
    setAdditionalFields([{ id: 0 }]);
  };

  const handleReset = () => {
    if (editingField) {
      // Delete the field from saved metadata
      const updatedMetaData = savedMetaData.map(metaData => {
        if (metaData.id === editingField.metaDataId) {
          return {
            ...metaData,
            fields: metaData.fields.filter(field => field.id !== editingField.fieldId)
          };
        }
        return metaData;
      }).filter(metaData => metaData.fields.length > 0); // Remove empty metadata groups

      setSavedMetaData(updatedMetaData);
      saveMetaDataToStorage(updatedMetaData);
      setEditingField(null);
      setIsEditMode(false);
      
      // Reset form
      setMetaDataHeading('');
      setDataFieldName('');
      setSelectedField('');
      setFieldWidth('');
      setIsRequired(false);
      setMinLength('');
      setMaxLength('');
      setLineType('');
      setFieldOptions(['']);
      setAdditionalFields([{ id: 0 }]);

      setAlertHandler({
        hasAlert: true,
        alertMessage: "Field deleted successfully!",
        alertType: "success",
        alertTitle: "Success",
      });
    }
  };

  return (
    <>
      <Box style={{paddingInline:"20px"}}>
      <Grid container spacing={3} style={{marginTop:"0px"}}>
        <Grid item xs={12} md={4}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Select document type</InputLabel>
            <Select value={selectedDocumentType} onChange={handleDocumentTypeChange} disabled={loading}>
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
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Select document subtype</InputLabel>
            <Select value={selectedSubType} onChange={handleSubTypeChange} disabled={loading}>
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
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Select classification</InputLabel>
            <Select value={selectedClassification} onChange={handleClassificationChange} disabled={loading}>
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
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={3} style={{marginTop:"0px"}}>
        <Grid item xs={12}>
          <Typography variant="h6" fontSize={18} fontWeight={600} gutterBottom>
            Add Meta Data Heading & Data Field
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl variant="outlined" fullWidth>
            <TextField 
              label="Enter MetaData Heading" 
              value={metaDataHeading}
              onChange={(e) => {
                setMetaDataHeading(e.target.value);
                if (typeof window !== 'undefined') {
                  localStorage.setItem('metaDataHeading', e.target.value);
                }
              }}
            />
          </FormControl>
        </Grid>
        </Grid>
        

        <Grid container spacing={3} style={{marginTop:"0px"}}>
        <Grid item xs={12} md={4}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Select Type (Attributes)</InputLabel>
              <Select  value={selectedField}
               onChange={handleChange}>
              
                <MenuItem value="Text Field">Text Field</MenuItem>
                <MenuItem value="Numeric Field">Numeric Field</MenuItem>
                <MenuItem value="Date Field">Date Field</MenuItem>
                <MenuItem value="Dropdown List">Dropdown List</MenuItem>
                <MenuItem value="Checkbox">Checkbox</MenuItem>
                <MenuItem value="Radio Button">Radio Button</MenuItem>
                <MenuItem value="File Upload Field">File Upload Field</MenuItem>
                <MenuItem value="Hyperlink Field">Hyperlink Field</MenuItem>
         
              </Select>
            </FormControl>
          </Grid>
           
        <Grid item xs={12} md={4}>
          <FormControl variant="outlined" fullWidth>
            <TextField 
              label="Enter Data Field Name" 
              value={dataFieldName}
              onChange={(e) => {
                setDataFieldName(e.target.value);
                if (typeof window !== 'undefined') {
                  localStorage.setItem('dataFieldName', e.target.value);
                }
              }}
            />
          </FormControl>
        </Grid>

       {selectedField==="Text Field" && 
        <Grid item xs={12} md={4}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Select Line</InputLabel>
          <Select value={lineType} onChange={(e) => {
            setLineType(e.target.value);
            if (typeof window !== 'undefined') {
              localStorage.setItem('lineType', e.target.value);
            }
          }}>
            <MenuItem value="Single line">Single Line</MenuItem>
            <MenuItem value="Multi line">Multi Line</MenuItem>
          </Select>
        </FormControl>
      </Grid>
       
       }

      {(selectedField==="Numeric Field" || selectedField==="Text Field") && 
      <>
      <Grid item xs={12} md={4}>
      <FormControl variant="outlined" fullWidth>
        <TextField 
          label="Enter Min Length" 
          type="number" 
          value={minLength}
          onChange={(e) => {
            setMinLength(e.target.value);
            if (typeof window !== 'undefined') {
              localStorage.setItem('minLength', e.target.value);
            }
          }}
        />
      </FormControl>
    </Grid>

      <Grid item xs={12} md={4}>
      <FormControl variant="outlined" fullWidth>
        <TextField 
          label="Enter Max Length" 
          type="number" 
          value={maxLength}
          onChange={(e) => {
            setMaxLength(e.target.value);
            if (typeof window !== 'undefined') {
              localStorage.setItem('maxLength', e.target.value);
            }
          }}
        />
      </FormControl>
      </Grid>
      </>
      
      } 

   {selectedField === "Dropdown List" && 
        additionalFields.map((documentType, deptIndex) => (
        
     
              <Grid item xs={12} md={3} key={deptIndex}>
                <Box
                  style={{
                    display: 'flex',
                    gridColumnGap: '10px',
                  }}
                >
    
                
                 
                </Box>
                
                <Box style={{display:"flex", gridColumnGap:"10px", alignItems:"center"}}>
                <FormControl variant="outlined" fullWidth>
                <TextField   
                  value={fieldOptions[deptIndex] || ''}
                  onChange={(e) => handleOptionChange(deptIndex, e.target.value)}
                  label="Enter List Name" 
                />
                </FormControl>
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
        
     
              <Grid item xs={12} md={3} key={deptIndex}>
                <Box
                  style={{
                    display: 'flex',
                    gridColumnGap: '10px',
                  }}
                >
                
                </Box>
                
                <Box style={{display:"flex", gridColumnGap:"10px", alignItems:"center"}}>
                <FormControl variant="outlined" fullWidth>
                <TextField   
                  value={fieldOptions[deptIndex] || ''}
                  onChange={(e) => handleOptionChange(deptIndex, e.target.value)}
                  label="Enter Checkbox Label Name" 
                />
                </FormControl>
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
        
              <Grid item xs={12} md={3} key={deptIndex}>
                <Box
                  style={{
                    display: 'flex',
                    gridColumnGap: '10px',
                  }}
                > 
                </Box>
                
                <Box style={{display:"flex", gridColumnGap:"10px", alignItems:"center"}}>
                <FormControl variant="outlined" fullWidth>
                <TextField   
                  value={fieldOptions[deptIndex] || ''}
                  onChange={(e) => handleOptionChange(deptIndex, e.target.value)}
                  label="Enter Radio Label Name" 
                />
                </FormControl>
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

      <Grid item xs={12} md={4}>
         <FormControl variant="outlined" fullWidth>
          <InputLabel>Select Width</InputLabel>
          <Select value={fieldWidth} onChange={(e) => {
            setFieldWidth(e.target.value);
            if (typeof window !== 'undefined') {
              localStorage.setItem('fieldWidth', e.target.value);
            }
          }}>
            <MenuItem value="One-fourth Width">One-fourth Width</MenuItem>
            <MenuItem value="Half Width">Half Width</MenuItem>
            <MenuItem value="Full Width">Full Width</MenuItem>
          </Select>
         </FormControl>
      </Grid>
         
      </Grid>
  
          <Box  style={{display:"flex", gridColumnGap:"10px", justifyContent:"flex-end", padding:"20px 0px 30px"}}>
          <FormControlLabel 
            control={<Checkbox checked={isRequired} onChange={(e) => {
              setIsRequired(e.target.checked);
              if (typeof window !== 'undefined') {
                localStorage.setItem('isRequired', JSON.stringify(e.target.checked));
              }
            }} />} 
            label="Required" 
          />
            {!isEditMode ? (
              <>
                <Button
                  style={{
                    backgroundColor: "#23608E",
                    color: "#fff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button
                  style={{
                    backgroundColor: "#28a745",
                    color: "#fff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={handleShow}
                >
                  Show
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handleReset}
                  color="inherit"
                >
                  Reset
                </Button>
                <Button
                  style={{
                    backgroundColor: "#23608E",
                    color: "#fff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={handleConfirmEdit}
                >
                  Save
                </Button>
              </>
            )}
          </Box>
          </Box>
  
          <Box style={{padding:"1rem"}}>
 
       <CommonDataGridAllMetaDataList
         rowData={metadataList}
         columnData={columnData}
         setSelectedRowArray={setSelectedRowArray}
         putApi={putApi}
         deleteApi={deleteApi}
         getById={getGroupApi}
       />
 
       </Box>

      {/* Show Popup */}
      <Dialog 
        open={showPopup} 
        onClose={handleClosePopup}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={600}>
            Save Metadata
          </Typography>
          <IconButton onClick={handleClosePopup} size="small">
            <IconX />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {savedMetaData.length === 0 ? (
            <Typography>No saved metadata found.</Typography>
          ) : (
            savedMetaData.map((metaData, index) => (
              <Paper key={metaData.id} style={{ marginBottom: '20px', padding: '20px' }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {metaData.heading}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Document Type: {metaData.documentType || 'Not selected'} | Sub Type: {metaData.subType || 'Not selected'} | Classification: {metaData.classification || 'Not selected'}
                </Typography>
                <Divider style={{ margin: '10px 0' }} />
                <Grid container spacing={2}>
                  {metaData.fields.map((field, fieldIndex) => (
                    <Grid item xs={12} key={field.id}>
                      <Box style={{ 
                        border: '1px solid #e0e0e0', 
                        borderRadius: '8px', 
                        padding: '15px',
                        backgroundColor: '#f9f9f9',
                        position: 'relative'
                      }}>
                        <Box style={{ 
                          position: 'absolute', 
                          top: '10px', 
                          right: '10px', 
                          display: 'flex', 
                          gap: '8px' 
                        }}>
                          <IconEdit
                            style={{ cursor: 'pointer' }}
                            size={20}
                            color="#0B4A6F"
                            onClick={() => handleEditField(metaData.id, field.id, field)}
                          />
                          <IconTrash
                            style={{ cursor: 'pointer' }}
                            size={20}
                            color="#0B4A6F"
                            onClick={() => handleDeleteField(metaData.id, field.id)}
                          />
                        </Box>
                        <Typography variant="subtitle1" fontWeight={500}>
                          {field.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Type: {field.type}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Width: {field.width}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Required: {field.required ? 'Yes' : 'No'}
                        </Typography>
                        {field.minLength !== undefined && field.minLength !== null && (
                          <Typography variant="body2" color="textSecondary">
                            Min Length: {field.minLength}
                          </Typography>
                        )}
                        {field.maxLength !== undefined && field.maxLength !== null && (
                          <Typography variant="body2" color="textSecondary">
                            Max Length: {field.maxLength}
                          </Typography>
                        )}
                        {field.lineType && (
                          <Typography variant="body2" color="textSecondary">
                            Line Type: {field.lineType}
                          </Typography>
                        )}
                        {field.options && field.options.length > 0 && (
                          <Typography variant="body2" color="textSecondary">
                            Options: {field.options.join(', ')}
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            ))
          )}
        </DialogContent>
        <DialogActions style={{ padding: '20px' }}>
          <Button onClick={handleClosePopup} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleConfirmAndSubmit} color="primary" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirm !== null}
        onClose={cancelDeleteField}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this field?.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDeleteField} color="inherit">
            Cancel
          </Button>
          <Button onClick={confirmDeleteField} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>


    </>
  );
}
export default AllMetaDataList;

/* <br />
            <FormControlLabel control={<Checkbox />} label="Show in Form" />*/
