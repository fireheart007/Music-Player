import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSong } from "../store/changeSongSlice";

export default function Controls({ trackId, songId, songUrl, toBePlayed }) {
  const audio = useRef(new Audio(songUrl));
  const dispatch = useDispatch();
  const [isPlaying, setisPlaying] = useState(true);

  //fetching total number of song in the opened Playlist
  const { TotalSong } = useSelector((state) => {
    return state.changePlaylist;
  });

  const seekbar = useRef(); // seebar element variable
  const seekbarContainer = useRef(); // seekbar container element variable
  const timeIntervalId = useRef(0); // timeIntervalId for seekBar movement

  useEffect(() => {
    audio.current.src = songUrl;

    if (toBePlayed == true) {
      audio.current.play();
      setisPlaying(true);
    } else {
      setisPlaying(false);
    }

    //setInteval for seekbar updatation;
    if (songId) {
      timeIntervalId.current = setInterval(() => {
        seekbar.current.style.width = `${
          (audio.current.currentTime / audio.current.duration) * 100
        }%`;
      }, 1000);
    }
    //it clear the timeIntever
    return clearInterval(timeIntervalId);
  }, [songId, toBePlayed]);

  function tooglePlayAudio() {
    if (isPlaying == true) {
      audio.current.pause();
    } else {
      audio.current.play();
    }
    setisPlaying(!isPlaying);
  }

  function getSongDetails(nextTrackId) {
    const nextSongHtml = document.getElementById(nextTrackId);

    if (nextSongHtml) {
      const photo = nextSongHtml.querySelector("img").src;
      const _id = nextSongHtml.querySelector("#songId").textContent;
      const artist = nextSongHtml.querySelector("#artist").textContent;
      const title = nextSongHtml.querySelector("#title").textContent;
      const url = nextSongHtml.querySelector("#url").textContent;
      const trackId = parseInt(
        nextSongHtml.querySelector("#trackId").textContent
      );
      const duration = nextSongHtml.querySelector("#duration").textContent;
      return { trackId, _id, title, duration, artist, url, photo };
    } else {
      return null;
    }
  }

  function playNextSong(trackId) {
    const nextTrackId = (trackId + 1) % TotalSong; // incrementing id
    const nextTrackDetails = getSongDetails(nextTrackId); // get next track Details

    if (nextTrackDetails) {
      const { trackId, _id, title, duration, artist, url, photo } =
        nextTrackDetails;
      // storing song info which to be played in redux;
      dispatch(
        changeSong({
          toBePlayed: true,
          trackId: trackId % TotalSong,
          _id,
          title,
          duration,
          artist,
          url,
          photo,
        })
      );
    }
  }

  function playPreviousSong(trackId) {
    const nextTrackId = trackId - 1 > 0 ? trackId - 1 : 0; // incrementing id
    const nextTrackDetails = getSongDetails(nextTrackId); // get next track Details

    if (nextTrackDetails) {
      const { trackId, _id, title, duration, artist, url, photo } =
        nextTrackDetails;
      // storing song info which to be played in redux;
      dispatch(
        changeSong({
          toBePlayed: true,
          trackId: trackId % TotalSong,
          _id,
          title,
          duration,
          artist,
          url,
          photo,
        })
      );
    }
  }

  function updateVolume(event) {
    const { value: newVolume } = event.target;
    audio.current.volume = newVolume / 100;
  }

  function seekToTime(event) {
    const newSeekBarLength = parseInt(event.nativeEvent.offsetX);
    const songprogressContainerWidth = parseInt(
      window.getComputedStyle(seekbarContainer.current).width
    );

    const timeToSeek =
      (newSeekBarLength / songprogressContainerWidth) * audio.current.duration;

    audio.current.currentTime = timeToSeek;
    seekbar.current.style.width = `${
      (audio.current.currentTime / audio.current.duration) * 100
    }%`;
  }

  return (
    <div>
      {/* track progress bar */}
      <div
        ref={seekbarContainer}
        onClick={(e) => seekToTime(e)}
        className="progress-container mt-4 w-full cursor-pointer rounded-2xl bg-player-gray"
      >
        <div
          ref={seekbar}
          className="h-[0.375em] w-0 rounded-2xl bg-white"
        ></div>
      </div>
      <div className=" mt-8 flex items-center justify-between">
        {/* more button */}
        <div className=" grid h-10 w-10 cursor-pointer place-content-center rounded-full bg-player-gray">
          <span className="material-icons text-zinc-400 hover:text-white">
            more_horiz
          </span>
        </div>
        {/*play pause controls */}
        <div className="flex items-center  pl-14">
          {/* prev */}
          <span
            className="material-icons cursor-pointer text-4xl text-zinc-500 hover:text-white"
            onClick={() => playPreviousSong(trackId)}
          >
            skip_previous
          </span>

          {/* play pause */}
          <span
            className="material-icons ml-6 mr-6 cursor-pointer text-5xl"
            onClick={tooglePlayAudio}
          >
            {!isPlaying ? "play_circle" : "pause_circle"}
          </span>

          {/* next song */}
          <span
            className="material-icons cursor-pointer text-4xl text-zinc-500 hover:text-white"
            onClick={() => playNextSong(trackId)}
          >
            skip_next
          </span>
        </div>

        {/* volume */}
        <VolumeButton updateVolume={updateVolume} />
      </div>
    </div>
  );
}

function VolumeButton({ updateVolume }) {
  return (
    <div
      className={`mr-16 grid h-10 w-10  cursor-pointer grid-cols-2 place-content-center items-center  gap-6 rounded-full bg-player-gray
         p-2`}
    >
      <span className="material-icons text-zinc-400 hover:text-white">
        volume_up
      </span>
      <input
        className="h-1  w-20"
        type="range"
        onChange={(e) => updateVolume(e)}
        defaultValue={100}
        min={0}
        max={100}
      />
    </div>
  );
}
