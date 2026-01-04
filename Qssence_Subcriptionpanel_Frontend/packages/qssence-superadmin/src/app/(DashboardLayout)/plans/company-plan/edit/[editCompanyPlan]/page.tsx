"use client"

import { PageContainer, CardContainer, CustomTextField, AlertHandler, PrimarySelectField } from "qssence-common";
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

export default function setEditCompanyPlan() {


   const [alertHandler, setAlertHandler] = useState<AlertHandlerState>({
    hasAlert: false,
    alertType: "info", // or whatever default value
    alertMessage: "",
    alertTitle: "", // or undefined if it’s allowed
  });



  const [loading, setLoading] =useState(true)



  const router =useRouter()

  const [companydata, setCompanyData] = useState([])

  const [userData, setUserData] = useState([])

  const [selectedValues, setSelectedValues] = useState<{ [key: string]: boolean }>({});

  const params = useParams();

  const [planAssignId, setPlanAssignId] = useState([]);

    const handleReset=()=>
    {
      router.push("/plans/company-plan")
    }  


const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  planId: string,
  feature: any
) => {
  const key = `${planId}:${feature.featuresId}`;
  const updated = { ...selectedValues };

  if (e.target.checked) {
    updated[key] = true;
  } else {
    delete updated[key];
  }

  setSelectedValues(updated);

  const grouped: { [key: string]: number[] } = {};

    Object.keys(updated).forEach(key => {
      const [pid, fid] = key.split(":").map(Number);
      if (!grouped[pid]) grouped[pid] = [];
      grouped[pid].push(fid);
    });

    const result: { planId: number; featureIds: number[] }[] = Object.entries(grouped).map(
      ([planId, featuresId]) => ({
        planId: Number(planId),
        featureIds:featuresId,
      })
    );

    setPlanAssignId(result);

 
};


    useEffect(() => {

      const urlId = params.editCompanyPlan;

      const fetchPlanAllData = async () => {
            try {
                const data = await get<any>(
                  `/plans/getAll`,
                  {},
                  "instance1",
                  setAlertHandler
                );
              
      
            const formattedData = data.data.data.map((sub: any, index:any) => {
    
              return {
                index: index+1,
                id:sub.planId,
                name:sub.name,
                description:sub.description,
                features: sub.features.map((feature: any) => ({
                  featuresId: feature.featuresId,
                  name: feature.name,
                })),
              };
            });

            setUserData(formattedData)
                  
            } catch (error) {
                    console.log("Error fetching data:", error);
              }
         };

       const fetchCompanyPlanData = async () => {
         try {
           const data = await get<any>("company-plan/companies-with-plans/getAll", {}, "instance1", setAlertHandler);
           
         const selectedCompany = data.data.data.find((sub: any) => sub.id === urlId);

      if (!selectedCompany) return;

      const formattedCompany = {
        id: selectedCompany.id,
        companyId: selectedCompany.id,
        companyName: selectedCompany.companyName,
        location: selectedCompany.location,
        email: selectedCompany.email,
        companyPlan: selectedCompany.plans,
      };
   
       const selectedFeatureMap: Record<string, boolean> = {};

      selectedCompany.plans.forEach((plan: any) => {
        plan.features.forEach((feature: any) => {
          const key = `${plan.planId}:${feature.featuresId}`
          selectedFeatureMap[key] = true;
        });
      });

      const result: { planId: number; featureIds: number[] }[] = [];

      selectedCompany.plans.forEach((plan: any) => {
      const featureIds = plan.features.map((feature: any) => feature.featuresId);
      result.push({
        planId: plan.planId,
        featureIds: featureIds,
      });
    }); 

       setPlanAssignId(result)
      

      setSelectedValues(selectedFeatureMap);
           setCompanyData([formattedCompany]);
            setLoading(false);

         } catch (error) {
           console.error("Error fetching data:", error);
         }
       };

           
   
       if (loading) {
         fetchPlanAllData();
         fetchCompanyPlanData()
       }
     }, [loading]);
   
      const handleSubmit=async ()=>
    {

       
       const urlId = params.editCompanyPlan;

       const updatedData = {

         companyId:urlId,
         plans:planAssignId
      };


      try {
        
        const response = await put<any>(
          `/company-plan/update-plan/${urlId}`,
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
        }
        router.push("/plans/company-plan")

      } catch (error) {
        console.log("Error fetching data:", error);
      }

    } 


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

        <h1 className="header_title primary_color"> Edit Plans</h1>

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


   <Grid container spacing={4} style={{ marginTop: "0px" }}>

      {userData.map((plan, planIndex) => (
     
       <Grid item xs={12} sm={12} md={12}>
       
        <div className="title primary_color">{plan.name}</div>

      <Grid container spacing={2} style={{ marginTop: "0px" }}>

     {plan.features.map((feature, featureIndex) => {
        const key = `${plan.id}:${feature.featuresId}`;
        return (
          <Grid item xs={12} sm={6} md={4} key={`feature-${planIndex}-${featureIndex}`}>
            <FormControl component="fieldset" style={{ width: "90%" }}>
              <FormGroup>
                <Box style={{ display: 'flex', gap: "8px", alignItems: "center" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!selectedValues[key]}
                        onChange={(e) => handleChange(e, plan.id, feature)}
                        name={key}
                        color="primary"
                      />
                    }
                    label={feature.name}
                  />
                </Box>
              </FormGroup>
            </FormControl>
          </Grid>
        );
      })}
   
    </Grid>
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
