"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { PageContainer, PrimaryTextField, AlertHandler } from "qssence-common";
import {
  Box,
  CardMedia,
  Card,
  Typography,
  Grid,
  IconButton,
  Avatar,
  Button,
  AlertColor,
  Divider,
} from "@mui/material";
import Background from "../../asserts/images/background.svg";
import LoginSvg from "../../asserts/images/login.svg";
import LogoNew from "../../asserts/images/QssenceLogoBlack.png";
import LogoOld from "../../asserts/images/ved.png";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ColorIconMicrosoft from "@/components/Icons/ColorIconMicrosoft";
import { signIn } from "next-auth/react";
import {getToken, setToken } from "@/utils/Auth/authService";
import { get } from "@/utils/ApiConfig";


interface LoginFormInputs {
  username: string;
  password: string;
}
const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [alertHandler, setAlertHandler] = useState({
    hasAlert: false,
    alertType: "success" as AlertColor,
    alertMessage: "",
    alertTitle: "",
  });
  const routers = useRouter();

  const  [loading, setLoading] = useState(true);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  {
    /* ********* Login Validation Schema Using Yup ******** */
  }
  const loginSchema = yup
    .object()
    .shape({
      username: yup.string().required("Username is required"),
      password: yup.string().required("Password is required"),
    })
    .required();

  {
    /* ********* Define React Hook Form  ******** */
  }

  const BaseURL=process.env.NEXT_PUBLIC_API_ENDPOINT;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
    criteriaMode: "all",
    mode: "onChange",
    reValidateMode: "onChange",
    delayError: 100,
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  }

  

//  useEffect(()=>
//       {
         
//           const fetchData = async () => {
//             try {
//               const data = await get<any>(
//                 `/mail/getAll`,
//                 {},
//                 "instance1",
//                 setAlertHandler
//               );
  
//               if(data.data.data.length===0)
//               {
               
               
//               } 
//               else 
//               {         
                 
                   
//               }
//                 setLoading(false)

//             } catch (error) {
//               console.log("Error fetching data:", error);
//                 setLoading(false)
//             }
//           };
  
//        if(loading)
//           {
//              fetchData(); 
//          }
  
