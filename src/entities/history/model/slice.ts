import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  addHistoryImage,
  addHistoryVideo,
  deleteHistory,
  getHistories,
  getHistory,
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
    history: {
      data: {} as GHistory,
      loading: false,
      error: false,
    },
    addHistoryLoading: false, // to show loading in add history button
    deleteHistoryLoading: false, // to show loading in delete history button
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

      // get historiy

      .addCase(getHistory.pending, (state) => {
        state.history.loading = true;
      })
      .addCase(
        getHistory.fulfilled,
        (state, action: PayloadAction<GHistory>) => {
          state.history.data = action.payload;
          state.history.loading = false;
        }
      )
      .addCase(getHistory.rejected, (state) => {
        state.history.loading = false;
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
      })

      //

      // delete history

      .addCase(deleteHistory.pending, (state) => {
        state.deleteHistoryLoading = true;
      })

      .addCase(
        deleteHistory.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.histories.data = state.histories.data.filter(
            (elem) => String(elem.id) != action.payload
          );
          state.deleteHistoryLoading = false;
        }
      )

      .addCase(deleteHistory.rejected, (state) => {
        state.deleteHistoryLoading = false;
      });
  },
});
