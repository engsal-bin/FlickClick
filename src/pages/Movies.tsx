import MainThumbnail from "../components/common/MainThumbnail";
import OttTags from "../components/common/OttTags";
import SeriesTags from "../components/common/SeriesTags";
import YearTags from "../components/common/YearTags";
import { useEffect, useState } from "react";
import DefaultSeriesView from "../components/series/DefaultSeriesView";
import GridContents from "../components/common/GridContents";
import { ottList, tvGenreList, yearList } from "../constants/tags";
import { commonAPI } from "../api/common";

export default function Series() {
  // 태그가 하나라도 선택됐는지 여부
  const [isTagsSelected, setIsTagsSelected] = useState<boolean>(false);
  // 필터링된 시리즈
  const [filteredSeries, setFilteredSeries] = useState<TvShow[]>([]);

  // 장르 - 중복 선택
  const [genreStates, setGenreStates] = useState<GenreState[]>(tvGenreList);
  const selectGenre = (id: number) => {
    setGenreStates((prev) =>
      prev.map((genre) =>
        genre.id === id ? { ...genre, selected: !genre.selected } : genre
      )
    );
  };

  // 년도 - 단일 선택
  const [yearStates, setYearStates] = useState<YearState[]>(yearList);
  const selectYearRange = (id: number) => {
    setYearStates((prev) => {
      return prev.map((year) =>
        year.id === id ? { ...year, selected: true } : { ...year, selected: false }
      );
    });
  };

  // OTT - 중복 선택
  const [ottStates, setOttStates] = useState<OttState[]>(ottList);
  const selectOtt = (key: string) => {
    setOttStates((prev) =>
      prev.map((service) =>
        service.key === key ? { ...service, selected: !service.selected } : service
      )
    );
  };

  useEffect(() => {
    // 선택된 장르, 년도, OTT 필터링 옵션 생성
    const selectedGenres = genreStates.filter((genre) => genre.selected).map((genre) => genre.id);
    const selectedYears = yearStates.filter((year) => year.selected);
    const selectedOttPlatforms = ottStates.filter((ott) => ott.selected).map((ott) => ott.key);

    const filteredOptions: FilterOptions = {
      genre: selectedGenres,
      firstAirDate: {
        gte: selectedYears[0]?.gte || null,
        lte: selectedYears[0]?.lte || null,
      },
      ottPlatform: selectedOttPlatforms,
      language: 'en-US',
      region: 'US',
    };

    // 필터 옵션이 하나라도 선택되었는지 확인
    setIsTagsSelected(
      filteredOptions.genre.length > 0 ||
      filteredOptions.firstAirDate.gte !== null ||
      filteredOptions.ottPlatform.length > 0
    );

    // 필터 옵션이 변경될 때마다 API 호출
    const fetchFilteredSeries = async () => {
      const response = await commonAPI.getDiscover("movie",filteredOptions);
      setFilteredSeries(response);
    };

    if (isTagsSelected) {
      fetchFilteredSeries();
    }
  }, [genreStates, yearStates, ottStates, isTagsSelected]);

  return (
    <div className="flex flex-col justify-between items-center mb-[100px] desktop:gap-[50px] tablet:gap-[40px] mobile:gap-[30px] text-white bg-black">
      <MainThumbnail />
      <SeriesTags tags={genreStates} selectTag={selectGenre}>장르</SeriesTags>
      <YearTags tags={yearStates} selectTag={selectYearRange}>방영 연도</YearTags>
      <OttTags selectedTag={ottStates} selectTag={selectOtt}>시청할 수 있는 서비스</OttTags>
      {isTagsSelected ? <GridContents series={filteredSeries} /> : <DefaultSeriesView />}
    </div>
  );
}
