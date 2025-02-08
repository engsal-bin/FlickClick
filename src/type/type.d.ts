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
}

// 신규 업데이트
interface NewUpdateType {
  id: number;
  title: string;
  poster_path: string;
  popularity: number;
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
interface TransType {}

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

interface PersonDataType {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  character: string;
  credit_id: string;
  order: number;
}

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
