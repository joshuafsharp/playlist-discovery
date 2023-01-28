"use client";

import { PlayCircleIcon } from "@heroicons/react/24/outline";
import { useSpotifyPlayer } from "react-spotify-web-playback-sdk";

export const PlaybackFooter = () => {
  const player = useSpotifyPlayer();

  if (!player) {
    return null;
  }

  player.resume();
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex h-16 items-center justify-between px-4 dark:bg-zinc-800">
      {/* TODO: Currently playing track */}
      <div></div>

      <button type="button" className="h-10 w-10" onClick={player.togglePlay}>
        <PlayCircleIcon className="stroke-zinc-400 hover:stroke-zinc-300" />
      </button>

      {/* TODO: Volume */}
      <div></div>
    </div>
  );
};

export default PlaybackFooter;
