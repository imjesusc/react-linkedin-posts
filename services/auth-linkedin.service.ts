import { userAdapter } from "@/adapters/user.adapter";
import { getEnvironments } from "@/app/actions";
import { ApiUser, User } from "@/models/user.model";

export const getOAuthUrl = async (): Promise<string> => {
  const env = await getEnvironments();
  const queryParams = new URLSearchParams();
  queryParams.set("client_id", env.clientId);
  queryParams.set("redirect_uri", env.redirectUri);
  queryParams.set("response_type", "code");
  queryParams.set("state", env.linkedinState);
  queryParams.set("scope", "w_member_social,openid,profile,email");

  const response = await fetch(
    `${env.apiUrl}/oauth/v2/authorization?${queryParams.toString()}`,
  );

  return response.url;
};

export async function getToken(code: string): Promise<{ accessToken: string }> {
  const env = await getEnvironments();
  const OPTIONS = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const queryParams = new URLSearchParams();
  queryParams.set("grant_type", "authorization_code");
  queryParams.set("code", code);
  queryParams.set("client_id", env.clientId || "");
  queryParams.set("client_secret", env.clientSecret || "");
  queryParams.set("redirect_uri", env.redirectUri || "");

  const response = await fetch(
    `${env.apiUrl}/oauth/v2/accessToken?${queryParams.toString()}`,
    OPTIONS,
  );
  const data = await response.json();

  return {
    accessToken: data.access_token,
  };
}

export async function getUser(accessToken: string): Promise<User> {
  const env = await getEnvironments();
  const OPTIONS = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const response = await fetch(`${env.apiUrl}/v2/userinfo`, OPTIONS);
  const data: ApiUser = await response.json();

  return userAdapter(data);
}
