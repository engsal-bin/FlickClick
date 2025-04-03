import { useInfiniteQuery, InfiniteData } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import MainThumbnail from "../components/common/MainThumbnail";
import OttTags from "../components/common/OttTags";
import SeriesTags from "../components/common/SeriesTags";
import YearTags from "../components/common/YearTags";
import DefaultMoviesView from "../components/default-view/DefaultMoviesView";
import GridContents from "../components/common/GridContents";
import { ottList, movieGenreList, yearList } from "../constants/tags";
import { commonAPI } from "../api/common";
import GridSkeletonList from "../components/skeletons/GridSkeletonList";
import { useLanguageStore } from "../store/useLanguageStore";
import { menuTranslations } from "../translations/menu";

export default function Movies() {
  const { ref, inView } = useInView();
  const [genreStates, setGenreStates] = useState<GenreState[]>(movieGenreList);
  const [yearStates, setYearStates] = useState<YearState[]>(yearList);
  const [ottStates, setOttStates] = useState<OttState[]>(ottList);
  const { language } = useLanguageStore();
  const t = menuTranslations[language];

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
        year.id === id
          ? { ...year, selected: !year.selected }
          : { ...year, selected: false }
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

  const selectedGenres = genreStates.filter((g) => g.selected).map((g) => g.id);
  const selectedYear = yearStates.find((y) => y.selected);
  const selectedOttPlatforms = ottStates
    .filter((o) => o.selected)
    .map((o) => o.id);
  const isTagsSelected =
    selectedGenres.length > 0 ||
    selectedYear ||
    selectedOttPlatforms.length > 0;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<
      Content[],
      Error,
      InfiniteData<Content[]>,
      [string, number[]?, YearState?, number[]?],
      number
    >({
      queryKey: ["movies", selectedGenres, selectedYear, selectedOttPlatforms],
      initialPageParam: 1,
      queryFn: async ({ pageParam = 1 }) => {
        const response = await commonAPI.getDiscover(
          "movie",
          selectedGenres,
          selectedYear?.gte || null,
          selectedYear?.lte || null,
          selectedOttPlatforms,
          t.languageParams,
          t.country,
          pageParam
        );
        return response.map((content) => ({
          ...content,
          media_type: "movie",
        }));
      },
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length > 0 ? allPages.length + 1 : undefined;
      },
    });

  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }

  return (
    <div className="h-full flex flex-col justify-start items-center mb-[100px] text-white bg-black">
      <MainThumbnail />
      <div className="w-full flex flex-col gap-[30px] mb-[60px]">
        <SeriesTags tags={genreStates} selectTag={selectGenre}>
          {t.genres}
        </SeriesTags>
        <YearTags tags={yearStates} selectTag={selectYearRange}>
          {t.year}
        </YearTags>
        <OttTags selectedTag={ottStates} selectTag={selectOtt}>
          {t.streamingService}
        </OttTags>
      </div>
      {isTagsSelected ? (
        <div className="w-full md:px-10 px-[10px]">
          {isLoading ? (
            <GridSkeletonList />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {data?.pages?.map((page: Content[]) =>
                Array.isArray(page)
                  ? page.map((content: Content) => (
                      <GridContents key={content.id} content={content} />
                    ))
                  : null
              )}
            </div>
          )}
          <div ref={ref} className="w-full flex justify-center mt-4">
            {isFetchingNextPage && <p>Loading more...</p>}
          </div>
        </div>
      ) : (
        <DefaultMoviesView />
      )}
    </div>
  );
}
