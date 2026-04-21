import { Metadata } from "next";
import { fetchNotes } from "@/lib/api/serverApi";

type Props = {
  params: { slug: string[] };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const filter = params.slug?.[0] || "all";

  return {
    title: `Notes - ${filter}`,
    description: `Viewing notes filtered by ${filter}`,
    openGraph: {
      title: `Notes - ${filter}`,
      description: `Viewing notes filtered by ${filter}`,
      url: `https://your-site.vercel.app/notes/filter/${filter}`,
      images: [
        "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      ],
    },
  };
}

export default async function FilterPage({ params }: Props) {
  const tag = params.slug?.[0];

  const notes = await fetchNotes({
    tag: tag === "all" ? undefined : tag,
  });

  return (
    <div>
      <h1>Filtered Notes: {tag || "all"}</h1>

      {notes.length === 0 ? (
        <p>No notes found</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              {note.tag && <span>#{note.tag}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}