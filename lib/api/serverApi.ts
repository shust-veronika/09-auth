import { cookies } from "next/headers";
import { api } from "./api";
import { User } from "@/types/user";
import { Note } from "@/types/note";
import { AxiosResponse } from "axios";

const getCookieHeader = async () => {
  const cookieStore = await cookies();
  return {
    Cookie: cookieStore.toString(),
  };
};

export const getMe = async (): Promise<User> => {
  try {
    const headers = await getCookieHeader();

    const res = await api.get<User>("/users/me", {
      headers,
    });

    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch user");
  }
};

export const fetchNotes = async (params?: {
  tag?: string;
}): Promise<Note[]> => {
  try {
    const headers = await getCookieHeader();

    const res = await api.get<Note[]>("/notes", {
      headers,
      params,
    });

    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch notes");
  }
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  try {
    const headers = await getCookieHeader();

    const res = await api.get<Note>(`/notes/${id}`, {
      headers,
    });

    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch note");
  }
};

export const checkSession = async (): Promise<
  AxiosResponse<{
    accessToken: string;
    refreshToken?: string;
  }>
> => {
  const headers = await getCookieHeader();

  return api.get("/auth/session", {
    headers,
  });
};