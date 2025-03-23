import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import MainThumbnail from "../components/common/MainThumbnail";
import OttTags from "../components/common/OttTags";
import SeriesTags from "../components/common/SeriesTags";
import YearTags from "../components/common/YearTags";
import { useState } from "react";
import DefaultSeriesView from "../components/series/DefaultSeriesView";
import { movieGenreList, ottList, yearList } from "../constants/tags";
import { commonAPI } from "../api/common";
import GridContents from "../components/common/GridContents";

export default function Series() {
  const { ref, inView } = useInView();

  const [genreStates, setGenreStates] = useState<GenreState[]>(movieGenreList);
  const [yearStates, setYearStates] = useState<YearState[]>(yearList);
  const [ottStates, setOttStates] = useState<OttState[]>(ottList);

  const selectGenre = (id: number) => {
    setGenreStates((prev) =>
      prev.map((genre) =>
        genre.id === id ? { ...genre, selected: !genre.selected } : genre
      )
    );
  };

  const selectYearRange = (id: number) => {
    setYearStates((prev) =>
      prev.map((year) =>
        year.id === id ? { ...year, selected: true } : { ...year, selected: false }
      )
    );
  };

  const selectOtt = (id: number) => {
    setOttStates((prev) =>
      prev.map((service) =>
        service.id === id ? { ...service, selected: !service.selected } : service
      )
    );
  };

  const selectedGenres = genreStates.filter((g) => g.selected).map((g) => g.id);
  const selectedYear = yearStates.find((y) => y.selected);
  const selectedOttPlatforms = ottStates.filter((o) => o.selected).map((o) => o.id);

  const isTagsSelected =
    selectedGenres.length > 0 || selectedYear || selectedOttPlatforms.length > 0;

  // 무한 스크롤
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<Content[], Error, Content[], [string, number[]?, YearState?, number[]?], number>({
    queryKey: ["series", selectedGenres, selectedYear, selectedOttPlatforms],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => { 
      return await commonAPI.getDiscover(
        "tv",
        selectedGenres,
        selectedYear?.gte || null,
        selectedYear?.lte || null,
        selectedOttPlatforms,
        "en-US",
        "US",
        pageParam
      );
    },
    getNextPageParam: (lastPage: Content[], allPages: Content[][]) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    }
  });
  
  
  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }

  return (
    <div className="flex flex-col justify-between items-center mb-[100px] desktop:gap-[50px] tablet:gap-[40px] mobile:gap-[30px] text-white bg-black">
      <MainThumbnail />
      <SeriesTags tags={genreStates} selectTag={selectGenre}>
        장르
      </SeriesTags>
      <YearTags tags={yearStates} selectTag={selectYearRange}>
        방영 연도
      </YearTags>
      <OttTags selectedTag={ottStates} selectTag={selectOtt}>
        시청할 수 있는 서비스
      </OttTags>
      {isTagsSelected ? (
        <div className="w-full md:px-10 px-[10px]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {data?.pages?.map((page: Content[]) =>
              Array.isArray(page) ? page.map((content: Content) => <GridContents key={content.id} content={content} />) : null
            )}
          </div>
          <div ref={ref} className="w-full flex justify-center mt-4">
            {isFetchingNextPage && <p className="md:text-[16px] text-[14px] md:py-8 py-5">Loading more...</p>}
          </div>
        </div>
      ) : (
        <DefaultSeriesView />
      )}
    </div>
  );
}
