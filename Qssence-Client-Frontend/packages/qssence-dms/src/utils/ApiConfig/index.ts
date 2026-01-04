import axios, { AxiosResponse, AxiosInstance } from 'axios';
import { getToken } from '../hooks/Auth/authService';
import { redirect } from 'next/navigation';

interface AxiosInstanceConfig {
  baseURL: string;
  headers?: Record<string, string>;
}

// Function to create Axios instance with dynamic token
const createInstance = (baseURL: string) => {
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'x-application': 'CLIENT'
    },
  });
};


const redirectToLogin = () => {
  // Replace '/login' with the actual path to your login screen
  window.location.href = '/login';
};

const BaseURL=process.env.NEXT_PUBLIC_API_ENDPOINT;

// Exported functions with dynamic token
export const get = async <T>(url: string, params: object = {}, baseURL: string): Promise<AxiosResponse<T> | null> => {
  const token = getToken();
  console.log(!token)
  if (!token) {
    redirectToLogin();
    return null
  } else {
    const instance = createInstance(BaseURL);
    try {
      instance.defaults.headers['Authorization'] = `Bearer ${token}`;

      const response: AxiosResponse<T> = await instance.get(url, { params });
      if (response.status === 200) {
        return response;
      }
      throw new Error('Request failed with status ' + response.status);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

export const post = async <T>(url: string, data: object = {}): Promise<AxiosResponse<T>> => {
  const token = getToken();
  if (!token) {
    redirectToLogin();
    console.log('No token available');
  }

  const instance = createInstance(BaseURL);
  try {
    instance.defaults.headers['Authorization'] = `Bearer ${token}`;

    const response: AxiosResponse<T> = await instance.post(url, data);
    // if (response.status === 201) {
      return response;
    // }
    throw new Error('Request failed with status ' + response.status);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const del = async <T>(url: string, params: object = {}): Promise<AxiosResponse<T> | null> => {
  const token = getToken();
  if (!token) {
    redirectToLogin();
    return null;
  }

  const instance = createInstance(BaseURL);
  try {
    instance.defaults.headers['Authorization'] = `Bearer ${token}`;

    const response: AxiosResponse<T> = await instance.delete(url, { ...params });
    // if (response.status === 204) {
      return response;
    // }
    throw new Error('Request failed with status ' + response.status);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const patch = async <T>(url: string, data: object = {}, baseURL: string): Promise<AxiosResponse<T>> => {
  const token = getToken();
  if (!token) {
    redirectToLogin();
    console.log('No token available');
  }

  const instance = createInstance(BaseURL);
  try {
    instance.defaults.headers['Authorization'] = `Bearer ${token}`;

    const response: AxiosResponse<T> = await instance.patch(url, data);
    // if (response.status === 200) {
      return response;
    // }
    throw new Error('Request failed with status ' + response.status);
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const put = async <T>(url: string, data: object = {}): Promise<AxiosResponse<T>> => {
  const token = getToken();
  if (!token) {
    redirectToLogin();
    console.log('No token available');
  }

  const instance = createInstance(BaseURL);
  try {
    instance.defaults.headers['Authorization'] = `Bearer ${token}`;

    const response: AxiosResponse<T> = await instance.put(url, data);
    // if (response.status === 200) {
      return response;
    // }
    throw new Error('Request failed with status ' + response.status);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
