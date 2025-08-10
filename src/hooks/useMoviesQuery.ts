import { useQueries } from '@tanstack/react-query';
import { useMovies } from "@/lib/store/useMovies";

export const useMoviesQuery = () => {
  const {
    fetchMoviesNowPlaying,
    fetchMoviesPopular,
    fetchMoviesTopRated,
    fetchMoviesUpcoming,
  } = useMovies();

  const queries = useQueries({
    queries: [
      {
        queryKey: ['movies', 'now-playing'],
        queryFn: fetchMoviesNowPlaying,
        staleTime: 5 * 60 * 1000,
      },
      {
        queryKey: ['movies', 'popular'],
        queryFn: fetchMoviesPopular,
        staleTime: 5 * 60 * 1000,
      },
      {
        queryKey: ['movies', 'top-rated'],
        queryFn: fetchMoviesTopRated,
        staleTime: 5 * 60 * 1000,
      },
      {
        queryKey: ['movies', 'upcoming'],
        queryFn: fetchMoviesUpcoming,
        staleTime: 5 * 60 * 1000,
      },
    ],
  });

  return {
    nowPlaying: queries[0],
    popular: queries[1],
    topRated: queries[2],
    upcoming: queries[3],
    isLoading: queries.some(query => query.isLoading),
    isError: queries.some(query => query.isError),
    errors: queries.filter(query => query.error).map(query => query.error),
  };
};
