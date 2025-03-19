import { useEffect, useState } from "react";
import placeholderImg03 from "../../assets/placeholderImg03.svg";
import { Link, useLocation } from "react-router-dom";
import { tvAPI } from "../../api/tv";
import { movieAPI } from "../../api/movie";
import { IMAGE_BASE_URL } from "../../api/axios";
import { Swiper, SwiperSlide } from "swiper/react"; // Swiper import
import "swiper/swiper-bundle.css"; // Swiper 스타일 import

export default function MainThumbnail() {
  const [contents, setContents] = useState<popularContentType[]>();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const popularTv = await tvAPI.getTrendTv();
        const popularMovie = await movieAPI.getTrendMovie();

        const shuffleArray = (array: popularContentType[]) => {
          return array
            .map((item) => ({ item, sortKey: Math.random() }))
            .sort((a, b) => a.sortKey - b.sortKey)
            .map(({ item }) => item);
        };

        const popularSum = shuffleArray([
          ...popularTv.results,
          ...popularMovie.results,
        ]);

        if (location.pathname === "/") {
          setContents(popularTv.results.slice(0, 5));
          console.log(popularTv.results);
        } else if (location.pathname === "/series") {
          setContents(popularMovie.results.slice(0, 5));
          console.log(popularMovie.results);
        } else if (location.pathname === "/movies") {
          setContents(popularSum.slice(0, 5));
          console.log(popularSum);
        }
      } catch (error) {
        console.error(Error);
      }
    };
    fetchData();
  }, [location.pathname]);

  return (
    /* 임시로 시리즈 상세 페이지에 연결함 */
    <>
      {/* tablet 이상 */}
      <Swiper
        spaceBetween={10} // 슬라이드 사이 간격
        slidesPerView={1} // 한 번에 보여지는 슬라이드 수
        loop={true} // 무한 반복
        className="w-full"
      >
        {contents?.map((content) => (
          <SwiperSlide key={content.id}>
            <Link
              key={content.id}
              to={
                content.title
                  ? `/detailmovie/${content.id}`
                  : `/detailseries/${content.id}`
              } // 임시로 슬기로운의사생활 id 적용
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
                gap-[10px] relative z-10 text-center text-white"
              >
                <div className="font-bold text-[60px] leading-none">
                  {content.title ? content.title : content.name}
                </div>
                <div
                  className="text-[24px] text-left leading-[40px] 
                line-clamp-2 overflow-hidden whitespace-normal 
                hover:line-clamp-none hover:overflow-visible "
                >
                  {content.overview}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* mobile 전용 */}
      <Link
        to={"/detailseries/96102"} // 임시로 슬기로운의사생활 id 적용
        className="relative tablet:hidden flex flex-col justify-center 
        items-center w-full h-[420px] border-[1px] border-gray01 
        bg-cover bg-center py-[50px] px-[30px]"
        style={{ backgroundImage: `url(${placeholderImg03})` }}
      >
        {/* 그라데이션 오버레이 */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black 
        via-transparent to-transparent opacity-80"
        ></div>

        {/* 텍스트 */}
        <div
          className="w-full h-full flex flex-col justify-end items-start 
        gap-[10px] relative z-10 text-center text-white"
        >
          <div className="font-bold text-[36px] leading-none">영화 제목</div>
          <div className="text-[16px] leading-none">요약 내용</div>
        </div>
      </Link>
    </>
  );
}
