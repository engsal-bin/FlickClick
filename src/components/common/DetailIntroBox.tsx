import Tag from "./Tag";
import cancelIcon from "../../assets/icon/cancelIcon.svg";
import placeholderImg02 from "../../assets/placeholderImg02.svg";
import scrapIcon from "../../assets/icon/scrap_btn.svg";
import { IMAGE_BASE_URL } from "../../api/axios";

export default function DetailIntroBox({ data }: { data?: TvSeriesType }) {
  return (
    <>
      {/* tablet 이상 */}
      <section
        className="relative h-auto flex flex-col bg-cover bg-center desktop:pb-[133px] tablet:pb-[14px] mobile:pb-[42px]"
        style={{ backgroundImage: `url(${placeholderImg02})` }}
      >
        {/* 블러 오버레이 */}
        <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-lg"></div>
        <div className="flex justify-end w-full z-10 desktop:mb-[57px] tablet:mb-[70px] mobile:mb-[30px]">
          <button className="tablet:w-[26px] mobile:w-[19px] h-auto tablet:mt-[50px] mobile:mt-[30px] desktop:mr-[50px] tablet:mr-[30px] mobile:mr-[10px]">
            <img src={cancelIcon} alt="닫기 버튼" />
          </button>
        </div>
        {/* 콘텐츠 소개 영역 */}
        <section className="w-full h-auto flex tablet:flex-row mobile:flex-col-reverse desktop:gap-[160px] tablet:gap-[50px] mobile:gap-[30px] justify-between tablet:items-start mobile:justify-center mobile:items-center tablet:pb-[146px] tablet:pt-[70px] desktop:px-[136px] tablet:px-[31px] mobile:px-[10px]">
          <div className="w-full flex flex-col justify-between items-start gap-[35px] relative z-10 text-left text-white">
            <div className="flex flex-col gap-[10px]">
              {/* 컨텐츠 제목 */}
              <div className="font-bold text-[40px] leading-auto">
                {data?.name}
              </div>

              {/* 컨텐츠 세부 정보 태그 */}
              <div className="flex gap-[10px] text-light">
                {/* 방영연도 */}
                <Tag>{data?.first_air_date.slice(0, 4)}</Tag>

                {/* 장르 */}
                {data?.genres.map((genre) => (
                  <Tag key={genre.id}>{genre.name}</Tag>
                ))}

                {/* 시즌 갯수 */}
                {data?.number_of_seasons && (
                  <Tag>{`시즌 ${String(data?.number_of_seasons)}개`}</Tag>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <p className="text-white02 text-[16px] leading-[24px]">
                시청할 수 있는 서비스
              </p>
              {/* 시청할 수 있는 서비스 로고 */}
              <div className="flex gap-[10px]">
                {data?.networks.map((network) => (
                  <div
                    key={network.id}
                    className="w-[48px] h-[48px] bg-contain bg-no-repeat bg-center"
                    style={{
                      backgroundImage: `url(${IMAGE_BASE_URL}${network.logo_path}))`,
                    }}
                  ></div>
                ))}
              </div>
            </div>

            {/* 오버뷰 */}
            <div className="font-light text-[16px] leading-[24px]">
              {data?.overview}
            </div>

            {/* 태그라인 */}
            <div className="font-light text-[16px] leading-[24px]">
              #{data?.tagline}
            </div>
            <button className="flex gap-[10px] w-auto h-auto px-[15px] py-[10px] border border-main rounded-[8px]">
              <img src={scrapIcon} alt="스크랩 버튼" />
              <span className="text-main">스크랩</span>
            </button>
          </div>
          <img
            src={placeholderImg02}
            alt="placeholder"
            className="desktop:w-[324px] tablet:w-[220px] mobile:w-[220px] h-auto z-10"
          />
        </section>
      </section>
    </>
  );
}
