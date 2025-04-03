import { useState, useEffect } from "react";
import { commonAPI } from "../../api/common";
import { tvAPI } from "../../api/tv";
import MediaList from "../common/MediaList";
import { useLanguageStore } from "../../store/useLanguageStore";
import { menuTranslations } from "../../translations/menu";

export default function DefaultSeriesView() {
  const [trendingData, setTrendingData] = useState<Content[]>([]);
  const [newUpdateData, setNewUpdateData] = useState<Content[]>([]);
  const { language } = useLanguageStore();
  const translation = menuTranslations[language];

  useEffect(() => {
    const fetchTrendAll = async () => {
      try {
        const trendPage1 = await commonAPI.getTrendingAll(
          1,
          "day",
          translation.languageParams
        );
        const trendPage2 = await commonAPI.getTrendingAll(
          2,
          "day",
          translation.languageParams
        );
        const trendPage3 = await commonAPI.getTrendingAll(
          3,
          "day",
          translation.languageParams
        );
        const trendPage4 = await commonAPI.getTrendingAll(
          4,
          "day",
          translation.languageParams
        );
        const trendResponse = [
          ...trendPage1.results.filter(
            (item: Content) => item.media_type === "tv"
          ),
          ...trendPage2.results.filter(
            (item: Content) => item.media_type === "tv"
          ),
          ...trendPage3.results.filter(
            (item: Content) => item.media_type === "tv"
          ),
          ...trendPage4.results.filter(
            (item: Content) => item.media_type === "tv"
          ),
        ].slice(0, 20);
        setTrendingData(trendResponse);
      } catch (error) {
        console.error("Error fetching trending series:", error);
      }
    };

    const fetchNewUpdate = async () => {
      try {
        const newUpdataResponse = await tvAPI.getOnTheAirTvSeriese();
        const newUpdateWithType = newUpdataResponse.results.map(
          (item: Content) => ({
            ...item,
            media_type: "tv",
          })
        );
        setNewUpdateData(newUpdateWithType);
      } catch (error) {
        console.error("Error fetching new updates:", error);
      }
    };

    fetchTrendAll();
    fetchNewUpdate();
  }, []);

  return (
    <div className="flex flex-col gap-[30px]">
      <MediaList to="/popular" showMore={false} data={trendingData}>
        {translation.seriesTrending}
      </MediaList>
      <MediaList to="/newupdate" showMore={false} data={newUpdateData}>
        {translation.seriesNewUpdate}
      </MediaList>
    </div>
  );
}
