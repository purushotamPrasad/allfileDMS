"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  IconButton,
  Avatar,
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

interface ResetPasswordFormInputs {
  referralCode: string;
  newPassword: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [alertHandler, setAlertHandler] = useState({
    hasAlert: false,
    alertType: "success" as AlertColor,
    alertMessage: "",
    alertTitle: "",
  });
  const routers = useRouter();
  const searchParams = useSearchParams();



  useEffect(() => {
    const usernameParam = searchParams.get('username');
    if (usernameParam) {
      setUsername(decodeURIComponent(usernameParam));
    }
  }, [searchParams]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Validation schema
  const resetPasswordSchema = yup
    .object()
    .shape({
      referralCode: yup.string().required("Referral code is required"),
      newPassword: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("New password is required"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword')], 'Passwords must match')
        .required("Confirm password is required"),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
    criteriaMode: "all",
    mode: "onChange",
    reValidateMode: "onChange",
    delayError: 100,
    defaultValues: {
      referralCode: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(onSubmit)(event);
    }
  };

  const onSubmit = async (data: ResetPasswordFormInputs) => {
    try {
      const response = await post<any>(
        `/auth/reset-password`,
        {
          username: username,
          referralCode: data.referralCode,
          newPassword: data.newPassword,
        },
        setAlertHandler
      );
      
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Password reset successfully! Redirecting to login...",
        alertType: "success",
        alertTitle: "Success",
      });

      // Navigate back to login page
      setTimeout(() => {
        routers.push("/login");
      }, 2000);

    } catch (error) {
      console.log("Error in reset password:", error);
      setAlertHandler({
        hasAlert: true,
        alertMessage: "Something went wrong. Please try again.",
        alertType: "error",
        alertTitle: "Error",
      });
    }
  };

  const handleBack = () => {
    routers.push("/forgot-password");
  };

  return (
    <PageContainer
      title="Reset Password - Venturing Digitally Admin"
      description="Reset Password - Venturing Digitally Admin Panel"
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
                    <Typography variant="h2">Reset Password</Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ marginTop: "1.5rem", marginLeft: "3px" }}
                  >
                    Reset your password
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "12px",
                      color: "#667085",
                      marginLeft: "3px",
                    }}
                  >
                    Enter your referral code and new password
                  </Typography>
                  
                  {/* ********* Form Fields ******** */}
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    onKeyDown={handleKeyDown}
                    noValidate
                    style={{ marginTop: "2rem" }}
                    className="flex flex-col gap-6"
                  >
                    {/* ********* Username Display ******** */}
                    <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                      <Typography variant="body2" color="textSecondary">
                        Username: <strong>{username}</strong>
                      </Typography>
                    </Box>

                    {/* ********* Referral Code Field ******** */}
                    <Controller
                      name="referralCode"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <PrimaryTextField
                          id="referralCode"
                          label="Referral Code"
                          haserror={Boolean(error)}
                          errortext={error?.message}
                          {...field}
                        />
                      )}
                    />

                    {/* ********* New Password Field ******** */}
                    <Controller
                      name="newPassword"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <PrimaryTextField
                          id="newPassword"
                          label="New Password"
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
                        />
                      )}
                    />

                    {/* ********* Confirm Password Field ******** */}
                    <Controller
                      name="confirmPassword"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <PrimaryTextField
                          id="confirmPassword"
                          label="Confirm Password"
                          haserror={Boolean(error)}
                          errortext={error?.message}
                          type={showConfirmPassword ? "text" : "password"}
                          endAdornment={
                            <IconButton
                              onClick={handleClickShowConfirmPassword}
                              sx={{ background: "#F3F6FB" }}
                            >
                              {showConfirmPassword ? (
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
                      Reset Password
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

export default ResetPassword;
