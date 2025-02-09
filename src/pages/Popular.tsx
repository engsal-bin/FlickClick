import { useEffect, useState } from "react";
import arrowLeft from "../assets/icon/arrow/arrowLeft.svg";
import Contents from "../components/common/Contents";
import { commonAPI } from "../api/common";

type Period = "today" | "week" | "30days" | null;

export default function Popular() {
  const [trendMovieInfo, setTrendMovieInfo] = useState<BasicType[]>([]);
  const [trendTvInfo, setTrendTvInfo] = useState<BasicType[]>([]);

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

  useEffect(() => {
    const fetchTrendAll = async () => {
      const trend = [];
      try {
        const trend1 = await commonAPI.getTrendingAll(1);
        const trend2 = await commonAPI.getTrendingAll(2);
        const trend3 = await commonAPI.getTrendingAll(3);
        const trend4 = await commonAPI.getTrendingAll(4);
        trend.push(...trend1["results"]);
        trend.push(...trend2["results"]);
        trend.push(...trend3["results"]);
        trend.push(...trend4["results"]);

        const movieFilters = trend.filter((filter) => {
          if (filter["media_type"] === "movie") {
            return filter;
          }
        });
        const tvFilters = trend.filter((filter) => {
          if (filter["media_type"] === "tv") {
            return filter;
          }
        });

        setTrendMovieInfo(
          movieFilters
            .map((item: TrendingAllResultsType) => ({
              poster_path:
                "https://image.tmdb.org/t/p/w220_and_h330_face" +
                item.poster_path,
              id: item.id,
              title: item.title,
              media_type: item.media_type,
            }))
            .slice(0, 20)
        );
        setTrendTvInfo(
          tvFilters
            .map((item: TrendingAllResultsType) => ({
              poster_path:
                "https://image.tmdb.org/t/p/w220_and_h330_face" +
                item.poster_path,
              id: item.id,
              title: item.title,
              media_type: item.media_type,
            }))
            .slice(0, 20)
        );
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };
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
      <Contents
        to=""
        showMore={false}
        imgSrc={trendMovieInfo.map((item) => item.poster_path)}
      >
        MOVIE
      </Contents>
      <Contents
        to=""
        showMore={false}
        imgSrc={trendTvInfo.map((item) => item.poster_path)}
      >
        TV
      </Contents>
    </div>
  );
}
