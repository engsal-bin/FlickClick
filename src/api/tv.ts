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

const getSeries = async (series_id: number) => {
  try {
    const response = await axiosInstance.get(`/tv/${series_id}`, {
      params: {
        language: "ko-KR",
      },
    });
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생:");
    throw error;
  }
};

const getSeason = async (series_id: number, season_number: number) => {
  try {
    const response = await axiosInstance.get(
      `/tv/${series_id}/season/${season_number}`,
      {
        params: {
          language: "ko-KR",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생:");
    throw error;
  }
};

const getSeasonCredits = async (series_id: number, season_number: number) => {
  try {
    const response = await axiosInstance.get(
      `/tv/${series_id}/season/${season_number}/credits`,
      {
        params: {
          language: "ko-KR",
        },
      },
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
  episode_number: number,
) => {
  try {
    const response = await axiosInstance.get(
      `/tv/${series_id}/season/${season_number}/episode/${episode_number}`,
      {
        params: {
          language: "ko-KR",
        },
      },
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

export const tvAPI = {
  getOnTheAirTvSeriese,
  getSeries,
  getSeason,
  getEpisode,
  getSeasonCredits,
  getTrendTv,
};
