"server-only";

import Image from "next/image";
import Link from "next/link";
import { spotifyApi } from "~/common/spotify/server";

interface Props {
  token: string;
}

export const revalidate = 0;

const fetchMyTracks = async (token: string) => {
  spotifyApi.setAccessToken(token);

  const response = await spotifyApi.getMySavedTracks();

  return response.body.items;
};

export const LibraryTracks = async ({ token }: Props) => {
  const tracks = await fetchMyTracks(token);

  return (
    <section className="mt-12">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl font-semibold leading-tight tracking-wide dark:text-white">
          <Link
            href="/dashboard/library/tracks"
            aria-label="View all tracks"
            className="hover:underline"
          >
            Your Tracks
          </Link>
        </h2>

        {/* TODO: Tracks index page */}
        <Link
          href="/dashboard/library/tracks"
          aria-label="View all tracks"
          className=" uppercase tracking-wide hover:text-zinc-300 hover:underline dark:text-zinc-200"
        >
          View all
        </Link>
      </div>

      <ul className="flex items-stretch space-x-2 overflow-x-auto scroll-smooth">
        {tracks.map(({ track }) => (
          <li
            key={track.id}
            className="flex w-36 flex-shrink-0 self-stretch rounded-lg transition-colors hover:bg-zinc-900 dark:text-white"
          >
            <Link href={`/dashboard/library/tracks/${track.id}`}>
              <div className="flex flex-col p-4">
                {track.album.images[0] && (
                  <Image
                    alt={track.name}
                    src={track.album.images[0].url}
                    width={track.album.images[0]?.width}
                    height={track.album.images[0]?.height}
                    className="mb-2 rounded-md"
                  />
                )}

                <div className="flex-grow font-semibold line-clamp-3">
                  {track.name}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
