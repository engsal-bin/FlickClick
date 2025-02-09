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

export const commonAPI = {
  getTrendingAll,
};
