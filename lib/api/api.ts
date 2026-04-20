import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const fetchNoteById = async (id: string) => {
  return api.get(`/notes/${id}`);
};

export const createNote = async (data: CreateNoteDTO) => {
  return api.post("/notes", data);
};

export const api = axios.create({
  baseURL,
  withCredentials: true,
});