import axios, { AxiosError } from "axios";
import { getToken } from "../lib";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (data) => {
    return data;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// for second port

export const instanceSecond = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_SECOND,
  headers: {
    "Content-Type": "application/json",
  },
});

instanceSecond.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

instanceSecond.interceptors.response.use(
  (data) => {
    return data;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
