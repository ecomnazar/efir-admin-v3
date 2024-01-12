import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GAdmin } from "@/entities/admin/model/interfaces";
import {
  addAdmin,
  deleteAdmin,
  getAdmins,
} from "@/entities/admin/api/adminApi";

export const adminSlice = createSlice({
  name: "adminSlice",
  initialState: {
    admins: {
      data: [] as GAdmin[],
      loading: false,
      error: false,
    },
    admin: {
      data: {} as GAdmin,
      loading: false,
      error: false,
    },
    activeAdmin: {} as GAdmin,
    addAdminLoading: false, // to show loading in add admin button
    deleteAdminLoading: false, // to show loading in delete admin button
  },
  reducers: {
    setActiveAdmin(state, action: PayloadAction<GAdmin>) {
      state.activeAdmin = action.payload;
    },
  },
  extraReducers(builder) {
    builder

      // get admins

      .addCase(getAdmins.pending, (state) => {
        state.admins.loading = true;
      })
      .addCase(
        getAdmins.fulfilled,
        (state, action: PayloadAction<{ results: GAdmin[] }>) => {
          state.admins.data = action.payload.results;
          state.admins.loading = false;
        }
      )
      .addCase(getAdmins.rejected, (state) => {
        state.admins.error = true;
      })

      // get admin by id

      // add admin

      .addCase(addAdmin.pending, (state) => {
        state.addAdminLoading = true;
      })

      .addCase(addAdmin.fulfilled, (state, action: PayloadAction<GAdmin>) => {
        state.admins.data = [...state.admins.data, action.payload];
        state.addAdminLoading = false;
      })

      .addCase(addAdmin.rejected, (state) => {
        state.addAdminLoading = false;
      })

      // delete admin

      .addCase(deleteAdmin.pending, (state) => {
        state.deleteAdminLoading = true;
      })

      .addCase(
        deleteAdmin.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.admins.data = state.admins.data.filter(
            (admin) => admin.id !== action.payload
          );
          state.deleteAdminLoading = false;
        }
      )

      .addCase(deleteAdmin.rejected, (state) => {
        state.deleteAdminLoading = false;
      });
  },
});

export const { setActiveAdmin } = adminSlice.actions;
