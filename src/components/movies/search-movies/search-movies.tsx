"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useMovies } from "@/lib/store/useMovies";
import SearchMoviesResult from "./search-movies-result";

export default function SearchMovies() {
  const {
    searchKeyword,
    searchLoading,
    isSearchOpen,
    selectedSearchIndex,
    setSearchKeyword,
    setIsSearchOpen,
    setSelectedSearchIndex,
    fetchSearchMoviesByKeyword,
    clearSearchState,
    searchSuggestions,
  } = useMovies();

  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Debounced search function
  const debouncedSearch = useDebouncedCallback(async (searchQuery: string) => {
    await fetchSearchMoviesByKeyword(searchQuery);
  }, 300);

  // Handle input change and trigger debounced search
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKeyword(value);
    setSelectedSearchIndex(-1);

    if (value.trim()) {
      debouncedSearch(value);
    } else {
      clearSearchState();
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isSearchOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedSearchIndex(
          selectedSearchIndex < searchSuggestions.length - 1
            ? selectedSearchIndex + 1
            : selectedSearchIndex
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedSearchIndex(
          selectedSearchIndex > -1 ? selectedSearchIndex - 1 : -1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (selectedSearchIndex >= 0) {
          handleSelectSuggestion(searchSuggestions[selectedSearchIndex]);
        } else if (searchKeyword.trim()) {
          handleSearch(searchKeyword);
        }
        break;
      case "Escape":
        setIsSearchOpen(false);
        setSelectedSearchIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Handle suggestion selection
  const handleSelectSuggestion = (movie: any) => {
    // Don't close immediately, let the navigation happen first
    // setSearchKeyword(movie.title);
    // setIsSearchOpen(false);
    // setSelectedSearchIndex(-1);
    // handleSearch(movie.title, movie.id);
  };

  // Handle search submission
  const handleSearch = (searchTerm?: string, movieId?: number) => {
    const searchQuery = searchTerm || searchKeyword;
    if (!searchQuery.trim()) return;


    // Navigate to movie detail if movieId is provided
    if (movieId) {
      // router.push(`/movie/${movieId}-${movie.title.toLowerCase().replace(/\s+/g, '-')}`);
    } else {
      // Navigate to search results page
      // router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
        setSelectedSearchIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsSearchOpen, setSelectedSearchIndex]);

  return (
    <div ref={searchContainerRef} className="relative w-full max-w-full">
      {/* Search Input Container */}
      <div
        className={`flex items-center w-full space-x-2 rounded-lg border transition-all duration-200 px-3.5 py-2 mb-4 ${
          isSearchOpen
            ? "border-blue-500 bg-white dark:bg-gray-800 shadow-lg"
            : "border-gray-300 bg-gray-50 dark:bg-gray-900 hover:border-gray-400"
        }`}
      >
        <SearchIcon className="h-4 w-4 text-gray-500 flex-shrink-0" />

        <div className="flex-1">
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search movies..."
            value={searchKeyword}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() =>
              searchKeyword &&
              searchSuggestions.length > 0 &&
              setIsSearchOpen(true)
            }
            className="w-full border-0 h-8 font-semibold bg-transparent focus:ring-0 focus:outline-none px-2"
            autoComplete="off"
          />
        </div>

        {/* Loading Spinner */}
        {searchLoading && (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent flex-shrink-0" />
        )}
      </div>

      {/* Search Results Dropdown */}
      {isSearchOpen && (
        <SearchMoviesResult onSelectSuggestion={handleSelectSuggestion} />
      )}
    </div>
  );
}

// Search Icon Component
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