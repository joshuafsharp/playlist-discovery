import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "~/common/types";

export const createBrowserClient = () =>
  createBrowserSupabaseClient<Database>();
