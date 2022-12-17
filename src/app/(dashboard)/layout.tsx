import "server-only";

import { SupabaseClient } from "@supabase/auth-helpers-react";
import {
  ArchiveBoxIcon,
  FlagIcon,
  InboxIcon,
  NoSymbolIcon,
  PencilSquareIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import type { Database } from "~/common/types/supabase";
import createClient from "~/common/supabase/server";
import SupabaseListener from "~/components/supabase/listener";
import { Header } from "~/components/layouts/dashboard/header";
import SupabaseProvider from "~/components/supabase/provider";

export type TypedSupabaseClient = SupabaseClient<Database>;

// do not cache this layout
export const revalidate = 0;

const sidebarNavigation = [
  { name: "Open", href: "#", icon: InboxIcon, current: true },
  { name: "Archive", href: "#", icon: ArchiveBoxIcon, current: false },
  { name: "Customers", href: "#", icon: UserCircleIcon, current: false },
  { name: "Flagged", href: "#", icon: FlagIcon, current: false },
  { name: "Spam", href: "#", icon: NoSymbolIcon, current: false },
  { name: "Drafts", href: "#", icon: PencilSquareIcon, current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// Layout applies to the home page, discover and support
export default async function DashboardLayout({
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
          <>
            {/*
                This example requires updating your template:

                ```
                <html class="h-full bg-gray-100">
                <body class="h-full overflow-hidden">
                ```
            */}
            <div className="flex h-full flex-col">
              <Header />

              {/* Bottom section */}
              <div className="flex min-h-0 flex-1 overflow-hidden">
                {/* Narrow sidebar*/}
                <nav
                  aria-label="Sidebar"
                  className="hidden md:block md:flex-shrink-0 md:overflow-y-auto md:bg-gray-800"
                >
                  <div className="relative flex w-20 flex-col space-y-3 p-3">
                    {sidebarNavigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-400 hover:bg-gray-700",
                          "inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg"
                        )}
                      >
                        <span className="sr-only">{item.name}</span>
                        <item.icon className="h-6 w-6" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </nav>

                {/* Main area */}
                <main className="min-w-0 flex-1 border-t border-gray-200 lg:flex">
                  {/* Primary column */}
                  <section
                    aria-labelledby="primary-heading"
                    className="flex h-full min-w-0 flex-1 flex-col overflow-y-auto"
                  >
                    <h1 id="primary-heading" className="sr-only">
                      Home
                    </h1>
                    {/* Your content */}

                    {children}
                  </section>

                  {/* Secondary column (hidden on smaller screens) */}
                  <aside className="hidden lg:block lg:flex-shrink-0">
                    <div className="relative flex h-full w-96 flex-col overflow-y-auto border-r border-gray-200 bg-gray-100">
                      {/* Your content */}
                    </div>
                  </aside>
                </main>
              </div>
            </div>
          </>
        </SupabaseProvider>
      </body>
    </html>
  );
}
