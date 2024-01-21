import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  addChannel,
  deleteChannel,
  getChannel,
  getChannels,
  updateChannel,
} from "@/entities/channel/api/channelApi";
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
    channel: {
      data: {} as GChannel,
      loading: false,
      error: false,
    },
    addChannelLoading: false, // to show loading in add channel button
    updateChannelLoading: false, // to show loading in update channel button
    deleteChannelLoading: false, // to show loading in delete channel button
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

      // get channel

      .addCase(getChannel.pending, (state) => {
        state.channel.loading = true;
      })

      .addCase(
        getChannel.fulfilled,
        (state, action: PayloadAction<GChannel>) => {
          state.channel.loading = false;
          state.channel.data = action.payload;
        }
      )

      .addCase(getChannel.rejected, (state) => {
        state.channel.loading = false;
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
      })

      // update channel

      .addCase(updateChannel.pending, (state) => {
        state.updateChannelLoading = true;
      })

      .addCase(
        updateChannel.fulfilled,
        (state, action: PayloadAction<GChannel>) => {
          state.updateChannelLoading = false;
          state.channel.data = action.payload;
        }
      )

      .addCase(updateChannel.rejected, (state) => {
        state.updateChannelLoading = false;
      })

      // delete channel

      .addCase(deleteChannel.pending, (state) => {
        state.deleteChannelLoading = true;
      })

      .addCase(
        deleteChannel.fulfilled,
        (state, action: PayloadAction<string | number>) => {
          state.channels.data = state.channels.data.filter(
            (item) => item.id != action.payload
          );
          state.deleteChannelLoading = false;
        }
      )

      .addCase(deleteChannel.rejected, (state) => {
        state.deleteChannelLoading = false;
      });
  },
});
