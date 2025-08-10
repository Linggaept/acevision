"use client";
import { useEffect } from "react";
import { useMovies } from "@/lib/store/useMovies";
import MovieCard from "../movies/movie-card";
import LoadingSpinner from "../loading-spinner";
const UpcomingClientPage = () => {
  const { moviesUpcoming, fetchMoviesUpcoming, currentPage, loading } =
    useMovies();

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        await fetchMoviesUpcoming(currentPage);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };
    fetchUpcomingMovies();
  }, [fetchMoviesUpcoming, currentPage]);

  console.log("Upcoming Movies:", moviesUpcoming);
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <section className="flex flex-col gap-y-4">
            <h1 className="text-xl font-bold">Upcoming Movies</h1>
            <div className="grid grid-cols-5 gap-2">
              {moviesUpcoming.map((movie) => (
                <MovieCard key={movie.id} movies={movie} />
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default UpcomingClientPage;
