import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "../api/loginApi";
import { GLogin } from "./interfaces";
import { saveToken } from "@/shared/lib";
import toast from "react-hot-toast";

export const loginSlice = createSlice({
  name: "loginSlice",
  initialState: {
    login: {
      loading: false,
    },
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.login.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action: PayloadAction<GLogin>) => {
        state.login.loading = false;
        saveToken(action.payload.token);
        toast.success("Login successful!");
        setTimeout(() => {
          window.location.replace("/");
        }, 500);
      })
      .addCase(loginThunk.rejected, (state) => {
        state.login.loading = false;
        toast.error("Username or password is incorrect!");
      });
  },
});
