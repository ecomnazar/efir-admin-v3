import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GPost } from "@/entities/post/model/interfaces";
import {
  getPosts,
  getPost,
  getUserPosts,
  addPost,
  updatePost,
  deletePost,
} from "@/entities/post/api/postApi";

export const postSlice = createSlice({
  name: "postSlice",
  initialState: {
    posts: {
      data: [] as GPost[],
      loading: false,
      error: false,
      prev: false,
      next: true,
      nextPage: 1,
    },
    post: {
      data: {} as GPost,
      loading: false,
      error: false,
    },
    userPosts: {
      data: [] as GPost[],
      loading: false,
      error: false,
      next: true,
    },
    addPostLoading: false, // to show loading in add post button
    updatePostLoading: false, // to show loading in update post button
    deletePostLoading: false, // to show loading in delete post button
  },
  reducers: {},
  extraReducers(builder) {
    builder

      // get posts

      .addCase(getPosts.pending, (state) => {
        state.posts.loading = true;
      })
      .addCase(
        getPosts.fulfilled,
        (
          state,
          action: PayloadAction<{
            next: string;
            previous: string;
            results: GPost[];
          }>
        ) => {
          if (action.payload.previous === null) {
            state.posts.data = action.payload.results;
            state.posts.prev = true;
          } else {
            state.posts.data = [...state.posts.data, ...action.payload.results];
          }
          state.posts.loading = false;
          state.posts.next = action.payload.next ? true : false;
          state.posts.nextPage = state.posts.nextPage + 1;
        }
      )
      .addCase(getPosts.rejected, (state) => {
        state.posts.error = true;
      })

      // get post

      .addCase(getPost.pending, (state) => {
        state.post.loading = true;
      })
      .addCase(getPost.fulfilled, (state, action: PayloadAction<GPost>) => {
        state.post.data = action.payload;
        state.post.loading = false;
      })
      .addCase(getPost.rejected, (state) => {
        state.post.error = true;
      })

      // get user posts

      .addCase(getUserPosts.pending, (state) => {
        state.userPosts.loading = true;
      })
      .addCase(
        getUserPosts.fulfilled,
        (
          state,
          action: PayloadAction<{
            next: string;
            previous: string;
            results: GPost[];
          }>
        ) => {
          if (action.payload.previous === null) {
            state.userPosts.data = action.payload.results;
          } else {
            state.userPosts.data = [
              ...state.userPosts.data,
              ...action.payload.results,
            ];
          }
          state.userPosts.next = action.payload.next ? true : false;
          state.userPosts.loading = false;
        }
      )
      .addCase(getUserPosts.rejected, (state) => {
        state.userPosts.error = true;
      })

      // add post

      .addCase(addPost.pending, (state) => {
        state.addPostLoading = true;
      })

      .addCase(addPost.fulfilled, (state, action: PayloadAction<GPost>) => {
        state.userPosts.data = [action.payload, ...state.userPosts.data];
        state.addPostLoading = false;
      })

      .addCase(addPost.rejected, (state) => {
        state.addPostLoading = false;
      })

      // update post

      .addCase(updatePost.pending, (state) => {
        state.updatePostLoading = true;
      })

      .addCase(updatePost.fulfilled, (state, action: PayloadAction<GPost>) => {
        state.post.data = action.payload;
        state.updatePostLoading = false;
      })

      .addCase(updatePost.rejected, (state) => {
        state.updatePostLoading = false;
      })

      // delete post

      .addCase(deletePost.pending, (state) => {
        state.deletePostLoading = true;
      })

      .addCase(deletePost.fulfilled, (state, action: PayloadAction<string>) => {
        // state.post.data = action.payload;
        state.userPosts.data = state.userPosts.data.filter(
          (elem) => elem.id != action.payload
        );
        state.posts.data = state.posts.data.filter(
          (elem) => elem.id != action.payload
        );
        state.deletePostLoading = false;
      })

      .addCase(deletePost.rejected, (state) => {
        state.deletePostLoading = false;
      });
  },
});
