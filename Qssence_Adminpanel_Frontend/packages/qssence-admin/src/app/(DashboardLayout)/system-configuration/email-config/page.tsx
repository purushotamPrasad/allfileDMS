'use client'

import { AlertColor, Avatar, Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { IconEdit, IconEye, IconEyeOff, IconMail, IconTrash } from "@tabler/icons-react";
import { AlertHandler, CardContainer, CommonDialogWorkflow, PageContainer, PrimarySelectField, PrimaryTextField } from "qssence-common";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { post, get, put } from "@/utils/ApiConfig";
import { useDispatch, useSelector } from "react-redux";
import { SetupEmailData } from "@/components/Redux/action";




export default function IdentityProvider() {

  const [emailData, setEmailData] = useState<{ id:number; email: string; password: string, mailPort:number, mailHost:string,providerName:string }[]>([]);
  const [view, setView] = useState(false)

 // const emailConfig = useSelector((state: RootState) => state.emailConfig);

  const [emailConfig, setEmailConfig] = useState(false)

  const smtpProviders = {
    Gmail: { host: "smtp.gmail.com", port: 587, domain: "@gmail.com" },
    Yahoo: { host: "smtp.mail.yahoo.com", port: 465, domain: "@yahoo.com" },
    Outlook: { host: "smtp.office365.com", port: 587, domain: "@outlook.com" },
    Zoho: { host: "smtp.zoho.com", port: 465, domain: "@zoho.com" },
    SendGrid: { host: "smtp.sendgrid.net", port: 2525, domain: "@sendgrid.com" },
    "AWS SES": { host: "email-smtp.us-east-1.amazonaws.com", port: 587, domain: "@aws.com" },
  };

  const [loading, setloading]=useState(true)


  useEffect(()=>
    {
       
        const fetchData = async () => {
          try {
            const data = await get<any>(
              `/mail/getAll`,
              {},
              "instance1",
              setAlertHandler
            );

            if(data.data.data.length===0)
            {
                 setEmailConfig(false)
              dispatch(SetupEmailData(false))
            } 
            else {         
            const formattedData = data.data.data.map((config: any, index:any) => {
    
              return {
                index: index+1,
                id:config.id,
                email:config.mailUsername,
                password:config.mailPassword,
                providerName:config.providerName,
                mailHost:config.mailHost,
                mailPort:config.mailPort,
              };
            });
         
            dispatch(SetupEmailData(true))
            setEmailData(formattedData);
            if (emailConfig && formattedData.length > 0) {
              reset({
                email: formattedData[0]?.email || "",
                password: formattedData[0]?.password || "",
                mailPort: formattedData[0]?.mailPort || "",
                mailHost:formattedData[0]?.mailHost || "",
                providerName:formattedData[0]?.providerName || ""
              });
            }
              setEmailConfig(true)

          }
       
          setloading(false)
          } catch (error) {
            console.log("Error fetching data:", error);
                setloading(false)
          }
        };

     if(loading)
        {
           fetchData(); 
       }

    },[loading])



type AddPlantFormInputs = {
        [x: string]: any;
   
        email?: string;
        password?: any;
        mailPort?:any;
        mailHost?:any;
        providerName?:any;
    };

    const AddUserSchema = yup.object().shape({

      email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required")
      .test("domain-check", "Invalid email domain", function(value) {
        const { providerName } = this.parent;
        if (providerName && smtpProviders[providerName]) {
          const domain = smtpProviders[providerName].domain;
          if (value && !value.endsWith(domain)) {
            return false; 
          }
        }
        return true; 
      }),
        password:
            yup
              .string()
              .required("Password is required"),
          mailPort:yup.number()
          .oneOf([465, 587, 2525], "Invalid port selected")
          .required("Port is required"),
          mailHost: yup
          .string()
          .required("Mail host is required"),
          providerName: yup
          .string()
          .required("Select at least one provider name"),

      });
      const {
        control,
        watch,
        setValue,
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
          email:emailConfig?emailData[0]?.email:"",
          password:emailConfig?emailData[0]?.password:"",
          mailPort:emailConfig?emailData[0]?.mailPort:null,
          mailHost:emailConfig?emailData[0]?.mailHost:"",
          providerName:emailConfig?emailData[0]?.providerName:""
        },
      });

      const [showPassword, setShowPassword] = useState(false);

      const [viewPassword, setViewPassword] = useState(false);

      const handleTogglePasswordVisibility = () => {
        setViewPassword(true);
        setTimeout(() => {
          setViewPassword(false);
        }, 1500);
      };

    
      const dispatch = useDispatch()

      const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
      };
 
    const [alertHandler, setAlertHandler] = useState({
        hasAlert: false,
        alertType: "success" as AlertColor,
        alertMessage: "",
        alertTitle: "",
    });

    const isSmScreen = useMediaQuery('(max-width:768px)');

    const [open, setOpen] = useState(false)

    const handleSetup=()=>
    {
        setView(true)
        setOpen(true)
    }

    const handleCancel=()=>
    {
        reset()
        setOpen(false)
    }

    const selectedProvider = watch("providerName");

    useEffect(() => {
      if (selectedProvider && smtpProviders[selectedProvider]) {
        setValue("mailHost", smtpProviders[selectedProvider].host);
        setValue("mailPort", smtpProviders[selectedProvider].port);
       
      }
     
    }, [selectedProvider, setValue]);

    const onSubmit = async (data: AddPlantFormInputs) => {
       
       try {

           const userdata = {
            providerName: data.providerName,
            mailHost: data.mailHost,
            mailPort: data.mailPort,
            mailUsername: data.email,
            mailPassword: data.password,
            mailProtocol: "smtp",
            mailAuth: true,
            mailStarttlsEnable: true,
            mailDefaultEncoding: "UTF-8"
          };
        if(view)
        {
          const response = await post<any>(
            "/mail/add",
              userdata,
            setAlertHandler
          );
      

         if (response.status ===200) {
          
            setAlertHandler({
              hasAlert: true,
              alertMessage: "Mail Configuration saved successfully!",
              alertType: "success",
              alertTitle: "Success",
            });
             setEmailConfig(true)
            dispatch(SetupEmailData(true))
            setloading(true)
            reset()
            setOpen(false)
          }
          else{
            reset()
            setOpen(false)
          } 
             setloading(true)
        }
        else {
          const response = await put<any>(
            `/mail/update/${emailData[0].id}`,
             userdata,
            setAlertHandler
          );
         
          if (response.status === 200) {
            setAlertHandler({
              hasAlert: true,
              alertMessage: "Mail Configuration edit successfully!",
              alertType: "success",
              alertTitle: "Success",
            });
            dispatch(SetupEmailData(true))
            setloading(true)
            reset()
            setOpen(false)
          } else {
             reset()
             setOpen(false)
          }
             setloading(true)
        }
         
       } catch (error) {
         console.log("Error fetching data:", error);
       }
     };

  const handEditOpenData=()=>
  {
       setView(false)
       setOpen(true)
  }


    return(
           <>
             
              {loading? 
                
                 <>
                     <div>Loading</div>
                 </>
                 :
               

             <PageContainer title="Email Config" description="Email Config" >
            <AlertHandler alertHandler={alertHandler} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
           
            <h1 className="header_title primary_color paddingBlock">
                 Email Config
             </h1>
  
            </div>

            <CardContainer>
             
            {emailConfig ? 
            
            <Box style={{width:"100%"}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={isSmScreen?12:6} md={4}>
                <Box className="config">
                <Box style={{display:"flex", justifyContent:"space-between"}}>
                <IconMail style={{width:"50px", height:"50px"}}/>
                    
              <Box>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handEditOpenData}
                >
                  <IconEdit height={20} width={20} className="primary_color"/>
                </IconButton>
             </Box>

             </Box>

              <Typography variant="h4" style={{fontSize:"18px", paddingBottom:"4px"}}>Configured Email</Typography>
              <Box style={{display:"grid",gridRowGap:"4px" }}>
              <Typography style={{display:"flex", alignItems:"center", gridColumnGap:"10px"}}>
                  <span className="title">Provider Name:</span> {emailData[0]?.providerName}
                </Typography>
                <Typography style={{display:"flex", alignItems:"center", gridColumnGap:"10px"}}>
                  <span className="title">Email:</span> {emailData[0]?.email}
                </Typography>
                <Typography style={{display:"flex", alignItems:"center", gridColumnGap:"10px"}}>
                  <span className="title">Password:</span>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", width:"100%"}}>
                  {viewPassword ? emailData[0]?.password : "********"}
                  
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    aria-label="toggle password visibility"
                  >
                    {viewPassword ? <IconEye width={18} height={18} className="primary_color" /> : <IconEyeOff width={18} height={18} className="primary_color" />}
                  </IconButton>
                  </div>
                </Typography>
              </Box>
              </Box>
              </Grid>
              </Grid>
             </Box>
            : <Box style={{width:"100%"}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={isSmScreen?12:6} md={4}>
                <Box className="config">
              <IconMail style={{width:"50px", height:"50px"}}/>
              <Typography variant="h4" style={{fontSize:"18px"}}>Configure Email</Typography>
              <p>Set up your email to enable secure communication, including sending and receiving information.</p>
              <Box  style={{display:"flex", justifyContent:"flex-end"}}>
              <Button variant="contained" color="primary" onClick={handleSetup}>Setup</Button>
              </Box>
              </Box>
              </Grid>
              </Grid>
             </Box>
           }
   
            </CardContainer>

           {open && 
              <CommonDialogWorkflow
              dialogTitle={view?"View Email Configure":"Edit Email Configure"}
              dialogContent={<>
               <form style={{display:"grid", gridRowGap:"16px"}} onSubmit={handleSubmit(onSubmit)} noValidate>
               <Controller
              name="providerName"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <PrimarySelectField
                  {...field}
                  id="providerName"
                  label={
                    <>
                      Select Provider Name
                      <span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                    </>
                  }
                  hasError={Boolean(error)}
                  errorText={error?.message}
                  menuItems={Object.keys(smtpProviders).map((provider) => ({
                    value: provider,
                    label: provider,
                  }))}
                  
                />
              )}
            />

        <Controller
          name="mailHost"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <PrimaryTextField
              {...field}
              id="mailHost"
              label={
                <>
                  Mail Host
                  <span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                </>
              }
              haserror={Boolean(error)}
              errortext={error?.message}
              InputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }} 
            />
          )}
      />
          <Controller
            name="mailPort"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <PrimaryTextField
                {...field}
                id="mailPort"
                label={
                  <>
                    Mail Port
                    <span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                  </>
                }
                haserror={Boolean(error)}
                errortext={error?.message}
                InputProps={{ readOnly: true }}
               InputLabelProps={{ shrink: true }} 
              />
            )}
          />

                <Controller
                name="email"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <PrimaryTextField
                    id="email"
                    label={
                      <>
                       Enter Email<span style={{ color: "rgba(240, 68, 56, 1)" }}> *</span>
                      </>
                      }
                    haserror={Boolean(error)}
                    errortext={error?.message}
                    {...field}
                     InputLabelProps={{ shrink: true }} 
                  />
                )}
              />

              <Controller
              name="password"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <PrimaryTextField
                  id="password"
                  label="Enter Password"
                  haserror={Boolean(error)}
                  errortext={error?.message}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <IconButton
                      onClick={handleClickShowPassword}
                      sx={{ background: "#F3F6FB" }}
                    >
                      {showPassword ? (
                        <Avatar
                          src="/eye.svg"
                          alt="VisibilityOn"
                          sx={{ width: 18, height: 18 }}
                        />
                      ) : (
                        <Avatar
                          src="/eye-off.svg"
                          alt="VisibilityOff"
                          sx={{ width: 18, height: 18 }}
                        />
                      )}
                    </IconButton>
                  }
                  {...field} 
                   InputLabelProps={{ shrink: true }} 
                />
              )}
            />
         <Box style={{ display: "flex", gridColumnGap: "20px", justifyContent:"flex-end" }}>
              <Button
              variant="outlined"
              size="small"
              onClick={handleCancel}
              sx={{
                height: "45px",
                fontWeight: 700,
              }}
              style={{backgroundColor:"#ffffff", paddingInline:"30px"}}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              type="submit"
              sx={{
                height: "45px",
                fontWeight: 700,
                
              }}
              style={{backgroundColor:"rgba(11, 74, 111, 1)", paddingInline:"30px"}}
            >
              Save
            </Button>
            </Box>
            </form>
            </>
              }
              onSave={() => {
                console.log("save");
              }}
              open={open}
              setOpen={setOpen}
            />

           } 
           
        </PageContainer>

      }  
           </>
       
      
    )
}