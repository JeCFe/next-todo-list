import { Middleware } from "openapi-typescript-fetch";

export const addAuth =
  (token: string): Middleware =>
  async (url, init, next) => {
    init.headers.append("Authorization", `Bearer ${token}`);
    return next(url, init);
  };
