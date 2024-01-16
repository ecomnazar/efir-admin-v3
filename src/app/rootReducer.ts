import { adminSlice } from "@/entities/admin/model/slice";
import { categorySlice } from "@/entities/category/model/slice";
import { channelSlice } from "@/entities/channel/model/slice";
import { historySlice } from "@/entities/history/model/slice";
import { postSlice } from "@/entities/post/model/slice";
import { userSlice } from "@/entities/user/model/slice";
import { loginSlice } from "@/features/login/model/slice";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  loginSlice: loginSlice.reducer,
  categorySlice: categorySlice.reducer,
  userSlice: userSlice.reducer,
  postSlice: postSlice.reducer,
  channelSlice: channelSlice.reducer,
  adminSlice: adminSlice.reducer,
  historySlice: historySlice.reducer,
});
