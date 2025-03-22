import { useEffect, useState } from "react";
import ArgorithmIP from "../components/common/ArgorithmIP";
import Arguments from "../components/common/Arguments";
import DetailIntroBox from "../components/common/DetailIntroBox";
import Episodes from "../components/common/Episodes";
import PersonList from "../components/common/PersonList";
import Reviews from "../components/common/Reviews";
import { tvAPI } from "../api/tv";
import { useLocation } from "react-router-dom";

export default function DetailSeason() {
  const [activeTab, setActiveTab] = useState<number>(0);
  // 경로 정보 불러오기
  const location = useLocation();
  // 시리즈 id, 시즌 id 저장
  const locationInfo = location.pathname.split("/").slice(1, 4);
  // 시리즈 데이터 상태
  const [seriesData, setSeriesData] = useState<TvSeriesType>();
  // 시즌 데이터 상태
  const [seasonData, setSeasonData] = useState<TvSeasonsType>();

  const contentId = locationInfo.slice(1, 3).join("/");

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const series = await tvAPI.getSeries(Number(`${locationInfo[1]}`));
        const season = await tvAPI.getSeason(
          Number(`${locationInfo[1]}`),
          Number(`${locationInfo[2]}`)
        );
        setSeriesData(series);
        setSeasonData(season);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSeries();
  }, []);

  const tabs = [
    { label: "리뷰" },
    {
      label: "토론",
    },
  ];

  return (
    <>
      <DetailIntroBox contentId={Number(locationInfo[1])} type="tvSeason" />
      <section
        className="border border-white flex flex-col jutify-evenly w-full 
      tablet:gap-[50px] mobile:gap-[30px] 
      desktop:px-[128px] tablet:px-[40px] mobile:px-[10px]
      tablet:py-[50px] mobile:py-[30px]"
      >
        {/* 영상 스와이퍼(아직 컴포넌트 완성 X) */}

        {/* 출연진 */}
        <PersonList
          seriesId={Number(locationInfo[1])}
          seasonNum={Number(locationInfo[2])}
          label="출연진"
          type="tv"
        />
        {/* 제작진 */}
        <PersonList
          seriesId={Number(locationInfo[1])}
          seasonNum={Number(locationInfo[2])}
          label="제작진"
          type="tv"
        />
        {/* 에피소드 리스트 */}
        <Episodes
          seriesId={Number(locationInfo[1])}
          seasonNum={Number(locationInfo[2])}
          data={seasonData?.episodes}
        />

        {/* 리뷰토론 */}
        <section className="flex flex-col">
          {/* 텝 */}
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
            <Reviews movieOrSeasonOrEpisode={"season"} contentId={contentId} />
          )}
          {activeTab === 1 && (
            <Arguments
              contentId={contentId}
              movieOrSeasonOrEpisode={"season"}
            />
          )}
        </section>
        {/* <ArgorithmIP label="추천" />
        <ArgorithmIP label="유사한 작품" /> */}
      </section>
    </>
  );
}
