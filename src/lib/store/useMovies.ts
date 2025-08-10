import { create } from "zustand";
import { Movie } from "@/types/movies";
import { getMoviesNowPlaying, getMoviesPopular, getMoviesTopRated, getMoviesUpcoming } from "@/services/movie-services";

interface MovieState {
    loading: boolean;
    moviesNowPlaying: Movie[];
    moviesPopular: Movie[];
    moviesTopRated: Movie[];
    moviesUpcoming: Movie[];
    setMoviesNowPlaying: (movies: Movie[]) => void;
    setMoviesPopular: (movies: Movie[]) => void;
    setMoviesTopRated: (movies: Movie[]) => void;
    setMoviesUpcoming: (movies: Movie[]) => void;
    fetchMoviesNowPlaying: () => Promise<void>;
    fetchMoviesPopular: () => Promise<void>;
    fetchMoviesTopRated: () => Promise<void>;
    fetchMoviesUpcoming: () => Promise<void>;
}

export const useMovies = create<MovieState>((set) => ({
  moviesNowPlaying: [],
  moviesPopular: [],
  moviesTopRated: [],
  moviesUpcoming: [],
  loading: false,
  setMoviesNowPlaying: (movies) => set({ moviesNowPlaying: movies }),
  setMoviesPopular: (movies) => set({ moviesPopular: movies }),
  setMoviesTopRated: (movies) => set({ moviesTopRated: movies }),
  setMoviesUpcoming: (movies) => set({ moviesUpcoming: movies }),
  fetchMoviesNowPlaying: async () => {
    set({ loading: true });
    const movies = await getMoviesNowPlaying();
    set({ moviesNowPlaying: movies, loading: false });
  },
  fetchMoviesPopular: async () => {
    set({ loading: true });
    const movies = await getMoviesPopular();
    set({ moviesPopular: movies, loading: false });
  },
  fetchMoviesTopRated: async () => {
    set({ loading: true });
    const movies = await getMoviesTopRated();
    set({ moviesTopRated: movies, loading: false });
  },
  fetchMoviesUpcoming: async () => {
    set({ loading: true });
    const movies = await getMoviesUpcoming();
    set({ moviesUpcoming: movies, loading: false });
  },
}));
