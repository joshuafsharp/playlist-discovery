import { LibraryPlaylists } from "./playlists";
import createClient from "~/common/supabase/server";

export async function Library() {
  const supabase = createClient();

  const response = await supabase.auth.getSession();

  return (
    <>
      <h1>Library</h1>

      {/* @ts-expect-error borked type */}
      <LibraryPlaylists token={response?.data?.session?.provider_token || ""} />
    </>
  );
}

export default Library;
