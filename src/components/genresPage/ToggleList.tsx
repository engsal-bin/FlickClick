import { useState } from "react";
import arrowBottom from "../../assets/icon/arrow/arrowBottom.svg";
import arrowRight from "../../assets/icon/arrow/arrowRight.svg";
import OttIcons from "./OttIcons";
import MediaList from "./MediaList";
import YearsList from "./YearsList";
import TimesList from "./TimesList";
import type { CheckedState, Genres, OttState } from "../../type/seriesType";

/* 타입 정리 */
type ToggleState = {
  [key: string]: boolean;
};

interface ToggleListProps {
  title: string;
  toggleType: string;
  checked: CheckedState;
  onCheckboxChange: (key: string) => void;
  availableGenres?: Genres[];
  ottStates?: OttState[];
  setOttStates?: React.Dispatch<React.SetStateAction<OttState[]>>;
}

export default function ToggleList({
  title,
  toggleType,
  checked,
  onCheckboxChange,
  availableGenres = [],
  ottStates = [],
  setOttStates,
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
    <div className="w-[124px] flex flex-col justify-start gap-[30px]">
      <div className="flex flex-row justify-between items-center">
        {/* 분류명 */}
        <p className="max-w-[110px] text-[18px] font-bold">{title}</p>
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
        <div className="w-[124px] flex flex-col justify-start items-start font-light">
          {/* 서비스 하위리스트 */}
          {toggleType === "service" && (
            <OttIcons ottStates={ottStates} setOttStates={setOttStates} />
          )}

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
              {availableGenres.length > 0 && (
                <div className="flex flex-col gap-[10px]">
                  {availableGenres.map((genre) => (
                    <div key={genre.id} className="flex justify-start items-center gap-[15px]">
                      <input
                        type="checkbox"
                        id={`genre-${genre.id}`}
                        checked={checked[genre.name] || false}
                        onChange={() => onCheckboxChange(genre.name)}
                        className={`w-[16px] h-[16px] border-2 rounded-[3px] appearance-none cursor-pointer ${
                          checked[genre.name]
                            ? "bg-main border-white01"
                            : "bg-black border-gray-400"
                        } transition-colors ease-in-out`}
                      />
                      <label htmlFor={`genre-${genre.id}`} className="text-[13px]">
                        {genre.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
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