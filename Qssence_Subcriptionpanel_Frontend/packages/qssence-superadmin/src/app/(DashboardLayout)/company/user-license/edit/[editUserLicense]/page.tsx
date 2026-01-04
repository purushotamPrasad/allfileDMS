"use client";

import React, {useEffect, useState} from 'react';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, AlertColor, RadioGroup, FormControlLabel, Radio, FormHelperText } from '@mui/material';
import { useMediaQuery } from "@mui/material";

import { PageContainer, CardContainer, AlertHandler} from "qssence-common"
import { get, put } from '@/utils/ApiConfig';
import { useRouter } from "next/navigation";
import { useParams } from 'next/navigation';




interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle: string | undefined;  
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
}

export default function EditLicense(){

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
  });

 const isSmScreen = useMediaQuery('(max-width:768px)');

  const params = useParams();

  const urlId = params.editUserLicense;

 const [formErrors, setFormErrors] = useState<Partial<FormDataType>>({});

   const router = useRouter()

    const [alertHandler, setAlertHandler] = useState<AlertHandlerState>({
      hasAlert: false,
      alertType: "info", 
      alertMessage: "",
      alertTitle: "", 
    });

  const validateForm = () => {

    let errors: Partial<FormDataType> = {}; 

    if (!formData.companyName) errors.companyName = "Company is required";
    if (!formData.expiryDate) errors.expiryDate = "Expiration Date is required";
    if (!formData.total_user_access) errors.total_user_access = "Total User Access is required";
    if (!formData.admin_account_allowed) errors.admin_account_allowed = "Admin account count is required";
    if (!formData.user_account_allowed) errors.user_account_allowed = "User account count is required";
    if (!formData.purchase_date) errors.purchase_date = "Purchase Date is required";
    if (!formData.purchase_cost) errors.purchase_cost = "Purchase Cost is required";
    if (!formData.description) errors.description = "Description is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
    
  };

