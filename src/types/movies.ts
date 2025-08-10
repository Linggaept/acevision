export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// types/query.ts
export interface QueryResult<T> {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isSuccess: boolean;
  refetch: () => void;
}

export interface MoviesQueryReturn {
  nowPlaying: QueryResult<Movie[]>;
  popular: QueryResult<Movie[]>;
  topRated: QueryResult<Movie[]>;
  upcoming: QueryResult<Movie[]>;
  isLoading: boolean;
  isError: boolean;
  errors: Error[];
}
