import axios from "axios";
import type { Note } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

interface FetchedNotes {
  notes: Note[];
  page: number;
  perPage: number;
  totalPages: number;
}

export const fetchNotes = async (
  searchQuery: string,
  page: number
): Promise<FetchedNotes> => {
  console.log("ok");

  const response = await axios.get<FetchedNotes>("/notes", {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
    params: {
      page,
      perPage: 12,
      search: searchQuery,
    },
  });
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};

interface NewNote {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}
export const createNote = async (newNote: NewNote): Promise<Note> => {
  const response = await axios.post<Note>("/notes", newNote, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};
