import React from "react";
import Navbar from "./Navbar";
import SongList from "./SongList";
import Player from "./Player";

export default function Layout() {
  return (
    <div
      id="Layout"
      className="grid h-[100vh] grid-cols-[278px_440px_1fr]"
    >
      <div id="navbar">
        <Navbar />
      </div>
      <aside id="songlist">
        <SongList />
      </aside>
      <div id="player">
        <Player />
      </div>
    </div>
  );
}
