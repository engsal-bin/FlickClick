import { useState, useEffect } from "react";
import eraser from "../assets/icon/eraser.svg";
import selectTag from "../assets/icon/selectTag.svg";
import ToggleList from "../components/genresPage/ToggleList";
import { commonAPI } from "../api/common";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import GridContents from "../components/common/GridContents";
import { movieAPI } from "../api/movie";
import { tvAPI } from "../api/tv";
import GridSkeletonList from "../components/skeletons/GridSkeletonList";
import { ottList } from "../constants/tags";
import type { Content, Genres, CheckedState, RuntimeRange } from "../type/seriesType";

export default function Genres() {
  const { ref, inView } = useInView();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<{ gte: string | null; lte: string | null }>({
    gte: null,
    lte: null,
  });
  const [selectedRuntime, setSelectedRuntime] = useState<RuntimeRange>({
    gte: null,
    lte: null,
  });
  const [availableGenres, setAvailableGenres] = useState<Genres[]>([]);
  const [ottStates, setOttStates] = useState(ottList);

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

  // 전체 초기화 함수
  const handleResetAll = () => {
    // 체크박스 상태 초기화
    setChecked({
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

    // OTT 상태 초기화
    setOttStates(ottList);

    // 선택된 장르 초기화
    setSelectedGenres([]);
    
    // 선택된 연도 초기화
    setSelectedYear({
      gte: null,
      lte: null,
    });

    // 선택된 상영시간 초기화
    setSelectedRuntime({
      gte: null,
      lte: null,
    });

    // 사용 가능한 장르 목록 초기화
    setAvailableGenres([]);
  };

  // 장르 데이터 가져오기
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        if (checked.series) {
          const tvGenres = await tvAPI.getGenres();
          setAvailableGenres(tvGenres.genres);
        } else if (checked.movies) {
          const movieGenres = await movieAPI.getGenres();
          setAvailableGenres(movieGenres.genres);
        } else {
          setAvailableGenres([]);
        }
      } catch (error) {
        console.error("장르 데이터 가져오기 실패:", error);
      }
    };

    fetchGenres();
  }, [checked.series, checked.movies]);

  // 체크박스 상태 변경 함수
  const handleCheckboxChange = (key: string) => {
    setChecked((prev) => {
      const newState = {
        ...prev,
        [key]: !prev[key],
      };

      // 타입 선택 시 다른 타입 해제
      if (key === "series" && newState[key]) {
        newState.movies = false;
      } else if (key === "movies" && newState[key]) {
        newState.series = false;
      }

      // 장르 선택 처리
      const selectedGenre = availableGenres.find(genre => genre.name === key);
      if (selectedGenre) {
        setSelectedGenres(prev => {
          if (newState[key]) {
            return [...prev, selectedGenre.id];
          } else {
            return prev.filter(id => id !== selectedGenre.id);
          }
        });
      }

      // 상영시간 필터링 처리
      if (key === "15분 이하") {
        setSelectedRuntime(prev => ({ ...prev, lte: newState[key] ? 15 : null }));
      } else if (key === "15~30분") {
        setSelectedRuntime(prev => ({ ...prev, gte: newState[key] ? 15 : null, lte: newState[key] ? 30 : null }));
      } else if (key === "30~60분") {
        setSelectedRuntime(prev => ({ ...prev, gte: newState[key] ? 30 : null, lte: newState[key] ? 60 : null }));
      } else if (key === "60~90분") {
        setSelectedRuntime(prev => ({ ...prev, gte: newState[key] ? 60 : null, lte: newState[key] ? 90 : null }));
      } else if (key === "90~120분") {
        setSelectedRuntime(prev => ({ ...prev, gte: newState[key] ? 90 : null, lte: newState[key] ? 120 : null }));
      } else if (key === "120분 이상") {
        setSelectedRuntime(prev => ({ ...prev, gte: newState[key] ? 120 : null }));
      }

      // 연도 필터링 처리
      if (key === "2025년") {
        setSelectedYear(prev => ({ ...prev, gte: newState[key] ? "2025-01-01" : null, lte: newState[key] ? "2025-12-31" : null }));
      } else if (key === "2024년") {
        setSelectedYear(prev => ({ ...prev, gte: newState[key] ? "2024-01-01" : null, lte: newState[key] ? "2024-12-31" : null }));
      } else if (key === "2023년") {
        setSelectedYear(prev => ({ ...prev, gte: newState[key] ? "2023-01-01" : null, lte: newState[key] ? "2023-12-31" : null }));
      } else if (key === "2022년") {
        setSelectedYear(prev => ({ ...prev, gte: newState[key] ? "2022-01-01" : null, lte: newState[key] ? "2022-12-31" : null }));
      } else if (key === "2021년") {
        setSelectedYear(prev => ({ ...prev, gte: newState[key] ? "2021-01-01" : null, lte: newState[key] ? "2021-12-31" : null }));
      } else if (key === "2020년") {
        setSelectedYear(prev => ({ ...prev, gte: newState[key] ? "2020-01-01" : null, lte: newState[key] ? "2020-12-31" : null }));
      } else if (key === "2010년대") {
        setSelectedYear(prev => ({ ...prev, gte: newState[key] ? "2010-01-01" : null, lte: newState[key] ? "2019-12-31" : null }));
      } else if (key === "2000년대") {
        setSelectedYear(prev => ({ ...prev, gte: newState[key] ? "2000-01-01" : null, lte: newState[key] ? "2009-12-31" : null }));
      } else if (key === "1990년대") {
        setSelectedYear(prev => ({ ...prev, gte: newState[key] ? "1990-01-01" : null, lte: newState[key] ? "1999-12-31" : null }));
      } else if (key === "1980년대") {
        setSelectedYear(prev => ({ ...prev, gte: newState[key] ? "1980-01-01" : null, lte: newState[key] ? "1989-12-31" : null }));
      }

      return newState;
    });
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["genres", selectedGenres, selectedYear, selectedRuntime, checked, ottStates],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const targetType = checked.series ? "tv" : checked.movies ? "movie" : "tv";
      const selectedServices = ottStates
        .filter(service => service.selected)
        .map(service => service.id);
      
      return await commonAPI.getDiscover(
        targetType,
        selectedGenres,
        selectedYear.gte,
        selectedYear.lte,
        selectedServices,
        "en-US",
        "US",
        pageParam,
        selectedRuntime.gte,
        selectedRuntime.lte
      );
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const isTagsSelected = Object.values(checked).some(value => value);

  return (
    <div className="w-full h-max flex flex-row justify-between text-white bg-black relative">
      {/* 사이드바 */}
      <div className={`fixed md:static w-[154px] h-full flex flex-col justify-start items-center top-[80px] gap-[30px] left-0 px-[15px] bg-black z-50 transition-transform duration-300 ease-in-out md:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* 태그 선택 */}
        <div className="w-[124px] flex flex-col gap-[10px]">
          <div className="flex justify-between items-center">
            <p className="text-[24px] font-bold">태그 선택</p>
            <button 
              className="md:hidden text-white"
              onClick={() => setIsSidebarOpen(false)}
            >
              ✕
            </button>
          </div>
          <div className="w-[79px] flex justify-between cursor-pointer" onClick={handleResetAll}>
            <p className="text-[12px] font-400">전체 초기화</p>
            <img src={eraser} alt="초기화" />
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
          ottStates={ottStates}
          setOttStates={setOttStates}
        />
        <ToggleList
          title="타입"
          toggleType="type"
          checked={checked}
          onCheckboxChange={handleCheckboxChange}
        />
        {(checked.series || checked.movies) && (
          <ToggleList
            title="장르"
            toggleType="genres"
            checked={checked}
            onCheckboxChange={handleCheckboxChange}
            availableGenres={availableGenres}
          />
        )}
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

      {/* 컨텐츠 영역 */}
      <div className="flex-1">
        {/* 모바일 사이드바 토글 버튼 */}
        <button 
          className="md:hidden fixed top-[90px] left-4 z-40 bg-black text-white p-2 rounded"
          onClick={() => setIsSidebarOpen(true)}
        >
          ☰
        </button>

        {isTagsSelected ? (
          <>
            {isFetchingNextPage ? (
              <GridSkeletonList />
            ) : (
              <div className="w-full md:px-10 px-[10px]">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
                  {data?.pages?.map((page) =>
                    Array.isArray(page) ? page.map((content) => (
                      <div key={content.id} className="w-full max-w-[200px] aspect-[2/3]">
                        <GridContents content={content} />
                      </div>
                    )) : null
                  )}
                </div>
                <div ref={ref} className="w-full flex justify-center mt-4">
                  {isFetchingNextPage && <p>Loading more...</p>}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full flex flex-col justify-start items-center mt-[150px]">
            <img src={selectTag} />
            <p className="text-[18px] text-gray01">태그를 선택해주세요.</p>
          </div>
        )}
      </div>
    </div>
  );
}
