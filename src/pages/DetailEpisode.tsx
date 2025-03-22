import { useEffect, useState } from "react";
import ArgorithmIP from "../components/common/ArgorithmIP";
import Arguments from "../components/common/Arguments";
import DetailEpisodeIntroBox from "../components/common/DetailEpisodeIntroBox";
import Episodes from "../components/common/Episodes";
import PersonList from "../components/common/PersonList";
import Reviews from "../components/common/Reviews";
import { tvAPI } from "../api/tv";
import { useLocation } from "react-router-dom";

export default function DetailSeriesNoSeson() {
  const [activeTab, setActiveTab] = useState<number>(0);
  // 시리즈 데이터 상태
  const [seriesData, setSeriesData] = useState<TvSeriesType>();
  // 에피소드 상태
  const [episodeData, setEpisodeData] = useState<EpisodeType>();
  // 경로 정보 불러오기
  const location = useLocation();
  // 시리즈 id, 시즌 id 저장
  const locationInfo = location.pathname.split("/").slice(1, 5);

  const contentId = locationInfo.slice(1).join("/");
  console.log("contentId =", contentId);
  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const series = await tvAPI.getSeries(Number(`${locationInfo[1]}`));
        const episode = await tvAPI.getEpisode(
          Number(`${locationInfo[1]}`),
          Number(`${locationInfo[2]}`),
          Number(`${locationInfo[3]}`)
        );
        // console.log(season);
        setSeriesData(series);
        setEpisodeData(episode);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEpisode();
  }, []);
  const tabs = [
    { label: "리뷰" },
    {
      label: "토론",
    },
  ];

  return (
    <>
      <DetailEpisodeIntroBox series={seriesData} episode={episodeData} />
      <section className="flex flex-col jutify-evenly w-full tablet:gap-[50px] mobile:gap-[30px] desktop:px-[128px] tablet:px-[40px] mobile:px-[10px] mt-[30px]">
        {/* 영상 스와이퍼(아직 컴포넌트 완성 X) */}
        {/* 출연진 */}
        <PersonList
          seriesId={Number(locationInfo[1])}
          seasonNum={Number(locationInfo[2])}
          label="출연진"
          type="cast"
        />
        {/* 제작진 */}
        <PersonList
          seriesId={Number(locationInfo[1])}
          seasonNum={Number(locationInfo[2])}
          label="제작진"
          type="crew"
        />

        {/* 리뷰토론 */}
        <section className="flex flex-col">
          {/* 탭 */}
          <div className="flex border-b mb-[30px]">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`tablet:text-[24px] mobile:text-[16px] tablet:w-[120px] mobile:w-[100px] tablet:h-[60px] mobile:h-[50px] px-auto py-auto text-gray02 ${
                  activeTab === index
                    ? "border-b-2 border-main text-main text-semibold"
                    : ""
                }`}
                onClick={() => setActiveTab(index)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 리뷰창 */}
          {activeTab === 0 && (
            <Reviews movieOrSeasonOrEpisode={"episode"} contentId={contentId} />
          )}
          {activeTab === 1 && (
            <Arguments
              contentId={contentId}
              movieOrSeasonOrEpisode={"episode"}
            />
          )}
        </section>
        <ArgorithmIP
          seriesId={Number(locationInfo[1])}
          type="recommendations"
          label="추천"
        />
        <ArgorithmIP
          seriesId={Number(locationInfo[1])}
          type="similar"
          label="유사한 작품"
        />
      </section>
    </>
  );
}
