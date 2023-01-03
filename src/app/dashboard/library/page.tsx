import { LibraryTracks } from "./tracks.server";
import { LibraryPlaylists } from "./playlists.server";
import { LibraryArtists } from "./artists.server";
import createClient from "~/common/supabase/server";

export async function Library() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <>
      <h1 className="mb-12 text-3xl font-semibold leading-tight tracking-wide dark:text-white">
        Your Library
      </h1>

      {/* @ts-expect-error borked type */}
      <LibraryPlaylists token={session?.provider_token || ""} />

      {/* @ts-expect-error borked type */}
      <LibraryArtists token={session?.provider_token || ""} />

      {/* @ts-expect-error borked type */}
      <LibraryTracks token={session?.provider_token || ""} />
    </>
  );
}

export default Library;
