import { LibraryPlaylists } from "./playlists";
import createClient from "~/common/supabase/server";

export async function Library() {
  const supabase = createClient();

  const response = await supabase.auth.getSession();

  console.log();
  console.log(response?.data?.session?.access_token);
  console.log();

  return (
    <>
      <h1>Library</h1>

      {/* @ts-expect-error borked type */}
      <LibraryPlaylists token={response?.data?.session?.access_token || ""} />
    </>
  );
}

export default Library;
