// Ott logo
import appleTv from "../assets/icon/ottIcon/appleTV.svg";
import googlePlay from "../assets/icon/ottIcon/googlePlay.svg";
import disneyPlus from "../assets/icon/ottIcon/disneyPlus.svg";
import watcha from "../assets/icon/ottIcon/watcha.svg";
import primeVideo from "../assets/icon/ottIcon/primeVideo.svg";
import netflix from "../assets/icon/ottIcon/netflix.svg";
import wavve from "../assets/icon/ottIcon/wavve.svg";

export const yearList: YearState[] = [
  {
    id: 1,
    key: "1800s",
    krKey: "1800년대",
    gte: "1800-01-01",
    lte: "1899-12-31",
    selected: false,
  },
  {
    id: 2,
    key: "1900s",
    krKey: "1900년대",
    gte: "1900-01-01",
    lte: "1999-12-31",
    selected: false,
  },
  {
    id: 3,
    key: "2000s",
    krKey: "2000년대",
    gte: "2000-01-01",
    lte: "2009-12-31",
    selected: false,
  },
  {
    id: 4,
    key: "2010s",
    krKey: "2010년대",
    gte: "2010-01-01",
    lte: "2019-12-31",
    selected: false,
  },
  {
    id: 5,
    key: "2020",
    krKey: "2020년",
    gte: "2020-01-01",
    lte: "2020-12-31",
    selected: false,
  },
  {
    id: 6,
    key: "2021",
    krKey: "2021년",
    gte: "2021-01-01",
    lte: "2021-12-31",
    selected: false,
  },
  {
    id: 7,
    key: "2022",
    krKey: "2022년",
    gte: "2022-01-01",
    lte: "2022-12-31",
    selected: false,
  },
  {
    id: 8,
    key: "2023",
    krKey: "2023년",
    gte: "2023-01-01",
    lte: "2023-12-31",
    selected: false,
  },
  {
    id: 9,
    key: "2024",
    krKey: "2024년",
    gte: "2024-01-01",
    lte: "2024-12-31",
    selected: false,
  },
  {
    id: 10,
    key: "2025",
    krKey: "2025년",
    gte: "2025-01-01",
    lte: "2025-12-31",
    selected: false,
  },
];

export const ottList: OttState[] = [
  { id: 2, key: "appleTv", src: appleTv, alt: "Apple TV", selected: false },
  {
    id: 3,
    key: "googlePlay",
    src: googlePlay,
    alt: "Google Play",
    selected: false,
  },
  {
    id: 337,
    key: "disneyPlus",
    src: disneyPlus,
    alt: "Disney Plus",
    selected: false,
  },
  { id: 97, key: "watcha", src: watcha, alt: "Watcha", selected: false },
  {
    id: 9,
    key: "primeVideo",
    src: primeVideo,
    alt: "Prime Video",
    selected: false,
  },
  { id: 8, key: "netflix", src: netflix, alt: "Netflix", selected: false },
  { id: 356, key: "wavve", src: wavve, alt: "Wavve", selected: false },
];

export const tvGenreList: GenreState[] = [
  {
    id: 10759,
    key: "Action & Adventure",
    krKey: "액션 & 모험",
    selected: false,
  },
  { id: 16, key: "Animation", krKey: "애니메이션", selected: false },
  { id: 35, key: "Comedy", krKey: "코미디", selected: false },
  { id: 80, key: "Crime", krKey: "범죄", selected: false },
  { id: 99, key: "Documentary", krKey: "다큐멘터리", selected: false },
  { id: 18, key: "Drama", krKey: "드라마", selected: false },
  { id: 10751, key: "Family", krKey: "가족", selected: false },
  { id: 10762, key: "Kids", krKey: "어린이", selected: false },
  { id: 9648, key: "Mystery", krKey: "미스터리", selected: false },
  { id: 10763, key: "News", krKey: "뉴스", selected: false },
  { id: 10764, key: "Reality", krKey: "리얼리티", selected: false },
  { id: 10765, key: "Sci-Fi & Fantasy", krKey: "SF & 판타지", selected: false },
  { id: 10766, key: "Soap", krKey: "드라마", selected: false },
  { id: 10767, key: "Talk", krKey: "토크", selected: false },
  { id: 10768, key: "War & Politics", krKey: "전쟁 & 정치", selected: false },
  { id: 37, key: "Western", krKey: "서부", selected: false },
];

export const movieGenreList: GenreState[] = [
  { id: 28, key: "Action", krKey: "액션", selected: false },
  { id: 12, key: "Adventure", krKey: "모험", selected: false },
  { id: 16, key: "Animation", krKey: "애니메이션", selected: false },
  { id: 35, key: "Comedy", krKey: "코미디", selected: false },
  { id: 80, key: "Crime", krKey: "범죄", selected: false },
  { id: 99, key: "Documentary", krKey: "다큐멘터리", selected: false },
  { id: 18, key: "Drama", krKey: "드라마", selected: false },
  { id: 10751, key: "Family", krKey: "가족", selected: false },
  { id: 14, key: "Fantasy", krKey: "판타지", selected: false },
  { id: 36, key: "History", krKey: "역사", selected: false },
  { id: 27, key: "Horror", krKey: "공포", selected: false },
  { id: 10402, key: "Music", krKey: "음악", selected: false },
  { id: 9648, key: "Mystery", krKey: "미스터리", selected: false },
  { id: 10749, key: "Romance", krKey: "로맨스", selected: false },
  { id: 878, key: "Science Fiction", krKey: "과학 소설", selected: false },
  { id: 10770, key: "TV Movie", krKey: "TV 영화", selected: false },
  { id: 53, key: "Thriller", krKey: "스릴러", selected: false },
  { id: 10752, key: "War", krKey: "전쟁", selected: false },
  { id: 37, key: "Western", krKey: "서부", selected: false },
];

export const typeList: TypeState[] = [
  {
    id: 1,
    key: "Series",
    krKey: "시리즈",
    selected: false,
    value: "series",
    apiParams: "tv",
  },
  {
    id: 2,
    key: "Movies",
    krKey: "영화",
    selected: false,
    value: "movies",
    apiParams: "movie",
  },
];

export const runtimeList = [
  {
    id: 1,
    key: "under 15min",
    krKey: "15분 이하",
    gte: 0,
    lte: 15,
    selected: false,
  },
  {
    id: 2,
    key: "15~30min",
    krKey: "15~30분",
    gte: 15,
    lte: 30,
    selected: false,
  },
  {
    id: 3,
    key: "30~60min",
    krKey: "30~60분",
    gte: 30,
    lte: 60,
    selected: false,
  },
  {
    id: 4,
    key: "60~90min",
    krKey: "15~30분",
    gte: 60,
    lte: 90,
    selected: false,
  },
  {
    id: 5,
    key: "90~120min",
    krKey: "90~120분",
    gte: 90,
    lte: 120,
    selected: false,
  },
  {
    id: 6,
    key: "over 120min",
    krKey: "120분 이상",
    gte: 120,
    lte: 800,
    selected: false,
  },
];
