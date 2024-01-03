import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { UCategory } from "@/entities/category/api/interfaces";
import { instanceSecond } from "@/shared/api/instance";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (page: number = 1) => {
    try {
      const response = await instanceSecond.get(`${API_ENDPOINTS.CATEGORY}?page=${page}&amount=20`);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (name: string) => {
    try {
      const response = await instanceSecond.post(`${API_ENDPOINTS.CATEGORY}`, { name });
      toast.success("Категория успешно добавлена");
      return response.data
    } catch (error) {
      toast.error("Категория не добавлена");
      return Promise.reject(error);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (data: UCategory) => {
    try {
      const response = await instanceSecond.patch(`${API_ENDPOINTS.CATEGORY}`, data);
      toast.success("Категория успешно обновлена");
      return response.data
    } catch (error) {
      toast.error("Категория не обновлена");
      return Promise.reject(error);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id: string) => {
    try {
      await instanceSecond.delete(`${API_ENDPOINTS.CATEGORY}`, {
        data: { id },
      });
      toast.success("Категория успешно удалена");
      return id
    } catch (error) {
      toast.error("Категория не удалена");
      return Promise.reject(error);
    }
  }
);
