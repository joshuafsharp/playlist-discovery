"use client";

import { useRouter } from "next/navigation";
import { spotifyApi } from "~/common/spotify/server";
import { PlaybackProvider } from "~/components/library/playback-provider.client";
import { useSupabase } from "~/components/supabase/provider.client";

interface Props {
  children: React.ReactNode;
}

export const SessionManager = ({ children }: Props) => {
  const { session } = useSupabase();
  const { replace } = useRouter();

  if (!session || !session.provider_token || !session.provider_refresh_token) {
    replace("/login");

    return null;
  }

  spotifyApi.setAccessToken(session.provider_token || "");
  spotifyApi.setRefreshToken(session.provider_refresh_token || "");

  return <PlaybackProvider token={session.provider_token}>{children}</PlaybackProvider>;
};

export default SessionManager;
