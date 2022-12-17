import { Hero } from "~/components/home/hero";
import { Header } from "~/components/layouts/default/header";

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
