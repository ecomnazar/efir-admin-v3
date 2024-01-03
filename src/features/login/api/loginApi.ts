import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { instance } from "@/shared/api/instance";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface Props {
  username: string;
  password: string;
}

export const loginThunk = createAsyncThunk("login", async (body: Props) => {
  try {
    const response = await instance.post(`${API_ENDPOINTS.LOGIN}`, body);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
});
