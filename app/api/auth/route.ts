import { getToken, getUser } from "@/services/auth-linkedin.service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const queryParams = new URL(request.url).searchParams;
  const code = queryParams.get("code");
  const state = queryParams.get("state");

  if (state !== process.env.LINKEDIN_STATE) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  if (!code || !state) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const { accessToken } = await getToken(code);
  const user = await getUser(accessToken);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const oneDayExpiration = new Date(Date.now() + 1000 * 60 * 60 * 24);

  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.set("_acces_token_98_", accessToken, {
    expires: oneDayExpiration,
  });
  response.cookies.set("_user_98_", JSON.stringify(user), {
    expires: oneDayExpiration,
  });
  return response;
}
