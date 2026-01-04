"use client";
import React, { useEffect, useState, useRef } from "react";
import { GridColDef, GridValidRowModel, GridRowModel } from "@mui/x-data-grid";
import { CommonDataGridDocument, CommonDialogPlants } from "qssence-common";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { AlertColor, useTheme } from "@mui/material";
import { del, delData, get, getData, put } from "@/utils/ApiConfig/index";
import { IconFileText, IconEye, IconInputSearch, IconArticle, IconEdit, IconTrash } from "@tabler/icons-react";
import { Card, CardContent, Typography, Divider } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import EditDocumentType from "../editDocumentType/page";


interface UserData {
  id: string;
  plantName: string;
  divisions: string;
  locations: string;
}

interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle?: string;
}

interface listProps {
  open: boolean;
  setTabData: any;
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
  refreshTrigger?: boolean;
  loadingData: boolean;
}

function AllDocumentDataList({ setTabData, open, setAlertHandler, refreshTrigger, loadingData }: listProps) {
  const router = useRouter();
  const theme = useTheme();
  const [selectedRowArray, setSelectedRowArray] = React.useState<
    GridValidRowModel[]
  >([]);
  const [userData, setUserData] = useState<UserData[]>([]);
  const [params, setparams] = useState({});

  // Dialog state
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState<any>(null);

  const [openEditDialogBox, setOpenEditDialogBox] = useState(false);

  const [documentTypeOptions, setDocumentTypeOptions] = useState<{ id: string; value: string; label: string }[]>([]);
  const [subTypeOptionsMap, setSubTypeOptionsMap] = useState<Record<string, { value: string; label: string }[]>>({});
  const [classificationOptionsMap, setClassificationOptionsMap] = useState<Record<string, { value: string; label: string }[]>>({});
  const [selectedDocType, setSelectedDocType] = useState(null);

  const [loading, setLoading] = useState(true);
  const prevRefreshTriggerRef = useRef(refreshTrigger);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData<any>(
          "/document-types/all",
          {},
          "instance1",
          setAlertHandler
        );
        const data = response.data.data;

        const docTypeOpts: { id: string; value: string; label: string }[] = [];
        const subTypeMap: Record<string, { value: string; label: string }[]> = {};
        const classMap: Record<string, { value: string; label: string }[]> = {};
        if (Array.isArray(data)) {
          data.forEach((docType: any) => {
            if (docType.name) {
              docTypeOpts.push({ id: docType.id || docType._id || docType.name, value: docType.name, label: docType.name });
              if (Array.isArray(docType.subTypes)) {
                subTypeMap[docType.name] = docType.subTypes.map((sub: any) => ({ value: sub.name, label: sub.name }));
                docType.subTypes.forEach((sub: any) => {
                  if (Array.isArray(sub.classifications)) {
                    classMap[sub.name] = sub.classifications.map((cls: any) =>
                      typeof cls === "string" ? { value: cls, label: cls } : { value: cls.name || cls.value || cls.label, label: cls.name || cls.label || cls.value }
                    );
                  }
                });
              }
            }
          });
        }
        setDocumentTypeOptions(docTypeOpts);
        setSubTypeOptionsMap(subTypeMap);
        setClassificationOptionsMap(classMap);
        setUserData(data); 
        setLoading(false)// If you still need userData for other logic
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    if(loading || loadingData)
    {
      fetchData();
    }
  
  }, [loading]);

  // Detect when add dialog closes and refresh data
  useEffect(() => {
    // Only trigger refresh when refreshTrigger changes from true to false (dialog closes)
    if (prevRefreshTriggerRef.current === true && refreshTrigger === false && !loading) {
      console.log("Add dialog closed, triggering refresh");
      setLoading(true);
    }
    // Update the ref to current value
    prevRefreshTriggerRef.current = refreshTrigger;
  }, [refreshTrigger, loading]);



  const handleEdit = (docType: { id: string; value: string; label: string; }) => {
    setSelectedDocType(docType);
    setOpenEditDialogBox(true);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialogBox(false);
    setSelectedDocType(null);
    // Refresh data when edit dialog closes
    setLoading(true);
  };

  const handleDelete = (docType: { id: string; value: string; label: string; }) => {
    // Direct delete without confirmation
    handleDeleteData(docType.id);
  };

