import SearchMovies from "@/components/movies/search-movies/search-movies";
import TopRatedClientPage from "@/components/movies-client-page/top-rated-client";
import { PaginationComponent } from "@/components/pagination";

const NowPlayingPage = () => {
  return (
    <>
      <SearchMovies />
      <TopRatedClientPage />
      <PaginationComponent />
    </>
  );
};

export default NowPlayingPage;
