"use client";

import { useRouter } from "next/navigation";
import { spotifyApi } from "~/common/spotify/server";
import { useSupabase } from "~/components/supabase/provider.client";

export const ProtectedRouteRedirect = () => {
  const { session } = useSupabase();
  const { replace } = useRouter();

  if (!session || !session.provider_token || !session.provider_refresh_token) {
    replace("/login");

    return null;
  }

  spotifyApi.setAccessToken(session.provider_token || "");
  spotifyApi.setRefreshToken(session.provider_refresh_token || "");

  spotifyApi.getMyDevices().then((devices) => {
    devices.body.devices.forEach((device) => {
      console.log(device.type);
      if (device.type === "Computer") {
        // spotifyApi.play({ device_id: device.id || "" });
      }
    });
  });

  return null;
};

export default ProtectedRouteRedirect;
