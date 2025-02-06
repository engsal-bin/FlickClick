import { useState } from "react";
import eraser from "../assets/icon/eraser.svg";
import selectTag from "../assets/icon/selectTag.svg";
import ToggleList from "../components/genresPage/ToggleList";

/* 타입 정리 */
type ToggleState = {
  [key: string]: boolean;
};

type Genres = {
  id: number;
  name: string;
};

type CheckedState = {
  [key: string]: boolean;
};

export default function Genres() {
  // 체크박스 상태 관리 (MediaList)
  const [checked, setChecked] = useState<CheckedState>({
    series: false,
    movies: false,
    "2025년": false,
    "2024년": false,
    "2023년": false,
    "2022년": false,
    "2021년": false,
    "2020년": false,
    "2010년대": false,
    "2000년대": false,
    "1990년대": false,
    "1980년대": false,
    "15분 이하": false,
    "15~30분": false,
    "30~60분": false,
    "60~90분": false,
    "90~120분": false,
    "120분 이상": false,
  });
  // console.log(checked);

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

        {/* 분류 리스트 */}
        <ToggleList
          title="사용할 수 있는 서비스"
          toggleType="service"
          checked={checked}
          onCheckboxChange={handleCheckboxChange}
        />
        <ToggleList
          title="타입"
          toggleType="type"
          checked={checked}
          onCheckboxChange={handleCheckboxChange}
        />
        <ToggleList
          title="장르"
          toggleType="genres"
          checked={checked}
          onCheckboxChange={handleCheckboxChange}
        />

        <ToggleList
          title="연도"
          toggleType="years"
          checked={checked}
          onCheckboxChange={handleCheckboxChange}
        />
        <ToggleList
          title="상영시간"
          toggleType="times"
          checked={checked}
          onCheckboxChange={handleCheckboxChange}
        />
      </div>

      {/* 태그 미선택시 기본 페이지 */}
      <div className="w-full flex flex-col justify-start items-center mt-[150px]">
        <img src={selectTag} />
        <p className="text-[18px] text-gray01">태그를 선택해주세요.</p>
      </div>
    </div>
  );
}
