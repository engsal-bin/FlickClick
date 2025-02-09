import { axiosInstance } from "./axios";

const keywordSearch = async (keyword: string, page = 1) => {
  try {
    const response = await axiosInstance.get(`search/keyword`, {
      params: { page, keyword },
    });
    return response.data;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
  }
};
const movieSearch = async (keyword: string, page = 1) => {
  try {
    const response = await axiosInstance.get(`search/movie`, {
      params: { page, keyword },
    });
    return response.data;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
  }
};
const tvSearch = async (keyword: string, page = 1) => {
  try {
    const response = await axiosInstance.get(`search/tv`, {
      params: { page, keyword },
    });
    return response.data;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
  }
};

export const searchAPI = () => {
  keywordSearch;
  movieSearch;
  tvSearch;
};
