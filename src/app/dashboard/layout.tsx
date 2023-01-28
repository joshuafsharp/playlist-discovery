import "server-only";

import { SessionManager } from "./session-manager.client";
import { ProtectedServerRoute } from "./protected-route.server";
import { Header } from "~/components/layouts/dashboard/header/header.client";
import { NavigationSidebar } from "~/components/layouts/dashboard/navigation-sidebar.server";
import { PlaybackFooter } from "~/components/layouts/dashboard/footer/playback-footer.client";

// do not cache this layout
export const revalidate = 0;

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* @ts-expect-error Type 'Promise<{ children: ReactNode; } | null>' is missing the following properties from type 'ReactElement<any, any>': type, props, key */}
      <ProtectedServerRoute>
        <SessionManager>
          <div className="mb-16">
            <NavigationSidebar />

            <div
              className=" w-full md:pl-20"
              //  lg:pr-96">
            >
              <Header />

              {/* Main area */}
              <main className=" p-8 lg:p-12">
                {/* Your content */}
                {children}
              </main>
            </div>

            {/* TODO Secondary column (hidden on smaller screens)
            <aside className="fixed inset-y-0 right-0 z-10 hidden w-96 flex-col overflow-y-auto dark:bg-zinc-900 lg:flex">

            </aside> */}
          </div>

          <PlaybackFooter />
        </SessionManager>
      </ProtectedServerRoute>
    </>
  );
}
