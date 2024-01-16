import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  addHistoryImage,
  addHistoryVideo,
  getHistories,
} from "@/entities/history/api/historyApi";
import { GHistory } from "@/entities/history/model/interfaces";

export const historySlice = createSlice({
  name: "historySlice",
  initialState: {
    histories: {
      data: [] as GHistory[],
      loading: false,
      error: false,
      next: true,
      nextPage: 1,
    },
    addHistoryLoading: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder

      // get histories

      .addCase(getHistories.pending, (state) => {
        state.histories.loading = true;
      })
      .addCase(
        getHistories.fulfilled,
        (
          state,
          action: PayloadAction<{ next: string; results: GHistory[] }>
        ) => {
          if (state.histories.data.length === 0) {
            state.histories.data = action.payload.results;
          } else {
            state.histories.data = [
              ...state.histories.data,
              ...action.payload.results,
            ];
          }
          state.histories.nextPage = state.histories.nextPage + 1;
          state.histories.loading = false;
          state.histories.next = action.payload.next ? true : false;
        }
      )
      .addCase(getHistories.rejected, (state) => {
        state.histories.error = true;
      })

      // add history image

      .addCase(addHistoryImage.pending, (state) => {
        state.addHistoryLoading = true;
      })

      .addCase(
        addHistoryImage.fulfilled,
        (state, action: PayloadAction<GHistory>) => {
          state.histories.data = [...state.histories.data, action.payload];
          state.addHistoryLoading = false;
        }
      )

      .addCase(addHistoryImage.rejected, (state) => {
        state.addHistoryLoading = false;
      })

      // add history video

      .addCase(addHistoryVideo.pending, (state) => {
        state.addHistoryLoading = true;
      })

      .addCase(
        addHistoryVideo.fulfilled,
        (state, action: PayloadAction<GHistory>) => {
          state.histories.data = [action.payload, ...state.histories.data];
          state.addHistoryLoading = false;
        }
      )

      .addCase(addHistoryVideo.rejected, (state) => {
        state.addHistoryLoading = false;
      });
  },
});
