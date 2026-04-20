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

export const fetchNotes = async () => {
  const cookieStore = cookies();

  const res = await fetch(baseURL + "/notes", {
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