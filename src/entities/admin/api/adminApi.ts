import { createAsyncThunk } from "@reduxjs/toolkit";
import { PAdmin } from "@/entities/admin/api/interfaces";
import toast from "react-hot-toast";
import { instance } from "@/shared/api/instance";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

// get all admins

export const getAdmins = createAsyncThunk("admin/getAdmins", async () => {
  try {
    const response = await instance.get(
      `${API_ENDPOINTS.ADMINS}?page=${1}&amount=30`
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
});

// add admin

export const addAdmin = createAsyncThunk(
  "admin/addAdmin",
  async (data: PAdmin) => {
    try {
      const response = await instance.post(`${API_ENDPOINTS.ADMINS}`, data);
      toast.success("Админ успешнло добавлен");
      console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error("Админ не добавлен");
      return Promise.reject(error);
    }
  }
);

// delete admin

export const deleteAdmin = createAsyncThunk(
  "admin/deleteAdmin",
  async (id: string) => {
    try {
      const response = await instance.delete(`${API_ENDPOINTS.ADMINS}`, {
        data: { id },
      });
      toast.success("Админ успешнло удален");
      return id;
    } catch (error) {
      toast.error("Админ не удален");
      return Promise.reject(error);
    }
  }
);
