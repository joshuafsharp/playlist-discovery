"use client";

import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ValidateAuth() {
  console.log("hi");

  const { replace } = useRouter();
  const { session } = useSessionContext();

  replace("/test");

  useEffect(() => {
    if (session) {
      replace("/dashboard/library");
    }
  }, [session, replace]);

  return null;
}
