import { useEffect, useState } from "react";
import ArgorithmIP from "../components/common/ArgorithmIP";
import Arguments from "../components/common/Arguments";
import DetailIntroBox from "../components/common/DetailIntroBox";
import PersonList from "../components/common/PersonList";
import Reviews from "../components/common/Reviews";
import { useLocation } from "react-router-dom";
import { useLanguageStore } from "../store/useLanguageStore";
import { menuTranslations } from "../translations/menu";

export default function DetailMovie() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const location = useLocation();
  const contentId = location.pathname.split("/")[2];
  const { language } = useLanguageStore();
  const transition = menuTranslations[language];
  const tabs = [
    { label: transition.review },
    {
      label: transition.discuss,
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <DetailIntroBox contentId={Number(contentId)} type="movie" />
      <section className="flex flex-col jutify-evenly w-full tablet:gap-[50px] mobile:gap-[30px] desktop:px-[128px] tablet:px-[40px] mobile:px-[10px] tablet:mt-[50px] mobile:mt-[30px] mb-[100px]">
        {/* 영상 스와이퍼(아직 컴포넌트 완성 X) */}

        {/* 출연진 */}
        <PersonList
          seriesId={Number(contentId)}
          label={transition.cast}
          type="movie"
        />
        {/* 제작진 */}
        <PersonList
          seriesId={Number(contentId)}
          label={transition.crew}
          type="movie"
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
            <Reviews movieOrSeasonOrEpisode={"movie"} contentId={contentId} />
          )}
          {activeTab === 1 && (
            <Arguments movieOrSeasonOrEpisode={"movie"} contentId={contentId} />
          )}
        </section>

        {/* 추천 */}
        <ArgorithmIP
          seriesId={Number(contentId)}
          type="movie"
          label={transition.recommendation}
        />

        {/* 유사작품 */}
        <ArgorithmIP
          seriesId={Number(contentId)}
          type="movie"
          label={transition.similarity}
        />
      </section>
    </>
  );
}
