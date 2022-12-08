import { headers, cookies } from "next/headers";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../db_types";

const createClient = () =>
  createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });

export default createClient;
