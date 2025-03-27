// 공통
interface CommonType<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
interface BasicType {
  id: number;
  title: string;
  poster_path: string;
  media_type: string;
  name: string;
  popularity: number;
}

// 인기 급상승
interface TrendingAllResultsType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [number];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  name: string;
}

// 신규 업데이트
interface NewUpdateType {
  id: number;
  title: string;
  poster_path: string;
  popularity: number;
  name: string;
  media_type: string;
  genre_ids: [number];
}
// TV
interface OnTheAirTvSerieseResultsType {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: [number];
  id: number;
  name: string;
  origin_country: [string];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: nymber;
}
// MOVIE
interface NowPlayingMovieResultsType {
  adult: false;
  backdrop_path: string;
  genre_ids: [number];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  name: string;
}

// 공개 예정
interface UpComingMovieType<T> {
  dates: { maximum: string; minimum: string };
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
interface UpComingMovieResultsType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [number];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
interface VideoType {
  id: string;
  key: string;
  site: string;
  type: string;
  published_at: string;
}
// tmdb 전체 장르
interface GenreType {
  id: number;
  name: string;
}

// 출연자 정보
interface CreditInfoType {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: 0;
  original_name: string;
  popularity: number;
  profile_path: string;
}

// tv 시리즈
interface TvSeriesType {
  adult: boolean;
  backdrop_path: string;
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
  };
  episode_run_time: number;
  first_air_date: string;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  last_air_date: string;
  name: string;
  networks: {
    id: number;
    logo_path: string;
    name: string;
    original_country: sting;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  original_country: string[];
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  seasons: TvSeasonsType[];
  tagline: string;
  vote_average: number;
}

// Tv 시즌 타입
interface TvSeasonsType {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
  episodes: EpisodeType[];
}

// 에피소드 타입
interface EpisodeType {
  air_date: string;
  episode_number: number;
  episode_type: string;
  id: number;
  name: string;
  overview: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  crew: {
    job: string;
    department: string;
    credit_id: string;
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
  }[];
  guest_stars: {
    character: string;
    credit_id: string;
    order: number;
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
  }[];
}

// Movie 타입
interface MovieType {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: { iso_3166_1: string; name: string }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

// 인물종합정보 타입
interface PersonDataType {
  adult: boolean;
  cast_id?: number;
  character?: string;
  credit_id: string;
  department?: string;
  gender: number;
  id: string;
  known_for_department: string;
  name: string;
  order?: number;
  original_name: string;
  populartiy: number;
  profile_path: string;
}

// 영화 출연진 타입
interface movieCastPersonType {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: string;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  populartiy: number;
  profile_path: string;
}

// 영화 제작진 타입
interface movieCrewPersonType {
  adult: boolean;
  credit_id: string;
  department: string;
  gender: number;
  id: string;
  known_for_department: string;
  name: string;
  original_name: string;
  populartiy: number;
  profile_path: string;
}

// 장르 기본 타입
interface GenreBasicType {
  name: string;
  id: number;
}

// 리뷰 타입
interface ReviewType {
  id: string;
  content: string;
  author: string;
  date: string;
  isMine?: boolean;
}

interface trendContentType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_country?: string[];
  original_language: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date?: string;
  release_date?: string;
  name?: string;
  title?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
}

interface RecommendContentsType {
  backdrop_path: string;
  id: number;
  name?: string;
  original_name?: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  original_country?: string[];
  title?: string;
  original_title?: string;
  release_date?: string;
  video?: boolean;
}

interface ArgumentType {
  author_id: string;
  author_img_url: string;
  author_name: string;
  created_at: string;
  updated_at: string;
  id: number;
  ip_id: string;
  ip_name: string;
  topic: string;
}

interface MovieReviewType {
  author_id: string;
  author_name: null;
  content: string;
  created_at: string;
  updated_at: string;
  id: number;
  ip_id: string;
  ip_name: string;
}
interface OpinionType {
  argument_id: number;
  author_id: string;
  author_img_url: string;
  author_name: string;
  content: string;
  created_at: string;
  updated_at: string;
  id: number;
}

type movieOrSeasonOrEpisodeType = "movie" | "season" | "episode";
