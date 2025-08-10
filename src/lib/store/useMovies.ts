import {
  getMovieCastById,
  getMovieDetailById,
  getMovieRecomendationById,
  getMoviesNowPlaying,
  getMoviesPopular,
  getMoviesTopRated,
  getMoviesUpcoming,
  searchMoviesByKeyword,
} from "@/services/movie-services";
import { Cast, Movie, MovieDetail } from "@/types/movies";
import { create } from "zustand";

interface MovieState {
  // Loading states
  loading: boolean;
  recommendationLoading: boolean;
  searchLoading: boolean;
  
  // Pagination
  currentPage: number;
  totalPages: number;

  // Movie lists
  moviesNowPlaying: Movie[];
  moviesPopular: Movie[];
  moviesTopRated: Movie[];
  moviesUpcoming: Movie[];
  movieRecommendations: Movie[];
  movieDetail: MovieDetail | null;
  movieCast: Cast[];
  
  // Search related states
  searchKeyword: string;
  moviesSearchResults: Movie[];
  searchSuggestions: Movie[];
  isSearchOpen: boolean;
  selectedSearchIndex: number;
  
  // Track current IDs to prevent duplicates
  currentRecommendationId: number | null;
  currentCastId: number | null;
  
  // Basic setters
  setSearchKeyword: (keyword: string) => void;
  setMoviesNowPlaying: (movies: Movie[]) => void;
  setMoviesPopular: (movies: Movie[]) => void;
  setMoviesTopRated: (movies: Movie[]) => void;
  setMoviesUpcoming: (movies: Movie[]) => void;
  setMovieDetail: (movie: MovieDetail | null) => void;
  setMovieRecommendations: (movies: Movie[]) => void;
  setMovieCast: (cast: Cast[]) => void;
  
  // Pagination
  setCurrentPage: (page: number) => void;
  setTotalPages: (total: number) => void;

  // Search specific setters
  setSearchSuggestions: (movies: Movie[]) => void;
  setIsSearchOpen: (isOpen: boolean) => void;
  setSelectedSearchIndex: (index: number) => void;
  clearSearchState: () => void;
  
  // Fetch functions
  fetchMoviesNowPlaying: (currentPage: number) => Promise<void>;
  fetchMoviesPopular: (currentPage: number) => Promise<void>;
  fetchMoviesTopRated: (currentPage: number) => Promise<void>;
  fetchMoviesUpcoming: (currentPage: number) => Promise<void>;
  fetchMovieDetailById: (id: number) => Promise<void>;
  fetchMovieRecommendations: (id: number) => Promise<void>;
  fetchMovieCastById: (id: number) => Promise<void>;
  fetchSearchMoviesByKeyword: (keyword: string) => Promise<void>;
}

