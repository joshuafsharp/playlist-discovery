import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import { spotifyApi } from "~/common/spotify/server";
import createClient from "~/common/supabase/server";

export const revalidate = 0;

const fetchMyTracks = async () => {
  const response = await spotifyApi.getMySavedTracks();

  return response.body.items;
};

export default async function Playlist() {
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

  const myTracks = await fetchMyTracks();

  return (
    <>
      <div className="mb-12 flex items-center">
        {/* TODO: Show my tracks image */}
        {/* <Image
          alt={myTracks.name}
          src={myTracks.images[0].url}
          width={myTracks.images[0].width}
          height={myTracks.images[0].height}
          className="mr-8 h-auto w-40 rounded-md shadow shadow-zinc-800"
        /> */}

        <h1 className="text-4xl font-bold leading-tight tracking-wide dark:text-white">
          Your Tracks
        </h1>
      </div>

      <table className="relative w-full border-separate" cellSpacing={0}>
        <thead className="border-b pb-2 text-sm font-medium uppercase dark:border-zinc-800 dark:text-zinc-400">
          <tr className="text-left">
            <th className="sticky top-16 border-b px-2 pb-1 text-center dark:border-zinc-800 dark:bg-black">
              #
            </th>
            <th className="sticky top-16 border-b px-2 pb-1 dark:border-zinc-800 dark:bg-black" />
            <th className="sticky top-16 border-b px-2 pb-1 dark:border-zinc-800 dark:bg-black">
              Title
            </th>
            <th className="sticky top-16 border-b px-2 pb-1 dark:border-zinc-800 dark:bg-black">
              Album
            </th>
          </tr>
        </thead>

        <tbody className="space-y-4">
          {myTracks.map(
            (item, index) =>
              item.track !== null && (
                <tr className="w-full dark:text-zinc-400" key={item.track?.id}>
                  <td
                    className={clsx("p-2 text-center", {
                      "w-10": myTracks.length < 100,
                      "w-12": myTracks.length >= 100,
                      "pt-6": index === 0,
                    })}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </td>

                  <td
                    className={clsx("w-24 p-2", {
                      "pt-6": index === 0,
                    })}
                  >
                    {/* TODO: min width w-24 */}
                    {item.track?.album.images[0] && (
                      <Image
                        alt={item.track.name}
                        src={item.track?.album.images[0].url}
                        width={item.track?.album.images[0]?.width}
                        height={item.track?.album.images[0]?.height}
                        className="h-auto w-16 min-w-[4rem] rounded-md"
                      />
                    )}
                    {/* TODO: else show placeholder image */}
                  </td>

                  <td
                    className={clsx("p-2", {
                      "pt-6": index === 0,
                    })}
                  >
                    <div className="text-white">{item.track.name}</div>

                    <div className="text-sm">
                      {item.track.artists.map((artist, index) => (
                        <>
                          <Link
                            key={artist.id}
                            href={`dashboard/library/artists/${artist.id}`}
                            className="transition-colors hover:text-white hover:underline"
                          >
                            {artist.name}
                          </Link>

                          {index < (item.track?.artists?.length || 1) - 1 && ", "}
                        </>
                      ))}
                    </div>
                  </td>

                  <td
                    className={clsx("self-center p-2", {
                      "pt-6": index === 0,
                    })}
                  >
                    {" "}
                    <Link
                      key={item.track.album.id}
                      href={`dashboard/library/artists/${item.track.album.id}`}
                      className="text-sm transition-colors hover:text-white hover:underline"
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
