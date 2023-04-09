import { createSlice } from "@reduxjs/toolkit";

export const changePlaylistSlice = createSlice({
  name: "playlistId",
  initialState: {
    currentPlaylistId: 1,
    playListName: "For You",
    TotalSong: 0,
    firstTime: true,
  },
  reducers: {
    changePlaylistId(state, newPlaylistId) {
      state.currentPlaylistId = newPlaylistId.payload.id;
      state.playListName = newPlaylistId.payload.title;
    },
    setTotalSong(state, TotalSong) {
      state.TotalSong = TotalSong.payload;
      state.firstSong = false;
    },
    setfirstTime(state, isFirstTime) {
      state.firstTime = isFirstTime.payload;
    },
  },
});

export const { changePlaylistId, setTotalSong, setfirstTime } =
  changePlaylistSlice.actions;
