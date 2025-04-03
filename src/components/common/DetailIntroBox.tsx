import Tag from "./Tag";
import cancelIcon from "../../assets/icon/cancelIcon.svg";
import scrapIcon from "../../assets/icon/scrap_btn.svg";
import noScrapIcon from "../../assets/icon/noScrapIcon.svg";
import { IMAGE_BASE_URL } from "../../api/axios";
import { useEffect, useState } from "react";
import { movieAPI } from "../../api/movie";
import { tvAPI } from "../../api/tv";
import { useLocation } from "react-router-dom";
import {
  deleteClippedData,
  getClipsByUId,
  postClippedData,
} from "../../api/mypageInfo";
import { useAuth } from "../../api/Auth";
import { useLanguageStore } from "../../store/useLanguageStore";
import { menuTranslations } from "../../translations/menu";

export default function DetailIntroBox({
  contentId,
  type,
}: {
  contentId?: number;
  type?: string;
}) {
  const { language } = useLanguageStore();
  const t = menuTranslations[language];
  const [tvContent, setTvContent] = useState<TvSeriesType>();
  const [tvSeasonContent, setTvSeasonContent] = useState<TvSeasonsType>();
  const [movieContent, setMovieContent] = useState<MovieType>();
  const location = useLocation();
  const contentType =
    location.pathname.split("/")[1] === "detailmovie"
      ? "movie"
      : location.pathname.split("/")[1] === "detailseason"
        ? "season"
        : location.pathname.split("/")[1] === "detailseries"
          ? "series"
          : "episode";
  const seasonId = location.pathname.split("/")[3];
  const { user } = useAuth();
  const [ipId, setIpId] = useState<string>("");
  const [posterPath, setPosterPath] = useState<string>("");
  const [contentName, setContentName] = useState<string>("");
  const [overview, setOverview] = useState<string>("");
  const [clippedlist, setClippedList] = useState<SavedClips[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 컨텐츠 데이터 불러오기
  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        // 스크랩 데이터 불러오기
        if (user?.id) {
          const clippedData = await getClipsByUId(user?.id);
          setClippedList(clippedData);
        }

        if (type === "movie") {
          const movie = await movieAPI.getMovie(
            Number(contentId),
            t.languageParams
          );
          setMovieContent(movie);
          setIpId(movie.id);
          setPosterPath(movie.poster_path);
          setContentName(movie.title);
          setOverview(movie.overview);
        } else if (type === "tvSeries" || type === "tvSeason") {
          const tvSeries = await tvAPI.getSeries(
            Number(contentId),
            t.languageParams
          );
          setTvContent(tvSeries);
          setIpId(`${tvSeries.id}/${seasonId}`);
          setPosterPath(tvSeries.poster_path);
          setContentName(tvSeries.name);
          setOverview(tvSeries.overview);
        }

        if (type === "tvSeason") {
          const tvSeason = await tvAPI.getSeason(
            Number(contentId),
            Number(seasonId),
            t.languageParams
          );
          setTvSeasonContent(tvSeason);
        }
      } catch {
        console.error(Error);
      } finally {
        setIsLoading(false); // 로딩 완료
      }
    };
    fetchContent();
  }, [contentId, type, user]);

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
      posterPath !== undefined &&
      user?.id &&
      contentName &&
      overview !== undefined &&
      contentType
    )
      try {
        // 스크랩 데이터 불러오기
        const clippedData = await getClipsByUId(user?.id);
        console.log("스크랩 데이터", clippedData);
        // 현재 콘텐츠가 스크랩되었는지 확인
        const isClipped =
          contentType === "movie"
            ? clippedData?.some((clip) => clip.ip_id === contentId?.toString())
            : clippedData?.some(
                (clip) =>
                  clip.ip_id ===
                  `${contentId?.toString()}/${seasonId.toString()}`
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
            posterPath,
            user?.id,
            contentName,
            overview,
            contentType
          );
          console.log("클립 성공:", response);
          setClippedList((prev) => [
            ...(prev || []),
            {
              ip_id: ipId,
              ip_name: contentName,
              ip_type: contentType as "movie" | "season",
              poster_path: posterPath,
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
      {isLoading ? (
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
          className="relative h-auto flex flex-col 
          bg-cover bg-center desktop:pb-[133px] tablet:pb-[14px] mobile:pb-[42px]"
          style={{
            backgroundImage: `url(${IMAGE_BASE_URL}original${
              type === "tvSeries"
                ? tvContent?.poster_path
                : type === "tvSeason"
                  ? tvSeasonContent?.poster_path
                  : movieContent?.poster_path
            })`,
          }}
        >
          {/* 블러 오버레이 */}
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-lg"></div>
          <div
            className="flex justify-end w-full z-10 
          desktop:mb-[57px] tablet:mb-[70px] mobile:mb-[30px]"
          >
            <button
              className="tablet:w-[26px] mobile:w-[19px] h-auto 
          tablet:mt-[50px] mobile:mt-[30px] 
          desktop:mr-[50px] tablet:mr-[30px] mobile:mr-[10px]"
            >
              <img src={cancelIcon} alt="닫기 버튼" />
            </button>
          </div>

          {/* 콘텐츠 소개 영역 */}
          <section
            className="w-full h-auto flex 
              tablet:flex-row mobile:flex-col-reverse 
              desktop:gap-[160px] tablet:gap-[50px] mobile:gap-[30px] 
              tablet:justify-between tablet:items-start
              mobile:justify-center mobile:items-center 
              tablet:pb-[146px] tablet:pt-[70px] 
              desktop:px-[136px] tablet:px-[31px] mobile:px-[10px]"
          >
            <div
              className="flex flex-col justify-between items-start
            desktop:w-[540px] tablet:w-[500px] mobile:w-full
          gap-[35px] relative z-10 text-left text-white"
            >
              <div className="w-full flex flex-col gap-[10px]">
                {/* 컨텐츠 제목 */}
                <div className="w-full font-bold text-[40px] leading-auto">
                  {`${
                    type === "tvSeries" || type === "tvSeason"
                      ? tvContent?.name
                      : movieContent?.title
                  }${
                    type === "tvSeason"
                      ? ` ${
                          tvContent?.seasons.find(
                            (season) =>
                              season.season_number === Number(seasonId)
                          )?.name || ""
                        }`
                      : ""
                  }`}
                </div>

                {/* 컨텐츠 세부 정보 태그 */}
                <div className="w-full flex gap-[10px] text-light flex-wrap">
                  {/* 방영연도 */}
                  <Tag>
                    {type === "tvSeries"
                      ? `${tvContent?.first_air_date.slice(0, 4)}`
                      : type === "tvSeason"
                        ? `${tvSeasonContent?.air_date.slice(0, 4)}`
                        : `${movieContent?.release_date.slice(0, 4)}`}
                  </Tag>

                  {/* 장르 */}
                  {type === "tvSeries" || type === "tvSeason"
                    ? tvContent?.genres.map((genre) => (
                        <Tag key={genre.id}>{genre.name}</Tag>
                      ))
                    : movieContent?.genres.map((genre) => (
                        <Tag key={genre.id}>{genre.name}</Tag>
                      ))}

                  {/* 시즌 or 에피소드 갯수 */}
                  {type === "tvSeries" && (
                    <Tag>{`${t.season} ${tvContent?.seasons.length}${t.countUnit}`}</Tag>
                  )}
                  {type === "tvSeason" && (
                    <Tag>{`${t.episode} ${tvSeasonContent?.episodes.length}${t.countUnit}`}</Tag>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-[10px]">
                {/* 제작사 or 시청할 수 있는 서비스 */}
                <p className="text-white02 text-[16px] leading-[24px]">
                  {type === "movie" ? t.provider : t.streamingService}
                </p>

                {/* 시청할 수 있는 서비스 로고 */}
                <div className="flex gap-[10px]">
                  {type === "tvSeries" || type === "tvSeason"
                    ? tvContent?.networks.map((network) => (
                        <div
                          key={network.id}
                          className="w-[48px] h-[48px] bg-contain bg-no-repeat bg-center"
                          style={{
                            backgroundImage: `url(${IMAGE_BASE_URL}original${network.logo_path})`,
                          }}
                        ></div>
                      ))
                    : movieContent?.production_companies.map((company) => (
                        <div
                          key={company.id}
                          className="w-[48px] h-[48px] bg-contain bg-no-repeat bg-center"
                          style={{
                            backgroundImage: `url(${IMAGE_BASE_URL}original${company.logo_path})`,
                          }}
                        ></div>
                      ))}
                </div>
              </div>

              {/* 오버뷰 */}
              <div className="w-full font-light text-[16px] leading-[24px]">
                {type === "tvSeries"
                  ? tvContent?.overview
                  : type === "tvSeason"
                    ? tvSeasonContent?.overview
                    : movieContent?.overview}
              </div>

              {/* 태그라인 */}
              <div className="font-light text-[16px] leading-[24px]">
                {(() => {
                  const tagline =
                    type === "tvSeries" || type === "tvSeason"
                      ? tvContent?.tagline
                      : type === "movie"
                        ? movieContent?.tagline
                        : "";

                  return tagline ? `#${tagline}` : "";
                })()}
              </div>

              {/* 스크랩 버튼 */}
              {contentType !== "series" && (
                <button
                  className={`flex gap-[10px] w-auto h-auto px-[15px] py-[10px] 
                border ${
                  clippedlist?.some((clip) =>
                    contentType === "movie"
                      ? clip.ip_id === contentId?.toString()
                      : clip.ip_id === `${contentId}/${seasonId}`
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
                      clippedlist?.some((clip) =>
                        contentType === "movie"
                          ? clip.ip_id === contentId?.toString()
                          : clip.ip_id === `${contentId}/${seasonId}`
                      )
                        ? scrapIcon
                        : noScrapIcon
                    }
                    alt="스크랩 버튼"
                  />
                  <span
                    className={`${
                      clippedlist?.some((clip) =>
                        contentType === "movie"
                          ? clip.ip_id === contentId?.toString()
                          : clip.ip_id === `${contentId}/${seasonId}`
                      )
                        ? "text-main"
                        : "text-white01"
                    }`}
                  >
                    {t.scrap}
                  </span>
                </button>
              )}
            </div>

            {/* 포스터 이미지 */}
            <div
              className="desktop:w-[324px] tablet:w-[220px] mobile:w-[220px] 
            desktop:h-[453.6px] tablet:h-[308px] mobile:h-[308px] 
            z-10 bg-cover bg-center rounded-[8px]"
              style={{
                backgroundImage: `url(${IMAGE_BASE_URL}original${
                  type === "tvSeries"
                    ? tvContent?.poster_path
                    : type === "tvSeason"
                      ? tvSeasonContent?.poster_path
                      : movieContent?.poster_path
                })`,
              }}
            ></div>
          </section>
        </section>
      )}
    </>
  );
}
