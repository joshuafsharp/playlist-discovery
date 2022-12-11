import "server-only";

import Posts from "./posts";
import createClient from "~/common/supabase/server";

// do not cache this page
export const revalidate = 0;

export default async function Realtime() {
  const supabase = createClient();
  const { data } = await supabase.from("posts").select("*");

  return <Posts serverPosts={data || []} />;
}
