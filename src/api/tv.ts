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
      }
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

// 시리즈 탭
const fetchTVdiscover = async ({
  genres = [],
  firstAirDateRange = { gte: null, lte: null }, 
  ottPlatforms = [], 
  language = 'en-US',
  region = 'US',
}) => {
  let endpoint = `/discover/tv?language=${language}&region=${region}&sort_by=first_air_date.asc`;

  if (genres.length > 0) endpoint += `&with_genres=${genres.join(',')}`;
  if (firstAirDateRange.gte) endpoint += `&first_air_date.gte=${firstAirDateRange.gte}`;
  if (firstAirDateRange.lte) endpoint += `&first_air_date.lte=${firstAirDateRange.lte}`;
  if (ottPlatforms.length > 0) endpoint += `&with_networks=${ottPlatforms.join(',')}`;

  try {
    const { data } = await axiosInstance.get(endpoint);
    return data.results;
  } catch (error) {
    console.error('TMDB API 호출 오류:', error);
    return [];
  }
};


export const tvAPI = {
  getOnTheAirTvSeriese,
  getSeries,
  getSeason,
  getEpisode,
  getSeasonCredits,
  fetchTVdiscover,
};
