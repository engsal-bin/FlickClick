import { Link, useNavigate } from "react-router-dom";
import { mediaTypeToPathName } from "../../constants/path";
import { useEffect, useRef, useState } from "react";
import { useLanguageStore } from "../../store/useLanguageStore";
import { menuTranslations } from "../../translations/menu";
import defaultImage from "../../assets/icon/imagenone2.svg";

interface ChildProps {
  to: string;
  showMore?: boolean;
  trendingData?: BasicType[];
  children?: React.ReactNode;
}

export default function Contents({
  to,
  showMore,
  trendingData,
  children,
}: ChildProps) {
  const path =
    trendingData?.map((item) =>
      item.media_type && mediaTypeToPathName[item.media_type as "movie" | "tv"]
        ? `/${mediaTypeToPathName[item.media_type as "movie" | "tv"]}/${
            item.id
          }`
        : ""
    ) ?? [];
  const navigate = useNavigate();
  const dataRef = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);
  console.log(trendingData);
  const { language } = useLanguageStore();
  const translation = menuTranslations[language];

  // 마우스 휠 이벤트 핸들러
  const handleWheel = (event: WheelEvent) => {
    if (dataRef.current) {
      const rect = dataRef.current.getBoundingClientRect();
      const isMouseInBounds =
        event.clientY >= rect.top && event.clientY <= rect.bottom;

      if (isMouseInBounds) {
        event.preventDefault();
        dataRef.current.scrollLeft += event.deltaY;
      }
    }
  };

  useEffect(() => {
    if (!dataRef.current) return;

    const personList = dataRef.current;

    personList.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      personList.removeEventListener("wheel", handleWheel);
    };
  }, [isOverflow]);

  // 부모 요소의 너비를 기준으로 자식 요소가 넘쳤는지 체크
  useEffect(() => {
    const checkOverflow = () => {
      if (dataRef.current) {
        const isOverflowing =
          dataRef.current.scrollWidth > dataRef.current.clientWidth;
        setIsOverflow(isOverflowing);
      }
    };

    // 브라우저가 레이아웃을 계산한 후 실행되도록 requestAnimationFrame 사용
    const raf = requestAnimationFrame(checkOverflow);

    window.addEventListener("resize", checkOverflow);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", checkOverflow);
    };
  }, [trendingData]);

  if (trendingData)
    return (
      <>
        {/* tablet 이상 */}
        <div className="hidden tablet:flex flex-col justify-between w-full px-[50px]  ">
          <div className="flex items-baseline justify-between">
            <p className="text-white01 font-bold text-[24px] mb-[30px]">
              {children}
            </p>
            {showMore && (
              <Link to={to} className="text-white03 text-[20px]">
                {translation.viewMore}
              </Link>
            )}
          </div>

          <div
            className="flex gap-[20px] overflow-x-auto overflow-y-hidden"
            ref={dataRef}
          >
            {trendingData?.map((_, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col justify-start items-center w-[200px] shrink-0 gap-[10px]"
                >
                  <img
                    className={`w-[200px] h-[265px] rounded-[8px] cursor-pointer`}
                    src={trendingData[index].poster_path || defaultImage}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = defaultImage;
                    }}
                    onClick={() => {
                      navigate(path[index]);
                    }}
                  />
                  <div className="relative w-full px-[10px]">
                    <p className="text-left overflow-hidden whitespace-nowrap text-ellipsis hover:whitespace-normal hover:overflow-visible">
                      {trendingData[index].name
                        ? trendingData[index].name
                        : trendingData[index].title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* mobile 전용 */}
        <div className="tablet:hidden flex flex-col justify-between w-full px-[10px] ">
          <div className="flex items-baseline justify-between">
            <p className="text-white01 font-bold text-[18px] mb-[30px]">
              {children}
            </p>
            {showMore && (
              <Link to={to} className="text-white03 text-[12px]">
                {translation.viewMore}
              </Link>
            )}
          </div>

          <div className="flex overflow-y-auto gap-[10px]">
            {trendingData.map((_, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col justify-start items-center w-[200px] shrink-0 gap-[10px]"
                >
                  <img
                    className={`w-[200px] h-[265px] rounded-[8px] cursor-pointer`}
                    src={trendingData[index].poster_path || defaultImage}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = defaultImage;
                    }}
                    key={index}
                    onClick={() => {
                      navigate(path[index]);
                    }}
                  />
                  <div className="relative w-full">
                    <p className="text-center overflow-hidden whitespace-nowrap text-ellipsis">
                      {trendingData[index].name
                        ? trendingData[index].name
                        : trendingData[index].title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
}
