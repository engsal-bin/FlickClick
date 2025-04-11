import { Link, useNavigate } from "react-router-dom";
import { mediaTypeToPathName } from "../../constants/path";
import { useEffect, useRef, useState } from "react";
import { useLanguageStore } from "../../store/useLanguageStore";
import { menuTranslations } from "../../translations/menu";
import defaultImage from "../../assets/icon/imagenone2.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination } from "swiper/modules";

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
  console.log(trendingData);
  const { language } = useLanguageStore();
  const translation = menuTranslations[language];

  const swiperRef = useRef<any>(null); // Swiper 참조
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 index 상태
  const [slidesPerView, setSlidesPerView] = useState(0);
  // console.log("currentIndex", currentIndex);
  // console.log("currentPage", currentPage);

  // resize 이벤트를 감지하여 slidesPerView 업데이트
  useEffect(() => {
    const updateSlidesPerView = () => {
      const width = window.innerWidth;
      setSlidesPerView(width >= 1300 ? 6 : width >= 1100 ? 5 : 4);
    };

    // 초기 실행
    updateSlidesPerView();
    // 이벤트 리스너 추가
    window.addEventListener("resize", updateSlidesPerView);

    // 언마운트 시 제거
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  // 전체 페이지 수
  const totalPages = Math.ceil((trendingData?.length || 0) / slidesPerView);

  // 현재 index값에 따라 현재 page 변경
  useEffect(() => {
    const page = Math.ceil(currentIndex / slidesPerView);
    console.log("page", page);
    setCurrentPage(page);
  }, [currentIndex, window.innerWidth]);

  useEffect(() => {
    setCurrentPage(0);
    setCurrentIndex(0);
  }, []);

  if (trendingData)
    return (
      <>
        {/* tablet 이상 */}
        <div className="hidden tablet:flex flex-col justify-between w-full px-[50px] relative">
          <div className="flex items-baseline justify-between">
            {/* 리스트 제목 */}
            <p className="text-white01 font-bold text-[24px] mb-[30px]">
              {children}
            </p>

            <div className="flex justify-between gap-[20px]">
              {/* 페이지네이션 (원형 토글 버튼) */}
              <div className="flex gap-2 justify-center items-center">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    className={`w-[10px] h-[10px] rounded-full ${currentPage === index ? "bg-main" : "bg-white01/30"}`}
                    onClick={() => {
                      if (swiperRef.current) {
                        swiperRef.current.slideTo(index * slidesPerView, 500);
                      }
                    }}
                  />
                ))}
              </div>

              {/* 더보기 */}
              {showMore && (
                <Link to={to} className="text-white03 text-[20px]">
                  {translation.viewMore}
                </Link>
              )}
            </div>
          </div>

          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            spaceBetween={10}
            slidesPerView={3}
            className="w-full hidden tablet:flex"
            onSlideChange={(swiper) => {
              console.log(swiper.activeIndex);
              setCurrentIndex(swiper.activeIndex);
            }}
            breakpoints={{
              900: { slidesPerView: 4 },
              1100: { slidesPerView: 5 },
              1300: { slidesPerView: 6 },
            }}
          >
            {trendingData?.map((_, index) => {
              return (
                <SwiperSlide key={index}>
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
                  <div className="relative w-[200px] px-[10px]">
                    <p className="text-left overflow-hidden whitespace-nowrap text-ellipsis hover:whitespace-normal hover:overflow-visible">
                      {trendingData[index].name
                        ? trendingData[index].name
                        : trendingData[index].title}
                    </p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* mobile 전용 */}
        <div className="tablet:hidden flex flex-col justify-between w-full px-[10px] ">
          <div className="flex items-baseline justify-between">
            {/* 리스트 제목 */}
            <p className="text-white01 font-bold text-[18px] mb-[30px]">
              {children}
            </p>

            <div className="flex justify-between gap-[20px]">
              {/* 페이지네이션 (원형 토글 버튼) */}
              <div className="flex gap-1 justify-center items-center">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    className={`w-[5px] h-[5px] rounded-full ${currentPage === index ? "bg-main" : "bg-white01/30"}`}
                    onClick={() => {
                      if (swiperRef.current) {
                        swiperRef.current.slideTo(index * slidesPerView, 500);
                      }
                    }}
                  />
                ))}
              </div>

              {/* 더보기 */}
              {showMore && (
                <Link to={to} className="text-white03 text-[12px]">
                  {translation.viewMore}
                </Link>
              )}
            </div>
          </div>

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={3}
            className="w-full hidden tablet:flex"
          >
            {trendingData.map((_, index) => {
              return (
                <SwiperSlide key={index}>
                  <img
                    className={`w-[100px] h-[132.5px] rounded-[8px] cursor-pointer`}
                    src={trendingData[index].poster_path || defaultImage}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = defaultImage;
                    }}
                    key={index}
                    onClick={() => {
                      navigate(path[index]);
                    }}
                  />
                  <div className="relative w-[100px] px-[2px]">
                    <p className="text-center overflow-hidden whitespace-nowrap text-ellipsis">
                      {trendingData[index].name
                        ? trendingData[index].name
                        : trendingData[index].title}
                    </p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </>
    );
}
