"use client";
import { useEffect } from "react";
import { useMovies } from "@/lib/store/useMovies";
import MovieCard from "../movies/movie-card";
import LoadingSpinner from "../loading-spinner";
const TopRatedClientPage = () => {
  const { fetchMoviesTopRated, moviesTopRated, currentPage, loading } = useMovies();

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        await fetchMoviesTopRated(currentPage);
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
      }
    };
    fetchTopRatedMovies();
  }, [fetchMoviesTopRated, currentPage]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <section className="flex flex-col gap-y-4">
            <h1 className="text-xl font-bold">Top Rated Movies</h1>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {moviesTopRated.map((movie) => (
                <MovieCard key={movie.id} movies={movie} />
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default TopRatedClientPage;
