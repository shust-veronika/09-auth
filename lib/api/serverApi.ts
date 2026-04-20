import { cookies } from "next/headers";
import { User } from "@/types/user";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const getMe = async (): Promise<User> => {
  const cookieStore = cookies();

  const res = await fetch(baseURL + "/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  return res.json();
};

export const checkSession = async (): Promise<User | null> => {
  const cookieStore = cookies();

  const res = await fetch(baseURL + "/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.json() || null;
};