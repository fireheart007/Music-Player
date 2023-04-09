import { changeSongSlice } from "./changeSongSlice";
import { changePlaylistSlice } from "./changePlaylist";
import { songList } from "./SongListSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    changeSong: changeSongSlice.reducer,
    changePlaylist: changePlaylistSlice.reducer,
    songList: songList.reducer,
  },
});
