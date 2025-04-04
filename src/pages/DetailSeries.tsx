import DetailIntroBox from "../components/common/DetailIntroBox";
import SeasonBox from "../components/common/SeasonBox";
import { tvAPI } from "../api/tv";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLanguageStore } from "../store/useLanguageStore";
import { menuTranslations } from "../translations/menu";

export default function DetailSeries() {
  const [contentData, setContentData] = useState<TvSeriesType>();
  const location = useLocation();
  // 시리즈 id, 시즌 id 저장
  const locationInfo = location.pathname.split("/").slice(1, 4);
  const { language } = useLanguageStore();
  const translation = menuTranslations[language];

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const series = await tvAPI.getSeries(
          Number(locationInfo[1]),
          translation.languageParams
        );
        setContentData(series);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSeries();
  }, []);

  // 첫 렌더링 시 화면 상단 위치
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="mb-[100px]">
      <DetailIntroBox contentId={Number(locationInfo[1])} type="tvSeries" />
      {contentData?.seasons.map((season) => (
        <SeasonBox
          key={season.id}
          title={contentData?.name}
          seriesId={contentData.id}
          season={season}
        />
      ))}
    </div>
  );
}
