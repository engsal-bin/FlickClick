type Content = {
  adult: boolean;
  backdrop_path: string | null;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  media_type: "tv" | "movie";
  name?: string;
  title?: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
};

type TvShow = {
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

type TypeState = {
  id: number;
  key: string;
  krKey: string;
  value: string;
  selected: boolean;
  apiParams: string;
};

type GenreState = {
  id: number;
  key: string;
  krKey: string;
  selected: boolean;
};

type YearState = {
  id: number;
  key: string;
  krKey: string;
  gte: string;
  lte: string;
  selected: boolean;
};

type OttState = {
  id: number;
  key: string;
  src: string;
  alt: string;
  selected: boolean;
};

type Genres = {
  id: number;
  name: string;
  key: string;
  krKey: string;
};

type CheckedState = {
  [key: string]: boolean;
};

type RuntimeRange = {
  id: nunber;
  key: string;
  krKey: string;
  gte: number;
  lte: number;
  selected: boolean;
};

type Content = {
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

interface Genres {
  id: number;
  name: string;
  key: string;
  krKey: string;
}

interface YearState {
  id: number;
  key: string;
  krKey: string;
  gte: string;
  lte: string;
  selected: boolean;
}

interface OttState {
  id: number;
  name: string;
  src: string;
  alt: string;
  selected: boolean;
}

interface CheckedState {
  series: boolean;
  movies: boolean;
  [key: string]: boolean;
}
