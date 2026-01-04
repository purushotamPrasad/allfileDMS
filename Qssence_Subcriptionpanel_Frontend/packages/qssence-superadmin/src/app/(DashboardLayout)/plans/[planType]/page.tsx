"use client"

import { PageContainer, CardContainer, CustomTextField, AlertHandler, PrimarySelectField } from "qssence-common";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Container,
  Box,
  Grid,
  Button,
  InputAdornment,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
} from '@mui/material';
import { IconCheckbox, IconCross, IconDeviceFloppy, IconEdit, IconPencil, IconSearch, IconTrash } from "@tabler/icons-react";
import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { get, post, put } from "@/utils/ApiConfig";
import { AlertColor } from "@mui/material";
import { IconX } from "@tabler/icons-react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


export default function Doqssence() {

  const isSmScreen = useMediaQuery('(max-width:768px)');

  const router =useRouter()

  const [openPlan, setOpenPlan] = useState(true)

  const [open, setOpen]=useState(true)

  const [userData, setUserData]=useState([])

  const [selectedValues, setSelectedValues] = useState({});
  
  const [selectedId, setSelectedId] = useState([]);


  const [editingIndex, setEditingIndex] = useState(null);
  const [editedFeature, setEditedFeature] = useState('');

  const [selectedCompany, setSelectedCompany] = useState('')

  const [selectedFeatures, setSelectedFeatures] = useState([])

  const [alertHandler, setAlertHandler] = useState({
    hasAlert: false,
    alertType: "success" as AlertColor,
    alertMessage: "",
    alertTitle: "",
  });

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [companydata, setCompanyData] = useState([])

  const AddUserSchema = yup.object().shape({
    companyname: yup
     .string()
     .required("Select the company name"),
 });

  const {
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(AddUserSchema),
    criteriaMode: "all",
    mode: "onChange",
    reValidateMode: "onChange",
    delayError: 100,
    defaultValues: {
      companyname: "",
    },
    
  });

  useEffect(() => {
    const storedPlanId = localStorage.getItem("planId");
    if (storedPlanId) {
        
      const fetchData = async () => {
        try {
          const data = await get<any>(
            `/plans/getById/${storedPlanId}`,
            {},
            "instance1",
            setAlertHandler
          );
         
          console.log("data",data)
          const formattedData = data.data.data;


          const companydata = await get<any>(
            `/company/getAll`,
            {},
            "instance1",
            setAlertHandler
          );
         
    
          const formattedCompanyData = companydata.data.data.map((sub: any, index:any) => {
    
            return {
              label:sub.companyName,
              value: sub.companyId,
            };
          });
          
          setCompanyData(formattedCompanyData)
         
          setUserData([formattedData])
          setOpenPlan(false)
        
        } catch (error) {
          console.log("Error fetching data:", error);
        }
      };

      if(openPlan)
      {
        fetchData(); 
      }

    }
  }, [openPlan]);

  const handleCompanyChange = (value: string) => {

    setSelectedCompany(value)

   };

  const handleSubmit=async ()=>
    {

      const updatedData = {

         companyId:selectedCompany,
         plans:[
          {
             planId:userData[0].planId,
             featureIds:selectedId
          }
      ]
      };
  
      try {
        
        const response = await post<any>(
          `/company-plan/assign`,
           updatedData,
          setAlertHandler
        );
    
        if (response.data.success === true) {
          setAlertHandler({
            hasAlert: true,
            alertMessage: response.data.message,
            alertType: "success",
            alertTitle: "Success",
          });

           router.push("/plans/company-plan")

        }
         else{

            setAlertHandler({
            hasAlert: true,
            alertMessage: response.data.message,
            alertType: "success",
            alertTitle: "Success",
          });
         }
        reset()
        setSelectedCompany(null)
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    } 


  const handleReset=()=>
    {
      router.push("/plans/plans")
    }  


   
    const handleChange = (event, id) => {
      const { name, checked } = event.target;
      setSelectedValues(prevState => ({
        ...prevState,
        [name]: !prevState[name],  
      }));

       console.log("id",id)

       setSelectedId(prev => [...prev, id.featuresId]);
     
    };

    // const handleChange = (event, id) => {
    //   const { name } = event.target;
    
    //   // Toggle the checkbox state
    //   setSelectedValues(prevState => {
    //     const isCurrentlyChecked = !!prevState[name]; // Check current state
    //     const newCheckedState = !isCurrentlyChecked;
    
    //     // Log the id based on the new state
    //     console.log("id", newCheckedState ? id : undefined);
    
    //     // Update the selectedFeatures state
    //     setSelectedFeatures(prevFeatures => {
    //       if (!newCheckedState) {
    //         const updatedFeatures = { ...prevFeatures };
    //         delete updatedFeatures[id];
    //         return updatedFeatures;
    //       } else {
    //         return {
    //           ...prevFeatures,
    //           id: id,
    //         };
    //       }
    //     });
    
    //     // Return updated selectedValues state
    //     return {
    //       ...prevState,
    //       [name]: newCheckedState,
    //     };
    //   });
    // };
    

    const handleEdit = (feature, index) => {
      setEditingIndex(index);
      setEditedFeature(feature.name); 
    };
    
    const handleSaveEdit = async (index) => {
      const updatedFeatures = [...userData[0].features];
      updatedFeatures[index] = {
        ...updatedFeatures[index], 
        name: editedFeature,  
      };
      userData[0].features = updatedFeatures;

      const updatedData = {
         name:userData[0].name,
         id:userData[0].planId,
         description:userData[0].description,
         features:updatedFeatures,
      };

      try {
        
            const response = await put<any>(
              `/plans/update/${updatedData.id}`,
              updatedData,
              setAlertHandler
            );
        
            if (response.data.success === true) {
              setAlertHandler({
                hasAlert: true,
                alertMessage: "Plan updated successfully!",
                alertType: "success",
                alertTitle: "Success",
              });
             
            } 
    
          } catch (error) {
            console.log("Error fetching data:", error);
          }
     
      setEditingIndex(null); 
    };
    
    const handleCancelEdit = () => {
      setEditingIndex(null);
      setEditedFeature(""); 
    };

    const handleDelete=async (index)=>
    {

      const updatedFeatures = userData[0].features.filter((_, i) => i !== index); 
      userData[0].features = updatedFeatures; 
      
      const updatedData = {
         name:userData[0].name,
         id:userData[0].planId,
         description:userData[0].description,
         features:updatedFeatures,
      };

      try {
        
            const response = await put<any>(
              `/plans/update/${updatedData.id}`,
              updatedData,
              setAlertHandler
            );
        
            if (response.data.success === true) {
              setAlertHandler({
                hasAlert: true,
                alertMessage: "Plan updated successfully!",
                alertType: "success",
                alertTitle: "Success",
              });
             
            } 
    
          } catch (error) {
            console.log("Error fetching data:", error);
          }
     
    }




  return (
    <>
      
      <AlertHandler alertHandler={alertHandler} />
    {userData.length!==0&&
      
      <div style={{
								width: "100%!important",
								background: "#E5EEF5",
								minHeight: "100vh",
                paddingInline:"20px"
						}}>

        <div className="description">

        <h1 className="header_title primary_color">Plans</h1>

        <Box style={{display:"flex", gridColumnGap:"20px"}}>

        <Button onClick={handleReset} variant='contained' style={{
            backgroundColor: '#ffffff',
            color: 'black',
          }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant='contained' color="primary">
           Save
        </Button>
        </Box>

        </div>
      
      <PageContainer title="Dashboard" description="this is Dashboard">

        <CardContainer>
     
        <Box style={{padding:"20px"}}>
          
          <Box style={{paddingBottom:"30px"}}>
          <Grid container spacing={0} style={{marginTop:"0px"}}>
          <Grid item xs={12} sm={6} md={4}>
          <Controller
                name="companyname"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <PrimarySelectField
                    {...field}
                    id="companyname"
                    label={
                      <>
                        Select Company Name<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                      </>
                    }
    
                    onChange={(e) => {
                      field.onChange(e); 
                      handleCompanyChange(e.target.value as string); 
                    }}
    
                    hasError={Boolean(error)}
                    errorText={error?.message}
                    menuItems={companydata}
                    
                  />
                )}
              />
              </Grid>
       </Grid>
              </Box>
 
              <Box style={{padding:"10px 0px"}}>
              <div className="title primary_color">{userData[0].name}</div>
              <div>{userData[0].description}</div>
            </Box>
         
            <Box style={{padding:"10px 0px"}}>
            <div className="section_title" style={{textTransform:"uppercase"}}>Features</div>
            <div>Everything in our plan plus...</div>
            </Box>

            <Grid container spacing={0} style={{marginTop:"0px"}}>
           
            {userData[0].features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <FormControl component="fieldset" style={{width:"90%"}}>
              <FormGroup>
                <div
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {editingIndex === index ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <TextField
                      fullWidth
                        type="text"
                        value={editedFeature}
                        onChange={(e) => setEditedFeature(e.target.value)}
                        style={{ flex: 1 }}
                      />
                      <IconDeviceFloppy width={18} height={18} style={{cursor:"pointer"}} className="primary_color" onClick={() => handleSaveEdit(index)}/>
                      <IconX width={18} height={18} style={{cursor:"pointer"}} className="primary_color" onClick={handleCancelEdit}/>
                    </div>
          ) : (
            <Box style={{display:'flex', gridColumnGap:"8px",alignItems:"center"}}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!selectedValues[`option${index + 1}`]}
                    onChange={(e)=>handleChange(e,feature)}
                    name={`option${index + 1}`}
                    color="primary"
                  />
                }
                className="controllabel"
                label={feature.name}
              />
              {hoveredIndex === index && (
                <div style={{ position: 'relative', display: 'flex', gap: '8px' }}>
                  <IconEdit
                    style={{ cursor: 'pointer' }}
                    className="primary_color"
                    width={18}
                    height={18}
                    onClick={() => handleEdit(feature,index)}
                  />
                  <IconTrash
                    style={{ cursor: 'pointer' }}
                    className="primary_color"
                    width={18}
                    height={18}
                    onClick={() => handleDelete(index)}
                  />
                </div>
              )}
            </Box>
          )}
        </div>
          </FormGroup>
        </FormControl>
      </Grid>
    ))}
              
              </Grid>

               </Box>
              

        </CardContainer>
      </PageContainer>
          </div>
    }
          </>
      );
    }


