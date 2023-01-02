import { useRouter } from "next/navigation";
import "server-only";
import createClient from "~/common/supabase/server";

import { Header } from "~/components/layouts/dashboard/header/header.client";
import { NavigationSidebar } from "~/components/layouts/dashboard/navigation-sidebar.server";

// do not cache this layout
export const revalidate = 0;

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { replace } = useRouter();

  const { data } = await supabase.auth.getSession();

  if (!data?.session) {
    console.log("going to login");
    replace("/login");
  }

  return (
    <div>
      <NavigationSidebar />

      <div className="min-h-screen w-full md:pl-20 lg:pr-96">
        <Header />

        {/* Main area */}
        <main className=" p-8 lg:p-12">
          {/* Your content */}
          {children}
        </main>
      </div>

      {/* Secondary column (hidden on smaller screens) */}
      <aside className="fixed inset-y-0 right-0 z-10 hidden w-96 flex-col overflow-y-auto dark:bg-zinc-900 lg:flex">
        {/* Your content */}
      </aside>
    </div>
  );
}
