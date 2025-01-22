import React, { useState } from "react";
import arrowLeft from "../assets/icon/arrow/arrowLeft.svg";
import Contents from "../components/common/Contents";

type Period = "today" | "7days" | "30days" | null;

export default function Popular() {
  // 선택태그 상태
  const [selectedPeriod, setSelectedPeriod] = useState<Period>(null);

  // 선택여부 확인 후 선택 or 선택 취소
  const handleSelect = (period: Period) => {
    setSelectedPeriod((prev) => (prev === period ? null : period));
  };

  // 뒤로가기
  const handleGoBack = () => {
    window.history.back(); // 브라우저 히스토리에서 뒤로 가기
  };

  return (
    <div className="w-full h-full bg-black flex flex-col tablet:gap-[50px] tablet:p-[50px] tablet:px-[40px] mobile:gap-[20px] mobile:px-[20px]">
      {/* 뒤로가기 버튼 */}
      <img
        src={arrowLeft}
        className="w-[10px] cursor-pointer"
        onClick={handleGoBack}
      />
      {/* 주제 및 태그 */}
      <div className="flex flex-col gap-[20px]">
        {/* 주제 */}
        <div className="font-bold text-white01 text-xl">인기 급상승</div>
        {/* 태그 */}
        <div className="flex gap-[10px] text-white03 font-light">
          <div
            onClick={() => handleSelect("today")}
            className={`h-[31px] flex items-center ${
              selectedPeriod === "today"
                ? "bg-gray01 border-[1px] border-gray01 text-white01"
                : "border-[1px] border-white03"
            } rounded-[8px] py-[6px] px-[10px] cursor-pointer`}
          >
            오늘
          </div>
          <div
            onClick={() => handleSelect("7days")}
            className={`h-[31px] flex items-center ${
              selectedPeriod === "7days"
                ? "bg-gray01 border-[1px] border-gray01 text-white01"
                : "border-[1px] border-white03"
            } rounded-[8px] py-[6px] px-[10px] cursor-pointer`}
          >
            최근 7일
          </div>
          <div
            onClick={() => handleSelect("30days")}
            className={`h-[31px] flex items-center ${
              selectedPeriod === "30days"
                ? "bg-gray01 border-[1px] border-gray01 text-white01"
                : "border-[1px] border-white03"
            } rounded-[8px] py-[6px] px-[10px] cursor-pointer`}
          >
            최근 30일
          </div>
        </div>
      </div>
      {/* 컨텐츠 */}
      <Contents />
    </div>
  );
}
