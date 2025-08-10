import MovieDetailClient from "@/components/movies/movie-detail";

export default async function DetailMovie({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  return <MovieDetailClient slug={slug} />;
}
