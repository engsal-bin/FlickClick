import { axiosInstance } from "./axios";

const getTrendingAll = async (
  page: number,
  day = "day",
  language = "ko-KR"
) => {
  try {
    const response = await axiosInstance.get(`/trending/all/${day}`, {
      params: { page, language },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 디스커버 API 호출 함수
const getDiscover = async (targetType = "tv", {
  genres = [],
  releaseDateRange = { gte: null, lte: null },
  ottPlatforms = [],
  language = 'en-US',
  region = 'US',
}) => {
  let endpoint = `/discover/${targetType}?language=${language}&region=${region}&sort_by=release_date.asc`;

  if (genres.length > 0) endpoint += `&with_genres=${genres.join(',')}`;
  if (releaseDateRange.gte) endpoint += `&primary_release_date.gte=${releaseDateRange.gte}`;
  if (releaseDateRange.lte) endpoint += `&primary_release_date.lte=${releaseDateRange.lte}`;
  if (ottPlatforms.length > 0) endpoint += `&with_watch_providers=${ottPlatforms.join(',')}`;

  try {
    const { data } = await axiosInstance.get(endpoint);
    return data.results;
  } catch (error) {
    console.error('TMDB API 호출 오류:', error);
    return [];
  }
};


export const commonAPI = {
  getTrendingAll,
  getDiscover,
};
