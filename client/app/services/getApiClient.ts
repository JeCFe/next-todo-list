import { addAuth, addBaseUrl } from ".";
import { paths } from "../../server-client";
import { Fetcher } from "openapi-typescript-fetch";

export const getApiClient = (accessToken?: string) => {
  const client = Fetcher.for<paths>();
  client.configure({
    use: [addBaseUrl(), addAuth(accessToken ?? "")],
  });
  return client;
};
