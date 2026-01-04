"use client"

import { PageContainer, CardContainer, CustomTextField,AlertHandler, PrimarySelectField } from "qssence-common";
import {
  Box,
  Grid,
  Button,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
} from '@mui/material';
import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { get, post, put } from "@/utils/ApiConfig";
import { AlertColor } from "@mui/material";
import { IconX } from "@tabler/icons-react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams } from 'next/navigation';


interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle?: string;
}



export default function setViewCompanyPlan() {


   const [alertHandler, setAlertHandler] = useState<AlertHandlerState>({
    hasAlert: false,
    alertType: "info", // or whatever default value
    alertMessage: "",
    alertTitle: "", 
  });

  const [loading, setLoading] =useState(true)


  const [companydata, setCompanyData] = useState([])

  const params = useParams();

    useEffect(() => {

      const urlId = params.viewCompanyPlan;

       const fetchData = async () => {
         try {
           const data = await get<any>("company-plan/companies-with-plans/getAll", {}, "instance1", setAlertHandler);
           
           const formattedData = data.data.data.filter((sub: any) => sub.id === urlId).map((sub: any) => ({
             id: sub.id,
             companyId: sub.id,
             companyName: sub.companyName,
             location: sub.location,
             email: sub.email,
             companyPlan:sub.plans
           }));
   
            setCompanyData(formattedData);
            setLoading(false);
         } catch (error) {
           console.error("Error fetching data:", error);
         }
       };
   
       if (loading) {
         fetchData();
       }
     }, [loading]);
   


  
  return (
    <>
    <AlertHandler alertHandler={alertHandler} />
    {companydata.length!==0&&
      
      <div style={{
                                width: "100%!important",
                                background: "#E5EEF5",
                                minHeight: "100vh",
                paddingInline:"20px"
                        }}>

        <div className="description">

        <h1 className="header_title primary_color"> View Plans</h1>

        </div>
      
      <PageContainer title="Dashboard" description="this is Dashboard">

        <CardContainer>
     
        <Box style={{padding:"20px"}}>
          
          <Box style={{paddingBottom:"30px"}}>
          <Grid container spacing={2} style={{marginTop:"0px"}}>
          <Grid item xs={12} sm={12} md={12} display="flex" alignItems="center" gap={4}>
           
            <div className="company_plan">
               <div className="primary_title fontWeight500">Company Name:</div>
              <div className="section_title label_plan">{companydata[0].companyName}</div>
            </div>
        
              <div className="company_plan">
                 <div className="primary_title fontWeight500">Company Email:</div>
                 <div className="section_title label_plan">{companydata[0].email}</div> 
              </div>
           
           <div className="company_plan">
              <div className="primary_title fontWeight500">Company Location:</div>
             <div className="section_title label_plan">{companydata[0].location}</div>
           </div>
         
              </Grid>
               </Grid>
              </Box>
           <Grid container spacing={4} style={{marginTop:"0px"}}>
            {
              companydata[0].companyPlan.map((plan, index)=>{
                 
              return (
                <>
                  <Grid item xs={12} sm={12} md={12} key={index}>
                    <Box>
                    <div className="title primary_color">{plan.name}</div>
                    </Box>
         
                  <Box style={{padding:"10px 0px"}}>
                  <div className="section_title fontWeight500" style={{textTransform:"uppercase"}}>Features</div>
                  </Box>

                  <Grid container spacing={1} style={{marginTop:"0px"}}>
           
             {plan.features.map((feature, index) => (
               <Grid item xs={12} sm={6} md={4} key={index}>
                 <FormControl component="fieldset" style={{width:"90%"}}>
                <FormGroup>
                 
                 <div style={{ display: 'flex', alignItems: 'center' }}>
                  <ul style={{ margin: 0, paddingLeft: '20px', listStyleType: 'disc' }}>
                    <li className="section_title">{feature.name}</li>
                  </ul>
                </div>

                </FormGroup>
              </FormControl>
            </Grid>
          ))}
              
              </Grid>
         </Grid>
                  </>
                )
                 
              })
            }
</Grid>
               </Box>
              

        </CardContainer>
      </PageContainer>
          </div>
    }
          </>
      );
    }

    /*  
     
    
    */
