import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";
import { getApiClient } from "@/app/services";

export const GET = withApiAuthRequired(async function protected_(req) {
  try {
    const { accessToken } = await getAccessToken(req, new NextResponse());
    const api = getApiClient(accessToken).path("/auth").method("get").create();
    const resp = (await api({})).data;

    return NextResponse.json(resp, new NextResponse());
  } catch (error) {
    return NextResponse.json({ error: error });
  }
});