export const useMovies = create<MovieState>((set, get) => ({
  // Initial state
  moviesNowPlaying: [],
  moviesPopular: [],
  moviesTopRated: [],
  moviesUpcoming: [],
  movieRecommendations: [],
  movieDetail: null,
  movieCast: [],
  loading: false,
  recommendationLoading: false,
  searchLoading: false,
  currentRecommendationId: null,
  currentCastId: null,

  //pagination
  currentPage: 1,
  totalPages: 1,

  // Search states
  searchKeyword: "",
  moviesSearchResults: [],
  searchSuggestions: [],
  isSearchOpen: false,
  selectedSearchIndex: -1,
  
  // Basic setters
  setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
  setMoviesNowPlaying: (movies) => set({ moviesNowPlaying: movies }),
  setMoviesPopular: (movies) => set({ moviesPopular: movies }),
  setMovieDetail: (movie) => set({ movieDetail: movie }),
  setMoviesTopRated: (movies) => set({ moviesTopRated: movies }),
  setMoviesUpcoming: (movies) => set({ moviesUpcoming: movies }),
  setMovieRecommendations: (movies) => set({ movieRecommendations: movies }),
  setMovieCast: (cast) => set({ movieCast: cast }),
  
  //pagination
  setCurrentPage: (page) => set({ currentPage: page }),
  setTotalPages: (total) => set({ totalPages: total }),

  // Search specific setters
  setSearchSuggestions: (movies) => set({ searchSuggestions: movies }),
  setIsSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),
  setSelectedSearchIndex: (index) => set({ selectedSearchIndex: index }),
  clearSearchState: () => set({ 
    searchKeyword: "", 
    searchSuggestions: [], 
    isSearchOpen: false, 
    selectedSearchIndex: -1,
    moviesSearchResults: []
  }),
  
  // Fetch functions
  fetchMoviesNowPlaying: async (currentPage: number) => {
    set({ loading: true });
    try {
      const movies = await getMoviesNowPlaying(currentPage);
      set({ moviesNowPlaying: movies, loading: false });
    } catch (error) {
      console.error("Error fetching now playing movies:", error);
      set({ loading: false });
    }
  },
  
  fetchMoviesPopular: async (currentPage: number) => {
    set({ loading: true });
    try {
      const movies = await getMoviesPopular(currentPage);
      set({ moviesPopular: movies, loading: false });
    } catch (error) {
      console.error("Error fetching popular movies:", error);
      set({ loading: false });
    }
  },
  
  fetchMoviesTopRated: async (currentPage: number) => {
    set({ loading: true });
    try {
      const movies = await getMoviesTopRated(currentPage);
      set({ moviesTopRated: movies, loading: false });
    } catch (error) {
      console.error("Error fetching top rated movies:", error);
      set({ loading: false });
    }
  },
  
  fetchMoviesUpcoming: async (currentPage: number) => {
    set({ loading: true });
    try {
      const movies = await getMoviesUpcoming(currentPage);
      set({ moviesUpcoming: movies, loading: false });
    } catch (error) {
      console.error("Error fetching upcoming movies:", error);
      set({ loading: false });
    }
  },
  
  fetchMovieDetailById: async (id) => {
    set({ loading: true });
    try {
      const movie = await getMovieDetailById(id);
      set({ movieDetail: movie, loading: false });
    } catch (error) {
      console.error("Error fetching movie detail:", error);
      set({ movieDetail: null, loading: false });
    }
  },
  
  fetchMovieRecommendations: async (id: number) => {
    const { currentRecommendationId } = get();
    
    // Prevent duplicate requests for the same ID
    if (currentRecommendationId === id) {
      return;
    }

    set({ recommendationLoading: true, currentRecommendationId: id });
    try {
      const recommendations = await getMovieRecomendationById(id);
      set({ 
        movieRecommendations: recommendations, 
        recommendationLoading: false 
      });
    } catch (error) {
      console.error("Error fetching movie recommendations:", error);
      set({ 
        movieRecommendations: [], 
        recommendationLoading: false,
        currentRecommendationId: null
      });
    }
  },
  
  fetchMovieCastById: async (id: number) => {
    const { currentCastId } = get();

    // Prevent duplicate requests for the same ID
    if (currentCastId === id) {
      return;
    }

    set({ loading: true, currentCastId: id });
    try {
      const cast = await getMovieCastById(id);
      set({
        movieCast: cast,
        loading: false
      });
    } catch (error) {
      console.error("Error fetching movie cast:", error);
      set({
        movieCast: [],
        loading: false,
        currentCastId: null
      });
    }
  },
  
  fetchSearchMoviesByKeyword: async (keyword: string) => {
    if (!keyword.trim()) {
      set({ 
        moviesSearchResults: [], 
        searchSuggestions: [], 
        isSearchOpen: false,
        searchLoading: false 
      });
      return;
    }

    set({ searchLoading: true, searchKeyword: keyword });
    try {
      const movies = await searchMoviesByKeyword(keyword);
      const suggestions = movies.slice(0, 8); // Limit suggestions to 8
      
      set({ 
        moviesSearchResults: movies,
        searchSuggestions: suggestions,
        isSearchOpen: suggestions.length > 0,
        searchLoading: false 
      });
    } catch (error) {
      console.error("Error fetching search movies:", error);
      set({ 
        moviesSearchResults: [],
        searchSuggestions: [],
        isSearchOpen: false,
        searchLoading: false 
      });
    }
  },
}));