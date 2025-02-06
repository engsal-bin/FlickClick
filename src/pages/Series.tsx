import { useEffect, useState } from "react";
import { commonAPI } from "../api/common";
import { tvAPI } from "../api/tv";
import MainThumbnail from "../components/common/MainThumbnail";
import Contents from "../components/common/Contents";
import SeriesTags from "../components/common/SeriesTags";
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

export default function Series() {
  const [trendImgSrc, setTrendImgSrc] = useState<BasicType[]>([]);
  const [newUpdateImgSrc, setNewUpateImgSrc] = useState<BasicType[]>([]);

  useEffect(() => {
    // 인기 급상승
    const fetchTrendAll = async () => {
      try {
        const trendPage1 = await commonAPI.getTrendingAll(1);
        console.log(trendPage1);
        const trendPage2 = await commonAPI.getTrendingAll(2);
        console.log(trendPage2);
        const trendPage3 = await commonAPI.getTrendingAll(3);
        console.log(trendPage3);
        const trendPage4 = await commonAPI.getTrendingAll(3);
        const trend = [
          ...trendPage1.results.filter(
            (item: TrendingAllResultsType) => item.media_type === "tv"
          ),
          ...trendPage2.results.filter(
            (item: TrendingAllResultsType) => item.media_type === "tv"
          ),
          ...trendPage3.results.filter(
            (item: TrendingAllResultsType) => item.media_type === "tv"
          ),
          ...trendPage4.results.filter(
            (item: TrendingAllResultsType) => item.media_type === "tv"
          ),
        ].slice(0, 20);
        console.log(trend);

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
        const onTheAirTvSeriese = await tvAPI.getOnTheAirTvSeriese();

        setNewUpateImgSrc(
          onTheAirTvSeriese.results.map(
            (item: OnTheAirTvSerieseResultsType) => ({
              poster_path:
                "https://image.tmdb.org/t/p/w220_and_h330_face" +
                item.poster_path,
              id: item.id,
              media_type: "tv",
              title: item.name,
              popularity: item.popularity,
            })
          )
        );
      } catch (error) {
        console.error("Error fetching new updates:", error);
      }
    };

    fetchTrendAll();
    fetchNewUpdate();
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
      <SeriesTags>장르</SeriesTags>
      <YearTags>방영 연도</YearTags>
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
        시리즈 인기 급상승
      </Contents>
      <Contents
        to="/newupdate"
        showMore={false}
        imgSrc={newUpdateImgSrc.map((item) => item.poster_path)}
      >
        시리즈 신규 업데이트
      </Contents>
    </div>
  );
}
