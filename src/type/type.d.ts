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
