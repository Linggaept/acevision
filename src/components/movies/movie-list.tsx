"use client";
import { useMovies } from "@/lib/store/useMovies";
import { useEffect } from "react";
import MovieCard from "./movie-card";
import LoadingSpinner from "../loading-spinner";
import { CircleArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const MovieList = () => {
  const {
    fetchMoviesNowPlaying,
    fetchMoviesPopular,
    fetchMoviesTopRated,
    fetchMoviesUpcoming,
    moviesNowPlaying,
    moviesPopular,
    moviesTopRated,
    moviesUpcoming,
    loading,
  } = useMovies();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchMoviesNowPlaying(1);
        await fetchMoviesPopular(1);
        await fetchMoviesTopRated(1);
        await fetchMoviesUpcoming(1);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData();
  }, [
    fetchMoviesNowPlaying,
    fetchMoviesPopular,
    fetchMoviesTopRated,
    fetchMoviesUpcoming,
  ]);

  const router = useRouter();

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col gap-y-8">
          <section className="flex flex-col gap-y-4">
            <h1 className="text-xl font-bold">Now Playing Movies</h1>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {moviesNowPlaying.map((movie) => (
                <MovieCard key={movie.id} movies={movie} />
              ))}
            </div>
            <Button
              onClick={() => router.push("/movies/now-playing")}
              className="flex gap-2 mx-auto items-center"
            >
              <p className="font-semibold text-md">See More</p>
              <i>
                <CircleArrowRight />
              </i>
            </Button>
          </section>
          <section className="flex flex-col gap-y-4">
            <h1 className="text-xl font-bold">Popular Movies</h1>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {moviesPopular.map((movie) => (
                <MovieCard key={movie.id} movies={movie} />
              ))}
            </div>
            <Button
              onClick={() => router.push("/movies/popular")}
              className="flex gap-2 mx-auto items-center"
            >
              <p className="font-semibold text-md">See More</p>
              <i>
                <CircleArrowRight />
              </i>
            </Button>
          </section>
          <section className="flex flex-col gap-y-4">
            <h1 className="text-xl font-bold">Top Rated Movies</h1>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {moviesTopRated.map((movie) => (
                <MovieCard key={movie.id} movies={movie} />
              ))}
            </div>
            <Button
              onClick={() => router.push("/movies/top-rated")}
              className="flex gap-2 mx-auto items-center"
            >
              <p className="font-semibold text-md">See More</p>
              <i>
                <CircleArrowRight />
              </i>
            </Button>
          </section>
          <section className="flex flex-col gap-y-4">
            <h1 className="text-xl font-bold">Upcoming Movies</h1>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {moviesUpcoming.map((movie) => (
                <MovieCard key={movie.id} movies={movie} />
              ))}
            </div>
            <Button
              onClick={() => router.push("/movies/now-playing")}
              className="flex gap-2 mx-auto items-center"
            >
              <p className="font-semibold text-md">upcoming</p>
              <i>
                <CircleArrowRight />
              </i>
            </Button>
          </section>
        </div>
      )}
    </>
  );
};

export default MovieList;
