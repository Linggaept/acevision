"use client";
import { useEffect } from "react";
import { useMovies } from "@/lib/store/useMovies";
import MovieCard from "../movies/movie-card";
import LoadingSpinner from "../loading-spinner";
const NowPlayingPageClient = () => {
  const { moviesNowPlaying, fetchMoviesNowPlaying, currentPage, loading } =
    useMovies();

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      try {
        await fetchMoviesNowPlaying(currentPage);
      } catch (error) {
        console.error("Error fetching now playing movies:", error);
      }
    };
    fetchNowPlayingMovies();
  }, [fetchMoviesNowPlaying, currentPage]);

  console.log("Now Playing Movies:", moviesNowPlaying);
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <section className="flex flex-col gap-y-4">
            <h1 className="text-xl font-bold">Now Playing Movies</h1>
            <div className="grid grid-cols-5 gap-2">
              {moviesNowPlaying.map((movie) => (
                <MovieCard key={movie.id} movies={movie} />
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default NowPlayingPageClient;
