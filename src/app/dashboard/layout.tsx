import "server-only";

import { Header } from "~/components/layouts/dashboard/header/header";
import { NavigationSidebar } from "~/components/layouts/dashboard/navigation-sidebar";

// do not cache this layout
export const revalidate = 0;

// Layout applies to the home page, discover and support
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full min-h-screen w-full">
      <NavigationSidebar />

      <div className="flex h-full flex-grow flex-col">
        <Header />

        <div className="flex min-h-0 flex-1 overflow-hidden">
          {/* Main area */}
          <main className="min-w-0 flex-1 lg:flex">
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
          </main>
        </div>
      </div>

      {/* Secondary column (hidden on smaller screens) */}
      <aside className="hidden dark:bg-zinc-900 lg:block lg:flex-shrink-0">
        <div className="relative flex h-full w-96 flex-col overflow-y-auto ">
          {/* Your content */}
        </div>
      </aside>
    </div>
  );
}
