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
  return (
    <div>
      Hello world!
      <div>
        <a className="inline-block" href="/api/auth/login">
          Login
        </a>
      </div>
      <div>
        <a className="inline-block" href="/api/auth/logout">
          Logout
        </a>
      </div>
      <div>
        {user && (
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element*/}
            <img src={user.picture ?? ""} alt={user.name ?? "User name"} />
            <h2>{user.updated_at}</h2>
            <p>{user.email}</p>
          </div>
        )}
      </div>
      <button onClick={() => issue({ text: "Trial" })}>Issue preset</button>
      {!todoLoading && <div>{data?.map((x) => x.text)}</div>}
    </div>
  );
}
