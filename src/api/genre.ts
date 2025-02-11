import { axiosInstance } from "./axios";

const getTVProvider = async (language = "ko-KR", watch_region = "KR") => {
  try {
    const response = await axiosInstance.get(`/watch/providers/tv`, {
      params: { language, watch_region },
    });
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생:");
    throw error;
  }
};

const getTVGenre = async (language = "ko") => {
  try {
    const response = await axiosInstance.get(`/genre/tv/list`, {
      params: { language },
    });
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생:");
    throw error;
  }
};

const getMovieProvider = async (language = "ko-KR", watch_region = "KR") => {
  try {
    const response = await axiosInstance.get(`/watch/providers/movie`, {
      params: { language, watch_region },
    });
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생:");
    throw error;
  }
};

const getMovieGenre = async (language = "ko") => {
  try {
    const response = await axiosInstance.get(`/genre/movie/list`, {
      params: { language },
    });
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생:");
    throw error;
  }
};

export const genreAPI = {
  getTVProvider,
  getTVGenre,
  getMovieProvider,
  getMovieGenre,
};
