import { IMAGE_BASE_URL } from "../../api/axios";
import cancelIcon from "../../assets/icon/cancelIcon.svg";
import scrapIcon from "../../assets/icon/scrap_btn.svg";
import placeholderImg03 from "../../assets/placeholderImg03.svg";
import Tag from "./Tag";

export default function DetailEpisodeIntroBox({
  series,
  episode,
}: {
  series?: TvSeriesType;
  episode?: EpisodeType;
}) {
  // console.log(series);
  return (
    <>
      {/* tablet 이상 */}
      <section
        className="relative h-auto flex flex-col bg-cover bg-center 
        desktop:pb-[133px] tablet:pb-[14px] mobile:pb-[42px]"
        style={{
          backgroundImage: `url(${IMAGE_BASE_URL}original${episode?.still_path})`,
        }}
      >
        {/* 블러 오버레이 */}
        <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-lg"></div>
        <div className="flex justify-end w-full z-10 desktop:mb-[57px] tablet:mb-[70px] mobile:mb-[30px]">
          <button className="tablet:w-[26px] mobile:w-[19px] h-auto tablet:mt-[50px] mobile:mt-[30px] desktop:mr-[50px] tablet:mr-[30px] mobile:mr-[10px]">
            <img src={cancelIcon} alt="닫기 버튼" />
          </button>
        </div>
        {/* 콘텐츠 소개 영역 */}
        <section className="w-full h-auto flex flex-col gap-[35px] justify-between tablet:pb-[100px] tablet:pt-[50px] desktop:px-[136px] tablet:px-[31px] mobile:px-[10px]">
          <div
            className="w-full flex tablet:flex-row mobile:flex-col-reverse 
          justify-between relative z-10 text-left text-white"
          >
            <div className="w-full flex flex-col gap-[10px]">
              {/* 제목 */}
              <div className="font-bold text-[40px] leading-auto">
                {episode?.name}
              </div>
              <div className="flex gap-[10px] text-light">
                {/* 에피소드 방영일 */}
                <Tag>{episode?.air_date}</Tag>

                {/* 장르 */}
                {series?.genres.map((genre) => (
                  <Tag key={genre.id}>{genre.name}</Tag>
                ))}

                {/* 시즌 */}
                {episode?.season_number && (
                  <Tag>{`시즌 ${String(episode?.season_number)}`}</Tag>
                )}
              </div>

              <div className="flex flex-col gap-[10px]">
                <p className="text-white02 text-[16px] leading-[24px]">
                  시청할 수 있는 서비스
                </p>

                {/* 시청할 수 있는 서비스 로고 */}
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
            <button className="flex gap-[10px] w-auto h-auto px-[15px] py-[10px] border border-main rounded-[8px] mt-[35px]">
              <img src={scrapIcon} alt="스크랩 버튼" />
              <span className="text-main">스크랩</span>
            </button>
          </div>
        </section>
      </section>
    </>
  );
}
