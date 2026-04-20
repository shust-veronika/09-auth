"use client";

import Link from "next/link";
import { Note } from "@/types/note";
import { deleteNote } from "@/lib/api/clientApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  notes: Note[];
};

export default function NoteList({ notes }: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  if (notes.length === 0) {
    return <p>Нотаток не знайдено.</p>;
  }

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <Link href={`/notes/${note.id}`}>
            <h3>{note.title}</h3>
          </Link>

          <p>{note.content}</p>

          {note.tag && <span>#{note.tag}</span>}

          <button
            onClick={() => mutation.mutate(note.id)}
            disabled={mutation.isPending}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}