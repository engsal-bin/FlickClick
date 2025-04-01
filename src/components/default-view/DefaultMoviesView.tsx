import { useState, useEffect } from "react";
import { commonAPI } from "../../api/common";
import { movieAPI } from "../../api/movie";
import Contents from "../common/MediaList";
import { Content } from "../../type/seriesType";
import { useLanguageStore } from "../../store/useLanguageStore";
import { menuTranslations } from "../../translations/menu";

export default function DefaultMoviesView() {
  const [trendingData, setTrendingData] = useState<Content[]>([]);
  const [newUpdateData, setNewUpdateData] = useState<Content[]>([]);
  const { language } = useLanguageStore();
  const t = menuTranslations[language];

  useEffect(() => {
    const fetchTrendAll = async () => {
      try {
        const trendPage1 = await commonAPI.getTrendingAll(1);
        const trendPage2 = await commonAPI.getTrendingAll(2);
        const trendPage3 = await commonAPI.getTrendingAll(3);
        const trendPage4 = await commonAPI.getTrendingAll(4);
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
    <div>
      <Contents to="/popular" showMore={false} data={trendingData}>
        {t.movieTrending}
      </Contents>
      <Contents to="/newupdate" showMore={false} data={newUpdateData}>
        {t.movieNewUpdate}
      </Contents>
    </div>
  );
}
