import { axiosInstance } from "./axios";
import { supabase } from "./index.ts";

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

const postReview = async (
  ip_id: string,
  content: string,
  author_id: string,
  ip_name: string,
  reviewType: string
) => {
  try {
    if (reviewType === "movie") {
      await supabase
        .from("movie_review")
        .insert([{ ip_id, content, author_id, ip_name }])
        .select();
    }
    if (reviewType === "episode") {
      await supabase
        .from("episode_review")
        .insert([{ ip_id, content, author_id, ip_name }])
        .select();
    }
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
  }
};

export const commonAPI = {
  getTrendingAll,
  postReview,
};
