"use client";

import React, {useState} from 'react';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, AlertColor, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useMediaQuery } from "@mui/material";

import { PageContainer, CardContainer } from "qssence-common"
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { useRouter } from "next/navigation";
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { get } from '@/utils/ApiConfig';

interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle?: string;
}

interface FormDataType {
  companyName: string;
  applicationPlan: string;
  expiryDate: string;
  location: string;
  admin_account_allowed: string;
  user_account_allowed: string;
  companyId: string;
  purchase_date: string;
  purchase_cost: string;
  total_user_access: string;
  description: string;
  licenseKey:string;
  activeStatus:string;
}

export default function DetailsLicense (){


    const [formData, setFormData] = useState<FormDataType>({
        companyName: "",
        applicationPlan: "",
        expiryDate: "",
        location: "",
        admin_account_allowed: "",
        user_account_allowed: "",
        companyId: "",
        purchase_date: "",
        purchase_cost: "",
        total_user_access: "",
        description: "",
        licenseKey:"",
        activeStatus:"",
 
      });

 const isSmScreen = useMediaQuery('(max-width:768px)');

      const params = useParams();
    
    const urlId = params.viewUserLicense;

    

   const [loading, setLoading] = useState(true)


      const router = useRouter()
   
       const [alertHandler, setAlertHandler] = useState<AlertHandlerState>({
         hasAlert: false,
         alertType: "info", 
         alertMessage: "",
         alertTitle: "", 
       });
   
  
      useEffect(() => {
  
        const fetchData = async () => {
  
          try {
            const data = await get<any>(`licenses/${urlId}`, {}, "instance1", setAlertHandler);
  
  
            const formattedData = {
                  companyId:data.data.data.companyId,
                  companyName: data.data.data.companyName,
                  applicationPlan: data.data.data.plans.map((plan: any) => plan.name).join(' + '),
                  purchase_cost:data.data.data.purchaseCost,
                  location:data.data.data.location,
                  total_user_access: data.data.data.totalUserAccess,
                  admin_account_allowed: data.data.data.adminAccountAllowed,
                  user_account_allowed: data.data.data.userAccountAllowed,
                  purchase_date: new Date(data.data.data.purchaseDate).toISOString().split("T")[0] || "",
                  expiryDate: new Date(data.data.data.expiryDate).toISOString().split("T")[0] || "",
                  description:data.data.data.description,
                  licenseKey:data.data.data.licenseKey,
                  activeStatus:data.data.data.active,

            };
       
            setLoading(false);
       
             setFormData(formattedData)
  
  
          } catch (error) {
            console.error("Error fetching data:", error);
          }
  
        };
  
          if (loading) {
            fetchData();
          }
  
      }, [loading]);  

      console.log("formData:", formData);

    return (
        <>
       {!loading &&
         <div style={{
                width: "100%!important",
                background: "#E5EEF5",
                minHeight: "100vh",
                paddingInline:"20px"
						}}>

          <div className="description">

          <h1 className="header_title primary_color">Software License Details</h1>

          </div>


           <PageContainer title="Dashboard" description="this is Dashboard">

          <CardContainer>

            <Box style={{height: "90vh", overflow: "scroll"}}>
             
          <Box className="lineBorder" style={{margin:"30px"}}>

              <Grid container spacing={6} style={{padding:"20px 20px 20px 30px"}} >

              <Grid item xs={12} sm={12} md={12} style={{display:'grid', gridRowGap:'24px'}}>
                 
                 <div  style={{display:'grid', gridTemplateColumns:"0.25fr 1fr"}}>
                 <div className='fontWeight500'>License Key</div>
                 <div>{formData.licenseKey}</div>
                  </div>

                  <div  style={{display:'grid', gridTemplateColumns:"0.25fr 1fr"}}>
                 <div className='fontWeight500'>Purchase Date</div>
                  <div>{formData.purchase_date}</div>
                  </div>

                  <div  style={{display:'grid', gridTemplateColumns:"0.25fr 1fr"}}>
                 <div className='fontWeight500'>Expiration Date</div>
                 <div>{formData.expiryDate}</div>
                  </div>

                  <div  style={{display:'grid', gridTemplateColumns:"0.25fr 1fr"}}>
                 <div className='fontWeight500'>License Term</div>
                 <div>{formData.activeStatus}</div>
                  </div>

                  <div  style={{display:'grid', gridTemplateColumns:"0.25fr 1fr"}}>
                 <div className='fontWeight500'>Product</div>
                <div>{formData.applicationPlan}</div>
                  </div>

                  <div  style={{display:'grid', gridTemplateColumns:"0.25fr 1fr"}}>
                 <div className='fontWeight500'>Activation Limit</div>
                
                 <div style={{display:"flex", gridColumnGap:"10px"}}>
                 <div>0/Unlimited</div>
                <div style={{display:"flex",gridColumnGap:"4px"}}>
                  <div style={{border:"1px solid rgba(233, 233, 233, 1)",cursor:"pointer"}}><IconMinus height={20} width={20}/></div>
                  <div style={{border:"1px solid rgba(233, 233, 233, 1)",cursor:"pointer"}}><IconPlus height={20} width={20}/></div>
                </div>
                </div>
                  </div>

                  <div  style={{display:'grid', gridTemplateColumns:"0.25fr 1fr"}}>
                 <div className='fontWeight500'>Status</div>
                 <div>{formData.activeStatus}</div>
                  </div>

                  <div  style={{display:'grid', gridTemplateColumns:"0.25fr 1fr"}}>
                 <div className='fontWeight500'>Customer</div>
                 <div>Cipla</div>
                  </div>

                  <div  style={{display:'grid', gridTemplateColumns:"0.25fr 1fr"}}>
                 <div className='fontWeight500'>Actions</div>
                 <div>
                    <span>Send Renewal Notice</span><span> | </span>
                    <span>Activate</span><span> | </span>
                    <span>Extend</span><span> | </span>
                    <span>Disable</span>

                    </div>
                  </div>

                </Grid>

             </Grid>
             </Box>

             <h1 className="title primary_color" style={{paddingInline:"20px"}}>Related License</h1>

             <Box className="lineBorder" style={{margin:"30px"}}>

             <Grid container spacing={6} style={{padding:"20px 20px 20px 30px"}} >

            <Grid item xs={12} sm={12} md={12} style={{display:'grid', gridRowGap:'24px'}}>
            
            <div  style={{display:'grid', gridTemplateColumns:"0.25fr 1fr"}}>
            <div className='fontWeight500'>Product</div>
            <div>License Key</div>
                </div>

                <div  style={{display:'grid', gridTemplateColumns:"0.25fr 1fr"}}>
            <div className='fontWeight500'>Basic Product</div>
            <div>488rfr8rr454efj49r84r49</div>
                </div>

                <div  style={{display:'grid', gridTemplateColumns:"0.25fr 1fr"}}>
            <div className='fontWeight500'>Software License</div>
            <div>3fg84renf8urvf99i9tfm9irtf</div>
                </div>


            </Grid>

            </Grid>

             </Box>

             
             </Box>
          </CardContainer>

         </PageContainer>

         </div>
}
        </>
    )
}


/* */