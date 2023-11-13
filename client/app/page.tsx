"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const { user, error, isLoading } = useUser();

  const [state, setState] = useState({
    isLoading: false,
    response: undefined,
    error: undefined,
  });

  const callApi = async () => {
    setState((previous) => ({ ...previous, isLoading: true }));

    try {
      const response = await fetch("/api/protected");
      const data = await response.json();

      setState((previous) => ({
        ...previous,
        response: data,
        error: undefined,
      }));
    } catch (error: any) {
      setState((previous) => ({ ...previous, response: undefined, error }));
    } finally {
      setState((previous) => ({ ...previous, isLoading: false }));
    }
  };

  const { isLoading: stateLoading, response, error: stateError } = state;

  useEffect(() => {
    console.log(state);
  }, [state]);

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
            <img src={user.picture} alt={user.name} />
            <h2>{user.updated_at}</h2>
            <p>{user.email}</p>
          </div>
        )}
      </div>
      <button
        className="mt-5"
        onClick={(e) => callApi()}
        data-testid="external-action"
      >
        Ping API
      </button>
    </div>
  );
}
