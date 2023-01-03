import { spotifyApi } from "~/common/spotify/server";
import createClient from "~/common/supabase/server";

interface Props {
  params: {
    id: string;
  };
}

export const revalidate = 0;

const fetchPlaylist = async (token: string, id: string) => {
  spotifyApi.setAccessToken(token);

  const response = await spotifyApi.getPlaylist(id);

  return response.body;
};

export default async function Playlist(props: Props) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const playlist = await fetchPlaylist(
    session?.provider_token || "",
    props.params.id
  );

  return (
    <>
      <h1 className="mb-12 text-3xl font-semibold leading-tight tracking-wide dark:text-white">
        {playlist.name}
      </h1>

      <table>
        <tbody>
          {playlist.tracks.items.map((item, index) => (
            <tr className="flex justify-between" key={item.track?.id}>
              <td>{String(index).padStart(2, "0")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
