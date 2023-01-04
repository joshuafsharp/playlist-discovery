import Image from "next/image";
import Link from "next/link";
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
      <div className="flex items-center mb-12">
        <Image
          alt={playlist.name}
          src={playlist.images[0].url}
          width={playlist.images[0].width}
          height={playlist.images[0].height}
          className="rounded-md w-40 h-auto mr-8 shadow shadow-zinc-800"
        />

        <h1 className="text-4xl font-bold leading-tight tracking-wide dark:text-white">
          {playlist.name}
        </h1>
      </div>

      <table className="w-full">
        <tbody className="space-y-4">
          {playlist.tracks.items.map(
            (item, index) =>
              item.track !== null && (
                <tr
                  className="flex w-full space-x-4 dark:text-zinc-400"
                  key={item.track?.id}
                >
                  <td className="self-center">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td>
                    {item.track?.album.images[0] && (
                      <Image
                        alt={item.track.name}
                        src={item.track?.album.images[0].url}
                        width={item.track?.album.images[0]?.width}
                        height={item.track?.album.images[0]?.height}
                        className="rounded-md w-14 h-auto"
                      />
                    )}
                    {/* TODO: else show placeholder image */}
                  </td>

                  <td className="w-2/3 max-w-sm">
                    <div className="text-white">{item.track.name}</div>
                    <div className="text-sm">
                      {item.track.artists.map((artist, index) => (
                        <>
                          <Link
                            key={artist.id}
                            href={`/artists/${artist.id}`}
                            className="hover:underline hover:text-white transition-colors"
                          >
                            {artist.name}
                          </Link>

                          {index < (item.track?.artists?.length || 1) - 1 &&
                            ", "}
                        </>
                      ))}
                    </div>
                  </td>

                  <td className="self-center">
                    {" "}
                    <Link
                      key={item.track.album.id}
                      href={`/artists/${item.track.album.id}`}
                      className="hover:underline hover:text-white transition-colors text-sm"
                    >
                      {item.track.album.name}
                    </Link>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </>
  );
}
