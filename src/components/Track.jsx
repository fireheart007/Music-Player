import { useDispatch } from "react-redux";
import { changeSong } from "../store/changeSongSlice";

export default function Track({ track, trackId }) {
  const dispatch = useDispatch();
  const { _id, title, duration, artist, url, photo } = track;

  const getDurationFormat = (duration) => {
    const min = Math.floor(duration / 60);
    const sec = duration % 60;
    const formattedTime =
      sec == 60 ? min + 1 + ":00" : min + ":" + (sec < 10 ? "0" : "") + sec;
    return formattedTime;
  };
  function updateCurrentSong() {
    dispatch(
      changeSong({
        toBePlayed: true,
        trackId,
        _id,
        title,
        duration,
        artist,
        url,
        photo,
      })
    );
  }
  return (
    <li
      id={trackId}
      key={trackId}
      className={`flex-cols relative box-border flex h-[88px]  w-[400px]
         cursor-pointer items-center justify-between rounded-lg p-5 hover:bg-neutral-700/50`}
      onClick={updateCurrentSong}
    >
      <div className="absoulte left-5 top-5 flex flex-row items-center gap-2">
        <span id="songId" className="hidden">
          {_id}
        </span>
        <span id="trackId" className="hidden">
          {trackId}
        </span>
        <span id="url" className="hidden">
          {url}
        </span>
        <img id="image" src={photo} className=" h-12 w-12  rounded-[56px]" />
        <div className="flex flex-col">
          <span id="title" className=" text-lg leading-6">
            {title}
          </span>
          <span id="artist" className="  text-sm leading-6  opacity-60 ">
            {artist}
          </span>
        </div>
      </div>
      <span
        id="duration"
        className="left-96 top-8 text-lg leading-6 opacity-60"
      >
        {getDurationFormat(duration)}
      </span>
    </li>
  );
}
