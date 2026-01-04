import axios, { AxiosResponse, AxiosInstance } from "axios";
import { redirect } from "next/navigation";
import { AlertColor } from "@mui/material";
import { getToken } from "../Auth/authService";
import { getSession, useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
interface AxiosInstanceConfig {
  baseURL: string;
  headers?: Record<string, string>;
}

interface AlertHandlerState {
  hasAlert: boolean;
  alertType: AlertColor;
  alertMessage: string;
  alertTitle?: string;
}

// Function to create Axios instance with dynamic token
const createInstance = (baseURL: string) => {
  return axios.create({
    baseURL,
    withCredentials: false,
    headers: {
      "Content-Type": "application/json",
      "x-application": "ADMIN",
    },
  });
};

const redirectToLogin = () => {
  // signIn("keycloak");
   window.location.href="/login"
};

const BaseURL=process.env.NEXT_PUBLIC_API_ENDPOINT;

console.log("Basurl",BaseURL);

// Exported functions with dynamic token
export const get = async <T>(
  url: string,
  params: object = {},
  baseURL: string,
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>
): Promise<AxiosResponse<T> | null> => {
  const token = getToken();
  console.log("token",token);
  if (!token) {
    redirectToLogin();
    return null;
  } else {
    const instance = createInstance(BaseURL);
 
    try {
      instance.defaults.headers["Authorization"] = `Bearer ${token}`;
      const response: AxiosResponse<T> = await instance.get(url, { params });
      return response;
    } catch (error) {
      console.error(error, "common Error");
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
          alertMessage: error.response.data.message,
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
      throw error;
    }
  }
};



export const post = async <T>(
  url: string,
  data: object = {},
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>
): Promise<AxiosResponse<T>> => {
  // let session = getSession();

  // console.log("session", session)

  const token = getToken();
  console.log("token",token);
  // let accessToken = (await session).access_token;
  if (!token) {
    redirectToLogin();
    return null;
  } else {
    console.log("Valid AccessToken");
    const instance = createInstance(BaseURL);
    try {
      instance.defaults.headers["Authorization"] = `Bearer ${token}`;
      const response: AxiosResponse<T> = await instance.post(url, data);
      return response;
    } catch (error: any) {
      console.error(error, "common Error");
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
          alertMessage: error.response.data.message,
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
      throw error;
    }
  }
};

export const del = async <T>(
  url: string,
  params: object = {},
  data: object = {},
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>
): Promise<AxiosResponse<T> | null> => {
  // let session = getSession();
  // let accessToken = (await session).access_token;
  // if (!accessToken) {
  //   console.log("InValid AccessToken");
  //   // redirectToLogin();
  //   return null;
  const token = getToken();
  console.log("token",token);
  if (!token) {
    redirectToLogin();
    return null;
  } else {
    console.log("Valid AccessToken");
    const instance = createInstance(BaseURL);
    try {
      instance.defaults.headers["Authorization"] = `Bearer ${token}`;

      const response: AxiosResponse<T> = await instance.delete(url, {
        ...params,
        data,
      });
      // if (response.status === 204) {
      return response;
      // }
    } catch (error: any) {
      console.error(error, "common Error");
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
          alertMessage: error.response.data.message,
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
      throw error;
    }
  }
};

export const patch = async <T>(
  url: string,
  data: object = {},
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>
): Promise<AxiosResponse<T>> => {
  // let session = getSession();
  // let accessToken = (await session).access_token;
  // if (!accessToken) {
  //   console.log("InValid AccessToken");
  //   // redirectToLogin();
  //   return null;
  const token = getToken();
  console.log("token",token);
  if (!token) {
    redirectToLogin();
    return null;
  } else {
    console.log("Valid AccessToken");
    const instance = createInstance(BaseURL);
    try {
      instance.defaults.headers["Authorization"] = `Bearer ${token}`;
      const response: AxiosResponse<T> = await instance.patch(url, data);
      return response;
    } catch (error: any) {
      console.error(error, "common Error");
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
          alertMessage: error.response.data.message,
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
      throw error;
    }
  }
};

export const put = async <T>(
  url: string,
  data: object = {},
  setAlertHandler: React.Dispatch<React.SetStateAction<AlertHandlerState>>
): Promise<AxiosResponse<T>> => {
  // let session = getSession();
  // let accessToken = (await session).access_token;
  // if (!accessToken) {
  //   console.log("InValid AccessToken");
  //   // redirectToLogin();
  //   return null;
  const token = getToken();
  console.log("token",token);
  if (!token) {
    redirectToLogin();
    return null;
  } else {
    console.log("Valid AccessToken");
    const instance = createInstance(BaseURL);
    try {
      instance.defaults.headers["Authorization"] = `Bearer ${token}`;
      const response: AxiosResponse<T> = await instance.put(url, data);
      return response;
    } catch (error: any) {
      console.error(error, "common Error");
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
          alertMessage: error.response.data.message,
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
      throw error;
    }
  }
};
