import { useEffect, useState } from "react";
import { IMAGE_BASE_URL } from "../../api/axios";
import cancelIcon from "../../assets/icon/cancelIcon.svg";
import scrapIcon from "../../assets/icon/scrap_btn.svg";
import noScrapIcon from "../../assets/icon/noScrapIcon.svg";
import Tag from "./Tag";
import { useAuth } from "../../api/Auth";
import { useLocation, useNavigate } from "react-router-dom";
import {
  deleteClippedData,
  getClipsByUId,
  postClippedData,
} from "../../api/mypageInfo";
import { useLanguageStore } from "../../store/useLanguageStore";
import { menuTranslations } from "../../translations/menu";

export default function DetailEpisodeIntroBox({
  series,
  episode,
}: {
  series?: TvSeriesType;
  episode?: EpisodeType;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const contentType = "episode";
  const { language } = useLanguageStore();
  const translation = menuTranslations[language];
  const contentId = location.pathname.split("/")[2];
  const seasonId = location.pathname.split("/")[3];
  const episodeId = location.pathname.split("/")[4];
  const { user } = useAuth();
  const [ipId, _] = useState<string>(
    `${contentId?.toString()}/${seasonId.toString()}/${episodeId.toString()}`
  );
  const [clippedlist, setClippedList] = useState<SavedClips[] | null>([]);
  console.log(series);
  console.log(episode);

  // 컨텐츠 데이터 불러오기
  useEffect(() => {
    const fetchContent = async () => {
      if (user?.id)
        try {
          // 스크랩 데이터 불러오기
          const clippedData = await getClipsByUId(user?.id);
          setClippedList(clippedData);
        } catch {
          console.error(Error);
        }
    };
    fetchContent();
  }, [contentId, user]);

  // 첫 렌더링 시 화면 상단 위치
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 컨텐츠 스크랩하기
  const clipContent = async () => {
    if (!user) {
      alert("로그인해주세요");
      return;
    }

    if (
      user?.id &&
      episode?.still_path &&
      episode.name &&
      episode.overview &&
      contentType
    )
      try {
        // 스크랩 데이터 불러오기
        const clippedData = await getClipsByUId(user?.id);
        console.log("스크랩 데이터", clippedData);
        // 현재 콘텐츠가 스크랩되었는지 확인
        const isClipped = clippedData?.some(
          (clip) =>
            clip.ip_id ===
            `${contentId?.toString()}/${seasonId.toString()}/${episodeId.toString()}`
        );

        // 스크랩 된 상태이면 삭제
        if (isClipped) {
          const response = await deleteClippedData(ipId, user?.id, contentType);
          console.log("클립 제거 성공:", response);
          setClippedList(
            (prev) => prev?.filter((clip) => clip.ip_id !== ipId) || []
          );
        } else {
          const response = await postClippedData(
            ipId,
            episode?.still_path,
            user?.id,
            `${series?.name} ${episode.name}`,
            episode.overview,
            contentType
          );
          console.log("클립 성공:", response);
          setClippedList((prev) => [
            ...(prev || []),
            {
              ip_id: ipId,
              ip_name: `${series?.name} ${episode.name}`,
              ip_type: "episode",
              poster_path: episode.still_path,
            },
          ]);
        }
        // 상태 업데이트를 위해 최신 데이터를 다시 불러오기
        const updatedClippedData = await getClipsByUId(user.id);
        setClippedList(updatedClippedData);
        console.log("업데이트 된 스크랩 데이터", updatedClippedData);
      } catch (error) {
        console.error("클립 실패:", error);
      }
  };

  return (
    <>
      {!series && !episode ? (
        <div
          className="animate-pulse flex flex-col 
        tablet:flex-row mobile:flex-col-reverse 
        desktop:gap-[160px] tablet:gap-[50px] mobile:gap-[30px] 
        tablet:justify-between tablet:items-start
        mobile:justify-center mobile:items-center 
        tablet:pb-[146px] tablet:pt-[70px] 
        desktop:px-[136px] tablet:px-[31px] mobile:px-[10px]"
        >
          {/* 텍스트 영역 스켈레톤 */}
          <div className="flex flex-col gap-[35px] desktop:w-[540px] tablet:w-[500px] mobile:w-full">
            <div className="w-full h-[40px] bg-gray-700 rounded-md"></div>{" "}
            {/* 제목 */}
            <div className="flex gap-[10px]">
              <div className="w-[80px] h-[24px] bg-gray-600 rounded-md"></div>{" "}
              {/* 연도 */}
              <div className="w-[100px] h-[24px] bg-gray-600 rounded-md"></div>{" "}
              {/* 장르 */}
            </div>
            <div className="w-full h-[100px] bg-gray-600 rounded-md"></div>{" "}
            {/* 오버뷰 */}
          </div>

          {/* 포스터 스켈레톤 */}
          <div
            className="desktop:w-[324px] tablet:w-[220px] mobile:w-[220px] 
          desktop:h-[453.6px] tablet:h-[308px] mobile:h-[308px] 
          bg-gray-700 rounded-md"
          ></div>
        </div>
      ) : (
        <section
          className="relative h-auto flex flex-col bg-cover bg-center 
      desktop:pb-[133px] tablet:pb-[14px] mobile:pb-[42px]"
          style={{
            backgroundImage: `url(${IMAGE_BASE_URL}original${episode?.still_path})`,
          }}
        >
          {/* tablet 이상 */}
          {/* 블러 오버레이 */}
          <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-lg"></div>
          <div className="flex justify-end w-full z-10 desktop:mb-[57px] tablet:mb-[70px] mobile:mb-[30px]">
            <button className="tablet:w-[26px] mobile:w-[19px] h-auto tablet:mt-[50px] mobile:mt-[30px] desktop:mr-[50px] tablet:mr-[30px] mobile:mr-[10px]">
              <img
                src={cancelIcon}
                alt="닫기 버튼"
                onClick={() => {
                  navigate(-1);
                }}
              />
            </button>
          </div>
          {/* 콘텐츠 소개 영역 */}
          <section className="w-full h-auto flex flex-col gap-[35px] justify-between tablet:pb-[100px] tablet:pt-[50px] desktop:px-[136px] tablet:px-[31px] mobile:px-[10px]">
            <div
              className="w-full flex tablet:flex-row mobile:flex-col-reverse 
        justify-between relative z-10 text-left text-white"
            >
              <div className="w-full flex flex-col gap-[10px]">
                <div className="font-bold text-[40px] leading-auto">
                  {episode?.name}
                </div>
                <div className="flex gap-[10px] text-light">
                  <Tag>{episode?.air_date}</Tag>
                  {series?.genres.map((genre) => (
                    <Tag key={genre.id}>{genre.name}</Tag>
                  ))}
                  {episode?.season_number && (
                    <Tag>{`시즌 ${String(episode?.season_number)}`}</Tag>
                  )}
                </div>

                <div className="flex flex-col gap-[10px]">
                  <p className="text-white02 text-[16px] leading-[24px]">
                    {translation.streamingService}
                  </p>
                  <div className="flex gap-[10px]">
                    {series?.networks.map((network) => (
                      <div
                        key={network.id}
                        className="w-[48px] h-[48px] bg-contain bg-no-repeat bg-center"
                        style={{
                          backgroundImage: `url(${IMAGE_BASE_URL}original${network.logo_path})`,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 스틸컷 */}
              <div
                className="tablet:w-full tablet:max-w-[369px] tablet:h-[205px] 
            mobile:w-full mobile:h-[205px] rounded-[10px] z-10 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${IMAGE_BASE_URL}original${episode?.still_path})`,
                }}
              ></div>
            </div>

            <div className="flex flex-col items-start z-10 gap-[10px]">
              {/* 오버뷰 */}
              <div className="font-light text-[16px] leading-[24px] text-white03">
                {episode?.overview}
              </div>

              {/* 태그라인 */}

              <div className="font-light text-[16px] leading-[24px] text-white03">
                #{series?.tagline}
              </div>

              {/* 스크랩 버튼 */}

              <button
                className={`flex gap-[10px] w-auto h-auto px-[15px] py-[10px] 
              border ${
                clippedlist?.some(
                  (clip) =>
                    clip.ip_id === `${contentId}/${seasonId}/${episodeId}`
                )
                  ? "border-main"
                  : "border-white01"
              }  rounded-[8px]`}
                onClick={() => {
                  clipContent();
                }}
              >
                <img
                  src={
                    clippedlist?.some(
                      (clip) =>
                        clip.ip_id === `${contentId}/${seasonId}/${episodeId}`
                    )
                      ? scrapIcon
                      : noScrapIcon
                  }
                  alt="스크랩 버튼"
                />
                <span
                  className={`${
                    clippedlist?.some(
                      (clip) =>
                        clip.ip_id === `${contentId}/${seasonId}/${episodeId}`
                    )
                      ? "text-main"
                      : "text-white01"
                  }`}
                >
                  {translation.scrap}
                </span>
              </button>
            </div>
          </section>
        </section>
      )}
    </>
  );
}
