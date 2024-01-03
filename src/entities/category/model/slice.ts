import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GCategory } from "@/entities/category/model/interfaces";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "@/entities/category/api/categoryApi";

export const categorySlice = createSlice({
  name: "categorySlice",
  initialState: {
    categories: {
      data: [] as GCategory[],
      loading: false,
      error: false,
      next: false,
      prev: false
    },
    activeCategory: {} as GCategory, // need one active category to edit category
    addCategoryLoading: false, // to show loading in add category button
    updateCategoryLoading: false, // to show loading in edit category button
    deleteCategoryLoading: false // // to show loading in delete category button
  },
  reducers: {
    setActiveCategory(state, action: PayloadAction<GCategory>) {
      state.activeCategory = action.payload;
    },
  },
  extraReducers(builder) {
    builder

      // get categories

      .addCase(getCategories.pending, (state) => {
        state.categories.loading = true;
      })
      .addCase(
        getCategories.fulfilled,
        (state, action: PayloadAction<{ next: (string | null), previous: (string | null), results: GCategory[] }>) => {
          if(state.categories.prev === true){
            state.categories.data = [...state.categories.data, ...action.payload.results]
          } else {
            state.categories.data = action.payload.results;
            state.categories.prev = action.payload.previous === null ? true : false
          }
          state.categories.loading = false;
          state.categories.next = action.payload.next ? true : false
        }
      )
      .addCase(getCategories.rejected, (state) => {
        state.categories.error = true;
      })

      // add category

      .addCase(addCategory.pending, (state) => {
        state.addCategoryLoading = true;
      })

      .addCase(
        addCategory.fulfilled,
        (state, action: PayloadAction<GCategory>) => {
          state.categories.data = [...state.categories.data, action.payload];
          state.addCategoryLoading = false;
        }
      )

      .addCase(addCategory.rejected, (state) => {
        state.addCategoryLoading = false;
      })

      // update category

      .addCase(updateCategory.pending, (state) => {
        state.updateCategoryLoading = true;
      })

      .addCase(
        updateCategory.fulfilled,
        (state, action: PayloadAction<GCategory>) => {
          const foundIndex = state.categories.data.findIndex((item) => item.id === action.payload.id)
          state.categories.data[foundIndex] = action.payload
          state.updateCategoryLoading = false;
        }
      )

      .addCase(updateCategory.rejected, (state) => {
        state.updateCategoryLoading = false;
      })

      // delete category

      .addCase(deleteCategory.pending, (state) => {
        state.deleteCategoryLoading = true
      })

      .addCase(
        deleteCategory.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.categories.data = state.categories.data.filter((category) => category.id !== action.payload);
          state.deleteCategoryLoading = true
        }
      )

      .addCase(deleteCategory.rejected, (state) => {
        state.deleteCategoryLoading = false
      })
  },
});

export const { setActiveCategory } = categorySlice.actions;