const handleDeleteData = async (id) => {

  try {
    await delData(
      `/document-types/${id}`,
      {},
      null,
      setAlertHandler
    );
    setAlertHandler({
      hasAlert: true,
      alertMessage: "Document type deleted successfully.",
      alertType: "success",
      alertTitle: "Success",
    });
    setSelectedDocType(null);
    setLoading(true)

  } catch (error) {
    setAlertHandler({
      hasAlert: true,
      alertMessage: "Failed to delete document type.",
      alertType: "error",
      alertTitle: "Error",
    });
    console.log("Error deleting document type:", error);
  }
};

  return (
    <>
      <Grid container spacing={3} justifyContent="flex-start">
        {documentTypeOptions.map(type => {
          const subTypes = subTypeOptionsMap[type.value] || [];
       
          const showViewMore = subTypes.length > 2 || subTypes.some(sub => (classificationOptionsMap[sub.value] || []).length > 2);
          return (
            <Grid item xs={12} sm={6} md={4} lg={4} key={type.value}>
              <Card sx={{ boxShadow: 0, border: '1px solid #d2d2d2', borderRadius: 3, p: 1, background: '#fafafa', height: '100%' }}>
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography  sx={{ color: '#0B4A6F', fontWeight: 600, fontSize:"16px" }}>
                      Document Type: <span style={{ color: '#222', fontWeight: 600, fontSize:"16px" }}>{type.label}</span>
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconEdit
                        style={{ cursor: 'pointer' }}
                        size={20}
                       color="#0B4A6F"
                        onClick={() => handleEdit(type)}
                      />
                      <IconTrash
                        style={{ cursor: 'pointer' }}
                        size={20}
                        color="#0B4A6F"
                        onClick={() => handleDelete(type)}
                      />
                    </Box>
                  </Box>
                  {(subTypes.slice(0, 2)).map((sub, idx, arr) => (
                    <Box key={sub.value} mb={arr.length - 1 === idx ? 0 : 2}>
                      <Typography variant="subtitle1" sx={{fontWeight: 600, fontSize:"14px", color: '#0B4A6F', mb: 0.5 }}>
                        Sub Type: <span style={{ color: '#333', fontWeight: 600, fontSize:"14px" }}>{sub.label}</span>
                      </Typography>
                      <Typography  sx={{fontWeight: 600, fontSize:"14px",  color: '#0B4A6F', mb: 0.5 }}>
                        Classification:
                      </Typography>
                      <Box sx={{ background: '#f1f5fa', borderRadius: 1, p: 1, mb: 1 }}>
                        {(classificationOptionsMap[sub.value] || []).slice(0, 2).map(cls => (
                          <Typography key={cls.value} sx={{ color: '#222', fontWeight: 400, pl: 1 }}>
                            • {cls.label}
                          </Typography>
                        ))}
                        {(classificationOptionsMap[sub.value] || []).length > 2 && (
                          <Typography variant="body2" sx={{ color: '#888', fontStyle: 'italic', pl: 1 }}>
                            ...
                          </Typography>
                        )}
                      </Box>
                      {arr.length - 1 !== idx && <Divider sx={{ my: 1 }} />}
                    </Box>
                  ))}
                  {showViewMore && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 'auto' }}>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ mt: 2 }}
                        onClick={() => {
                          setDialogData({
                            type: type.label,
                            subTypes: subTypes.map(sub => ({
                              label: sub.label,
                              classifications: classificationOptionsMap[sub.value] || []
                            }))
                          });
                          setOpenDialog(true);
                        }}
                      >
                        View More
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
 
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle style={{color: '#0B4A6F', fontWeight: 600, fontSize:"16px"}}>Document Type - <span  style={{color:"#000"}}>{dialogData?.type}</span></DialogTitle>
        <DialogContent dividers>
          {dialogData?.subTypes?.map((sub: any, idx: number) => (
            <Box key={sub.label} mb={2}>
              <Typography variant="subtitle1" sx={{fontWeight: 600, fontSize:"14px", color: '#0B4A6F', mb: 0.5 }}>
                Sub Type: <span style={{ color: '#333', fontWeight: 600 }}>{sub.label}</span>
              </Typography>
              <Typography  sx={{fontWeight: 600, fontSize:"14px",  color: '#0B4A6F', mb: 0.5 }}>
                Classification:
              </Typography>
              <Box sx={{ background: '#f1f5fa', borderRadius: 1, p: 1, mb: 1 }}>
                {sub.classifications.map((cls: any) => (
                  <Typography key={cls.value}  sx={{ color: '#222', fontWeight: 400, pl: 1 }}>
                    • {cls.label}
                  </Typography>
                ))}
              </Box>
              {idx !== dialogData.subTypes.length - 1 && <Divider sx={{ my: 1 }} />}
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>


      {openEditDialogBox && (
                <CommonDialogPlants
                  buttonText={null}
                  dialogTitle={"Edit Document Type"}
                  dialogContent={
                    <EditDocumentType
                      setClose={handleEditDialogClose}
                      setAlertHandler={setAlertHandler}
                      docTypeData={selectedDocType}
                    />
                  }
                  onSave={() => {
                    console.log("save");
                  }}
                  open={openEditDialogBox}
                  setOpen={setOpenEditDialogBox}
                />
              )}


    </>
  );
}

export default AllDocumentDataList;
