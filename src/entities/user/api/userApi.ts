import { createAsyncThunk } from "@reduxjs/toolkit";
import { PUser, PUserPremium, UUser } from "@/entities/user/api/interfaces";
import toast from "react-hot-toast";
import { instance } from "@/shared/api/instance";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (page: number) => {
    try {
      const response = await instance.get(
        `${API_ENDPOINTS.USERS}?page=${page}&amount=10`
      );
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const getUsersAsChannel = createAsyncThunk(
  "user/getUsersAsChannel",
  async (page: number) => {
    try {
      const response = await instance.get(
        `${API_ENDPOINTS.USERS}?is_channel=True&page=${page}&amount=20`
      );
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const getUser = createAsyncThunk("user/getUser", async (id: string) => {
  try {
    const response = await instance.get(`${API_ENDPOINTS.USER}/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const searchUser = createAsyncThunk(
  "user/searchUser",
  async (query: string) => {
    try {
      const response = await instance.get(`${API_ENDPOINTS.USERS}?q=${query}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const addUser = createAsyncThunk(
  "user/addUser",
  async (data: PUser | any) => {
    try {
      const response = await instance.post(`${API_ENDPOINTS.USERS}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Пользователь успешно добавлен");
      return response.data;
    } catch (error) {
      toast.error("Пользователь не добавлен");
      toast.error("Пользователь с таким именом существует");
      return Promise.reject(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data: UUser) => {
    console.log(data.id);

    try {
      const response = await instance.patch(`${API_ENDPOINTS.USERS}`, data);
      toast.success("Пользователь успешно обновлен");
      return response.data;
    } catch (error) {
      toast.error("Пользователь не обновлен");
      return Promise.reject(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id: string) => {
    try {
      await instance.delete(`${API_ENDPOINTS.USERS}`, {
        data: { id },
      });
      toast.success("Пользователь успешно удален");
      return id;
    } catch (error) {
      toast.error("Пользователь не удален");
      return Promise.reject(error);
    }
  }
);

export const makeUserPremium = createAsyncThunk(
  "/user/makePremium",
  async (data: PUserPremium) => {
    try {
      const response = await instance.post(
        `${API_ENDPOINTS.PREMIUM_USER}`,
        data
      );
      toast.success("Making user premium success");
      return response.data;
    } catch (error) {
      toast.error("Making user premium failed");
      return Promise.reject(error);
    }
  }
);

export const destroyUserPremium = createAsyncThunk(
  "/user/destroyPremium",
  async (id: string) => {
    try {
      const response = await instance.post(
        `${API_ENDPOINTS.DESTROY_PREMIUM_USER}`,
        { id }
      );
      toast.success("Destroying user premium success");
      return response.data;
    } catch (error) {
      toast.error("Destroying user premium failed");
      return Promise.reject(error);
    }
  }
);
