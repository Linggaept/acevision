import SearchMovies from "@/components/movies/search-movies/search-movies";
import NowPlayingPageClient from "@/components/movies-client-page/now-playing-client";
import { PaginationComponent } from "@/components/pagination";

const NowPlayingPage = () => {
  return (
    <>
      <SearchMovies />
      <NowPlayingPageClient />
      <PaginationComponent />
    </>
  );
};

export default NowPlayingPage;
