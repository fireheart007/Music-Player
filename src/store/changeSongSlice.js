import { createSlice } from "@reduxjs/toolkit";

export const changeSongSlice = createSlice({
  name: "changeSong",
  initialState: {
    currentSong: {},
  },
  reducers: {
    changeSong(state, newSong) {
      state.currentSong = newSong.payload;
    },
  },
});

export const { changeSong } = changeSongSlice.actions;
