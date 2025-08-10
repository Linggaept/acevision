import SearchMovies from "@/components/movies/search-movies/search-movies";
import PopularPageClient from "@/components/movies-client-page/popular-client";
import { PaginationComponent } from "@/components/pagination";

const NowPlayingPage = () => {
  return (
    <>
      <SearchMovies />
      <PopularPageClient />
      <PaginationComponent />
    </>
  );
};

export default NowPlayingPage;
