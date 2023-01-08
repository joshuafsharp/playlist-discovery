"use client";

import { useRouter } from "next/navigation";
import { useSupabase } from "~/components/supabase/provider.client";

export const ProtectedRouteRedirect = () => {
  const { session } = useSupabase();
  const { replace } = useRouter();

  if (!session || !session.provider_token || !session.provider_refresh_token) {
    replace("/login");
  }

  return null;
};

export default ProtectedRouteRedirect;
