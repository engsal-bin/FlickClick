type TvShow = {
  adult: boolean;
  backdrop_path: string | null;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  media_type: "tv";
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
type GenreState = {
  id: number;
  krKey: string;
  key: string;
  selected: boolean;
};

type YearState = {
  id: number;
  year: string;
  gte: string;
  lte: string;
  selected: boolean;
};

type OttState = {
  key: string;
  src: string;
  alt: string;
  selected: boolean;
};

type FilterOptions = {
  genre: number[];
  firstAirDate: { gte: string | null; lte: string | null };
  ottPlatform: string[];
  language: string;
  region: string;
};
