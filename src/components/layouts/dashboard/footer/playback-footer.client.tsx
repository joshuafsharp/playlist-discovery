"use client";

import SpotifyPlayer from "react-spotify-web-playback";
import { useSupabase } from "~/components/supabase/provider.client";

export const PlaybackFooter = () => {
  const { session } = useSupabase();

  if (!session?.provider_token) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-30">
      <SpotifyPlayer
        token={session.provider_token}
        magnifySliderOnHover
        showSaveIcon
        styles={{}}
        syncExternalDevice
      />
    </div>
  );
};

export default PlaybackFooter;
