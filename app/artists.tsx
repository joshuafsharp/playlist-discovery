"use client";

import React, { useState } from "react";
import { spotifyClient } from "../common/spotify";

export default function Artists() {
  const [response, setResponse] = useState<any>(null);

  React.useEffect(() => {
    async () => {
      const artists = await spotifyClient.getMe();

      console.log(artists);

      setResponse(artists);
    };
  });

  return <div>{JSON.stringify(response, null, 2)}</div>;
}
