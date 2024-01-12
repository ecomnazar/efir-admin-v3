import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { addChannel, getChannels } from "@/entities/channel/api/channelApi";
import { GChannel } from "@/entities/channel/model/interfaces";

export const channelSlice = createSlice({
  name: "channelSlice",
  initialState: {
    channels: {
      data: [] as GChannel[],
      loading: false,
      error: false,
      next: true,
      nextPage: 1,
    },
    addChannelLoading: false, // to show loading in add channel button
  },
  reducers: {},
  extraReducers(builder) {
    builder

      // get channels

      .addCase(getChannels.pending, (state) => {
        state.channels.loading = true;
      })
      .addCase(
        getChannels.fulfilled,
        (
          state,
          action: PayloadAction<{ next: string; results: GChannel[] }>
        ) => {
          if (state.channels.data.length === 0) {
            state.channels.data = action.payload.results;
          } else {
            state.channels.data = [
              ...state.channels.data,
              ...action.payload.results,
            ];
          }
          state.channels.loading = false;
          state.channels.next = action.payload.next ? true : false;
          state.channels.nextPage = state.channels.nextPage + 1;
        }
      )
      .addCase(getChannels.rejected, (state) => {
        state.channels.error = true;
      })

      // add channel

      .addCase(addChannel.pending, (state) => {
        state.addChannelLoading = true;
      })

      .addCase(
        addChannel.fulfilled,
        (state, action: PayloadAction<GChannel>) => {
          state.channels.data = [...state.channels.data, action.payload];
          state.addChannelLoading = false;
        }
      )

      .addCase(addChannel.rejected, (state) => {
        state.addChannelLoading = false;
      });
  },
});
