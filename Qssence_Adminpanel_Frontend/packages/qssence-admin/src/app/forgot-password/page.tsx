"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageContainer, PrimaryTextField, AlertHandler } from "qssence-common";
import { post } from "@/utils/ApiConfig";
import {
  Box,
  CardMedia,
  Card,
  Typography,
  Grid,
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
import { IconArrowNarrowLeft } from "@tabler/icons-react";

interface ForgotPasswordFormInputs {
  username: string;
}

const ForgotPassword = () => {
  const [alertHandler, setAlertHandler] = useState({
    hasAlert: false,
    alertType: "success" as AlertColor,
    alertMessage: "",
    alertTitle: "",
  });
  const routers = useRouter();



  // Validation schema
  const forgotPasswordSchema = yup
    .object()
    .shape({
      username: yup.string().required("Username is required"),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    criteriaMode: "all",
    mode: "onChange",
    reValidateMode: "onChange",
    delayError: 100,
    defaultValues: {
      username: "",
    },
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(onSubmit)(event);
    }
  };

  const onSubmit = async (data: ForgotPasswordFormInputs) => {
    try {
      const response = await post<any>(
        `/auth/forgot-password`,
        { username: data.username },
        setAlertHandler
      );
      
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Reset link sent successfully! Please check your email.",
        alertType: "success",
        alertTitle: "Success",
      });

      // Navigate to reset password page with username
      setTimeout(() => {
        routers.push(`/reset-password?username=${encodeURIComponent(data.username)}`);
      }, 2000);

    } catch (error) {
      console.log("Error in forgot password:", error);
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Something went wrong. Please try again.",
        alertType: "error",
        alertTitle: "Error",
      });
    }
  };

  const handleBack = () => {
    routers.push("/login");
  };

  return (
    <PageContainer
      title="Forgot Password - Venturing Digitally Admin"
      description="Forgot Password - Venturing Digitally Admin Panel"
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
                  <Box style={{ display: "flex", alignItems: "center", marginBottom: "2rem" }}>
                    <IconArrowNarrowLeft 
                      style={{ cursor: "pointer", marginRight: "10px" }} 
                      onClick={handleBack}
                    />
                    <Typography variant="h2">Forgot Password</Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ marginTop: "1.5rem", marginLeft: "3px" }}
                  >
                    Enter your username to reset your password
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "12px",
                      color: "#667085",
                      marginLeft: "3px",
                    }}
                  >
                    We'll send you a reset link
                  </Typography>
                  
                  {/* ********* Form Field ******** */}
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    onKeyDown={handleKeyDown}
                    noValidate
                    style={{ marginTop: "2rem" }}
                    className="flex flex-col gap-6"
                  >
                    {/* ********* Username Field ******** */}
                    <Controller
                      name="username"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <PrimaryTextField
                          id="username"
                          label="Username"
                          haserror={Boolean(error)}
                          errortext={error?.message}
                          {...field}
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
                      Send Reset Link
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

export default ForgotPassword;
