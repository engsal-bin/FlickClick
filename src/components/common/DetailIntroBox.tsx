import Tag from "./Tag";
import cancelIcon from "../../assets/icon/cancelIcon.svg";
import scrapIcon from "../../assets/icon/scrap_btn.svg";
import { IMAGE_BASE_URL } from "../../api/axios";
import { useEffect, useState } from "react";
import { movieAPI } from "../../api/movie";
import { tvAPI } from "../../api/tv";

export default function DetailIntroBox({
  contentId,
  type,
}: {
  contentId?: number;
  type?: string;
}) {
  // console.log(data?.poster_path);
  console.log(contentId);
  const [tvContent, setTvContent] = useState<TvSeriesType>();
  const [movieContent, setMovieContent] = useState<MovieType>();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        if (type === "movie") {
          const movie = await movieAPI.getMovie(Number(contentId));
          setMovieContent(movie);
        } else if (type === "tvSeries") {
          const tvSeries = await tvAPI.getSeries(Number(contentId));
          setTvContent(tvSeries);
          console.log(tvSeries);
        }
      } catch {
        console.error(Error);
      }
    };
    fetchContent();
  }, [contentId, type]);

  return (
    <>
      <section
        className="relative h-auto flex flex-col 
        bg-cover bg-center desktop:pb-[133px] tablet:pb-[14px] mobile:pb-[42px]"
        style={{
          backgroundImage: `url(${IMAGE_BASE_URL}original${
            type === "tvSeries"
              ? tvContent?.poster_path
              : movieContent?.poster_path
          })`,
        }}
      >
        {/* 블러 오버레이 */}
        <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-lg"></div>
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
            desktop:w-[540px] tablet:w-[436px] mobile:w-full
          gap-[35px] relative z-10 text-left text-white"
          >
            <div className="w-full flex flex-col gap-[10px]">
              {/* 컨텐츠 제목 */}
              <div className="w-full font-bold text-[40px] leading-auto">
                {type === "tvSeries" ? tvContent?.name : movieContent?.title}
              </div>

              {/* 컨텐츠 세부 정보 태그 */}
              <div className="w-full flex gap-[10px] text-light">
                {/* 방영연도 */}
                <Tag>
                  {type === "tvSeries"
                    ? `${tvContent?.first_air_date.slice(0, 4)}`
                    : `${movieContent?.release_date.slice(0, 4)}`}
                </Tag>

                {/* 장르 */}
                {type === "tvSeries"
                  ? tvContent?.genres.map((genre) => (
                      <Tag key={genre.id}>{genre.name}</Tag>
                    ))
                  : movieContent?.genres.map((genre) => (
                      <Tag key={genre.id}>{genre.name}</Tag>
                    ))}

                {/* 시즌 or 에피소드 갯수 */}
                {type === "tvSeries" ? (
                  tvContent?.number_of_episodes ? (
                    <Tag>{`에피소드 ${tvContent.number_of_episodes}개`}</Tag>
                  ) : tvContent?.number_of_seasons ? (
                    <Tag>{`시즌 ${tvContent.number_of_seasons}개`}</Tag>
                  ) : null
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <p className="text-white02 text-[16px] leading-[24px]">
                시청할 수 있는 서비스
              </p>
              {/* 시청할 수 있는 서비스 로고 */}
              <div className="flex gap-[10px]">
                {type === "tvSeries"
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
                : movieContent?.overview}
            </div>

            {/* 태그라인 */}
            <div className="font-light text-[16px] leading-[24px]">
              #
              {type === "tvSeries" ? tvContent?.tagline : movieContent?.tagline}
            </div>
            <button className="flex gap-[10px] w-auto h-auto px-[15px] py-[10px] border border-main rounded-[8px]">
              <img src={scrapIcon} alt="스크랩 버튼" />
              <span className="text-main">스크랩</span>
            </button>
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
                  : movieContent?.poster_path
              })`,
            }}
          ></div>
        </section>
      </section>
    </>
  );
}
