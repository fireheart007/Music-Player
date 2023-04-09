import { createSlice } from "@reduxjs/toolkit";

export const songList = createSlice({
  name: "songList",
  initialState: {
    currentSong: [],
  },
  reducers: {
    songsList(state, newSong) {
      state.currentSong = newSong.payload;
    },
  },
});

export const { songsList } = songList.actions;
