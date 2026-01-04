"use client";
import {
  AlertColor,
  Button,
  Grid,
  Typography,
  IconButton,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PrimarySelectField, PrimaryTextField, AlertHandler, PageContainer, CardContainer } from "qssence-common";
import { get, post } from "@/utils/ApiConfig"; // Assuming post function is defined correctly
import { IconMinus, IconPlus, IconUsersGroup } from "@tabler/icons-react";
import { useMediaQuery } from "@mui/material";
import countries from "world-countries";
import { useSelector} from "react-redux";
import { RootState } from "@/components/Redux/store";
import { useRouter } from "next/navigation";


type AddPlantFormInputs = {
  date?:any;
};

interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle?: string;
}

// interface addPlantProps {
//   setClose: Dispatch<SetStateAction<boolean>>;
//   setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>;
// }

function AddWorkflowConnectivity() {
  const AddUserSchema = yup.object().shape({
    date: yup
    .string()
    .required("Date is required"), 
   
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
      date:"" ,
    },
  });

  

  const routers = useRouter();

  const [alertHandler, setAlertHandler] = useState({
    hasAlert: false,
    alertType: "success" as AlertColor,
    alertMessage: "",
    alertTitle: "",
  });

  const [value, setValue] = useState('');

  const [revision, setRevision] = useState('');

  const [process, setProcess] = useState('');

 const isSmScreen = useMediaQuery('(max-width:768px)');

 const handleAddMore=()=>
 {
   
 }


  const onSubmit = async (data: AddPlantFormInputs) => {

     //console.log("data", data)
    // try {
     

    //   const response = await post<any>(
    //     "/plants/create",
    //      data,
    //     setAlertHandler
    //   );

    //   console.log(response);
    //   // setClose(false);
    //   // setAlertHandler({
    //   //   hasAlert: true,
    //   //   alertMessage: "Plant created successfully!",
    //   //   alertType: "success",
    //   //   alertTitle: "Success",
    //   // });
    //   if (response.data.success === true) {
    //     setAlertHandler({
    //       hasAlert: true,
    //       alertMessage: "Plant created successfully!",
    //       alertType: "success",
    //       alertTitle: "Success",
    //     });
       
    //     setClose(false);
    //   } else {
    //     setClose(true);
    //   }
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

    const handleMemberPicker=()=>
    {

    }



    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    };


    const handleChangeRevision = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRevision(event.target.value);
    };

    const handleProcessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setProcess(event.target.value);
    };

  return (
    <>
    
       <div>

         <AlertHandler alertHandler={alertHandler} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
              <h1 className="header_title primary_color paddingBlock">
                QMS Workflow Connectivity
              </h1>
          </div>   
          <PageContainer title="Dashboard" description="this is Dashboard" >
          <CardContainer>
            <>  
            <TableContainer style={{height:"88vh", overflow:'scroll'}}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>Workflow Name</TableCell>
                    <TableCell>State</TableCell>
                    <TableCell>Timeline</TableCell>
                    <TableCell>Activity</TableCell>
                    <TableCell>Electronic Signature</TableCell>
                    <TableCell>Process Activity</TableCell>
                    <TableCell>Workflow Complete</TableCell>
                    <TableCell >Revision Date</TableCell>
                    <TableCell>Action</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                  
                <TableRow>
                  
                    <TableCell rowSpan={5}>Change Control</TableCell>
                    <TableCell>Initiated</TableCell>
                    <TableCell>  <ul style={{listStyleType:"disc",display:'grid', gridRowGap:"6px"}}>
                        <li>CAPA</li>
                        <li>Deviation</li>
                      </ul></TableCell>
                    <TableCell>
                      <ul style={{listStyleType:"disc", display:'grid', gridRowGap:"6px"}}>
                        <li>Send for Review</li>
                        <li>Send for Approve</li>
                      </ul>
                    </TableCell>

                    <TableCell> No </TableCell>

                    <TableCell>
                    <ul style={{listStyleType:"disc",display:'grid', gridRowGap:"8px"}}>
                        <li>Send for Review
                          <Box style={{display:"flex", alignItems:"center",paddingTop:"4px"}}>
                          <div>Add Field </div> 
                          <IconButton
                            id="my-icon-button"
                            onClick={handleAddMore}
                            style={{
                              color: "white",
                              backgroundColor: "#073b54",
                              borderRadius: "50%",
                              padding: "0px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              transform:"scale(0.6)"
                            }}
                          >
                      <IconPlus />
                      </IconButton>

                      </Box>
              </li>
                        <li>Send for Approve

                        <Box style={{display:"flex", alignItems:"center",paddingTop:"4px"}}>
                          <div>Add Field </div> 
                          <IconButton
                            id="my-icon-button"
                            onClick={handleAddMore}
                            style={{
                              color: "white",
                              backgroundColor: "#073b54",
                              borderRadius: "50%",
                              padding: "0px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              transform:"scale(0.6)"
                            }}
                          >
                      <IconPlus />
                      </IconButton>

                      </Box>

                        </li>
                      </ul>
                    </TableCell>
                    <TableCell>
                       Automation
                    </TableCell>
                    <TableCell rowSpan={5} style={{width:"160px"}}>
                      
                       <Box style={{display:'grid', gridRowGap:"6px"}}>
                       <FormControl component="fieldset">

                       <RadioGroup
                        aria-label="revision-date"
                        name="revision-date"
                        value={revision}
                        onChange={handleChangeRevision}
                        row
                        style={{display:'felx', gridColumnGap:"8px"}}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Radio
                            value="yes"
                            sx={{ transform: "scale(0.7)", padding: "0px" }}
                          />
                          <Typography sx={{ fontSize: "12px" }}>Yes</Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Radio
                            value="no"
                            sx={{ transform: "scale(0.7)", padding: "0px" }}
                          />
                          <Typography sx={{ fontSize: "12px" }}>No</Typography>
                        </Box>
                      </RadioGroup>


                    </FormControl>
                   
                   {revision==="yes" && <Controller
                      name="date"
                      control={control}
                     
                      render={({ field, fieldState: { error } }) => (
                        <PrimaryTextField
                          id="date"
                          label=""
                          type="date"
                          size="small"
                          haserror={Boolean(error)}
                          errortext={error?.message}
                          {...field} 
                         
                        />
                      )}
                    /> 
                    }

                       </Box>

                    </TableCell>
                    <TableCell rowSpan={5} style={{width:"0px"}}>
                    
                       <Button variant="contained" color="primary">Save</Button>  
                    </TableCell>
                </TableRow>

                <TableRow>
                   
                   <TableCell>Initial Review</TableCell>
                   <TableCell>  <ul style={{listStyleType:"disc",display:'grid', gridRowGap:"6px"}}>
                        <li>CAPA</li>
                        <li>Deviation</li>
                      </ul></TableCell>
                   <TableCell>

                     <ul style={{listStyleType:"disc", display:'grid', gridRowGap:"6px"}}>
                       <li>Send for Author</li>
                     </ul>
                   </TableCell>
                   <TableCell>

                    <FormControl component="fieldset">
                    <RadioGroup

                      aria-label="electronic-signature"
                      name="electronic-signature"
                      value={value}
                      onChange={handleChange}
                      row
                      style={{display:'felx', gridColumnGap:"8px"}}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Radio
                            value="yes"
                            sx={{ transform: "scale(0.7)", padding: "0px" }}
                          />
                          <Typography sx={{ fontSize: "12px" }}>Yes</Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Radio
                            value="no"
                            sx={{ transform: "scale(0.7)", padding: "0px" }}
                          />
                          <Typography sx={{ fontSize: "12px" }}>No</Typography>
                        </Box>

                    </RadioGroup>

                    </FormControl>
                       
                    </TableCell>
                   <TableCell>
                   
                   <ul style={{listStyleType:"disc",display:'grid', gridRowGap:"8px"}}>
                        <li>Send for Author
                          <Box style={{display:"flex", alignItems:"center",paddingTop:"4px"}}>
                          <div>Add Field </div> 
                          <IconButton
                            id="my-icon-button"
                            onClick={handleAddMore}
                            style={{
                              color: "white",
                              backgroundColor: "#073b54",
                              borderRadius: "50%",
                              padding: "0px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              transform:"scale(0.6)"
                            }}
                          >
                      <IconPlus />
                      </IconButton>

                      </Box>
              </li>
                        
                      </ul>
                   </TableCell>
                   <TableCell>
                   <ul style={{listStyleType:"disc",display:'grid', gridRowGap:"8px"}}>
                    <li>Send for Author
                      
                      <Box style={{paddingTop:"4px"}}>
                    
                       
                  <Box style={{display:"flex", alignItems:"center"}}>
                          <div>Add Field </div> 
                          <IconButton
                            id="my-icon-button"
                            onClick={handleAddMore}
                            style={{
                              color: "white",
                              backgroundColor: "#073b54",
                              borderRadius: "50%",
                              padding: "0px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              transform:"scale(0.6)"
                            }}
                          >
                      <IconPlus />
                      </IconButton>

                      </Box>
                    </Box>
                    </li>
                   
                    </ul>

                   </TableCell>
                   
                 
               </TableRow>

               <TableRow>
                   
                   <TableCell>Impact Assessment</TableCell>
                   <TableCell>  <ul style={{listStyleType:"disc",display:'grid', gridRowGap:"6px"}}>
                        <li>CAPA</li>
                        <li>Deviation</li>
                      </ul></TableCell>
                   <TableCell>

                     <ul style={{listStyleType:"disc", display:'grid', gridRowGap:"6px"}}>
                       <li>Send for Author</li>
                     </ul>
                   </TableCell>
                   <TableCell>

                    <FormControl component="fieldset">
                    <RadioGroup

                      aria-label="electronic-signature"
                      name="electronic-signature"
                      value={value}
                      onChange={handleChange}
                      row
                      style={{display:'felx', gridColumnGap:"8px"}}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Radio
                            value="yes"
                            sx={{ transform: "scale(0.7)", padding: "0px" }}
                          />
                          <Typography sx={{ fontSize: "12px" }}>Yes</Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Radio
                            value="no"
                            sx={{ transform: "scale(0.7)", padding: "0px" }}
                          />
                          <Typography sx={{ fontSize: "12px" }}>No</Typography>
                        </Box>

                    </RadioGroup>

                    </FormControl>
                       
                    </TableCell>
                   <TableCell>
                   
                   <ul style={{listStyleType:"disc",display:'grid', gridRowGap:"8px"}}>
                        <li>Send for Author
                          <Box style={{display:"flex", alignItems:"center",paddingTop:"4px"}}>
                          <div>Add Field </div> 
                          <IconButton
                            id="my-icon-button"
                            onClick={handleAddMore}
                            style={{
                              color: "white",
                              backgroundColor: "#073b54",
                              borderRadius: "50%",
                              padding: "0px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              transform:"scale(0.6)"
                            }}
                          >
                      <IconPlus />
                      </IconButton>

                      </Box>
              </li>
                        
                      </ul>
                   </TableCell>
                   <TableCell>
                   <ul style={{listStyleType:"disc",display:'grid', gridRowGap:"8px"}}>
                    <li>Send for Author
                      
                      <Box style={{paddingTop:"4px"}}>
                    
                       
                  <Box style={{display:"flex", alignItems:"center"}}>
                          <div>Add Field </div> 
                          <IconButton
                            id="my-icon-button"
                            onClick={handleAddMore}
                            style={{
                              color: "white",
                              backgroundColor: "#073b54",
                              borderRadius: "50%",
                              padding: "0px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              transform:"scale(0.6)"
                            }}
                          >
                      <IconPlus />
                      </IconButton>

                      </Box>
                    </Box>
                    </li>
                   
                    </ul>

                   </TableCell>
                   
                 
               </TableRow>
               <TableRow>
                   
                   <TableCell>Change Plan</TableCell>
                   <TableCell>  <ul style={{listStyleType:"disc", display:'grid', gridRowGap:"6px"}}>
                        <li>CAPA</li>
                        <li>Deviation</li>
                      </ul></TableCell>
                   <TableCell>

                     <ul style={{listStyleType:"disc", display:'grid', gridRowGap:"6px"}}>
                       <li>Send for Read</li>
                       <li>Make Effective</li>
                     </ul>
                   </TableCell>
                   <TableCell>

                    <FormControl component="fieldset">
                    <RadioGroup

                      aria-label="electronic-signature"
                      name="electronic-signature"
                      value={value}
                      onChange={handleChange}
                      row
                      style={{display:'felx', gridColumnGap:"8px"}}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Radio
                            value="yes"
                            sx={{ transform: "scale(0.7)", padding: "0px" }}
                          />
                          <Typography sx={{ fontSize: "12px" }}>Yes</Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Radio
                            value="no"
                            sx={{ transform: "scale(0.7)", padding: "0px" }}
                          />
                          <Typography sx={{ fontSize: "12px" }}>No</Typography>
                        </Box>

                    </RadioGroup>

                    </FormControl>
                       
                    </TableCell>
                   <TableCell>
                   <ul style={{listStyleType:"disc", display:'grid', gridRowGap:"6px"}}>
                       <li>Send for Read
                    
                 
                          <Box style={{display:"flex", alignItems:"center",paddingTop:"4px"}}>
                          <div>Add Field </div> 
                          <IconButton
                            id="my-icon-button"
                            onClick={handleAddMore}
                            style={{
                              color: "white",
                              backgroundColor: "#073b54",
                              borderRadius: "50%",
                              padding: "0px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              transform:"scale(0.6)"
                            }}
                          >
                      <IconPlus />
                      </IconButton>

                      </Box>
                      </li>
                      
                      <li>Make Effective

                      <Box style={{display:"flex", alignItems:"center",paddingTop:"4px"}}>
                          <div>Add Field </div> 
                          <IconButton
                            id="my-icon-button"
                            onClick={handleAddMore}
                            style={{
                              color: "white",
                              backgroundColor: "#073b54",
                              borderRadius: "50%",
                              padding: "0px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              transform:"scale(0.6)"
                            }}
                          >
                      <IconPlus />
                      </IconButton>

                      </Box>

                      </li>
                      </ul>
                   </TableCell>
                   <TableCell>
               
                      
                   <ul style={{listStyleType:"disc", display:'grid', gridRowGap:"6px"}}>
                       <li>Send for Read
                    
                 
                          <Box style={{display:"flex", alignItems:"center",paddingTop:"4px"}}>
                          <div>Add Field </div> 
                          <IconButton
                            id="my-icon-button"
                            onClick={handleAddMore}
                            style={{
                              color: "white",
                              backgroundColor: "#073b54",
                              borderRadius: "50%",
                              padding: "0px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              transform:"scale(0.6)"
                            }}
                          >
                      <IconPlus />
                      </IconButton>

                      </Box>
                      </li>
                      
                      <li>Make Effective

                      <Box style={{display:"flex", alignItems:"center",paddingTop:"4px"}}>
                          <div>Add Field </div> 
                          <IconButton
                            id="my-icon-button"
                            onClick={handleAddMore}
                            style={{
                              color: "white",
                              backgroundColor: "#073b54",
                              borderRadius: "50%",
                              padding: "0px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              transform:"scale(0.6)"
                            }}
                          >
                      <IconPlus />
                      </IconButton>

                      </Box>

                      </li>
                      </ul>
                  

                   </TableCell>
                   
                 
               </TableRow>

                {/* <TableRow>
                   
                    <TableCell>Approve</TableCell>
                    <TableCell>
                      <ul style={{listStyleType:"disc", display:'grid', gridRowGap:"6px"}}>
                        <li>Send for Draft</li>
                        <li>Send for Approve</li>
                      </ul>
                    </TableCell>
                    <TableCell>
                    <ul style={{listStyleType:"disc",display:'grid', gridRowGap:"8px"}}>
                        <li>Send for Draft
                         
              </li>
                        <li>Send for Approve

                        <Box style={{display:"flex", alignItems:"center",paddingTop:"4px"}}>
                          <div>Add Field </div> 
                          <IconButton
                            id="my-icon-button"
                            onClick={handleAddMore}
                            style={{
                              color: "white",
                              backgroundColor: "#073b54",
                              borderRadius: "50%",
                              padding: "0px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              transform:"scale(0.6)"
                            }}
                          >
                      <IconPlus />
                      </IconButton>

                      </Box>

                        </li>
                      </ul>
                    </TableCell>
                    <TableCell>
                    <ul style={{listStyleType:"disc",display:'grid', gridRowGap:"8px"}}>
                   
                    <li>Send for Approve
                      
                      <Box style={{paddingTop:"4px"}}>
                    <FormControl component="fieldset">
                    <FormLabel component="legend" style={{fontSize:"0.75rem", color:"#000"}} >Electronic Signature</FormLabel>

                    <RadioGroup

                      aria-label="electronic-signature"
                      name="electronic-signature"
                      value={value}
                      onChange={handleChange}
                      row
                      style={{display:'felx', gridColumnGap:"8px"}}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Radio
                            value="yes"
                            sx={{ transform: "scale(0.7)", padding: "0px" }}
                          />
                          <Typography sx={{ fontSize: "12px" }}>Yes</Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Radio
                            value="no"
                            sx={{ transform: "scale(0.7)", padding: "0px" }}
                          />
                          <Typography sx={{ fontSize: "12px" }}>No</Typography>
                        </Box>

                    </RadioGroup>

                    </FormControl>
                       
                  <Box style={{display:"flex", alignItems:"center"}}>
                          <div>Add Field </div> 
                          <IconButton
                            id="my-icon-button"
                            onClick={handleAddMore}
                            style={{
                              color: "white",
                              backgroundColor: "#073b54",
                              borderRadius: "50%",
                              padding: "0px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              transform:"scale(0.6)"
                            }}
                          >
                      <IconPlus />
                      </IconButton>

                      </Box>
                    </Box>
                    </li>
                    </ul>

                    </TableCell>
                    
                  
                </TableRow>

                <TableRow>
                   
                   <TableCell>Training</TableCell>
                   <TableCell>
                     <ul style={{listStyleType:"disc", display:'grid', gridRowGap:"6px"}}>
                       <li>Send for Draft</li>
                       <li>Send for Review</li>
                       <li>Send for Approve</li>
                     </ul>
                   </TableCell>
                   <TableCell>
                   <ul style={{listStyleType:"disc",display:'grid', gridRowGap:"8px"}}>
                       <li>Send for Draft
                        
             </li>
                       <li>Send for Approve

                       <Box style={{display:"flex", alignItems:"center",paddingTop:"4px"}}>
                         <div>Add Field </div> 
                         <IconButton
                           id="my-icon-button"
                           onClick={handleAddMore}
                           style={{
                             color: "white",
                             backgroundColor: "#073b54",
                             borderRadius: "50%",
                             padding: "0px",
                             display: "flex",
                             justifyContent: "center",
                             alignItems: "center",
                             transform:"scale(0.6)"
                           }}
                         >
                     <IconPlus />
                     </IconButton>

                     </Box>

                       </li>
                     </ul>
                   </TableCell>
                   <TableCell>
                   <ul style={{listStyleType:"disc",display:'grid', gridRowGap:"8px"}}>
                  
                   <li>Send for Approve
                     
                     <Box style={{paddingTop:"4px"}}>
                   <FormControl component="fieldset">
                   <FormLabel component="legend" style={{fontSize:"0.75rem", color:"#000"}} >Electronic Signature</FormLabel>

                   <RadioGroup

                     aria-label="electronic-signature"
                     name="electronic-signature"
                     value={value}
                     onChange={handleChange}
                     row
                     style={{display:'felx', gridColumnGap:"8px"}}
                   >
                     <Box sx={{ display: "flex", alignItems: "center" }}>
                         <Radio
                           value="yes"
                           sx={{ transform: "scale(0.7)", padding: "0px" }}
                         />
                         <Typography sx={{ fontSize: "12px" }}>Yes</Typography>
                       </Box>

                       <Box sx={{ display: "flex", alignItems: "center" }}>
                         <Radio
                           value="no"
                           sx={{ transform: "scale(0.7)", padding: "0px" }}
                         />
                         <Typography sx={{ fontSize: "12px" }}>No</Typography>
                       </Box>

                   </RadioGroup>

                   </FormControl>
                      
                 <Box style={{display:"flex", alignItems:"center"}}>
                         <div>Add Field </div> 
                         <IconButton
                           id="my-icon-button"
                           onClick={handleAddMore}
                           style={{
                             color: "white",
                             backgroundColor: "#073b54",
                             borderRadius: "50%",
                             padding: "0px",
                             display: "flex",
                             justifyContent: "center",
                             alignItems: "center",
                             transform:"scale(0.6)"
                           }}
                         >
                     <IconPlus />
                     </IconButton>

                     </Box>
                   </Box>
                   </li>
                   </ul>

                   </TableCell>
                   
                 
               </TableRow>

               <TableRow>
                   
                   <TableCell>Approve</TableCell>
                   <TableCell>
                     <ul style={{listStyleType:"disc", display:'grid', gridRowGap:"6px"}}>
                       <li>Send for Draft</li>
                       <li>Send for Approve</li>
                     </ul>
                   </TableCell>
                   <TableCell>
                   <ul style={{listStyleType:"disc",display:'grid', gridRowGap:"8px"}}>
                       <li>Send for Draft
                        
             </li>
                       <li>Send for Approve

                       <Box style={{display:"flex", alignItems:"center",paddingTop:"4px"}}>
                         <div>Add Field </div> 
                         <IconButton
                           id="my-icon-button"
                           onClick={handleAddMore}
                           style={{
                             color: "white",
                             backgroundColor: "#073b54",
                             borderRadius: "50%",
                             padding: "0px",
                             display: "flex",
                             justifyContent: "center",
                             alignItems: "center",
                             transform:"scale(0.6)"
                           }}
                         >
                     <IconPlus />
                     </IconButton>

                     </Box>

                       </li>
                     </ul>
                   </TableCell>
                   <TableCell>
                   <ul style={{listStyleType:"disc",display:'grid', gridRowGap:"8px"}}>
                  
                   <li>Send for Approve
                     
                     <Box style={{paddingTop:"4px"}}>
                   <FormControl component="fieldset">
                   <FormLabel component="legend" style={{fontSize:"0.75rem", color:"#000"}} >Electronic Signature</FormLabel>

                   <RadioGroup

                     aria-label="electronic-signature"
                     name="electronic-signature"
                     value={value}
                     onChange={handleChange}
                     row
                     style={{display:'felx', gridColumnGap:"8px"}}
                   >
                     <Box sx={{ display: "flex", alignItems: "center" }}>
                         <Radio
                           value="yes"
                           sx={{ transform: "scale(0.7)", padding: "0px" }}
                         />
                         <Typography sx={{ fontSize: "12px" }}>Yes</Typography>
                       </Box>

                       <Box sx={{ display: "flex", alignItems: "center" }}>
                         <Radio
                           value="no"
                           sx={{ transform: "scale(0.7)", padding: "0px" }}
                         />
                         <Typography sx={{ fontSize: "12px" }}>No</Typography>
                       </Box>

                   </RadioGroup>

                   </FormControl>
                      
                 <Box style={{display:"flex", alignItems:"center"}}>
                         <div>Add Field </div> 
                         <IconButton
                           id="my-icon-button"
                           onClick={handleAddMore}
                           style={{
                             color: "white",
                             backgroundColor: "#073b54",
                             borderRadius: "50%",
                             padding: "0px",
                             display: "flex",
                             justifyContent: "center",
                             alignItems: "center",
                             transform:"scale(0.6)"
                           }}
                         >
                     <IconPlus />
                     </IconButton>

                     </Box>
                   </Box>
                   </li>
                   </ul>

                   </TableCell>
                   
                 
               </TableRow> */}

                </TableBody>
      </Table>
    </TableContainer>

            </>

      </CardContainer>
      </PageContainer>
    </div>

  </>
  );
}

