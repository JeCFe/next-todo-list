import { Middleware } from "openapi-typescript-fetch";
import { getAuthToken } from "./getAuthToken";

export const addAuth = (): Middleware => async (url, init, next) => {
  const token = await getAuthToken();
  init.headers.append("Authorization", `Bearer ${token}`);
  return next(url, init);
};
