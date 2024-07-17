"use server";

import { userAdapter } from "@/adapters/user.adapter";
import { ApiUser, User } from "@/models/user.model";

export const getOAuthUrl = async (): Promise<string> => {
  const queryParams = new URLSearchParams();
  queryParams.set("client_id", process.env.LINKEDIN_CLIENT_ID || "");
  queryParams.set("redirect_uri", process.env.LINKEDIN_REDIRECT_URI || "");
  queryParams.set("response_type", "code");
  queryParams.set("state", process.env.LINKEDIN_STATE || "");
  queryParams.set("scope", "w_member_social,openid,profile,email");

  const response = await fetch(
    `${process.env.LINKEDIN_API_URL}/oauth/v2/authorization?${queryParams.toString()}`,
  );

  return response.url;
};

export async function getToken(code: string): Promise<{ accessToken: string }> {
  const OPTIONS = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const queryParams = new URLSearchParams();
  queryParams.set("grant_type", "authorization_code");
  queryParams.set("code", code);
  queryParams.set("client_id", process.env.LINKEDIN_CLIENT_ID || "");
  queryParams.set("client_secret", process.env.LINKEDIN_CLIENT_SECRET || "");
  queryParams.set("redirect_uri", process.env.LINKEDIN_REDIRECT_URI || "");

  const response = await fetch(
    `${process.env.LINKEDIN_API_URL}/oauth/v2/accessToken?${queryParams.toString()}`,
    OPTIONS,
  );
  const data = await response.json();

  return {
    accessToken: data.access_token,
  };
}

export async function getUser(accessToken: string): Promise<User> {
  const OPTIONS = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const response = await fetch(
    `${process.env.LINKEDIN_API_URL}/v2/userinfo`,
    OPTIONS,
  );
  const data: ApiUser = await response.json();

  return userAdapter(data);
}
