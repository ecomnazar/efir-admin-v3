import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GUser } from "@/entities/user/model/interfaces";
import {
  getUsers,
  getUser,
  getUsersAsChannel,
  addUser,
  deleteUser,
  searchUser,
  updateUser,
  makeUserPremium,
  destroyUserPremium,
} from "@/entities/user/api/userApi";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    users: {
      data: [] as GUser[],
      loading: false,
      error: false,
      next: false,
      prev: false,
      nextPage: 1,
    },
    user: {
      data: {} as GUser,
      loading: false,
      error: false,
    },
    usersAsChannel: {
      data: [] as GUser[],
      loading: false,
      error: false,
      next: false,
      prev: false,
    },
    addUser: {
      data: {} as GUser,
      loading: false,
      error: false,
    },
    activeUser: {} as GUser, // need one active category to edit category
    deleteUserLoading: false, // to show loading in delete category button
  },
  reducers: {
    setActiveUser(state, action: PayloadAction<GUser>) {
      state.activeUser = action.payload;
    },
  },
  extraReducers(builder) {
    builder

      // get users

      .addCase(getUsers.pending, (state) => {
        state.users.loading = true;
      })
      .addCase(
        getUsers.fulfilled,
        (
          state,
          action: PayloadAction<{
            next: string;
            previous: string;
            results: GUser[];
          }>
        ) => {
          if (action.payload.previous === null) {
            state.users.data = action.payload.results;
            state.users.prev = action.payload.previous === null ? true : false;
            state.users.nextPage = 1;
          } else {
            state.users.data = [...state.users.data, ...action.payload.results];
          }
          state.users.next = action.payload.next ? true : false;
          state.users.loading = false;
          state.users.nextPage = state.users.nextPage + 1;
        }
      )
      .addCase(getUsers.rejected, (state) => {
        state.users.error = true;
      })

      // get user by id

      .addCase(getUser.pending, (state) => {
        state.user.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<GUser>) => {
        state.user.data = action.payload;
        state.user.loading = false;
      })
      .addCase(getUser.rejected, (state) => {
        state.user.error = true;
      })

      // get users as channel

      .addCase(getUsersAsChannel.pending, (state) => {
        state.usersAsChannel.loading = true;
      })
      .addCase(
        getUsersAsChannel.fulfilled,
        (state, action: PayloadAction<{ next: string; results: GUser[] }>) => {
          state.usersAsChannel.data = [
            ...state.usersAsChannel.data,
            ...action.payload.results,
          ];
          state.usersAsChannel.loading = false;
          state.usersAsChannel.next = action.payload.next ? true : false;
        }
      )
      .addCase(getUsersAsChannel.rejected, (state) => {
        state.usersAsChannel.loading = false;
        state.usersAsChannel.error = true;
      })

      // add user

      .addCase(addUser.pending, (state) => {
        state.addUser.loading = true;
      })

      .addCase(addUser.fulfilled, (state, action: PayloadAction<GUser>) => {
        state.users.data.push(action.payload);
        state.addUser.loading = false;
      })

      .addCase(addUser.rejected, (state) => {
        state.addUser.loading = false;
      })

      // delete user

      .addCase(deleteUser.pending, (state) => {
        state.deleteUserLoading = true;
      })

      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.users.data = state.users.data.filter(
          (user) => user.id !== action.payload
        );
        state.deleteUserLoading = false;
      })

      .addCase(deleteUser.rejected, (state) => {
        state.deleteUserLoading = true;
      })

      // update user

      .addCase(updateUser.fulfilled, (state, action: PayloadAction<GUser>) => {
        state.user.data = action.payload;
      })

      // set premium to user

      .addCase(
        makeUserPremium.fulfilled,
        (state, action: PayloadAction<GUser>) => {
          state.user.data = action.payload;
        }
      )

      // destroy premium from user

      .addCase(
        destroyUserPremium.fulfilled,
        (state, action: PayloadAction<GUser>) => {
          state.user.data = action.payload;
        }
      );
  },
});

export const { setActiveUser } = userSlice.actions;
