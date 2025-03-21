import { useEffect, useState } from "react";
import { commonAPI } from "../../api/common";
import { tvAPI } from "../../api/tv";
import Contents from "../common/MediaList";

export default function DefaultSeriesView() {
  const [trendingData, settrendingData] = useState<TvShow[]>([]);
  const [newUpdateData, setNewUpateImgSrc] = useState<TvShow[]>([]);

  useEffect(() => {
    // 인기 급상승
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
            (item: TrendingAllResultsType) => item.media_type === "tv",
          ),
          ...trendPage2.results.filter(
            (item: TrendingAllResultsType) => item.media_type === "tv",
          ),
          ...trendPage3.results.filter(
            (item: TrendingAllResultsType) => item.media_type === "tv",
          ),
          ...trendPage4.results.filter(
            (item: TrendingAllResultsType) => item.media_type === "tv",
          ),
        ].slice(0, 20);
        settrendingData(trendResponse);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };

    //   // 신규 업데이트
    const fetchNewUpdate = async () => {
      try {
        const newUpdataResponse = await tvAPI.getOnTheAirTvSeriese();
        console.log(newUpdataResponse);
        setNewUpateImgSrc(newUpdataResponse.results);
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
        시리즈 인기 급상승
      </Contents>
      <Contents to="/newupdate" showMore={false} data={newUpdateData}>
        시리즈 신규 업데이트
      </Contents>
    </div>
  );
}
