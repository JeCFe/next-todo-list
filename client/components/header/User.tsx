"use client";
import { useUser } from "@auth0/nextjs-auth0/client";

export function User() {
  const { user, error, isLoading } = useUser();
  return (
    <div>
      {isLoading ? (
        <div>Loading... {/*Change with spinner comp*/}</div>
      ) : (
        <div>
          {user ? (
            <div className="flex flex-row divide-x">
              <div className="flex flex-row space-x-4 pr-2">
                <p className="flex items-center">{user.name ?? user.email}</p>

                {/* eslint-disable-next-line @next/next/no-img-element*/}
                <img
                  src={user.picture ?? ""}
                  alt="User profile picture"
                  className="w-14 h-14 rounded-full flex items-center"
                />
              </div>

              <a className="pl-2 flex items-center" href="/api/auth/logout">
                Logout
              </a>
            </div>
          ) : (
            <a className="inline-block" href="/api/auth/login">
              Login
            </a>
          )}
        </div>
      )}
    </div>
  );
}
