import { axiosInstance } from "./axios";

const getOnTheAirTvSeriese = async (page = 1, language = "ko-KR") => {
  try {
    const response = await axiosInstance.get(`/tv/on_the_air`, {
      params: { page, language },
    });
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생:");
    throw error;
  }
};

const getSeries = async (
  series_id: number,
  languageParams: string = "ko-KR"
) => {
  try {
    const response = await axiosInstance.get(`/tv/${series_id}`, {
      params: {
        language: languageParams,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생:");
    throw error;
  }
};

const getSeason = async (
  series_id: number,
  season_number: number,
  languageParams: string = "ko-KR"
) => {
  try {
    const response = await axiosInstance.get(
      `/tv/${series_id}/season/${season_number}`,
      {
        params: {
          language: languageParams,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생:");
    throw error;
  }
};

const getSeasonCredits = async (
  series_id: number,
  season_number: number,
  languageParams: string = "ko-KR"
) => {
  try {
    const response = await axiosInstance.get(
      `/tv/${series_id}/season/${season_number}/credits`,
      {
        params: {
          language: languageParams,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생:");
    throw error;
  }
};

const getEpisode = async (
  series_id: number,
  season_number: number,
  episode_number: number
) => {
  try {
    const response = await axiosInstance.get(
      `/tv/${series_id}/season/${season_number}/episode/${episode_number}`,
      {
        params: {
          language: "ko-KR",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생:");
    throw error;
  }
};

const getTrendTv = async (language = "ko-KR") => {
  try {
    const response = await axiosInstance.get(`/trending/tv/week`, {
      params: { language },
    });
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생:");
    throw error;
  }
};

const getRecommendTv = async (series_id: number, languageParams = "ko-KR") => {
  try {
    const response = await axiosInstance.get(
      `/tv/${series_id}/recommendations`,
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

const getSimilarTv = async (
  series_id: number,
  languageParams: string = "ko-KR"
) => {
  try {
    const response = await axiosInstance.get(`/tv/${series_id}/similar`, {
      params: { language: languageParams, page: 1 },
    });
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생:");
    throw error;
  }
};

const getGenres = async (language = "ko-KR") => {
  console.log("언어", language);
  try {
    const response = await axiosInstance.get(`/genre/tv/list`, {
      params: { language },
    });
    return response.data;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
  }
};

export const tvAPI = {
  getOnTheAirTvSeriese,
  getSeries,
  getSeason,
  getEpisode,
  getSeasonCredits,
  getTrendTv,
  getRecommendTv,
  getSimilarTv,
  getGenres,
};
