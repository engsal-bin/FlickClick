import { useState, useEffect } from "react";
import { commonAPI } from "../../api/common";
import { movieAPI } from "../../api/movie";
import MediaList from "../common/MediaList";
import { useLanguageStore } from "../../store/useLanguageStore";
import { menuTranslations } from "../../translations/menu";

export default function DefaultMoviesView() {
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
            (item: Content) => item.media_type === "movie"
          ),
          ...trendPage2.results.filter(
            (item: Content) => item.media_type === "movie"
          ),
          ...trendPage3.results.filter(
            (item: Content) => item.media_type === "movie"
          ),
          ...trendPage4.results.filter(
            (item: Content) => item.media_type === "movie"
          ),
        ].slice(0, 20);
        setTrendingData(trendResponse);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    const fetchNewUpdate = async () => {
      try {
        const newUpdataResponse = await movieAPI.getNowPlayingMovie();
        const newUpdateWithType = newUpdataResponse.results.map(
          (item: Content) => ({
            ...item,
            media_type: "movie",
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
    <div className="w-full flex flex-col gap-[30px]">
      <MediaList to="/popular" showMore={true} data={trendingData}>
        {translation.movieTrending}
      </MediaList>
      <MediaList to="/newupdate" showMore={true} data={newUpdateData}>
        {translation.movieNewUpdate}
      </MediaList>
    </div>
  );
}
