import { useState } from "react";
import arrowBottom from "../../assets/icon/arrow/arrowBottom.svg";
import arrowRight from "../../assets/icon/arrow/arrowRight.svg";
import OttIcons from "./OttIcons";
import MediaList from "./MediaList";
import GenreList from "./GenreList";
import YearsList from "./YearsList";
import TimesList from "./TimesList";

/* 타입 정리 */
type ToggleState = {
  [key: string]: boolean;
};

type CheckedState = {
  [key: string]: boolean;
};

interface ToggleListProps {
  title: string;
  toggleType: string;
  checked: CheckedState;
  onCheckboxChange: (key: string) => void;
}

export default function ToggleList({
  title,
  toggleType,
  checked,
  onCheckboxChange,
}: ToggleListProps) {
  // 여러 개의 토글 상태 관리
  const [toggles, setToggles] = useState<ToggleState>({
    service: false,
    type: false,
    genres: false,
    years: false,
    times: false,
  });
  // console.log(props.toggleType);

  // 토글 상태 변경 함수
  const toggleVisibility = (key: string) => {
    setToggles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="w-full flex flex-col justify-start gap-[30px]">
      <div className="flex flex-row justify-between items-center">
        {/* 분류명 */}
        <p className="min-w-[110px] max-w-[170px] desktop:text-[20px] mobile:text-[18px] font-bold break-keep">
          {title}
        </p>
        {/* 토글버튼 */}
        <div className="w-[15px] h-[27px] flex flex-col justify-center">
          <img
            src={toggles[toggleType] ? arrowBottom : arrowRight}
            className="w-[15px] h-[15px] cursor-pointer"
            onClick={() => toggleVisibility(`${toggleType}`)}
            alt="toggle"
          />
        </div>
      </div>
      {toggles[toggleType] && (
        <div className="w-full flex flex-col justify-start items-start font-light">
          {/* 서비스 하위리스트 */}
          {toggleType === "service" && <OttIcons />}

          {/* 타입 하위리스트 */}
          {toggleType === "type" && (
            <MediaList checked={checked} onCheckboxChange={onCheckboxChange} />
          )}

          {/* 장르 하위리스트 */}
          {toggleType === "genres" && (
            <div className="flex flex-col gap-[10px]">
              {!(checked.series || checked.movies) && (
                <div className="text-[13px] text-gray02">
                  타입을 선택해주세요.
                </div>
              )}
              {/* 시리즈 선택 시 시리즈 장르 보이기 */}
              {checked.series && <GenreList media="tv" title="시리즈" />}
              {/* 영화 선택 시 영화 장르 보이기 */}
              {checked.movies && <GenreList media="movie" title="영화" />}
            </div>
          )}

          {/* 연도 하위리스트 */}
          {toggleType === "years" && (
            <YearsList checked={checked} onCheckboxChange={onCheckboxChange} />
          )}

          {/* 상영시간 하위리스트 */}
          {toggleType === "times" && (
            <TimesList checked={checked} onCheckboxChange={onCheckboxChange} />
          )}
        </div>
      )}
    </div>
  );
}
