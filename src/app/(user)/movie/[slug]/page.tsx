// src/app/(user)/movie/[slug]/page.tsx
import MovieDetailClient from "@/components/movies/movie-detail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DetailMovie({ params }: PageProps) {
  const { slug } = await params;
  return <MovieDetailClient slug={slug} />;
}