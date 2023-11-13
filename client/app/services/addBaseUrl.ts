import { Middleware } from "openapi-typescript-fetch";

export const addBaseUrl = (): Middleware => async (url, init, next) => {
  return next(`${process.env.BASE_URL}`.concat(url), init);
};
