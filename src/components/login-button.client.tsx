"use client";

import { useRouter } from "next/navigation";
import { useSupabase } from "./supabase/provider.client";

export default function LoginButton() {
  const { supabase, session } = useSupabase();
  const router = useRouter();

  const authenticated = session && (session.provider_token || session.provider_refresh_token);

  const handleLogIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "spotify",
      options: {
        scopes:
          "user-library-read user-follow-read streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state user-library-read user-library-modify",
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/authenticated`,
      },
    });

    if (error) {
      console.log({ error });
    }
  };

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log({ error });
      return;
    }

    router.replace("/");
  };

  // this `session` is from the root loader - server-side
  // therefore, it can safely be used to conditionally render
  // SSR pages without issues with hydration
  return (
    <>
      <div className="absolute -inset-px rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-200"></div>
      <button
        className="relative inline-flex w-full items-center justify-center rounded-full border border-transparent bg-white px-6 py-2 text-base font-normal text-gray-900 hover:animate-pulse dark:bg-black dark:text-white"
        onClick={authenticated ? handleLogOut : handleLogIn}
      >
        {authenticated ? "Log out" : "Log in with Spotify"}
      </button>
    </>
  );
}
