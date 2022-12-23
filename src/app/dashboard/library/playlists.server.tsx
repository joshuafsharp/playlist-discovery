"server-only";

import Image from "next/image";
import { spotifyApi } from "~/common/spotify/server";

interface Props {
  token: string;
}

export const revalidate = 0;

const fetchPlaylists = async (token: string) => {
  spotifyApi.setAccessToken(token);

  const response = await spotifyApi.getUserPlaylists();

  return response.body.items;
};

export const LibraryPlaylists = async ({ token }: Props) => {
  const playlists = await fetchPlaylists(token);

  return (
    <section className="mt-12">
      <h2 className="mb-8 text-xl font-semibold leading-tight tracking-wide dark:text-white">
        Playlists
      </h2>

      <ul className="flex items-center space-x-6 overflow-x-auto scroll-smooth">
        {playlists.map((playlist) => (
          <li
            key={playlist.id}
            className="w-36 flex-shrink-0 self-start dark:text-white"
          >
            {playlist.images[0] && (
              <Image
                alt={playlist.name}
                src={playlist.images[0].url}
                width={playlist.images[0]?.width}
                height={playlist.images[0]?.height}
                className="mb-2 rounded-md"
              />
            )}

            <div className="font-semibold">{playlist.name}</div>
          </li>
        ))}
      </ul>
    </section>
  );
};
