import { categorySlice } from "@/entities/category/model/slice";
import { channelSlice } from "@/entities/channel/model/slice";
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
});
