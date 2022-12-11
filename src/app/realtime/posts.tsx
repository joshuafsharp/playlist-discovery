"use client";

import { useEffect, useState } from "react";
import { Database } from "../../db_types";
import supabase from "~/common/supabase/browser";

type Post = Database["public"]["Tables"]["posts"]["Row"];

export default function Posts({ serverPosts }: { serverPosts: Post[] }) {
  const [posts, setPosts] = useState(serverPosts);

  useEffect(() => {
    setPosts(serverPosts);
  }, [serverPosts]);

  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        (payload) => setPosts((posts) => [...posts, payload.new as Post])
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [serverPosts]);

  return <pre>{JSON.stringify(posts, null, 2)}</pre>;
}
