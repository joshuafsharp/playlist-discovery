import { Hero } from "~/components/home/hero.server";
import { Header } from "~/components/layouts/default/header.client";

// do not cache this page
export const revalidate = 0;

export default async function Home() {
  return (
    <div>
      <Header />

      <Hero />
    </div>
  );
}
