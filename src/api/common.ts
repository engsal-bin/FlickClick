import { axiosInstance } from "./axios";
import { supabase } from "./index.ts";

const getTrendingAll = async (
  page: number,
  day = "day",
  language = "ko-KR",
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
const getDiscover = async (
  targetType: string = "tv",
  genres: number[] = [],
  dateGte: string | null = null,
  dateLte: string | null = null,
  ottPlatforms: number[] = [],
  language: string = "en-US",
  region: string = "US",
  page: number = 1,
): Promise<Content[]> => {
  let endpoint = `/discover/${targetType}?language=${language}&watch_region=${region}&page=${page}`;

  console.log(
    "디스커버 API 호출 TargetType:",
    genres,
    dateGte,
    ottPlatforms
  )
  if (genres.length > 0) endpoint += `&with_genres=${genres.join("|")}`;
  if (dateGte)
    endpoint += `&first_air_date.gte=${dateGte}`;
  if (dateLte)
    endpoint += `&first_air_date.lte=${dateLte}`;
  if (ottPlatforms.length > 0)
    endpoint += `&with_watch_providers=${ottPlatforms.join("|")}`;

  console.log("디스커버 api 엔드포인트", endpoint)

  try {
    const { data } = await axiosInstance.get(endpoint);
    return data.results;
  } catch (error) {
    console.error("TMDB API 호출 오류:", error);
    return [];
  }
};

const postReview = async (
  ip_id: string,
  content: string,
  author_id: string,
  ip_name: string,
  reviewType: string,
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
  argumentType: string,
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
  argumentType: string,
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
  getDiscover,
};
