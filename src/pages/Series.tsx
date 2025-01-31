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
import { useState } from "react";

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
      <Contents to="/popular" showMore={false}>
        시리즈 인기 급상승
      </Contents>
      <Contents to="/newupdate" showMore={false}>
        시리즈 신규 업데이트
      </Contents>
    </div>
  );
}
