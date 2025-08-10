import SearchMovies from "@/components/movies/search-movies/search-movies";
import UpcomingClientPage from "@/components/movies-client-page/upcoming-client";
import { PaginationComponent } from "@/components/pagination";

const NowPlayingPage = () => {
  return (
    <>
      <SearchMovies />
      <UpcomingClientPage />
      <PaginationComponent />
    </>
  );
};

export default NowPlayingPage;
