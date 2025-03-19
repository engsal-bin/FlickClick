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
const getCredits = async (movie_id: number, language = "ko-KR") => {
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
const getMovie = async (movie_id: number) => {
  try {
    const response = await axiosInstance.get(`/movie/${movie_id}`, {
      params: {
        language: "ko-KR",
      },
    });
    return response.data;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
  }
};

export const movieAPI = {
  getMovieTrailer,
  getNowPlayingMovie,
  getUpComingMovie,
  getCredits,
  getGenres,
  getProviders,
  getMovie,
};
