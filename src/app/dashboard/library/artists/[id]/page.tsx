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

const fetchArtist = async (id: string) => {
  const response = await spotifyApi.getArtist(id);

  return response.body;
};

const fetchAlbums = async (id: string) => {
  const response = await spotifyApi.getArtistAlbums(id);

  return response.body;
};

export default async function Artist({ params: { id } }: Props) {
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

  const [artist, albums] = await Promise.all([fetchArtist(id), fetchAlbums(id)]);

  return (
    <>
      <div className="mb-12 flex items-center">
        <Image
          alt={artist.name}
          src={artist.images[0].url}
          width={artist.images[0].width}
          height={artist.images[0].height}
          className="mr-8 h-auto w-40 rounded-md shadow shadow-zinc-800"
        />

        <h1 className="text-4xl font-bold leading-tight tracking-wide dark:text-white">
          {artist.name}
        </h1>
      </div>

      <section className="mt-12">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight tracking-wide dark:text-white">
            Discography
          </h2>
        </div>

        <ul className="flex items-stretch space-x-2 overflow-x-auto scroll-smooth">
          {albums.items.map((album) => (
            <li
              key={album.id}
              className="flex w-36 shrink-0 self-stretch rounded-lg transition-colors hover:bg-zinc-900 dark:text-white"
            >
              <Link href={`/dashboard/library/tracks/${album.id}`}>
                <div className="flex flex-col p-4">
                  {album.images[0] && (
                    <Image
                      alt={album.name}
                      src={album.images[0].url}
                      width={album.images[0]?.width}
                      height={album.images[0]?.height}
                      className="mb-2 rounded-md"
                    />
                  )}

                  <div className="mb-2 grow line-clamp-3">{album.name}</div>

                  <div className="text-sm dark:text-zinc-400">
                    {new Date(album.release_date).getFullYear()}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
