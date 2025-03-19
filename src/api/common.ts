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

const postArgument = async (
  topic: string,
  ip_id: string,
  author_id: string,
  ip_name: string,
  argumentType: string
) => {
  try {
    if (argumentType === "movie") {
      await supabase
        .from("movie_argument")
        .insert([{ topic, ip_id, author_id, ip_name }])
        .select();
    }
    if (argumentType === "episode") {
      await supabase
        .from("episode_argument")
        .insert([{ topic, ip_id, author_id, ip_name }])
        .select();
    }
    if (argumentType === "season") {
      await supabase
        .from("season_argument")
        .insert([{ topic, ip_id, author_id, ip_name }])
        .select();
    }
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
  }
};

const postArgumentOpinion = async (
  argument_id: number,
  content: string,
  author_id: string,
  argumentType: string
) => {
  try {
    if (argumentType === "movie") {
      await supabase
        .from("movie_argument_comment")
        .insert([{ argument_id, content, author_id }])
        .select();
    }
    if (argumentType === "episode") {
      await supabase
        .from("episode_argument_comment")
        .insert([{ argument_id, content, author_id }])
        .select();
    }
    if (argumentType === "season") {
      await supabase
        .from("season_argument_comment")
        .insert([{ argument_id, content, author_id }])
        .select();
    }
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
  }
};
export const commonAPI = {
  getTrendingAll,
  postReview,
  postArgument,
  postArgumentOpinion,
};
