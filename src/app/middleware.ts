import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { spotifyApi } from "~/common/spotify/server";
import { spotifyClient } from "~/common/spotify/browser";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareSupabaseClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log(session);

  if (!session?.access_token) {
    console.log("no access token lol");
    return res;
  }

  spotifyClient.setAccessToken(session.access_token);
  spotifyApi.setAccessToken(session.access_token);

  return res;
}

export const config = {
  matcher: ["/realtime", "/library"],
};
