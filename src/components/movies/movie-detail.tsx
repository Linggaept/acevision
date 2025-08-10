"use client";
import { useMovies } from "@/lib/store/useMovies";
import { useEffect } from "react";
import LoadingSpinner from "../loading-spinner";
import MovieDetailCore from "./movie-detail-core";
import MovieRecomendationList from "./movie-recomendation-list";
import MovieCastList from "./movie-cast-list";

const MovieDetailClient = ({ slug }: { slug: string }) => {
  const { fetchMovieDetailById, movieDetail, loading } = useMovies();

  if (!slug) {
    return <div>Movie not found</div>;
  }

  const parts = slug.split("-");
  const id = parts[parts.length - 1];
  const movieId = Number(id);

  console.log("Movie ID:", movieId);

  useEffect(() => {
    if (!movieId || isNaN(movieId)) return;

    fetchMovieDetailById(movieId).catch((error) => {
      console.error("Error fetching movie detail:", error);
    });
  }, [movieId]); // Only depend on movieId

  if (!movieId || isNaN(movieId)) {
    return <div>Movie not found</div>;
  }

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : movieDetail ? (
        <>
          <MovieDetailCore movie={movieDetail} />
          <MovieCastList id={movieId} />
          <MovieRecomendationList id={movieId} />
        </>
      ) : (
        <div>Movie not found</div>
      )}
    </>
  );
};

export default MovieDetailClient;
