import { Link, useNavigate } from "react-router-dom";

import { mediaTypeToPathName } from "../../constants/path";
import { useEffect, useRef, useState } from "react";

interface ChildProps {
  to: string;
  showMore?: boolean;
  trendingData?: BasicType[];
  children?: React.ReactNode;
  imgSrc?: string[];
}

export default function Contents({
  to,
  showMore,
  trendingData,
  children,
  imgSrc,
}: ChildProps) {
  const path =
    trendingData?.map((item) =>
      item.media_type && mediaTypeToPathName[item.media_type as "movie" | "tv"]
        ? `/${mediaTypeToPathName[item.media_type as "movie" | "tv"]}/${
            item.id
          }`
        : "",
    ) ?? [];
  const navigate = useNavigate();
  const dataRef = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);
  console.log(trendingData);

  // 마우스 휠 이벤트 핸들러
  const handleWheel = (event: WheelEvent) => {
    if (dataRef.current) {
      // dataRef.current의 위치와 크기 정보
      const rect = dataRef.current.getBoundingClientRect();
      const isMouseInBounds =
        event.clientY >= rect.top && event.clientY <= rect.bottom;

      if (isMouseInBounds) {
        event.preventDefault(); // 세로 스크롤 막기
        dataRef.current.scrollLeft += event.deltaY; // deltaY 값에 따라 가로 스크롤 적용
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
                더보기
              </Link>
            )}
          </div>

          <div
            className="flex justify-between overflow-x-auto overflow-y-hidden"
            ref={dataRef}
          >
            {trendingData?.map((_, index) => {
              return (
                <img
                  className="w-[200px] h-[265px] border-[1px] rounded-[8px] border-gray01 cursor-pointer"
                  src={trendingData[index].poster_path}
                  key={index}
                  onClick={() => {
                    // 이미지 클릭 시 해당 경로로 이동
                    navigate(path[index]);
                  }}
                />
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
                더보기
              </Link>
            )}
          </div>

          <div className="flex overflow-y-auto">
            {trendingData.map((_, index) => {
              return (
                <img
                  className="w-[200px] h-[265px] border-[1px] rounded-[8px] border-gray01 cursor-pointer"
                  src={trendingData[index].poster_path}
                  key={index}
                  onClick={() => {
                    navigate(path[index]);
                  }}
                />
              );
            })}
          </div>
        </div>
      </>
    );
}
