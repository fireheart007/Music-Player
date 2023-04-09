import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { getSongs } from "../common/api";
import { useSelector, useDispatch } from "react-redux";
import { changeSong } from "../store/changeSongSlice";
import { setTotalSong, setfirstTime } from "../store/changePlaylist";
import SearchBar from "./SearchBar";
import Track from "./Track";
import { songsList } from "../store/SongListSlice";
import Loader from "./Loader";

function Playlist({ searchedSong }) {
  const dispatch = useDispatch();
  const { firstTime } = useSelector((state) => {
    return state.changePlaylist;
  });

  // for playlist id from redux to get
  const { currentPlaylistId } = useSelector((state) => {
    return state.changePlaylist;
  });

  const { loading, error, data } = useQuery(getSongs, {
    variables: { playlistId: currentPlaylistId, search: searchedSong },
  });
  useEffect(() => {
    if (data) {
      const { getSongs } = data;
      dispatch(songsList(getSongs));
      dispatch(setTotalSong(SongsList.length));
      if (firstTime) {
        dispatch(setfirstTime(false));
        const toBePlayed = false;
        const newSong = { ...SongsList[0], toBePlayed, trackId: 0 };
        dispatch(changeSong(newSong));
      }
    }
  }, [data]);

  if (loading) return <Loader />;
  if (error) return <>{JSON.stringify(error)}</>;

  const { getSongs: SongsList } = data;

  return (
    <ul className="flex flex-col  ">
      {SongsList.map((track, index) => {
        return (
          <ul key={track._id}>
            <Track track={track} trackId={index} />
          </ul>
        );
      })}
    </ul>
  );
}

export default function SongList() {
  const [searchedSong, setSearchedSong] = useState("");
  const { playListName } = useSelector((state) => {
    return state.changePlaylist;
  });

  return (
    <div className="no-scrollbar relative h-[100vh] w-[400px] overflow-y-scroll  text-white ">
      <div className="sticky top-0 z-10 bg-black pt-10">
        <span className=" top-10 z-[1] h-9 px-4 text-[32px] font-bold leading-9 ">
          {playListName}
        </span>

        <div className=" top-24 z-[1] mb-4  mt-6 w-[400px]  px-4">
          <SearchBar changeSearchedSong={setSearchedSong} />
        </div>
      </div>

      <div className="">
        <Playlist searchedSong={searchedSong} />
      </div>
    </div>
  );
}
