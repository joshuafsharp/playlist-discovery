"server-only";

import Image from "next/image";
import Link from "next/link";
import { spotifyApi } from "~/common/spotify/server";

export const revalidate = 0;

const fetchPlaylists = async () => {
  const response = await spotifyApi.getUserPlaylists();

  return response.body.items;
};

export const LibraryPlaylists = async () => {
  const playlists = await fetchPlaylists();

  return (
    <section className="mt-12">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl font-semibold leading-tight tracking-wide dark:text-white">
          <Link
            href="/dashboard/library/playlists"
            aria-label="View all playlists"
            className="hover:underline"
          >
            Your Playlists
          </Link>
        </h2>

        {/* TODO: Playlists index page */}
        <Link
          href="/dashboard/library/playlists"
          aria-label="View all playlists"
          className=" uppercase tracking-wide hover:text-zinc-300 hover:underline dark:text-zinc-200"
        >
          View all
        </Link>
      </div>

      <ul className="flex items-stretch space-x-2 overflow-x-auto scroll-smooth">
        {playlists.map((playlist) => (
          <li
            key={playlist.id}
            className="flex w-36 flex-shrink-0 self-stretch rounded-lg transition-colors hover:bg-zinc-900 dark:text-white"
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

                <div className="flex-grow font-semibold line-clamp-3">
                  {playlist.name}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
