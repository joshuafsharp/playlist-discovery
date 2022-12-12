import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { spotifyApi } from "~/common/spotify/server";
import { spotifyClient } from "~/common/spotify/browser";

// TODO: Add support for middleware once it's supported in next 13
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareSupabaseClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Not authenticated
  if (!session?.provider_token) {
    return res;
  }

  // TODO: fix
  spotifyClient.setAccessToken(session.provider_token);
  spotifyApi.setAccessToken(session.provider_token);

  return res;
}

export const config = {
  matcher: ["/realtime", "/library"],
};
