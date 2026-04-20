import { fetchNoteById } from "@/lib/api/serverApi";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NoteModalClient from "./NotePreview.client";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NoteModalPage({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteModalClient id={id} />
    </HydrationBoundary>
  );
}