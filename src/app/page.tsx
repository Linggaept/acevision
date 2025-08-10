import MovieList from "@/components/movies/movie-list";
import SearchMovies from "@/components/movies/search-movies/search-movies";

export default function HomePage() {
  return (
    <>
      <SearchMovies />
      <MovieList />
    </>
  );
}
