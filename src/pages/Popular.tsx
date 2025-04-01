import { useEffect, useState } from "react";
import arrowLeft from "../assets/icon/arrow/arrowLeft.svg";
import { commonAPI } from "../api/common";
import ContentsWithoutViewMore from "../components/common/ContentsWithoutViewMore";

type Period = "today" | "week";

export default function Popular() {
  const [trendInfos, setTrendInfos] = useState<BasicType[]>([]);

  // 선택태그 상태
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("today");

  // 선택여부 확인 후 선택 or 선택 취소
  const handleSelect = (period: Period) => {
    setSelectedPeriod((prev) => (prev === period ? prev : period));
    if (period === selectedPeriod) return;
    if (period === "today") fetchTrendAll();
    else fetchTrendAll("week");
  };

  // 뒤로가기
  const handleGoBack = () => {
    window.history.back(); // 브라우저 히스토리에서 뒤로 가기
  };

  const fetchTrendAll = async (day = "day") => {
    try {
      const trend = await commonAPI.getTrendingAll(1, day);
      console.log(trend);

      setTrendInfos(
        trend["results"].map((item: TrendingAllResultsType) => ({
          poster_path:
            "https://image.tmdb.org/t/p/w220_and_h330_face" + item.poster_path,
          id: item.id,
          title: item.title,
          media_type: item.media_type,
          name: item.name,
        })),
      );
    } catch (error) {
      console.error("Error fetching upcoming movies:", error);
    }
  };
  useEffect(() => {
    fetchTrendAll();
  }, []);

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
        <div className="text-xl font-bold text-white01">인기 급상승</div>
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
            onClick={() => handleSelect("week")}
            className={`h-[31px] flex items-center ${
              selectedPeriod === "week"
                ? "bg-gray01 border-[1px] border-gray01 text-white01"
                : "border-[1px] border-white03"
            } rounded-[8px] py-[6px] px-[10px] cursor-pointer`}
          >
            이번주
          </div>
        </div>
      </div>

      {/* 컨텐츠 */}
      <div className="flex flex-wrap justify-start gap-4">
        {trendInfos.map((info) => (
          <ContentsWithoutViewMore info={info} key={info.id} />
        ))}
      </div>
    </div>
  );
}
