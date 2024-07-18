"use server";

import { User } from "@/models/user.model";
import { getOAuthUrl } from "@/services/auth-linkedin.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signIn = async (): Promise<void> => {
  const url = await getOAuthUrl();
  redirect(url);
};

export const signOut = async (): Promise<void> => {
  const cookiesStore = cookies();
  cookiesStore.delete("_user_98_");
  cookiesStore.delete("_acces_token_98_");
  redirect("/");
};

export const getSession = async (): Promise<{
  token: string;
  user: User;
} | null> => {
  const cookiesStore = cookies();
  const hasUser = cookiesStore.has("_user_98_");
  const token = cookiesStore.get("_acces_token_98_")?.value;

  if (!hasUser || !token) {
    return null;
  }
  const user = JSON.parse(cookiesStore.get("_user_98_")?.value ?? "");

  return {
    token: token,
    user: user,
  };
};
