"use client";

import { slugify } from "@/lib/slugify";
import { useMovies } from "@/lib/store/useMovies";
import { Movie } from "@/types/movies";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

interface SearchMoviesResultProps {
  onSelectSuggestion: (movie: Movie) => void;
}

export default function SearchMoviesResult({
  onSelectSuggestion,
}: SearchMoviesResultProps) {
  const router = useRouter();
  const {
    searchKeyword,
    searchSuggestions,
    searchLoading,
    selectedSearchIndex,
    setSelectedSearchIndex,
  } = useMovies();

  const suggestionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll selected item into view
  useEffect(() => {
    if (
      selectedSearchIndex >= 0 &&
      suggestionRefs.current[selectedSearchIndex]
    ) {
      suggestionRefs.current[selectedSearchIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedSearchIndex]);

  // Handle search all results
  const handleSearchAll = () => {
    // router.push(`/search?q=${encodeURIComponent(searchKeyword)}`);
  };

  // Handle movie selection
  const handleMovieClick = (movie: Movie) => {
    // Navigate to movie detail page
    const movieUrl = `/movie/${slugify(movie.title)}-${movie.id}`;
    router.push(movieUrl);
  };

  return (
    <div className="absolute top-full left-0 right-0 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl max-h-80 overflow-y-auto -mt-0 pt-4">
      {searchSuggestions.length > 0 ? (
        <div className="py-2">
          {searchSuggestions.map((movie, index) => (
            <div
              key={movie.id}
              ref={(el) => {
                suggestionRefs.current[index] = el;
              }}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                selectedSearchIndex === index
                  ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
              onClick={() => handleMovieClick(movie)}
              onMouseEnter={() => setSelectedSearchIndex(index)}
            >
              {/* Movie Poster */}
              <div className="w-12 h-16 flex-shrink-0 rounded overflow-hidden bg-gray-200 dark:bg-gray-700">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                      (
                        e.target as HTMLImageElement
                      ).nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                ) : null}
                <div
                  className={`w-full h-full flex items-center justify-center ${
                    movie.poster_path ? "hidden" : ""
                  }`}
                >
                  <FilmIcon className="w-6 h-6 text-gray-400" />
                </div>
              </div>

              {/* Movie Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                  {movie.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {movie.release_date
                      ? new Date(movie.release_date).getFullYear()
                      : "N/A"}
                  </span>
                  {movie.vote_average > 0 && (
                    <>
                      <span className="text-gray-300 dark:text-gray-600">
                        •
                      </span>
                      <div className="flex items-center gap-1">
                        <StarIcon className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {movie.vote_average.toFixed(1)}
                        </span>
                      </div>
                    </>
                  )}
                </div>
                {movie.overview && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 truncate mt-1">
                    {movie.overview}
                  </p>
                )}
              </div>

              {/* Arrow Icon for Selected */}
              {selectedSearchIndex === index && (
                <ChevronRightIcon className="w-4 h-4 text-blue-500 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      ) : searchKeyword.trim() && !searchLoading ? (
        <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
          <SearchIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>No movies found for "{searchKeyword}"</p>
        </div>
      ) : null}

      {/* Search All Results Link */}
      {searchKeyword.trim() && searchSuggestions.length > 0 && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-2">
          <button
            onClick={handleSearchAll}
            className="w-full text-left px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
          >
            Search all results for "{searchKeyword}"
          </button>
        </div>
      )}
    </div>
  );
}

// Icon Components
function FilmIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 3v18" />
      <path d="M3 7.5h4" />
      <path d="M3 12h18" />
      <path d="M3 16.5h4" />
      <path d="M17 3v18" />
      <path d="M17 7.5h4" />
      <path d="M17 16.5h4" />
    </svg>
  );
}

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

function ChevronRightIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}