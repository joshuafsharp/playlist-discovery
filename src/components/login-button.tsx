"use client";

import { useSupabase } from "./supabase/provider";

export default function LoginButton() {
  const { supabase, session } = useSupabase();

  const handleLogIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "spotify",
    });

    if (error) {
      console.log({ error });
    }
  };

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log({ error });
    }
  };

  // this `session` is from the root loader - server-side
  // therefore, it can safely be used to conditionally render
  // SSR pages without issues with hydration
  return (
    <>
      <div className="absolute -inset-px rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-200 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
      <button
        className="relative inline-flex items-center justify-center rounded-full border border-transparent bg-black px-6 py-2 text-base font-normal text-white"
        onClick={session ? handleLogOut : handleLogIn}
      >
        {session ? "Log out" : "Log in with Spotify"}
      </button>
    </>
  );
}
