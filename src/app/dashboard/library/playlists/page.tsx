import Image from "next/image";
import Link from "next/link";
import { spotifyApi } from "~/common/spotify/server";
import createClient from "~/common/supabase/server";

export const revalidate = 0;

const fetchPlaylists = async () => {
  const response = await spotifyApi.getUserPlaylists();

  return response.body.items;
};

export default async function LibraryPlaylists() {
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

  const playlists = await fetchPlaylists();

  return (
    <>
      <h1 className="mb-12 text-3xl font-semibold leading-tight tracking-wide dark:text-white">
        Your Playlists
      </h1>

      <ul className="flex flex-wrap items-stretch">
        {playlists.map((playlist) => (
          <li
            key={playlist.id}
            className="flex w-1/2 rounded-lg px-2 transition-colors hover:bg-zinc-900 dark:text-white md:w-1/4 lg:w-1/4 xl:w-1/5 2xl:w-1/6"
          >
            <Link href={`/dashboard/library/playlists/${playlist.id}`}>
              <div className="flex flex-col p-4">
                {playlist.images[0] && (
                  <Image
                    alt={playlist.name}
                    src={playlist.images[0].url}
                    width={playlist.images[0]?.width}
                    height={playlist.images[0]?.height}
                    className="mb-2 rounded-md"
                  />
                )}

                <div className="grow font-semibold line-clamp-3">{playlist.name}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
