"use client";
import { TPost } from "@/utils/types";
import wait from "@/utils/wait";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "@utils/axios";
import LoadingSpinner from "./components/LoadingSpinner";

export default function Home() {
  const postsQuery = useQuery(["posts"], fetchPosts);

  if (postsQuery.isError) {
    return <h2>Error: {String((postsQuery.error as Error).message)}</h2>;
  }
  if (postsQuery.isLoading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col gap-8">
      {postsQuery.data.map((item, i) => (
        <div key={i} className="p-2 border border-black rounded">
          <h2 className="font-semibold text-xl">{item.title}</h2>
          <p className="font-light text-gray-600">{item.body}</p>
        </div>
      ))}
    </div>
  );
}

async function fetchPosts() {
  const resp = await axios.get<TPost[]>("/posts");
  return resp.data;
}
