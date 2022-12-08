"use client";

// import { redirect } from "next/dist/server/api-utils";
import { usePathname } from "next/navigation";
import React from "react";

export default function Callback() {
  const pathname = usePathname();
  console.log(pathname);

  //   console.log(router.query);

  //   const code = router.query.code || null;
  //   const state = router.query.state || null;

  //   React.use(
  //     fetch("/api/authenticate", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         code,
  //         state,
  //       }),
  //     })
  //   );

  //   //   redirect();

  return <h1>Well, Hi</h1>;
}
