import "server-only";

import { LibraryTracks } from "./tracks.server";
import { LibraryPlaylists } from "./playlists.server";
import { LibraryArtists } from "./artists.server";
import createClient from "~/common/supabase/server";
import { spotifyApi } from "~/common/spotify/server";

export async function Library() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    console.log("Not authenticated");
    return null;
  }

  spotifyApi.setAccessToken(session.provider_token || "");
  spotifyApi.setRefreshToken(session.provider_refresh_token || "");

  return (
    <>
      <h1 className="mb-12 text-3xl font-semibold leading-tight tracking-wide dark:text-white">
        Your Library
      </h1>

      {/* @ts-expect-error borked type */}
      <LibraryPlaylists />

      {/* @ts-expect-error borked type */}
      <LibraryArtists />

      {/* @ts-expect-error borked type */}
      <LibraryTracks />
    </>
  );
}

export default Library;
