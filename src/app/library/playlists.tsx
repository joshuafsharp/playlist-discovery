"server-only";

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
    <ul>
      {playlists.map((playlist) => (
        <li key={playlist.id}>{JSON.stringify(playlist, null, 2)}</li>
      ))}
    </ul>
  );
};
