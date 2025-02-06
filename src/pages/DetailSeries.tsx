import DetailIntroBox from "../components/common/DetailIntroBox";
import SeasonBox from "../components/common/SeasonBox";
import { tvAPI } from "../api/tv";
// import SeriesThumbnail from "../components/common/SeriesThumbnail";

export default function DetailSeries() {
  const fetchSeries = async () => {
    try {
      const series = await tvAPI.getSeries(96102);
      console.log(series);
    } catch (error) {
      console.error(error);
    }
  };
  fetchSeries();
  return (
    <div>
      <DetailIntroBox />
      <SeasonBox />
      {/* 추천 */}
      {/* 유사한 작품 */}
    </div>
  );
}
