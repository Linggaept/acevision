"use client"
import { useMovies } from "@/lib/store/useMovies";
import { useEffect } from "react";
import MovieCard from "./movie-card";

export default function MovieRecomendationList({ id }: { id: number }) {
  const { 
    fetchMovieRecommendations, 
    movieRecommendations, 
    recommendationLoading,
    currentRecommendationId 
  } = useMovies();

  useEffect(() => {
    if (id && currentRecommendationId !== id) {
      fetchMovieRecommendations(id);
    }
  }, [id]); // Only depend on id, not on the function

  return (
    <>
      {recommendationLoading ? (
        <div className="container mx-auto px-4 py-8">
          <div>Loading recommendations...</div>
        </div>
      ) : movieRecommendations.length > 0 ? (
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-4">Recommended Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movieRecommendations.map((movie) => (
              <MovieCard key={movie.id} movies={movie} />
            ))}
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          No recommendations found.
        </div>
      )}
    </>
  );
}