import React from "react";
import { useSelector } from "react-redux";
import Controls from "./Controls";

export default function Player() {
  const {
    currentSong: {
      toBePlayed,
      trackId,
      _id,
      title,
      duration,
      artist,
      url,
      photo,
    },
  } = useSelector((state) => {
    return state.changeSong;
  });

  return (
    <div className="grid justify-center pt-10 text-white">
      <SongInfo songArtist={artist} songTitle={title} coverPhoto={photo} />
      <Controls
        trackId={trackId}
        songUrl={url}
        songduration={duration}
        songId={_id}
        toBePlayed={toBePlayed}
      />
    </div>
  );
}

function SongInfo({ songArtist, songTitle, coverPhoto }) {
  return (
    <div className="w-full">
      <div className="text-[2em] font-bold leading-9">{songTitle}</div>
      <div className=" mt-2 text-base font-normal opacity-60">{songArtist}</div>
      <img
        className=" mt-10 h-[30em] w-[30em] rounded-lg"
        src={coverPhoto}
      ></img>
    </div>
  );
}
