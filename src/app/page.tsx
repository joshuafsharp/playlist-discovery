// import createClient from "~/common/supabase/server";
import { Hero } from "~/components/home/hero";

// do not cache this page
export const revalidate = 0;

export default async function Home() {
  // const supabase = createClient();
  // const { data } = await supabase.from("posts").select("*");

  return (
    <>
      <Hero />

      {/* <pre>{JSON.stringify({ data }, null, 2)}</pre> */}
    </>
  );
}
