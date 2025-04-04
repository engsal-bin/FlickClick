import { useEffect, useState } from "react";
import ArgorithmIP from "../components/common/ArgorithmIP";
import Arguments from "../components/common/Arguments";
import DetailIntroBox from "../components/common/DetailIntroBox";
import Episodes from "../components/common/Episodes";
import PersonList from "../components/common/PersonList";
import Reviews from "../components/common/Reviews";
import { tvAPI } from "../api/tv";
import { useLocation } from "react-router-dom";
import { useLanguageStore } from "../store/useLanguageStore";
import { menuTranslations } from "../translations/menu";

export default function DetailSeason() {
  const { language } = useLanguageStore();
  const translation = menuTranslations[language];

  const [activeTab, setActiveTab] = useState<number>(0);
  const location = useLocation();
  const locationInfo = location.pathname.split("/").slice(1, 4);
  const [_, setSeriesData] = useState<TvSeriesType>();
  const [seasonData, setSeasonData] = useState<TvSeasonsType>();
  const contentId = locationInfo.slice(1, 3).join("/");

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const series = await tvAPI.getSeries(
          Number(`${locationInfo[1]}`),
          translation.languageParams
        );
        const season = await tvAPI.getSeason(
          Number(`${locationInfo[1]}`),
          Number(`${locationInfo[2]}`),
          translation.languageParams
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

  // 첫 렌더링 시 화면 상단 위치
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <DetailIntroBox contentId={Number(locationInfo[1])} type="tvSeason" />
      <section
        className=" flex flex-col jutify-evenly w-full 
      tablet:gap-[50px] mobile:gap-[30px] 
      desktop:px-[128px] tablet:px-[40px] mobile:px-[10px]
      tablet:py-[50px] mobile:py-[30px] mb-[100px]"
      >
        {/* 영상 스와이퍼(아직 컴포넌트 완성 X) */}

        {/* 출연진 */}
        <PersonList
          seriesId={Number(locationInfo[1])}
          seasonNum={Number(locationInfo[2])}
          label={translation.cast}
          type="tv"
        />
        {/* 제작진 */}
        <PersonList
          seriesId={Number(locationInfo[1])}
          seasonNum={Number(locationInfo[2])}
          label={translation.crew}
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

        {/* 추천 */}
        <ArgorithmIP
          seriesId={Number(locationInfo[1])}
          type="tv"
          label={translation.recommendation}
        />

        {/* 유사작품 */}
        <ArgorithmIP
          seriesId={Number(locationInfo[1])}
          type="tv"
          label={translation.similarity}
        />
      </section>
    </>
  );
}
