"use client";
import { useGetTodos } from "@/hooks/useGetTodos";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getApiClient } from "../services";

const issue = getApiClient().path("/todo/add").method("post").create();

export default function Home() {
  const { user, error, isLoading } = useUser();

  const { data, isLoading: todoLoading, error: todoError } = useGetTodos();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return <div className="container mx-auto">Hello world!</div>;
}
