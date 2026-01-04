"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import { setToken, getToken, logout, removeToken } from '@/utils/hooks/Auth/authService'
import { PageContainer, PrimaryTextField, CardContainer } from "qssence-common";
import { Box, CardMedia, Card, Typography, Grid, IconButton, Avatar, Button, Alert, Snackbar, Fade} from "@mui/material";
import Background from "../../asserts/images/background.svg";
import Logo from "../../asserts/images/Logo.svg";
import LoginSvg from "../../asserts/images/login.svg";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { url } from "inspector";
interface LoginFormInputs {
  email: string;
  password: string;
}
const Login = () => {


  const BaseURL = process.env.NEXT_PUBLIC_API_ENDPOINT;

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const routers = useRouter();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  {/* ********* Login Validation Schema Using Yup ******** */ }
  const loginSchema = yup
    .object()
    .shape({
      email: yup
        .string()
        .required("Email is required"),
      password: yup.string().required("Password is required"),
    })
    .required();

  {/* ********* Define React Hook Form  ******** */ }
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
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    let userdata = {
      username: data.email,
      password: data.password
    };

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BaseURL}/auth/login`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: userdata
    };

    axios.request(config)
      .then((response) => {
        setToken(response.data.accessToken,
          response.data.accessTokenExpiresAt,
          response.data.refreshToken,
          response.data.refreshTokenExpiresAt,
        );

        routers.push("/");
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessage(true)
      });
  };

  return (
    <PageContainer
      title="Login - Qssence User"
      description="Login - Qssence User Panel"
    >
      <Box sx={{ position: "relative", height: "100vh" }}>
        <CardMedia
          component="img"
          image={Background.src}
          sx={{ height: "100dvh" }}
        />
        <Box
          className="flex justify-center items-center absolute top-0 left-0 h-screen w-full p-3"
        >
          <Snackbar 
            open={errorMessage} 
            autoHideDuration={6000} 
            anchorOrigin={{ vertical:'top', horizontal:'right' }}
            key={"top" + "right"}
            TransitionComponent={Fade}
            // onClose={handleClose}
          >
            <Alert
              // onClose={handleClose}
              severity="error"
              variant="filled"
              sx={{ width: '100%' , height: '100%', display: 'justify-center'}}
              
            >
              Invalid Username or Password, Please try again!
            </Alert>
          </Snackbar>
          <Card className="w-[80%] h-[80%] md:w-[70%]">
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
                    Log in to Subscription Qssence
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
                    noValidate
                    style={{ marginTop: "2rem" }}
                    className="flex flex-col gap-6"
                  >
                    {/* ********* Email Field ******** */}
                    <Controller
                      name="email"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <PrimaryTextField
                          id="email"
                          label="Email"
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
                    <Button
                      variant="contained"
                      size="small"
                      fullWidth
                      type="submit"
                      sx={{
                        mt: 3,
                        mb: 3,
                        height: "45px",
                        fontWeight: 700,
                      }}
                    >
                      Submit
                    </Button>
                  </form>
                </Box>
              </Grid>

              {/* ********* Right Side Card/Grid ******** */}
              <Grid
                item
                xs={6}
                sx={{ display: { xs: "none", md: "flex" } }}
                className=" justify-center items-center bg-[#F8FCFE]"
              >
                <Box className="w-full h-full px-6 md:px-10  lg:px-12 xl:px-16 py-4 md:py-10 lg:py-6">
                  <Image src={Logo} alt="logo" width={300} height={300}/>
                  <Image
                    src={LoginSvg}
                    alt="LoginSvg"
                    style={{ marginTop: "-3.5rem" }}
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
