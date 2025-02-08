import DetailIntroBox from "../components/common/DetailIntroBox";
import SeasonBox from "../components/common/SeasonBox";
import { tvAPI } from "../api/tv";
import { useEffect, useState } from "react";

export default function DetailSeries() {
  const [contentData, setContentData] = useState<TvSeriesType>();

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const series = await tvAPI.getSeries(96102);
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
        <SeasonBox key={season.id} title={contentData?.name} season={season} />
      ))}
      <hr className="h-[1px] border-gray02" />

      {/* 추천 */}
      {/* 유사한 작품 */}
    </div>
  );
}
