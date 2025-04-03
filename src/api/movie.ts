import { axiosInstance } from "./axios";

const getMovieTrailer = async (movie_id: number) => {
  try {
    const response = await axiosInstance.get(`/movie/${movie_id}/videos`);
    return response.data;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
  }
};

const getNowPlayingMovie = async (page = 1, language = "ko-KR") => {
  try {
    const response = await axiosInstance.get(`/movie/now_playing`, {
      params: { page, language },
    });
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생:");
    throw error;
  }
};

const getUpComingMovie = async (page = 1, language = "ko-KR") => {
  try {
    const response = await axiosInstance.get(`/movie/upcoming`, {
      params: { page, language },
    });
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생:");
    throw error;
  }
};

const getTrendMovie = async (language = "ko-KR") => {
  try {
    const response = await axiosInstance.get(`/movie/popular`, {
      params: { language },
    });
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생:");
    throw error;
  }
};

const getCredits = async (movie_id: number, language: string = "ko-KR") => {
  try {
    const response = await axiosInstance.get(`/movie/${movie_id}/credits`, {
      params: { language },
    });
    return response.data;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
  }
};

const getGenres = async (language = "ko-KR") => {
  try {
    const response = await axiosInstance.get(`/genre/movie/list`, {
      params: { language },
    });
    return response.data;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
  }
};

const getProviders = async (movie_id: number, language = "ko-KR") => {
  try {
    const response = await axiosInstance.get(
      `/movie/${movie_id}/watch/providers`,
      {
        params: { language },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
  }
};

const getMovie = async (movie_id: number, languageParams: string = "ko-KR") => {
  try {
    const response = await axiosInstance.get(`/movie/${movie_id}`, {
      params: {
        language: languageParams,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
  }
};

const getRecommendMovie = async (
  series_id: number,
  languageParams: string = "ko-KR"
) => {
  try {
    const response = await axiosInstance.get(
      `/movie/${series_id}/recommendations`,
      {
        params: { language: languageParams, page: 1 },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생:");
    throw error;
  }
};

const getSimilarMovie = async (
  series_id: number,
  languageParams: string = "ko-KR"
) => {
  try {
    const response = await axiosInstance.get(`/movie/${series_id}/similar`, {
      params: { language: languageParams, page: 1 },
    });
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생:");
    throw error;
  }
};

export const movieAPI = {
  getMovieTrailer,
  getNowPlayingMovie,
  getUpComingMovie,
  getTrendMovie,
  getCredits,
  getGenres,
  getProviders,
  getMovie,
  getRecommendMovie,
  getSimilarMovie,
};
