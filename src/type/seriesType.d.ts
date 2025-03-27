export type Content = {
  adult: boolean;
  backdrop_path: string | null;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  media_type: "tv" | "movie";
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
};

export type TvShow = {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  origin_country: string[];
  original_language: string;
  original_name: string;
  popularity: number;
};

export type GenreState = {
  id: number;
  name: string;
  selected: boolean;
};

export type YearState = {
  id: number;
  year: string;
  gte: string;
  lte: string;
  selected: boolean;
};

export type OttState = {
  id: number;
  key: string;
  src: string;
  alt: string;
  selected: boolean;
};

export type Genres = {
  id: number;
  name: string;
};

export type CheckedState = {
  [key: string]: boolean;
};

export type RuntimeRange = {
  gte: number | null;
  lte: number | null;
};

export type Content = {
  id: number;
  title: string;
  name: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
  first_air_date: string;
  genre_ids: number[];
  media_type: string;
};

type FilterOptions = {
  genre: number[];
  firstAirDate: { gte: string | null; lte: string | null };
  ottPlatform: number[];
  language: string;
  region: string;
};
