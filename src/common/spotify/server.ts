import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: "https://lnutbwkvocsvbyigqsig.supabase.co/auth/v1/callback",
});

export { spotifyApi };
