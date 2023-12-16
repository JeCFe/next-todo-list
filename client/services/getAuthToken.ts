import { getAccessToken } from "@auth0/nextjs-auth0";

export const getAuthToken = async () => {
  const { accessToken } = await getAccessToken();
  return accessToken;
};
