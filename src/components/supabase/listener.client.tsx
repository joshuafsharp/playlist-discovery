"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import type { AuthChangeEvent } from "@supabase/supabase-js";
import { useSupabase } from "./provider.client";

// this component handles refreshing server data when the user logs in or out
// this method avoids the need to pass a session down to child components
// in order to re-render when the user's session changes
// #elegant!
export default function SupabaseListener({
  serverAccessToken,
}: {
  serverAccessToken?: string;
}) {
  const { supabase } = useSupabase();
  const router = useRouter();

  const prevEvent = useRef<AuthChangeEvent | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && prevEvent.current !== "SIGNED_IN") {
        router.replace("/dashboard/library");
      } else if (event === "SIGNED_OUT") {
        router.replace("/");
      }

      prevEvent.current = event;

      if (session?.access_token !== serverAccessToken) {
        // server and client are out of sync
        // reload the page to fetch fresh server data
        // https://beta.nextjs.org/docs/data-fetching/mutating

        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [serverAccessToken, router, supabase]);

  return null;
}
