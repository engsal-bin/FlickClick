import { Link } from "react-router-dom";
import arrowRight from "../../assets/icon/arrow/arrowRight.svg";
import { IMAGE_BASE_URL } from "../../api/axios";
import noImage from "../../assets/icon/imagenone2.svg";
import { useLanguageStore } from "../../store/useLanguageStore";
import { menuTranslations } from "../../translations/menu";

interface SeasonType {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export default function SeasonBox({
  title,
  seriesId,
  season,
}: {
  title: string;
  seriesId: number;
  season?: SeasonType;
}) {
  const { language } = useLanguageStore();
  const t = menuTranslations[language];

  return (
    <Link
      to={`/detailseason/${seriesId}/${season?.season_number}`}
      className="flex flex-col w-full
    tablet:gap-[50px] mobile:gap-[30px] 
    desktop:px-[128px] tablet:px-[40px] mobile:px-[10px] 
    tablet:mt-[50px] mobile:mt-[30px]
    tablet:mb-[50px] mobile:mb-[30px]"
    >
      <div
        className="flex flex-between w-full 
      tablet:h-[200px] mobile:h-[106.67px] overflow-hidden"
      >
        {/* 콘텐츠 영역 */}
        <div className="flex w-full tablet:gap-[35px] mobile:gap-[10px]">
          {/* 이미지 */}
          <div
            className={`rounded-[10px] 
            tablet:w-[150px] mobile:w-[80px]  
            tablet:h-[200px] mobile:h-[106.67px]  
            bg-cover bg-center ${
              season?.poster_path ? "" : "border-[1px] border-main"
            }`}
            style={{
              backgroundImage: season?.poster_path
                ? `url('${IMAGE_BASE_URL}original${season?.poster_path})`
                : `url(${noImage})`,
            }}
          ></div>

          {/* 텍스트 캡션 */}
          <div className="flex flex-col justify-center ml-[20px] text-white">
            {/* 컨텐츠 시즌명 */}
            <p className="font-semibold tablet:text-[30px] mobile:text-[18px] text-white01">
              {title} {season?.name}
            </p>

            <div className="flex justify-start gap-[10px]">
              {/* 방영연도 */}
              <p className="tablet:text-[24px] mobile:text-[14px] text-gray03">
                {season?.air_date && season?.air_date.slice(0, 4)}
              </p>

              {/* 구분선 */}
              <div className="w-[1px] border-gray01 border-[1px]"></div>

              {/* 평점 */}
              <p className="tablet:text-[24px] mobile:text-[14px] text-gray03">
                {season?.vote_average.toFixed(1)}
                {t.scoreUnit}
              </p>
            </div>
          </div>
        </div>
        <div className="w-[50px] h-full flex justify-end items-center">
          <img
            src={arrowRight}
            alt="바로 가기 버튼"
            className="tablet:w-[10px] tablet:h-[24px] mobile:w-[6.67px] mobile:h-[16px]"
          />
        </div>
      </div>
    </Link>
  );
}