const handleInputChange = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {

   const { name, value } = event.target;

   let errors: Partial<FormDataType> = {}; 

  const numberFields = [
    "admin_account_allowed",
    "user_account_allowed",
    "total_user_access",
    "purchase_cost"
  ];

  let updatedValue = value;

  if (numberFields.includes(name)) {
    const parsed = Number(value);
    updatedValue = isNaN(parsed) || parsed < 0 ? "0" : String(parsed);
  }

  const currentTotal = name === "total_user_access"
    ? Number(updatedValue)
    : Number(formData.total_user_access);

    if (
      (name === "admin_account_allowed" || name === "user_account_allowed") && formData.total_user_access==="" 
    ) {
      errors.admin_account_allowed = "Please enter Total User Access first.";
      errors.user_account_allowed = "Please enter Total User Access first.";
      setFormErrors(errors)
      return;
    }
    else {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }

      let updatedFormData = {
        ...formData,
        [name]: updatedValue,
      };

      if (name === "admin_account_allowed") {
        const admin = Number(updatedValue);
        updatedFormData.user_account_allowed = String(Math.max(0, currentTotal - admin));
      } else if (name === "user_account_allowed") {
        const user = Number(updatedValue);
        updatedFormData.admin_account_allowed = String(Math.max(0, currentTotal - user));
      }
    
     const adminCount = Number(updatedFormData.admin_account_allowed);
     const userCount = Number(updatedFormData.user_account_allowed);

    if (adminCount + userCount > currentTotal) {
       errors.user_account_allowed = `Total accounts must be ${currentTotal}.`;
       setFormErrors(errors)

    } else {
        setFormErrors(null)
    }

    setFormData(updatedFormData);
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
    
};



 const [loading, setLoading] = useState(true)

    useEffect(() => {

      const fetchData = async () => {

        try {
          const data = await get<any>(`licenses/${urlId}`, {}, "instance1", setAlertHandler);


          const formattedData = {
                companyName: data.data.data.companyName,
                applicationPlan: data.data.data.plans.map((plan: any) => plan.name).join(' + '),
                purchase_cost:data.data.data.purchaseCost,
                location:data.data.data.location,
                total_user_access: data.data.data.totalUserAccess,
                admin_account_allowed: data.data.data.adminAccountAllowed,
                user_account_allowed: data.data.data.userAccountAllowed,
                companyId:data.data.data.companyId,
                purchase_date: new Date(data.data.data.purchaseDate).toISOString().split("T")[0] || "",
                expiryDate: new Date(data.data.data.expiryDate).toISOString().split("T")[0] || "",
                description:data.data.data.description
,
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


// const handleCompanyChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
  
//   const selectedCompanyName = event.target.value as string;
 
//   const selectedCompany = companyList.find(
//     (company: any) => company.companyName === selectedCompanyName
//   );

//   const companyPlan = await get<any>("/company-plan/companies-with-plans/getAll", {}, "instance1", setAlertHandler);
//   const filteredCompanyPlanData = companyPlan.data.data
//   .filter((sub: any) => sub.id === selectedCompany.companyId) 
//   .map((sub: any) => ({
//     companyId: sub.id,
//     companyName: sub.companyName,
//     location: sub.location,
//     plans: sub.plans.map((plan: any) => plan.name).join(' + ')
//   }));

//   setFormData({
//     ...formData,  
//     companyId:filteredCompanyPlanData[0].companyId,
//     applicationPlan: filteredCompanyPlanData[0].plans,
//     location:filteredCompanyPlanData[0].location,
//     companyName:filteredCompanyPlanData[0].companyName
//   });

// };

    const handleSubmit=async ()=>
        {
         
          if (!validateForm()) return;

          const updatedData = {
            companyId: formData.companyId,
            expiryDate: formData.expiryDate, 
            purchaseDate: formData.purchase_date,
           purchaseCost: formData.purchase_cost,
           totalUserAccess: parseInt(formData.total_user_access),
           adminAccountAllowed: parseInt(formData.admin_account_allowed),
           userAccountAllowed: parseInt(formData.user_account_allowed),
           description: formData.description
           
         };

          try {
            
            const response = await put<any>(
              `/licenses/update/${urlId}`,
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
               router.push(`/company/user-license`);
               setFormData({
                companyName:"",
                applicationPlan:"",
                expiryDate:"",
                location:"",
                admin_account_allowed:"",
                user_account_allowed:"",
                companyId:"",
                purchase_date:"",
                purchase_cost:"",
                total_user_access:"",
                description:"",})
            }
   
          } catch (error) {
            console.log("Error fetching data:", error);
          }
        } 


    const handleReset=()=>
        {
            setFormData({
              companyName:"",
              applicationPlan:"",
              expiryDate:"",
              location:"",
              admin_account_allowed:"",
              user_account_allowed:"",
              companyId:"",
              purchase_date:"",
              purchase_cost:"",
              total_user_access:"",
              description:"",
            })

          router.push(`/company/user-license`);
          
        }     

    return (
        <>

         <AlertHandler alertHandler={alertHandler} />

   <div style={{
                width: "100%!important",
                background: "#E5EEF5",
                minHeight: "100vh",
                paddingInline:"20px"
            }}>

          <div className="description">

          <h1 className="header_title primary_color">Edit Software License</h1>

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

          <Box style={{ height: "90vh", overflow: "scroll",padding:"20px" }}>

          <Box className="title" style={{paddingBottom:"20px"}}>Software License Details</Box>  

          <Grid container spacing={6} style={{marginTop:"0px"}}>

            <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6} style={{paddingTop:"0px"}}>
                <Box style={{display:"grid",gridRowGap:"20px"}}>
              
                {/* <div  style={{display:'grid', gridTemplateColumns:"0.75fr 1fr"}}>
                <div className='fontWeight500'>Company<span style={{color:"rgba(240, 68, 56, 1)"}}>*</span></div>
                <FormControl size="small" error={!!formErrors.companyName} sx={{ width: "100%" }}>
                <Select
                   size="small"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleCompanyChange} 
                  variant="outlined"
                  sx={{
                    boxShadow: "none",
                    background: "#E4EDF6",
                    borderRadius: "4px",
                    ".MuiOutlinedInput-notchedOutline": { border: 0 }
                  }}
                  inputProps={{
                    shrink: true, 
                  }}
                >
                  <MenuItem value="">Select Company</MenuItem>
                  {companyList.map((company: any) => (
                    <MenuItem key={company.companyId} value={company.companyName}>
                      {company.companyName}
                    </MenuItem>
                  ))}
                  
                </Select>
                {formErrors.companyName && (
                  <FormHelperText>{formErrors.companyName}</FormHelperText>
                )}
                 </FormControl>
                </div> */}
                  <div  style={{display:'grid', gridTemplateColumns:"0.75fr 1fr"}}>
                <div className='fontWeight500'>Company<span style={{color:"rgba(240, 68, 56, 1)"}}>*</span></div>
             <FormControl size="small" error={!!formErrors.companyName} sx={{ width: "100%" }}>
                <TextField
                fullWidth
                size="small"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  variant="outlined"
                  inputProps={{ readOnly: true }}
                  sx={{ boxShadow: 'none', background:"#E4EDF6",borderRadius:"4px", '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                />
                   
                 </FormControl>
                </div>

                <div  style={{display:'grid', gridTemplateColumns:"0.75fr 1fr"}}>
                <div className='fontWeight500'> Application Plan <span style={{color:"rgba(240, 68, 56, 1)"}}>*</span> </div>
                <FormControl size="small" error={!!formErrors.applicationPlan} sx={{ width: "100%" }}>
                <TextField
                fullWidth
                size="small"
                  name="applicationPlan"
                  value={formData.applicationPlan}
                  onChange={handleInputChange}
                  variant="outlined"
                  inputProps={{ readOnly: true }}
                  sx={{ boxShadow: 'none', background:"#E4EDF6",borderRadius:"4px", '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                />
                   
                 </FormControl>
                </div>

                <div  style={{display:'grid', gridTemplateColumns:"0.75fr 1fr"}}>
                <div className='fontWeight500'>Expiration Date<span style={{color:"rgba(240, 68, 56, 1)"}}>*</span></div>
                <FormControl size="small" error={!!formErrors.expiryDate} sx={{ width: "100%" }}>
                  <TextField
                    fullWidth
                    size="small"
                    type='date'
                    name="expiryDate"
                    value={formData.expiryDate || ""}
                    onChange={handleInputChange}
                     inputProps={{
                     min: formData.purchase_date || undefined, 
                    }}
                    variant="outlined"
                    sx={{
                      boxShadow: "none",
                      background: "#E4EDF6",
                      borderRadius: "4px",
                      ".MuiOutlinedInput-notchedOutline": { border: 0 }
                    }}
                  />
                    {formErrors.expiryDate && (
                                <FormHelperText>{formErrors.expiryDate}</FormHelperText>
                              )}
                </FormControl>

            </div>


                <div  style={{display:'grid', gridTemplateColumns:"0.75fr 1fr"}}>
                <div className='fontWeight500'>Location<span style={{color:"rgba(240, 68, 56, 1)"}}>*</span></div>
                <FormControl size="small" error={!!formErrors.location} sx={{ width: "100%" }}>
                  <TextField
                    fullWidth
                    size="small"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleInputChange}
                    variant="outlined"
                    inputProps={{ readOnly: true }}
                    sx={{
                      boxShadow: "none",
                      background: "#E4EDF6",
                      borderRadius: "4px",
                      ".MuiOutlinedInput-notchedOutline": { border: 0 }
                    }}
                  />
                    
                </FormControl>


                </div>
                <div  style={{display:'grid', gridTemplateColumns:"0.75fr 1fr"}}>
                <div className='fontWeight500'>Admin account Allowed<span style={{color:"rgba(240, 68, 56, 1)"}}>*</span></div>
                <FormControl size="small" error={!!formErrors.admin_account_allowed} sx={{ width: "100%" }}>
                  <TextField
                    fullWidth
                    size="small"
                    name="admin_account_allowed"
                    value={formData.admin_account_allowed}
                    onChange={handleInputChange}
                    variant="outlined"
                    sx={{
                      boxShadow: "none",
                      background: "#E4EDF6",
                      borderRadius: "4px",
                      ".MuiOutlinedInput-notchedOutline": { border: 0 }
                    }}
                  />
                    {formErrors.admin_account_allowed && (
                        <FormHelperText>{formErrors.admin_account_allowed}</FormHelperText>
                      )}
                </FormControl>

                </div>

                <div  style={{display:'grid', gridTemplateColumns:"0.75fr 1fr"}}>
                <div className='fontWeight500'>User account allowed<span style={{color:"rgba(240, 68, 56, 1)"}}>*</span></div>
                  
                <FormControl size="small" error={!!formErrors.user_account_allowed} sx={{ width: "100%" }}>
                  <TextField
                    fullWidth
                    size="small"
                    name="user_account_allowed"
                    value={formData.user_account_allowed}
                    onChange={handleInputChange}
                    variant="outlined"
                    sx={{
                      boxShadow: "none",
                      background: "#E4EDF6",
                      borderRadius: "4px",
                      ".MuiOutlinedInput-notchedOutline": { border: 0 }
                    }}
                  />
                    {formErrors.user_account_allowed && (
                        <FormHelperText>{formErrors.user_account_allowed}</FormHelperText>
                      )}
                </FormControl>

                </div>

                {/* <div  style={{display:'grid', gridTemplateColumns:"0.75fr 1fr"}}>
                <div className='fontWeight500'>Admin</div>
              <TextField
                fullWidth
                size="small"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ boxShadow: 'none', justifySelf:"end", background:"#E4EDF6",borderRadius:"4px", '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                />
                </div> */}

                {/* <div  style={{display:'grid', gridTemplateColumns:"0.75fr 1fr"}}>
                <div className='fontWeight500'>Allocated To Plant & Division<span style={{color:"rgba(240, 68, 56, 1)"}}>*</span></div>
              <TextField
                fullWidth
                size="small"
                  name="owning_facility"
                  value={formData.owning_facility}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ boxShadow: 'none', background:"#E4EDF6",borderRadius:"4px", '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                />
                </div> */}
                </Box>
              </Grid>



            <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6} style={{paddingTop:"0px"}}>
            <Box style={{display:"grid",gridRowGap:"20px"}}>
                <div  style={{display:'grid', gridTemplateColumns:"0.75fr 1fr", height:'fit-content'}}>
                <div className='fontWeight500'>Company ID<span style={{color:"rgba(240, 68, 56, 1)"}}>*</span></div>

                <FormControl size="small" error={!!formErrors.companyId} sx={{ width: "100%" }}>
                  <TextField
                    fullWidth
                    size="small"
                    name="companyId"
                    value={formData.companyId}
                    onChange={handleInputChange}
                    variant="outlined"
                    inputProps={{ readOnly: true }}
                    sx={{
                      boxShadow: "none",
                      background: "#E4EDF6",
                      borderRadius: "4px",
                      ".MuiOutlinedInput-notchedOutline": { border: 0 }
                    }}
                  />
                   
                </FormControl>      
                </div>

              
                <div  style={{display:'grid', gridTemplateColumns:"0.75fr 1fr", height:'fit-content'}}>
                <div className='fontWeight500'>Purchase Date <span style={{color:"rgba(240, 68, 56, 1)"}}>*</span></div>

                <FormControl size="small" error={!!formErrors.purchase_date} sx={{ width: "100%" }}>
                  <TextField
                    fullWidth
                    type='date'
                    size="small"
                    name="purchase_date"
                    value={formData.purchase_date}
                    onChange={handleInputChange}
                    variant="outlined"
                    sx={{
                      boxShadow: "none",
                      background: "#E4EDF6",
                      borderRadius: "4px",
                      ".MuiOutlinedInput-notchedOutline": { border: 0 }
                    }}
                  />
                    {formErrors.purchase_date && (
                        <FormHelperText>{formErrors.purchase_date}</FormHelperText>
                      )}
                </FormControl>  
                
              
                </div>

                <div  style={{display:'grid', gridTemplateColumns:"0.75fr 1fr", height:'fit-content'}}>
                <div className='fontWeight500'>Purchase Cost (₹)<span style={{color:"rgba(240, 68, 56, 1)"}}>*</span></div>

                <FormControl size="small" error={!!formErrors.purchase_cost} sx={{ width: "100%" }}>
                  <TextField
                    fullWidth
                    size="small"
                    name="purchase_cost"
                    value={formData.purchase_cost}
                    onChange={handleInputChange}
                    variant="outlined"
                    sx={{
                      boxShadow: "none",
                      background: "#E4EDF6",
                      borderRadius: "4px",
                      ".MuiOutlinedInput-notchedOutline": { border: 0 }
                    }}
                  />
                    {formErrors.purchase_cost && (
                        <FormHelperText>{formErrors.purchase_cost}</FormHelperText>
                      )}
                </FormControl>  

               
                </div>
               
           
                <div  style={{display:'grid', gridTemplateColumns:"0.75fr 1fr", height:'fit-content'}}>
                <div className='fontWeight500'>Total User Access <span style={{color:"rgba(240, 68, 56, 1)"}}>*</span></div>

                <FormControl size="small" error={!!formErrors.total_user_access} sx={{ width: "100%" }}>
                  <TextField
                    fullWidth
                    size="small"
                    name="total_user_access"
                    value={formData.total_user_access}
                    onChange={handleInputChange}
                    variant="outlined"
                    sx={{
                      boxShadow: "none",
                      background: "#E4EDF6",
                      borderRadius: "4px",
                      ".MuiOutlinedInput-notchedOutline": { border: 0 }
                    }}
                  />
                    {formErrors.total_user_access && (
                        <FormHelperText>{formErrors.total_user_access}</FormHelperText>
                      )}
                </FormControl> 

                </div>

                <div  style={{display:'grid', gridTemplateColumns:"0.75fr 1fr", height:'fit-content'}}>
                <div className='fontWeight500'>Description<span style={{color:"rgba(240, 68, 56, 1)"}}>*</span></div>

                <FormControl size="small" error={!!formErrors.description} sx={{ width: "100%" }}>
                  <TextField
                    fullWidth
                    type='text'
                    size="small"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    variant="outlined"
                    sx={{
                      boxShadow: "none",
                      background: "#E4EDF6",
                      borderRadius: "4px",
                      ".MuiOutlinedInput-notchedOutline": { border: 0 }
                    }}
                  />
                    {formErrors.description && (
                        <FormHelperText>{formErrors.description}</FormHelperText>
                      )}
                </FormControl> 

                
                </div>
           </Box>
              </Grid>

              </Grid>

           
        {/*   <Box className="title" style={{paddingBlock:"20px"}}>Additional information</Box>  

          <Grid container spacing={6} style={{ marginTop: '0px', display:"flex", justifyContent:"flex-end"  }}>

          <Grid item xs={12} sm={isSmScreen ? 12 : 6} md={6} style={{ paddingTop: '0px' }}>
            
          <div  style={{display:'grid', gridTemplateColumns:"0.75fr 1fr", height:'fit-content'}}>
              <div className="fontWeight500">Additional</div>
              <TextField
                fullWidth
                size="small"
                name="rim_event_id"
                value={formData.rim_event_id}
                onChange={handleInputChange}
                variant="outlined"
                sx={{
                  boxShadow: 'none',
                  background: '#E4EDF6',
                  borderRadius: '4px',

                  '.MuiOutlinedInput-notchedOutline': { border: 0 },
                }}
              />
            </div>
          </Grid>
        </Grid>
*/}

          </Box> 
              
          </CardContainer>

         </PageContainer>
         </div>
        </>
    )
}



/* */