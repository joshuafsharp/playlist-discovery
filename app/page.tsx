import Image from "next/image";
import { stringify } from "query-string";

import styles from "./page.module.css";
import Artists from "./artists";

// const fetchTodo = async () => {
//   const test = spotifyApiClient.getAccessToken();
//   console.log("whatahwhhhtaw", test);

//   const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");

//   console.log(JSON.stringify(spotifyApiClient));

//   const thing = await spotifyApiClient.getArtists(["2JWmMcE8Z0vapxOIiT7PLq"]);

//   console.log(thing);

//   if (!response.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return response.json();
// };

/**
 * Generates a random string containing numbers and letters
 */
const generateRandomString = (length: number) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const getAuthoriseUrl = () => {
  const scopes = "user-read-private user-read-email";
  const state = generateRandomString(16);

  return `https://accounts.spotify.com/authorize?${stringify({
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID,
    scope: scopes,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    state: state,
  })}`;
};

export default async function Home() {
  const authoriseUrl = getAuthoriseUrl();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js 13!</a>
        </h1>

        <Artists />

        <a href={authoriseUrl}>Here you can log in to spotify</a>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>app/page.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://beta.nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js 13</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Explore the Next.js 13 playground.</p>
          </a>

          <a
            href="https://vercel.com/templates/next.js/app-directory?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>Deploy your Next.js site to a public URL with Vercel.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
