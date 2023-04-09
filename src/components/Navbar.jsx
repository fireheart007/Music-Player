import React from "react";
import playerLogo from "../assets/Player_Logo.png";
import { useQuery } from "@apollo/client";
import { getPlaylists } from "../common/api";
import { NavLink } from "react-router-dom";
import { changePlaylistId } from "../store/changePlaylist";
import { useDispatch } from "react-redux";
import Loader from "./Loader";

export default function Navbar() {
  const dispatch = useDispatch();

  const { loading, error, data } = useQuery(getPlaylists);
  if (loading) return <Loader/>;
  if (error) return <h1 className="text-white">{JSON.stringify(error)}</h1>;
  else {
    const { getPlaylists } = data;
    return (
      <div>
        <img src={playerLogo} alt="player loo" className="ml-8 mt-8 h-10" />
        <ul id="navbarList" className="ml-8 mt-7">
          {getPlaylists.map(({ id, title }) => (
            <li
              key={id}
              className="mb-6 text-xl font-normal leading-8 text-white"
            >
              <NavLink
                onClick={() => {
                  dispatch(changePlaylistId({ id, title }));
                }}
                className={({ isActive }) => (isActive ? "" : "opacity-40")}
                to={
                  id === 1 ? "/" : `${title.split(" ").join("").toLowerCase()}`
                }
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
