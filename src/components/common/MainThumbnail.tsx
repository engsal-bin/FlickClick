import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { tvAPI } from "../../api/tv";
import { movieAPI } from "../../api/movie";
import { IMAGE_BASE_URL } from "../../api/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Pagination } from "swiper/modules";
import { useLanguageStore } from "../../store/useLanguageStore";
import { menuTranslations } from "../../translations/menu";

export default function MainThumbnail() {
  const [contents, setContents] = useState<trendContentType[]>();
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const swiperRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { language } = useLanguageStore();
  const t = menuTranslations[language];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const trendTv = await tvAPI.getTrendTv(t.languageParams);
        const trendMovie = await movieAPI.getTrendMovie(t.languageParams);
        const shuffleArray = (array: trendContentType[]) => {
          return array
            .map((item) => ({ item, sortKey: Math.random() }))
            .sort((a, b) => a.sortKey - b.sortKey)
            .map(({ item }) => item);
        };

        const trendSum = shuffleArray([
          ...trendTv.results,
          ...trendMovie.results,
        ]);

        if (location.pathname === "/") {
          setContents(
            trendSum
              .filter((item: trendContentType) => item.backdrop_path !== null)
              .slice(0, 5)
          );

          console.log(trendSum);
        } else if (location.pathname === "/series") {
          setContents(
            shuffleArray(
              trendTv.results.filter(
                (item: trendContentType) => item.backdrop_path !== null
              )
            ).slice(0, 5)
          );
          console.log(trendTv.results);
        } else if (location.pathname === "/movies") {
          setContents(
            shuffleArray(
              trendMovie.results.filter(
                (item: trendContentType) => item.backdrop_path !== null
              )
            ).slice(0, 5)
          );

          console.log(trendMovie.results);
        }
      } catch (error) {
        console.error(Error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [location.pathname, t.languageParams]);

  // swiperRef.current가 초기화되면 activeIndex로 currentIndex 설정
  useEffect(() => {
    if (swiperRef.current) {
      setCurrentIndex(swiperRef.current.activeIndex);
    }
  }, [swiperRef.current]);

  return (
    <>
      {/* tablet 이상 */}
      {isLoading ? (
        <div className="animate-pulse w-full mobile:h-[420px] tablet:h-[700px] bg-gray-700 ">
          <div
            className="w-full h-full flex flex-col justify-end items-start 
                    gap-[10px] relative z-10 text-white bg-gray-700 rounded-md py-[80px] px-[100px]"
          >
            <div className="w-full h-[50px] bg-gray-600 rounded-md"></div>
            <div className="w-full h-[150px] bg-gray-600 rounded-md"></div>
          </div>
        </div>
      ) : (
        <Swiper
          modules={[Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          className="w-full hidden tablet:flex"
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<button class="${className} transition-all 
            ${index === currentIndex ? "bg-main" : "bg-white01_30"}"></button>`;
            },
          }}
          onSlideChange={(swiper) => {
            swiperRef.current = swiper;
            setCurrentIndex(swiper.realIndex);
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setCurrentIndex(swiper.realIndex);
          }}
        >
          {contents?.map((content) => (
            <SwiperSlide key={content.id}>
              <Link
                key={content.id}
                to={
                  content.title
                    ? `/detailmovie/${content.id}`
                    : `/detailseries/${content.id}`
                }
                className="relative hidden tablet:flex flex-col justify-center 
              items-center w-full h-[720px] bg-cover bg-center py-[80px] px-[100px]"
                style={{
                  backgroundImage: `url(${IMAGE_BASE_URL}original${content.backdrop_path})`,
                }}
              >
                {/* 그라데이션 오버레이 */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black 
              via-black/50 to-transparent opacity-100"
                ></div>

                {/* 텍스트 */}
                <div
                  className="w-full h-full flex flex-col justify-end items-start 
                    gap-[10px] relative z-10 text-white"
                >
                  {/* 제목 */}
                  <div className="font-bold text-[60px] leading-none">
                    {content.title ? content.title : content.name}
                  </div>

                  {/* 오버뷰 */}
                  <div
                    className="text-[24px] leading-[40px] 
                  line-clamp-2 overflow-hidden whitespace-normal 
                  hover:line-clamp-none hover:overflow-visible"
                  >
                    {content.overview}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* mobile 전용 */}
      {isLoading ? (
        <div className="animate-pulse w-full mobile:flex tablet:hidden">
          <div className="w-full h-[420px] flex flex-col justify-end items-start gap-[10px] relative z-10 text-white bg-gray-700 rounded-md py-[50px] px-[30px]">
            <div className="w-full h-[40px] bg-gray-600 rounded-md"></div>
            <div className="w-full h-[120px] bg-gray-600 rounded-md"></div>
          </div>
        </div>
      ) : (
        <Swiper
          modules={[Pagination]}
          spaceBetween={10} // 슬라이드 사이 간격
          slidesPerView={1} // 한 번에 보여지는 슬라이드 수
          loop={true} // 무한 반복
          className="w-full hidden mobile:flex"
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<button class="${className} transition-all 
            ${index === currentIndex ? "bg-main" : "bg-white01_30"}"></button>`;
            },
          }}
          onSlideChange={(swiper) => {
            swiperRef.current = swiper;
            setCurrentIndex(swiper.realIndex);
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setCurrentIndex(swiper.realIndex);
          }}
        >
          {contents?.map((content) => (
            <SwiperSlide key={content.id}>
              <Link
                key={content.id}
                to={
                  content.title
                    ? `/detailmovie/${content.id}`
                    : `/detailseries/${content.id}`
                }
                className="relative tablet:hidden flex flex-col justify-center 
              items-center w-full h-[420px] 
              bg-cover bg-center py-[50px] px-[30px]"
                style={{
                  backgroundImage: `url(${IMAGE_BASE_URL}original${content.backdrop_path})`,
                }}
              >
                {/* 그라데이션 오버레이 */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black 
                via-transparent to-transparent opacity-100"
                ></div>

                {/* 텍스트 */}
                <div
                  className="w-full h-full flex flex-col justify-end items-start 
                gap-[10px] relative z-10 text-white"
                >
                  {/* 제목 */}
                  <div className="font-bold text-[36px] leading-none">
                    {content.title ? content.title : content.name}
                  </div>

                  {/* 오버뷰 */}
                  <div
                    className="text-[16px] leading-[20px]
                  line-clamp-2 overflow-hidden whitespace-normal 
                  hover:line-clamp-none hover:overflow-visible"
                  >
                    {content.overview}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}