//       },[loading])


  const onSubmit = async (data: LoginFormInputs) => {
    let userdata = {
      username: data.username,
      password: data.password,
    };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BaseURL}/auth/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: userdata,
    };

    axios
      .request(config)
      .then(async (response) => {
        setAlertHandler({
          hasAlert: true,
          alertMessage: "Login successfully!",
          alertType: "success",
          alertTitle: "Success",
        });

        // Set token first
        setToken(
          response.data.access_token,
          response.data.expires_in,
          response.data.refresh_token
        );

        // Call license API to check if license exists
        try {
          const licenseResponse = await get<any>(
            `/license/all`,
            {},
            "instance1",
            setAlertHandler
          );

          console.log(licenseResponse.data,"licenseResponse.data")

          if (licenseResponse.data.data && licenseResponse.data.data.length > 0) {

            routers.push("/home");

          } else {
            routers.push("/add_license_key");
          }
                 } catch (error) {
           console.log("Error fetching license data:", error);
           
           setAlertHandler({
             hasAlert: true,
             alertMessage: "Error fetching license data. Please try again.",
             alertType: "error",
             alertTitle: "Error",
           });
           
           routers.push("/add_license_key");
          }
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          setAlertHandler({
            hasAlert: true,
            alertMessage: "Network Error! Please try Again.",
            alertType: "error",
            alertTitle: "Error",
          });
        } else if (error.code === "ECONNABORTED") {
          setAlertHandler({
            hasAlert: true,
            alertMessage: "Something went wrong at our end. Please try again!",
            alertType: "error",
            alertTitle: "Error",
          });
        } else if (error.code === "ECONNREFUSED") {
          setAlertHandler({
            hasAlert: true,
            alertMessage: "Something went wrong at our end. Please try again!",
            alertType: "error",
            alertTitle: "Error",
          });
        } else if (error.code === "ECONNRESET") {
          setAlertHandler({
            hasAlert: true,
            alertMessage: "Something went wrong at our end. Please try again!",
            alertType: "error",
            alertTitle: "Error",
          });
        } else if (error.code === "ERR_BAD_REQUEST") {
          setAlertHandler({
            hasAlert: true,
            alertMessage: "Please fill correct information!",
            alertType: "error",
            alertTitle: "Error",
          });
        } else {
          setAlertHandler({
            hasAlert: true,
            alertMessage: "Already exist",
            alertType: "info",
            alertTitle: "Info",
          });
        }
      });
  };

  return (
    <PageContainer
      title="Login - Venturing Digitally Admin"
      description="Login - Venturing Digitally Admin Panel"
    >
      <AlertHandler alertHandler={alertHandler} />
      <Box sx={{ position: "relative", height: "100vh" }}>
        <CardMedia
          component="img"
          image={Background.src}
          sx={{ height: "100dvh" }}
        />
        <Box className="flex justify-center items-center absolute top-0 left-0 h-screen w-full p-3">
          <Card className="h-auto w-[80%]  md:w-[70%]">
            <Grid
              container
              rowSpacing={1}
              sx={{ margin: 0, padding: 0, height: "100%", width: "100%" }}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {/* ********* Left Side Card/Grid ******** */}
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                className="flex justify-center items-center"
              >
                <Box className="w-full h-full px-6 md:px-10 lg:px-16 xl:px-24 py-8 md:py-16">
                  <Typography variant="h1">Welcome</Typography>
                  <Typography
                    variant="h6"
                    sx={{ marginTop: "1.5rem", marginLeft: "3px" }}
                  >
                    {/* Log in to Qssence Web Admin */}
                    Log in to Venturing Digitally Web Admin
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "12px",
                      color: "#667085",
                      marginLeft: "3px",
                    }}
                  >
                    Please enter your credentials
                  </Typography>
                  {/* ********* Form Field ******** */}
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    onKeyDown={handleKeyDown}
                    noValidate
                    style={{ marginTop: "2rem" }}
                    className="flex flex-col gap-6"
                  >
                    {/* ********* Email Field ******** */}
                    <Controller
                      name="username"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <PrimaryTextField
                          id="username"
                          label="Username"
                          haserror={Boolean(error) || errorMessage}
                          errortext={error?.message}
                          {...field} // Spread field props (input props like onChange, onBlur, value)
                        />
                      )}
                    />
                    {/* ********* Password Field ******** */}
                    <Controller
                      name="password"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <PrimaryTextField
                          id="password"
                          label="Password"
                          haserror={Boolean(error) || errorMessage}
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
                          {...field} // Spread field props (input props like onChange, onBlur, value)
                        />
                      )}
                    />
                    
                    {/* ********* Forgot Password Button ******** */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0 }}>
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => {
                          routers.push("/forgot-password");
                        }}
                        sx={{
                          textTransform: 'none',
                          color: '#0B4A6F',
                          fontSize: '14px',
                          fontWeight: 500,
                          '&:hover': {
                            backgroundColor: 'transparent',
                            textDecoration: 'underline',
                          }
                        }}
                      >
                        Forgot Password?
                      </Button>
                    </Box>
                    
                    <Button
                      variant="contained"
                      size="small"
                      fullWidth
                      type="submit"
                      sx={{
                        mt: 0,
                        mb: 3,
                        height: "45px",
                        fontWeight: 700,
                      }}
                    >
                      Submit
                    </Button>
                  </form>
                  <Divider>Or Login with</Divider>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      mt: 3,
                      mb: 3,
                      height: "45px",
                      fontWeight: 700,
                    }}
                  >
                    <ColorIconMicrosoft />
                    <Typography sx={{ marginLeft: 2 }} variant="h5">
                      Microsoft
                    </Typography>
                  </Button>
                </Box>
              </Grid>

              {/* ********* Right Side Card/Grid ******** */}
              <Grid
                item
                xs={6}
                sx={{ display: { xs: "none", md: "flex" } }}
                className=" justify-center items-center bg-[#F8FCFE]"
              >
                <Box className="w-full h-full px-6 md:px-10 center lg:px-12 xl:px-16 py-4 md:py-10 lg:py-6">
                  <Image
                    src={LogoOld}
                    alt="logo"
                    width={200}
                    height={200}
                    className="mt-[50px]"
                  />
                  <Image
                    src={LoginSvg}
                    alt="LoginSvg"
                    style={{ marginTop: "1.5rem" }}
                    priority={true}
                  />
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Login;