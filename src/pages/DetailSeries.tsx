import DetailIntroBox from "../components/common/DetailIntroBox";
import SeasonBox from "../components/common/SeasonBox";
import { tvAPI } from "../api/tv";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function DetailSeries() {
  const [contentData, setContentData] = useState<TvSeriesType>();
  const location = useLocation();
  // 시리즈 id, 시즌 id 저장
  const locationInfo = location.pathname.split("/").slice(1, 4);
  // console.log(locationInfo);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const series = await tvAPI.getSeries(Number(locationInfo[1]));
        console.log(series);
        setContentData(series);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSeries();
  }, []);

  return (
    <div>
      <DetailIntroBox data={contentData} />
      {contentData?.seasons.map((season) => (
        <SeasonBox
          key={season.id}
          title={contentData?.name}
          seriesId={contentData.id}
          season={season}
        />
      ))}
      <hr className="h-[1px] border-gray02" />

      {/* 추천 */}
      {/* 유사한 작품 */}
    </div>
  );
}
