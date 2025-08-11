import { useEffect } from "react";
import MovieCastCard from "./movie-cast-card";
import { useMovies } from "@/lib/store/useMovies";

export default function MovieCastList({ id }: { id: number }) {
  const { movieCast, fetchMovieCastById } = useMovies();

  useEffect(() => {
    fetchMovieCastById(id);
  }, [id, fetchMovieCastById]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Movie Cast</h2>
      <div className="flex overflow-x-auto gap-2">
        {movieCast.map((cast) => (
          <MovieCastCard key={cast.id} cast={cast} />
        ))}
      </div>
    </div>
  );
}
