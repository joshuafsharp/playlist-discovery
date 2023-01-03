"use client";

import { useRouter } from "next/navigation";
import { useSupabase } from "~/components/supabase/provider.client";

export const ProtectedRoute = () => {
  const { session } = useSupabase();
  const { replace } = useRouter();

  if (!session) {
    replace("/login");
  }

  return null;
};

export default ProtectedRoute;
