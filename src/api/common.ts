import { Content } from "../type/filterType";
import { axiosInstance } from "./axios";
import { supabase } from "./index.ts";
import { movieAPI } from "./movie.ts";
import { tvAPI } from "./tv.ts";

// 변경 시간
const updated_at = new Date().toISOString();

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
  targetType: string = "tv",
  genres: number[] = [],
  dateGte: string | null = null,
  dateLte: string | null = null,
  ottPlatforms: number[] = [],
  language: string = "en-US",
  region: string = "US",
  page: number = 1,
  runtimeGte: number | null = null,
  runtimeLte: number | null = null
): Promise<Content[]> => {
  let endpoint = `/discover/${targetType}?language=${language}&watch_region=${region}&page=${page}`;

  if (genres.length > 0) endpoint += `&with_genres=${genres.join("|")}`;
  if (dateGte) endpoint += `&first_air_date.gte=${dateGte}`;
  if (dateLte) endpoint += `&first_air_date.lte=${dateLte}`;
  if (ottPlatforms.length > 0)
    endpoint += `&with_watch_providers=${ottPlatforms.join("|")}`;
  if (runtimeGte) endpoint += `&with_runtime.gte=${runtimeGte}`;
  if (runtimeLte) endpoint += `&with_runtime.lte=${runtimeLte}`;

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
  review_type: string
) => {
  let ip_name = "";
  try {
    if (review_type === "movie") {
      const data = await movieAPI.getMovie(Number(ip_id));
      ip_name = data.title;
      await supabase
        .from("movie_review")
        .insert([{ ip_id, content, author_id, ip_name }])
        .select();
    }
    if (review_type === "season") {
      const ipIdSplit = ip_id.split("/");
      const series_id = ipIdSplit[0];
      const season_number = ipIdSplit[1];
      const { name: series_name } = await tvAPI.getSeries(Number(series_id));
      const { name: season_name } = await tvAPI.getSeason(
        Number(series_id),
        Number(season_number)
      );
      ip_name = `${series_name} ${season_name}`;
      await supabase
        .from("season_review")
        .insert([{ ip_id, content, author_id, ip_name }])
        .select();
    }
    if (review_type === "episode") {
      const ipIdSplit = ip_id.split("/");
      const series_id = ipIdSplit[0];
      const season_number = ipIdSplit[1];
      const episode_number = ipIdSplit[2];
      const { name: series_name } = await tvAPI.getSeries(Number(series_id));
      const { name: season_name } = await tvAPI.getSeason(
        Number(series_id),
        Number(season_number)
      );
      ip_name = `${series_name} ${season_name} ${episode_number}화`;
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
  argumentType: string
) => {
  let ip_name = "";
  try {
    if (argumentType === "movie") {
      const data = await movieAPI.getMovie(Number(ip_id));
      ip_name = data.title;
      await supabase
        .from("movie_argument")
        .insert([{ topic, ip_id, author_id, ip_name }])
        .select();
    }
    if (argumentType === "episode") {
      const ipIdSplit = ip_id.split("/");
      const series_id = ipIdSplit[0];
      const season_number = ipIdSplit[1];
      const { name: series_name } = await tvAPI.getSeries(Number(series_id));
      const { name: season_name } = await tvAPI.getSeason(
        Number(series_id),
        Number(season_number)
      );
      ip_name = `${series_name} ${season_name}`;
      await supabase
        .from("episode_argument")
        .insert([{ topic, ip_id, author_id, ip_name }])
        .select();
    }
    if (argumentType === "season") {
      const ipIdSplit = ip_id.split("/");
      const series_id = ipIdSplit[0];
      const season_number = ipIdSplit[1];
      const episode_number = ipIdSplit[2];
      const { name: series_name } = await tvAPI.getSeries(Number(series_id));
      const { name: season_name } = await tvAPI.getSeason(
        Number(series_id),
        Number(season_number)
      );
      ip_name = `${series_name} ${season_name} ${episode_number}화`;
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
const getMovieReview = async (ip_id: string) => {
  try {
    const data = await supabase.rpc("get_reviews_by_movie", {
      ip_param: ip_id,
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
      .update({ content, updated_at })
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

// tv season 리뷰 가져오기
const getSeasonReview = async (ip_id: string) => {
  try {
    const data = await supabase.rpc("get_reviews_by_season", {
      ip_param: ip_id,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

// tv season 리뷰 편집
const patchSeasonReview = async (id: number, content: string) => {
  try {
    await supabase
      .from("season_review")
      .update({ content, updated_at })
      .eq("id", id)
      .select();
  } catch (error) {
    throw error;
  }
};

// tv season 리뷰 삭제
const deleteSeasonReview = async (id: number) => {
  try {
    await supabase.from("season_review").delete().eq("id", id);
  } catch (error) {
    throw error;
  }
};

// tv episode 리뷰 가져오기
const getEpisodeReview = async (ip_id: string) => {
  try {
    const data = await supabase.rpc("get_reviews_by_episode", {
      ip_param: ip_id,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

// tv episode 리뷰 편집
const patchEpisodeReview = async (id: number, content: string) => {
  try {
    await supabase
      .from("episode_review")
      .update({ content, updated_at })
      .eq("id", id)
      .select();
  } catch (error) {
    throw error;
  }
};

// tv episode 리뷰 삭제
const deleteEpisodeReview = async (id: number) => {
  try {
    await supabase.from("episode_review").delete().eq("id", id);
  } catch (error) {
    throw error;
  }
};

// 영화 토론 가져오기
const getMovieArgument = async (ip_id: string) => {
  try {
    const data = await supabase.rpc("get_arguments_by_movie", {
      ip_param: ip_id,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

// 영화 토론 편집
const patchMovieArgument = async (id: number, topic: string) => {
  try {
    await supabase
      .from("movie_argument")
      .update({ topic, updated_at })
      .eq("id", id)
      .select();
  } catch (error) {
    throw error;
  }
};

// 영화 토론 삭제
const deleteMovieArgument = async (id: number) => {
  try {
    await supabase.from("movie_argument").delete().eq("id", id);
  } catch (error) {
    throw error;
  }
};

// tv season 토론 가져오기
const getSeasonArgument = async (ip_id: string) => {
  try {
    const data = await supabase.rpc("get_arguments_by_season", {
      ip_param: ip_id,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

// tv season 토론 편집
const patchSeasonArgument = async (id: number, topic: string) => {
  try {
    await supabase
      .from("season_argument")
      .update({ topic, updated_at })
      .eq("id", id)
      .select();
  } catch (error) {
    throw error;
  }
};

// tv season 삭제
const deleteSeasonArgument = async (id: number) => {
  try {
    await supabase.from("season_argument").delete().eq("id", id);
  } catch (error) {
    throw error;
  }
};

// tv episode 토론 가져오기
const getEpisodeArgument = async (ip_id: string) => {
  try {
    const data = await supabase.rpc("get_arguments_by_episode", {
      ip_param: ip_id,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

// tv episode 토론 편집
const patchEpisodeArgument = async (id: number, topic: string) => {
  try {
    await supabase
      .from("episode_argument")
      .update({ topic, updated_at })
      .eq("id", id)
      .select();
  } catch (error) {
    throw error;
  }
};

// tv episode 삭제
const deleteEpisodeArgument = async (id: number) => {
  try {
    await supabase.from("episode_argument").delete().eq("id", id);
  } catch (error) {
    throw error;
  }
};

// 영화 토론 의견 가져오기
const getMovieArgumentOpinion = async (specific_id: number) => {
  try {
    const data = await supabase.rpc("get_argument_opinions_by_movie", {
      specific_id,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

// 토론 의견 수정 기능 없음 삭제 기능만 있음 삭제 시 의견을 빈 문자열로 만들어서 빈 문자열인 content는 삭제된 의견입니다로 보여주게 함
const content = "";

// 영화 토론 의견 수정
const patchMovieArgumentOpinion = async (id: number) => {
  try {
    await supabase
      .from("movie_argument_comment")
      .update({ content })
      .eq("id", id)
      .select();
  } catch (error) {
    throw error;
  }
};

// tv season 토론 의견 가져오기
const getSeasonArgumentOpinion = async (specific_id: number) => {
  try {
    const data = await supabase.rpc("get_argument_opinions_by_season", {
      specific_id,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

// 영화 토론 의견 수정
const patchSeasonArgumentOpinion = async (id: number) => {
  try {
    await supabase
      .from("season_argument_comment")
      .update({ content })
      .eq("id", id)
      .select();
  } catch (error) {
    throw error;
  }
};

// tv episode 토론 의견 가져오기
const getEpisodeArgumentOpinion = async (specific_id: number) => {
  try {
    const data = await supabase.rpc("get_argument_opinions_by_episode", {
      specific_id,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

// 영화 토론 의견 수정
const patchEpisodeArgumentOpinion = async (id: number) => {
  try {
    await supabase
      .from("episode_argument_comment")
      .update({ content })
      .eq("id", id)
      .select();
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
  getSeasonReview,
  patchSeasonReview,
  deleteSeasonReview,
  getEpisodeReview,
  patchEpisodeReview,
  deleteEpisodeReview,
  getMovieArgument,
  patchMovieArgument,
  deleteMovieArgument,
  getSeasonArgument,
  patchSeasonArgument,
  deleteSeasonArgument,
  getEpisodeArgument,
  patchEpisodeArgument,
  deleteEpisodeArgument,
  getMovieArgumentOpinion,
  patchMovieArgumentOpinion,
  getSeasonArgumentOpinion,
  patchSeasonArgumentOpinion,
  getEpisodeArgumentOpinion,
  patchEpisodeArgumentOpinion,
};
