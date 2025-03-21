import { axiosInstance } from "./axios";
import { supabase } from "./index.ts";
import { movieAPI } from "./movie.ts";

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
const getDiscover = async (
  targetType = "tv",
  {
    genres = [],
    releaseDateRange = { gte: null, lte: null },
    ottPlatforms = [],
    language = "en-US",
    region = "US",
  }
) => {
  let endpoint = `/discover/${targetType}?language=${language}&region=${region}&sort_by=release_date.asc`;

  if (genres.length > 0) endpoint += `&with_genres=${genres.join(",")}`;
  if (releaseDateRange.gte)
    endpoint += `&primary_release_date.gte=${releaseDateRange.gte}`;
  if (releaseDateRange.lte)
    endpoint += `&primary_release_date.lte=${releaseDateRange.lte}`;
  if (ottPlatforms.length > 0)
    endpoint += `&with_watch_providers=${ottPlatforms.join(",")}`;

  try {
    const { data } = await axiosInstance.get(endpoint);
    return data.results;
  } catch (error) {
    console.error("TMDB API 호출 오류:", error);
    return [];
  }
};

// 리뷰 작성
const postReview = async (
  ip_id: string,
  content: string,
  author_id: string,
  reviewType: string
) => {
  const data = await movieAPI.getMovie(Number(ip_id));
  const ip_name = data.title;
  try {
    if (reviewType === "movie") {
      await supabase
        .from("movie_review")
        .insert([{ ip_id, content, author_id, ip_name }])
        .select();
    }
    if (reviewType === "season") {
      await supabase
        .from("season_review")
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

// 토론 작성
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

// 토론 의견 작성
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

// 영화 리뷰 가져오기
const getMovieReview = async (params: string) => {
  try {
    const data = await supabase.rpc("get_reviews_by_movie", {
      ip_param: params,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

// 영화 리뷰 편집
const patchMovieReview = async (id: number, content: string) => {
  try {
    await supabase
      .from("movie_review")
      .update({ content })
      .eq("id", id)
      .select();
  } catch (error) {
    throw error;
  }
};

// 영화 리뷰 삭제
const deleteMovieReview = async (id: number) => {
  try {
    await supabase.from("movie_review").delete().eq("id", id);
  } catch (error) {
    throw error;
  }
};

export const commonAPI = {
  getTrendingAll,
  postReview,
  postArgument,
  postArgumentOpinion,
  getDiscover,
  getMovieReview,
  patchMovieReview,
  deleteMovieReview,
};
