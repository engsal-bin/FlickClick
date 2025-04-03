import { useState, useEffect } from "react";
import eraser from "../assets/icon/eraser.svg";
import selectTag from "../assets/icon/selectTag.svg";
import ToggleList from "../components/genresPage/ToggleList";
import { commonAPI } from "../api/common";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import GridContents from "../components/common/GridContents";
import GridSkeletonList from "../components/skeletons/GridSkeletonList";
import {
  ottList,
  yearList,
  tvGenreList,
  movieGenreList,
  typeList,
  runtimeList,
} from "../constants/tags";
import { useLanguageStore } from "../store/useLanguageStore";
import { menuTranslations } from "../translations/menu";
import TypeList from "../components/genresPage/TypeList";
import OttList from "../components/genresPage/OttList";
import GenreList from "../components/genresPage/GenreList";
import YearsList from "../components/genresPage/YearsList";
import TimesList from "../components/genresPage/TimesList";

export default function Genres() {
  const { ref, inView } = useInView();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { language } = useLanguageStore();
  const translation = menuTranslations[language];

  const [typeState, setTypeState] = useState<TypeState[]>(typeList);
  const [genreStates, setgenreStates] = useState<GenreState[]>(tvGenreList);
  const [ottStates, setOttStates] = useState<OttState[]>(ottList);
  const [yearStates, setYearStates] = useState<YearState[]>(yearList);
  const [runtimeState, setruntimeState] = useState<RuntimeRange[]>(runtimeList);

  const [isTagsSelected, setIsTagSelected] = useState(false);
  const [showGenreOptions, setShowGenreOptions] = useState<boolean>(false);

  const [filterOptions, setFilterOptions] = useState<{
    type: string | null;
    genre: number[] | null;
    ott: number[] | null;
    year: { gte: string | null; lte: string | null } | null;
    runtime: { gte: number | null; lte: number | null } | null;
  }>({
    type: null,
    genre: null,
    ott: null,
    year: null,
    runtime: null,
  });

  // 전체 초기화 함수
  const handleResetAll = () => {
    setTypeState(typeState.map((type) => ({ ...type, selected: false })));
    setgenreStates(genreStates.map((genre) => ({ ...genre, selected: false })));
    setOttStates(ottStates.map((ott) => ({ ...ott, selected: false })));
    setYearStates(yearStates.map((year) => ({ ...year, selected: false })));
    setruntimeState(
      runtimeState.map((runtime) => ({ ...runtime, selected: false }))
    );
  };

  useEffect(() => {
    const selectecdType = typeState.find((type) => type.selected);
    if (selectecdType) setShowGenreOptions(true);
    if (selectecdType?.value === "series") setgenreStates(tvGenreList);
    if (selectecdType?.value === "movies") setgenreStates(movieGenreList);
  }, [typeState]);

  useEffect(() => {
    const selectedType = typeState.find((type) => type.selected);
    const selectedGenres = genreStates
      .filter((g) => g.selected)
      .map((g) => g.id);
    const selectedOttPlatforms = ottStates
      .filter((o) => o.selected)
      .map((o) => o.id);
    const selectedYear = yearStates.find((year) => year.selected);
    const selectedRuntime = runtimeState.find((runtime) => runtime.selected);

    console.log("년도 스테이트", genreStates);
    console.log("선택된 년도", selectedYear);

    setFilterOptions({
      type: selectedType?.apiParams || null,
      genre: selectedGenres,
      ott: selectedOttPlatforms,
      year: {
        gte: selectedYear?.gte || null,
        lte: selectedYear?.lte || null,
      },
      runtime: {
        gte: selectedRuntime?.gte || null,
        lte: selectedRuntime?.lte || null,
      },
    });
  }, [typeState, genreStates, ottStates, yearStates, runtimeState]);

  useEffect(() => {
    const hasSelectedTag =
      typeState.some((type) => type.selected) ||
      genreStates.some((genre) => genre.selected) ||
      ottStates.some((ott) => ott.selected) ||
      yearStates.some((year) => year.selected) ||
      runtimeState.some((runtime) => runtime.selected);

    setIsTagSelected(hasSelectedTag);
  }, [typeState, genreStates, ottStates, yearStates, runtimeState]);

  // 선택 함수
  const selectType = (id: number) => {
    setTypeState((prev) =>
      prev.map((type) =>
        type.id === id
          ? { ...type, selected: !type.selected }
          : { ...type, selected: false }
      )
    );
  };

  const selectGenre = (id: number) => {
    setgenreStates((prev) =>
      prev.map((genre) =>
        genre.id === id ? { ...genre, selected: !genre.selected } : genre
      )
    );
  };

  const selectOtt = (id: number) => {
    setOttStates((prev) =>
      prev.map((service) =>
        service.id === id
          ? { ...service, selected: !service.selected }
          : service
      )
    );
  };

  const selectYearRange = (id: number) => {
    setYearStates((prev) =>
      prev.map((year) =>
        year.id === id
          ? { ...year, selected: !year.selected }
          : { ...year, selected: false }
      )
    );
  };

  const selectRumtime = (id: number) => {
    setruntimeState((prev) =>
      prev.map((time) =>
        time.id === id
          ? { ...time, selected: !time.selected }
          : { ...time, selected: false }
      )
    );
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["genres", filterOptions],
      initialPageParam: 1,
      queryFn: async ({ pageParam = 1 }) => {
        if (!filterOptions.type) return [];
        console.log("필터링 옵션 api 호출", filterOptions);
        const response = await commonAPI.getDiscover(
          filterOptions.type,
          filterOptions.genre || [],
          filterOptions.year?.gte || null,
          filterOptions.year?.lte || null,
          filterOptions.ott || [],
          translation.languageParams,
          translation.country,
          pageParam,
          filterOptions.runtime?.gte,
          filterOptions.runtime?.lte
        );
        return response.map((content) => ({
          ...content,
          media_type: filterOptions.type as "tv" | "movie",
        }));
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

  return (
    <div className="w-full flex flex-row justify-between text-white bg-black relative">
      {/* 사이드바 */}
      <div
        className={`fixed md:static  w-[254px] h-full mb-[60px] flex flex-col justify-start items-start top-[80px] gap-[30px] left-0 pr-[15px] pl-[60px] bg-black z-50  transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isSidebarOpen ? " translate-x-0" : "-translate-x-full "
        }`}
      >
        {/* 태그 선택 */}
        <div className="w-[124px] flex flex-col gap-[10px]">
          <div className="flex justify-between items-center">
            <p className="text-[24px] font-bold">{translation.genres}</p>
            <button
              className="md:hidden text-white"
              onClick={() => setIsSidebarOpen(false)}
            >
              ✕
            </button>
          </div>
          <div
            className="w-[79px] flex justify-between cursor-pointer"
            onClick={handleResetAll}
          >
            <p className="text-[12px] font-400">{translation.resetTags}</p>
            <img src={eraser} alt="초기화" />
          </div>
        </div>

        {/* 구분선 */}
        <div className="w-[124px] border-b-[1px] border-gray02"></div>

        {/* 분류 리스트 */}
        <ToggleList title={translation.type}>
          <TypeList typeState={typeState} onCheckboxChange={selectType} />
        </ToggleList>
        <ToggleList title={translation.streamingService}>
          <OttList ottStates={ottStates} onCheckboxChange={selectOtt} />
        </ToggleList>
        <ToggleList title={translation.genres}>
          <GenreList
            genreStates={genreStates}
            onCheckboxChange={selectGenre}
            showGenreOptions={showGenreOptions}
          />
        </ToggleList>
        <ToggleList title={translation.year}>
          <YearsList
            yearStates={yearStates}
            onCheckboxChange={selectYearRange}
          />
        </ToggleList>
        <ToggleList title={translation.runtime}>
          <TimesList
            runtimeState={runtimeState}
            onCheckboxChange={selectRumtime}
          />
        </ToggleList>
      </div>
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
            ) : data?.pages?.flat().length === 0 ? (
              // 검색 결과 없음
              <div className="w-full flex flex-col justify-center items-center mt-[150px]">
                <p className="text-[18px] text-gray01">
                  {translation.noFilteringResult}
                </p>
              </div>
            ) : (
              <div className="w-full md:px-10 px-[10px]">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
                  {data?.pages?.map((page) =>
                    Array.isArray(page)
                      ? page.map((content) => (
                          <div
                            key={content.id}
                            className="w-full max-w-[200px] aspect-[2/3]"
                          >
                            <GridContents content={content} />
                          </div>
                        ))
                      : null
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
            <p className="text-[18px] text-gray01">
              {translation.noTagSelected}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
