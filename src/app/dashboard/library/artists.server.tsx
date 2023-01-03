"server-only";

import Image from "next/image";
import Link from "next/link";
import { spotifyApi } from "~/common/spotify/server";

interface Props {
  token: string;
}

export const revalidate = 0;

const fetchArtists = async (token: string) => {
  spotifyApi.setAccessToken(token);

  const response = await spotifyApi.getFollowedArtists();

  return response.body.artists;
};

export const LibraryArtists = async ({ token }: Props) => {
  const artists = await fetchArtists(token);

  return (
    <section className="mt-12">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl font-semibold leading-tight tracking-wide dark:text-white">
          <Link
            href="/dashboard/library/artists"
            aria-label="View all artists"
            className="hover:underline"
          >
            Your Artists
          </Link>
        </h2>

        {/* TODO: Artists index page */}
        <Link
          href="/dashboard/library/artists"
          aria-label="View all artists"
          className=" uppercase tracking-wide hover:text-zinc-300 hover:underline dark:text-zinc-200"
        >
          View all
        </Link>
      </div>

      <ul className="flex items-stretch space-x-2 overflow-x-auto scroll-smooth">
        {artists.items.map((artist) => (
          <li
            key={artist.id}
            className="flex w-36 flex-shrink-0 self-stretch rounded-lg transition-colors hover:bg-zinc-900 dark:text-white"
          >
            <Link href={`/dashboard/library/artists/${artist.id}`}>
              <div className="flex flex-col p-4">
                {artist.images[0] && (
                  <Image
                    alt={artist.name}
                    src={artist.images[0].url}
                    width={artist.images[0]?.width}
                    height={artist.images[0]?.height}
                    className="mb-2 rounded-md"
                  />
                )}

                <div className="flex-grow font-semibold line-clamp-3">
                  {artist.name}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
