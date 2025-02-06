import { useEffect, useState } from "react";
import { commonAPI } from "../api/common";
import { movieAPI } from "../api/movie";
import MainThumbnail from "../components/common/MainThumbnail";
import Contents from "../components/common/Contents";
import MoviesTags from "../components/common/MoviesTags";
import YearTags from "../components/common/YearTags";
// ott 로고
import appleTv from "../assets/icon/ottIcon/appleTV.svg";
import googlePlay from "../assets/icon/ottIcon/googlePlay.svg";
import disneyPlus from "../assets/icon/ottIcon/disneyPlus.svg";
import watcha from "../assets/icon/ottIcon/watcha.svg";
import primeVideo from "../assets/icon/ottIcon/primeVideo.svg";
import netflix from "../assets/icon/ottIcon/netflix.svg";
import wavve from "../assets/icon/ottIcon/wavve.svg";

import OttIcon from "../components/OttIcon";

type OttState = {
  [key: string]: boolean;
};

// (임시) OTT서비스 데이터
const ottServices = [
  { key: "appleTv", src: appleTv, alt: "Apple TV" },
  { key: "googlePlay", src: googlePlay, alt: "Google Play" },
  { key: "disneyPlus", src: disneyPlus, alt: "Disney Plus" },
  { key: "watcha", src: watcha, alt: "Watcha" },
  { key: "primeVideo", src: primeVideo, alt: "Prime Video" },
  { key: "netflix", src: netflix, alt: "Netflix" },
  { key: "wavve", src: wavve, alt: "Wavve" },
];
export default function Movies() {
  const [trendImgSrc, setTrendImgSrc] = useState<BasicType[]>([]);
  const [newUpdateImgSrc, setNewUpateImgSrc] = useState<BasicType[]>([]);
  const [upcomingImgSrc, setUpcomingImgSrc] = useState<BasicType[]>([]);
  useEffect(() => {
    // 인기 급상승
    const fetchTrendAll = async () => {
      try {
        const trendPage1 = await commonAPI.getTrendingAll(1);

        const trendPage2 = await commonAPI.getTrendingAll(2);

        const trendPage3 = await commonAPI.getTrendingAll(3);

        const trendPage4 = await commonAPI.getTrendingAll(3);
        const trend = [
          ...trendPage1.results.filter(
            (item: TrendingAllResultsType) => item.media_type === "movie"
          ),
          ...trendPage2.results.filter(
            (item: TrendingAllResultsType) => item.media_type === "movie"
          ),
          ...trendPage3.results.filter(
            (item: TrendingAllResultsType) => item.media_type === "movie"
          ),
          ...trendPage4.results.filter(
            (item: TrendingAllResultsType) => item.media_type === "movie"
          ),
        ].slice(0, 20);

        setTrendImgSrc(
          trend.map((item: TrendingAllResultsType) => ({
            poster_path:
              "https://image.tmdb.org/t/p/w220_and_h330_face" +
              item.poster_path,
            id: item.id,
            title: item.title,
            media_type: item.media_type,
          }))
        );
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };

    // 신규 업데이트
    const fetchNewUpdate = async () => {
      try {
        const nowPlayingMovie = await movieAPI.getNowPlayingMovie();

        setNewUpateImgSrc(
          nowPlayingMovie.results.map((item: NowPlayingMovieResultsType) => ({
            poster_path:
              "https://image.tmdb.org/t/p/w220_and_h330_face" +
              item.poster_path,
            id: item.id,
            title: item.title,
            media_type: "movie",
          }))
        );
      } catch (error) {
        console.error("Error fetching new updates:", error);
      }
    };

    // 공개 예정
    const fetchUpcomingMovies = async () => {
      try {
        const upcoming = await movieAPI.getUpComingMovie();

        setUpcomingImgSrc(
          upcoming.results.map((item: UpComingMovieResultsType) => ({
            poster_path:
              "https://image.tmdb.org/t/p/w220_and_h330_face" +
              item.poster_path,
            id: item.id,
            title: item.title,
            media_type: "movie",
          }))
        );
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };

    fetchTrendAll();
    fetchNewUpdate();
    fetchUpcomingMovies();
  }, []);

  // ott 선택 상태 관리
  const [ottSelect, setOttSelect] = useState<OttState>({
    appleTv: false,
    googlePlay: false,
    disneyPlus: false,
    watcha: false,
    primeVideo: false,
    netflix: false,
    wavve: false,
  });

  // ott 선택 상태 변경 함수
  const selectOtt = (key: string) => {
    setOttSelect((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  return (
    <div className="flex flex-col justify-between items-center mb-[100px] desktop:gap-[50px] tablet:gap-[40px] mobile:gap-[30px] text-white bg-black">
      <MainThumbnail />

      <MoviesTags>장르</MoviesTags>
      <YearTags>개봉 연도</YearTags>
      <div className="w-full tablet:px-[50px] mobile:px-[10px]">
        <p className="font-bold text-white01 tablet:text-[24px] mb-[30px] mobile:text-[18px]">
          시청할 수 있는 서비스
        </p>
        <div className="flex">
          {ottServices.map((service) => (
            <OttIcon
              key={service.key}
              src={service.src}
              isSelected={ottSelect[service.key]}
              onClick={() => selectOtt(service.key)}
              alt={service.alt}
            />
          ))}
        </div>
      </div>

      <Contents
        to="/popular"
        showMore={false}
        imgSrc={trendImgSrc.map((item) => item.poster_path)}
      >
        영화 인기 급상승
      </Contents>
      <Contents
        to="/newupdate"
        showMore={false}
        imgSrc={newUpdateImgSrc.map((item) => item.poster_path)}
      >
        영화 신규 업데이트
      </Contents>
      <Contents
        to="/newupdate"
        showMore={false}
        imgSrc={upcomingImgSrc.map((item) => item.poster_path)}
      >
        영화 공개 예정
      </Contents>
    </div>
  );
}
