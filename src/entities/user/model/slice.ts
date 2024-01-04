import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GUser } from "@/entities/user/model/interfaces"
import { getUsers, getUser, getUsersAsChannel } from "@/entities/user/api/userApi"

export const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        users: {
            data: [] as GUser[],
            loading: false,
            error: false,
            next: false,
            prev: false
        },
        user: {
            data: {} as GUser,
            loading: false,
            error: false
        },
        usersAsChannel: {
            data: [] as GUser[],
            next: true,
            loading: false,
            error: false
        }
    },
    reducers: {
    },
    extraReducers(builder) {
        builder

            // get users

            .addCase(getUsers.pending, (state) => {
                state.users.loading = true
            })
            .addCase(getUsers.fulfilled, (state, action: PayloadAction<{next: string, previous: string, results: GUser[]}>) => {
                if(state.users.prev === true){
                    state.users.data = [...state.users.data, ...action.payload.results]
                } else {
                    state.users.data = action.payload.results
                    state.users.prev = action.payload.previous === null ? true : false
                }
                state.users.next = action.payload.next ? true : false
                state.users.loading = false
            })
            .addCase(getUsers.rejected, (state) => {
                state.users.error = true
            })

            // get user by id

            .addCase(getUser.pending, (state) => {
                state.user.loading = true
            })
            .addCase(getUser.fulfilled, (state, action: PayloadAction<GUser>) => {
                state.user.data = action.payload
                state.user.loading = false
            })
            .addCase(getUser.rejected, (state) => {
                state.user.error = true
            })

            // get users as channel

            .addCase(getUsersAsChannel.pending, (state) => {
                state.usersAsChannel.loading = true
            })
            .addCase(getUsersAsChannel.fulfilled, (state, action: PayloadAction<{ next: string, results: GUser[] }>) => {
                state.usersAsChannel.data = [...state.usersAsChannel.data, ...action.payload.results]
                state.usersAsChannel.loading = false
                state.usersAsChannel.next = action.payload.next ? true : false
            })
            .addCase(getUsersAsChannel.rejected, (state) => {
                state.usersAsChannel.loading = false
                state.usersAsChannel.error = true
            })

    },
})
