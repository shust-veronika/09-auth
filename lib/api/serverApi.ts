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

export const fetchNotes = async (params?: { tag?: string }) => {
  const cookieStore = cookies();

  const url = new URL(baseURL + "/notes");

  if (params?.tag) {
    url.searchParams.set("tag", params.tag);
  }

  const res = await fetch(url.toString(), {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch notes");
  }

  return res.json();
};

export const checkSession = async (): Promise<User | null> => {
  const cookieStore = cookies();

  const res = await fetch(baseURL + "/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  const data = await res.json();
return data || null;
};