export default AddWorkflowConnectivity;

/* 

 <FormControl component="fieldset">
                    <FormLabel component="legend" style={{fontSize:"0.75rem", color:"#000"}} >Electronic Signature</FormLabel>

                    <RadioGroup

                      aria-label="electronic-signature"
                      name="electronic-signature"
                      value={value}
                      onChange={handleChange}
                      row
                      style={{display:'felx', gridColumnGap:"8px"}}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Radio
                            value="yes"
                            sx={{ transform: "scale(0.7)", padding: "0px" }}
                          />
                          <Typography sx={{ fontSize: "12px" }}>Yes</Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Radio
                            value="no"
                            sx={{ transform: "scale(0.7)", padding: "0px" }}
                          />
                          <Typography sx={{ fontSize: "12px" }}>No</Typography>
                        </Box>

                    </RadioGroup>

                    </FormControl>
                       




{/* {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.workflow}</TableCell>
              <TableCell>{row.state}</TableCell>
              <TableCell>{row.activity}</TableCell>
              <TableCell>
                <Checkbox checked={row.eSignature} disabled />
              </TableCell>
              <TableCell>{row.processActivity}</TableCell>
              <TableCell>
                <Checkbox checked={row.workflowComplete} disabled />
              </TableCell>
              <TableCell>{row.revision}</TableCell>
              <TableCell>
                <Button variant="contained" size="small">
                  {row.actions}
                </Button>
              </TableCell>
            </TableRow>
          ))} 
            
          
          
          <FormControl component="fieldset">
                    <RadioGroup

                      aria-label="electronic-signature"
                      name="electronic-signature"
                      value={process}
                      onChange={handleProcessChange}
                      row
                      style={{display:'felx', gridColumnGap:"8px"}}
                    >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Radio
                            value="yes"
                            sx={{ transform: "scale(0.7)", padding: "0px" }}
                          />
                          <Typography sx={{ fontSize: "12px" }}>Yes</Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Radio
                            value="no"
                            sx={{ transform: "scale(0.7)", padding: "0px" }}
                          />
                          <Typography sx={{ fontSize: "12px" }}>No</Typography>
                        </Box>

                    </RadioGroup>

                    </FormControl>*/