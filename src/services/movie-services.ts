import { axiosInstance } from "@/lib/api-config";

export const getMoviesNowPlaying = async (id: number) => {
  try {
    const response = await axiosInstance.get("3/movie/now_playing", {
      params: {
        language: "en-US",
        page: id,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    throw error;
  }
};

export const getMoviesPopular = async (currentPage: number) => {
  try {
    const response = await axiosInstance.get("3/movie/popular", {
      params: {
        language: "en-US",
        page: currentPage,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

export const getMoviesTopRated = async (currentPage: number) => {
  try {
    const response = await axiosInstance.get("3/movie/top_rated", {
      params: {
        language: "en-US",
        page: currentPage,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    throw error;
  }
};

export const getMoviesUpcoming = async (currentPage: number) => {
  try {
    const response = await axiosInstance.get("3/movie/upcoming", {
      params: {
        language: "en-US",
        page: currentPage,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};

export const getMovieDetailById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`3/movie/${id}`, {
      params: {
        language: "en-US",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching movie detail:", error);
    throw error;
  }
};

export const getMovieRecomendationById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`3/movie/${id}/recommendations`, {
      params: {
        language: "en-US",
        page: 1,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching movie recommendations:", error);
    throw error;
  }
};

export const getMovieCastById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`3/movie/${id}/credits`, {
      params: {
        language: "en-US",
      },
    });

    return response.data.cast;
  } catch (error) {
    console.error("Error fetching movie cast:", error);
    throw error;
  }
};

export const searchMoviesByKeyword = async (keyword: string) => {
  try {
    const response = await axiosInstance.get("3/search/movie", {
      params: {
        language: "en-US",
        query: keyword,
        page: 1,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

export const getFirstMovieTrailerKey = async (id: number) => {
  try {
    const response = await axiosInstance.get(`3/movie/${id}/videos`, {
      params: {
        language: "en-US",
      },
    });

    // Cari video pertama dengan type "Trailer" dan return key-nya
    const trailer = response.data.results.find(
      (video: any) => video.type === "Trailer"
    );

    return trailer ? trailer.key : null;
  } catch (error) {
    console.error("Error fetching movie trailer key:", error);
    throw error;
  }
};
