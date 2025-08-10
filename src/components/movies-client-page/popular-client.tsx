"use client";
import { useEffect } from "react";
import { useMovies } from "@/lib/store/useMovies";
import MovieCard from "../movies/movie-card";
import LoadingSpinner from "../loading-spinner";
const PopularPageClient = () => {
  const { fetchMoviesPopular, moviesPopular, currentPage, loading } = useMovies();

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        await fetchMoviesPopular(currentPage);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };
    fetchPopularMovies();
  }, [fetchMoviesPopular, currentPage]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <section className="flex flex-col gap-y-4">
            <h1 className="text-xl font-bold">Popular Movies</h1>
            <div className="grid grid-cols-5 gap-2">
              {moviesPopular.map((movie) => (
                <MovieCard key={movie.id} movies={movie} />
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default PopularPageClient;
