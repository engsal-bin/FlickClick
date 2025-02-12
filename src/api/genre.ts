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

const getTVDiscover = async (
  language = "ko-KR",
  originalLanguage: string,
  sort_by = "popularity.desc",
  watchProviders: string,
  genres: string,
  year: number,
  runtimeLte: number, // 이하
  runtimeGte: number // 이상
) => {
  try {
    const response = await axiosInstance.get(`/discover/tv`, {
      params: {
        first_air_date_year: year,
        language,
        sort_by,
        with_genres: genres,
        with_original_language: originalLanguage,
        "with_runtime.gte": runtimeGte,
        "with_runtime.lte": runtimeLte,
        with_watch_providers: watchProviders,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생");
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

const getMovieDiscover = async (
  language = "ko-KR",
  originalLanguage: string,
  sort_by = "popularity.desc",
  watchProviders: string,
  genres: string,
  year: number,
  runtimeLte: number, // 이하
  runtimeGte: number // 이상
) => {
  try {
    const response = await axiosInstance.get(`/discover/movie`, {
      params: {
        language,
        sort_by,
        with_genres: genres,
        with_original_language: originalLanguage,
        "with_runtime.gte": runtimeGte,
        "with_runtime.lte": runtimeLte,
        with_watch_providers: watchProviders,
        year,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생");
    throw error;
  }
};

export const genreAPI = {
  getTVProvider,
  getTVGenre,
  getTVDiscover,
  getMovieProvider,
  getMovieGenre,
  getMovieDiscover,
};
