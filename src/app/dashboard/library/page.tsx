import { LibraryPlaylists } from "./playlists.server";
import createClient from "~/common/supabase/server";

export async function Library() {
  const supabase = createClient();

  const response = await supabase.auth.getSession();

  return (
    <>
      <h1 className="mb-12 text-3xl font-semibold leading-tight tracking-wide dark:text-white">
        Library
      </h1>

      {/* @ts-expect-error borked type */}
      <LibraryPlaylists token={response?.data?.session?.provider_token || ""} />
    </>
  );
}

export default Library;
