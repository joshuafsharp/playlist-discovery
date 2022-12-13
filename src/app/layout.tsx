import "server-only";

import "./globals.css";

import { SupabaseClient } from "@supabase/auth-helpers-react";
import type { Database } from "../db_types";
import createClient from "~/common/supabase/server";
import SupabaseListener from "~/components/supabase/listener";
// import Login from "~/components/login";
import { Header } from "~/components/header";
import SupabaseProvider from "~/components/supabase/provider";

export type TypedSupabaseClient = SupabaseClient<Database>;

// do not cache this layout
export const revalidate = 0;

// Layout applies to the home page, discover and support
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    /**
      TODO: Handle user selected colour scheme, as well as system preference:
      https://tailwindcss.com/docs/dark-mode
    */
    <html lang="en" className="dark dark:bg-black">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="max-w-screen min-h-screen">
        <SupabaseProvider session={session}>
          <SupabaseListener serverAccessToken={session?.access_token} />

          <Header />

          {children}
        </SupabaseProvider>
      </body>
    </html>
  );
}
