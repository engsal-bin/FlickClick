import { useEffect, useState } from "react";
import { commonAPI } from "../../api/common";
import Contents from "../common/MediaList";
import { Content } from "../../type/seriesType";
import { movieAPI } from "../../api/movie";

export default function DefaultMoviesView() {
  const [trendingData, settrendingData] = useState<Content[]>([]);
  const [newUpdateData, setNewUpateImgSrc] = useState<Content[]>([]);

  useEffect(() => {
    const fetchTrendAll = async () => {
      try {
        const trendPage1 = await commonAPI.getTrendingAll(1);
        console.log(trendPage1);
        const trendPage2 = await commonAPI.getTrendingAll(2);
        console.log(trendPage2);
        const trendPage3 = await commonAPI.getTrendingAll(3);
        console.log(trendPage3);
        const trendPage4 = await commonAPI.getTrendingAll(3);
        const trendResponse = [
          ...trendPage1.results.filter(
            (item: TrendingAllResultsType) => item.media_type === "movie"
          ),
          ...trendPage2.results.filter(
            (item: TrendingAllResultsType) => item.media_type === "movie"
          ),
          ...trendPage3.results.filter(
            (item: TrendingAllResultsType) => item.media_type === "movie"
          ),
          ...trendPage4.results.filter(
            (item: TrendingAllResultsType) => item.media_type === "movie"
          ),
        ].slice(0, 20);
        settrendingData(trendResponse);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };

    const fetchNewUpdate = async () => {
      try {
        const newUpdataResponse = await movieAPI.getNowPlayingMovie();
        console.log(newUpdataResponse);
        const newUpdateWithType = newUpdataResponse.results.map(
          (item: Content) => ({
            ...item,
            media_type: "movie",
          })
        );
        setNewUpateImgSrc(newUpdateWithType);
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
        영화 인기 급상승
      </Contents>
      <Contents to="/newupdate" showMore={false} data={newUpdateData}>
        영화 신규 업데이트
      </Contents>
    </div>
  );
}
