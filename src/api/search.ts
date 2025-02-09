import { axiosInstance } from "./axios";

const keywordSearch = async (keyword: string, page = 1) => {
  try {
    const response = await axiosInstance.get(`/search/keyword`, {
      params: { query: keyword, page },
    });
    return response.data;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
  }
};
const movieSearch = async (keyword: string, page = 1) => {
  try {
    const response = await axiosInstance.get(`/search/movie`, {
      params: { query: keyword, page },
    });
    return response.data;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
  }
};
const tvSearch = async (keyword: string, page = 1) => {
  try {
    const response = await axiosInstance.get(`/search/tv`, {
      params: { query: keyword, page },
    });
    return response.data;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
  }
};

export const searchAPI = {
  keywordSearch,
  movieSearch,
  tvSearch,
};
