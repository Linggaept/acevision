import { axiosInstance } from "@/lib/api-config";

export const getMoviesNowPlaying = async () => {
  try {
    const response = await axiosInstance.get("3/movie/now_playing", {
      params: {
        language: "en-US",
        page: 1,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    throw error;
  }
};

export const getMoviesPopular = async () => {
  try {
    const response = await axiosInstance.get("3/movie/popular", {
      params: {
        language: "en-US",
        page: 1,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
}

export const getMoviesTopRated = async () => {
  try {
    const response = await axiosInstance.get("3/movie/top_rated", {
      params: {
        language: "en-US",
        page: 1,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    throw error;
  }
};


export const getMoviesUpcoming = async () => {
  try {
    const response = await axiosInstance.get("3/movie/upcoming", {
      params: {
        language: "en-US",
        page: 1,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};
