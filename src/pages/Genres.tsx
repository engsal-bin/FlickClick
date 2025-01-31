import { useState } from "react";
import eraser from "../assets/icon/eraser.svg";
// ott 로고
import appleTv from "../assets/icon/ottIcon/appleTV.svg";
import googlePlay from "../assets/icon/ottIcon/googlePlay.svg";
import disneyPlus from "../assets/icon/ottIcon/disneyPlus.svg";
import watcha from "../assets/icon/ottIcon/watcha.svg";
import primeVideo from "../assets/icon/ottIcon/primeVideo.svg";
import netflix from "../assets/icon/ottIcon/netflix.svg";
import wavve from "../assets/icon/ottIcon/wavve.svg";

import arrowBottom from "../assets/icon/arrow/arrowBottom.svg";
import arrowRight from "../assets/icon/arrow/arrowRight.svg";
import selectTag from "../assets/icon/selectTag.svg";
import OttIcon from "../components/OttIcon";

/* 타입 정리 */
type ToggleState = {
  [key: string]: boolean;
};

type OttState = {
  [key: string]: boolean;
};

type CheckedState = {
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

export default function Genres() {
  // 여러 개의 토글 상태 관리
  const [toggles, setToggles] = useState<ToggleState>({
    service: true,
    type: true,
    genres: true,
    years: true,
    times: true,
  });

  // 토글 상태 변경 함수
  const toggleVisibility = (key: string) => {
    setToggles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

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

  // 체크박스 상태 관리
  const [checked, setChecked] = useState<CheckedState>({
    series: false,
    movies: false,
  });

  // 체크박스 상태 변경 함수
  const handleCheckboxChange = (key: string) => {
    setChecked((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="w-full h-max flex flex-row justify-between text-white bg-black">
      {/* 사이드바 */}
      <div className="w-[154px] h-full flex flex-col justify-start items-center top-[80px] gap-[30px] left-0 px-[15px]">
        {/* 태그 선택 */}
        <div className="w-[124px] flex flex-col gap-[10px]">
          <p className="text-[24px] font-bold">태그 선택</p>
          <div className="w-[79px] flex justify-between">
            <p className="text-[12px] font-400">전체 초기화</p>
            <img src={eraser} />
          </div>
        </div>

        {/* 구분선 */}
        <div className="w-[124px] border-b-[1px] border-gray02"></div>

        {/* 시청할 수 있는 서비스 */}
        <div className="w-[124px] flex flex-col justify-start gap-[30px]">
          <div className="flex flex-row justify-between">
            <p className="text-[18px] font-bold">
              시청할 수 <br /> 있는 서비스
            </p>
            <img
              src={toggles.service ? arrowBottom : arrowRight}
              className={`${
                toggles.service ? "w-[15px]" : "w-[9px]"
              } cursor-pointer`}
              onClick={() => toggleVisibility("service")}
              alt="toggle"
            />
          </div>

          {/* ott서비스 아이콘 */}
          <div className="w-[124px] flex flex-wrap gap-[15px]">
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

        {/* 구분선 */}
        <div className="w-[124px] border-b-[1px] border-gray02"></div>

        {/* 타입 */}
        <div className="w-[124px] flex flex-col justify-start gap-[30px]">
          <div className="flex flex-row justify-between">
            <p className="text-[18px] font-bold">타입</p>
            <img
              src={toggles.type ? arrowBottom : arrowRight}
              className={`${
                toggles.type ? "w-[15px]" : "w-[9px]"
              } cursor-pointer`}
              onClick={() => toggleVisibility("type")}
              alt="toggle"
            />
          </div>
          {toggles.type && (
            <div className="w-[124px] flex flex-col justify-start items-start font-light">
              <div className="flex justify-center items-center gap-[15px]">
                <input
                  type="checkbox"
                  id="series-checkbox"
                  checked={checked.series}
                  onChange={() => handleCheckboxChange("series")}
                  className={`w-[16px] h-[16px] border-2 rounded-[3px] appearance-none cursor-pointer ${
                    checked.series
                      ? "bg-main border-white01"
                      : "bg-black border-gray-400"
                  } transition-colors ease-in-out`}
                />
                <label htmlFor="series-checkbox">시리즈</label>
              </div>
              <div className="flex items-center gap-[15px]">
                <input
                  type="checkbox"
                  id="movies-checkbox"
                  checked={checked.movies}
                  onChange={() => handleCheckboxChange("movies")}
                  className={`w-[16px] h-[16px] border-2 rounded-[3px] appearance-none cursor-pointer ${
                    checked.movies
                      ? "bg-main border-white01"
                      : "bg-black border-gray-400"
                  } transition-colors ease-in-out`}
                />
                <label htmlFor="movies-checkbox">영화</label>
              </div>
            </div>
          )}
        </div>

        {/* 구분선 */}
        <div className="w-[124px] border-b-[1px] border-gray02"></div>

        {/* 장르 */}
        <div className="w-[124px] flex flex-col justify-start gap-[30px]">
          <div className="flex flex-row justify-between">
            <p className="text-[18px] font-bold">장르</p>
            <img
              src={toggles.genres ? arrowBottom : arrowRight}
              className={`${
                toggles.genres ? "w-[15px]" : "w-[9px]"
              } cursor-pointer`}
              onClick={() => toggleVisibility("genres")}
              alt="toggle"
            />
          </div>
        </div>

        {/* 구분선 */}
        <div className="w-[124px] border-b-[1px] border-gray02"></div>

        {/* 연도 */}
        <div className="w-[124px] flex flex-col justify-start gap-[30px]">
          <div className="flex flex-row justify-between">
            <p className="text-[18px] font-bold">연도</p>
            <img
              src={toggles.years ? arrowBottom : arrowRight}
              className={`${
                toggles.years ? "w-[15px]" : "w-[9px]"
              } cursor-pointer`}
              onClick={() => toggleVisibility("years")}
              alt="toggle"
            />
          </div>
        </div>

        {/* 구분선 */}
        <div className="w-[124px] border-b-[1px] border-gray02"></div>

        {/* 상영시간 */}
        <div className="w-[124px] flex flex-col justify-start gap-[30px]">
          <div className="flex flex-row justify-between">
            <p className="text-[18px] font-bold">상영시간</p>
            <img
              src={toggles.times ? arrowBottom : arrowRight}
              className={`${
                toggles.times ? "w-[15px]" : "w-[9px]"
              } cursor-pointer`}
              onClick={() => toggleVisibility("times")}
              alt="toggle"
            />
          </div>
        </div>
      </div>
      {/* 태그 미선택시 기본 페이지 */}
      <div className="w-full flex flex-col justify-center items-center">
        <img src={selectTag} />
        <p className="text-[18px] text-gray01">태그를 선택해주세요.</p>
      </div>
    </div>
  );
}
