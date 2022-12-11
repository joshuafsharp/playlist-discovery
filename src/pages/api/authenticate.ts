// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  token: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // TODO: Validate state

  const payload = {
    code: req.body.code,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URL,
    grant_type: "authorization_code",
  };

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const authorisation = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  const response = await fetch("https://accounts.spotify.com/api/token", {
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Basic ${authorisation}`,
    },
  });

  const token = await response.json();

  console.log("TOKEN!!!", token);

  res.status(200).json({ token });
}
