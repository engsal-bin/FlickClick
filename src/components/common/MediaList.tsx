import { Link, useNavigate } from "react-router-dom";

import { mediaTypeToPathName } from "../../constants/path";
import { IMAGE_BASE_URL } from "../../api/axios";
import { useLanguageStore } from "../../store/useLanguageStore";
import { menuTranslations } from "../../translations/menu";
import defaultImage from "../../assets/icon/imagenone2.svg";
import { useEffect, useRef, useState } from "react";

interface ChildProps {
  to: string;
  showMore?: boolean;
  data?: Content[];
  children?: React.ReactNode;
}

export default function MediaList({
  to,
  showMore,
  data,
  children,
}: ChildProps) {
  const path =
    data?.map((item) =>
      item.media_type && mediaTypeToPathName[item.media_type as "movie" | "tv"]
        ? `/${mediaTypeToPathName[item.media_type as "movie" | "tv"]}/${
            item.id
          }`
        : ""
    ) ?? [];

  const navigate = useNavigate();
  const { language } = useLanguageStore();
  const t = menuTranslations[language];
  const dataRef = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);

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
  }, [data]);

  if (data)
    return (
      <>
        {/* tablet 이상 */}
        <div className="hidden tablet:flex flex-col justify-between w-full px-[50px]">
          <div className="flex items-baseline justify-between">
            <p className="text-white01 font-bold text-[24px] mb-[30px]">
              {children}
            </p>
            {showMore && (
              <Link to={to} className="text-white03 text-[20px]">
                {t.viewMore}
              </Link>
            )}
          </div>

          <div
            className="flex gap-[20px] overflow-x-auto overflow-y-hidden"
            ref={dataRef}
          >
            {data.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col justify-start items-center w-[200px] shrink-0 gap-[10px]"
                >
                  <img
                    className="w-[200px] h-[265px] rounded-[8px] cursor-pointer"
                    src={
                      item.poster_path
                        ? `${IMAGE_BASE_URL}original${item.poster_path}`
                        : defaultImage
                    }
                    alt={item.name}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = defaultImage;
                    }}
                    onClick={() => {
                      navigate(path[index]);
                    }}
                  />
                  <div className="relative w-full px-[10px]">
                    <p className="text-left overflow-hidden whitespace-nowrap text-ellipsis hover:whitespace-normal hover:overflow-visible">
                      {item.name ? item.name : item.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* mobile 전용 */}
        <div className="tablet:hidden flex flex-col justify-between w-full px-[10px]">
          <div className="flex items-baseline justify-between">
            <p className="text-white01 font-bold text-[18px] mb-[30px]">
              {children}
            </p>
            {showMore && (
              <Link to={to} className="text-white03 text-[12px]">
                {t.viewMore}
              </Link>
            )}
          </div>

          <div className="flex overflow-y-auto gap-[10px]">
            {data.map((item, index) => {
              return (
                <img
                  className="w-[200px] h-[265px] border-[1px] rounded-[8px] border-gray01"
                  src={`${IMAGE_BASE_URL}original${item.poster_path}`}
                  alt={item.name}
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
