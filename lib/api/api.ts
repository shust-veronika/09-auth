import { CreateNoteDTO } from "@/types/note";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

export const fetchNotes = async () => {
  const response = await api.get("/notes");
  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const response = await api.get(`/notes/${id}`);
  return response.data;
};

export const createNote = async (data: CreateNoteDTO) => {
  const response = await api.post("/notes", data);
  return response.data;
};