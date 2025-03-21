import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { tvAPI } from "../../api/tv";
import { movieAPI } from "../../api/movie";
import { IMAGE_BASE_URL } from "../../api/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

export default function ArgorithmIP({
  seriesId,
  type,
  label,
}: {
  seriesId: number;
  type: string;
  label: string;
}) {
  const [contents, setContents] = useState<RecommendContentsType[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (type === "tv" && label === "추천") {
          const tvResponse = await tvAPI.getRecommendTv(seriesId);
          setContents(tvResponse.results);
        } else if (type === "movie" && label === "추천") {
          const movieResponse = await movieAPI.getRecommendMovie(seriesId);
          setContents(movieResponse.results);
        } else if (type === "tv" && label === "유사한 작품") {
          const tvResponse = await tvAPI.getSimilarTv(seriesId);
          setContents(tvResponse.results);
        } else if (type === "movie" && label === "유사한 작품") {
          const movieResponse = await movieAPI.getSimilarMovie(seriesId);
          setContents(movieResponse.results);
        }
      } catch (error) {
        console.error(Error);
      }
    };
    fetchData();
  }, [seriesId, type, label]);
  console.log(contents);

  return (
    <section className="w-full">
      {/* 라벨 */}
      <p className="text-white01 font-bold text-[24px]">{label}</p>

      {/* 컨텐츠 내용 */}
      <Swiper
        // spaceBetween={10} // 슬라이드 사이 간격
        // slidesPerView={5} // 한 번에 보여지는 슬라이드 수
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 5 },
          480: { slidesPerView: 3, spaceBetween: 10 },
          768: { slidesPerView: 4, spaceBetween: 15 },
          1024: { slidesPerView: 5, spaceBetween: 20 },
          1280: { slidesPerView: 6, spaceBetween: 20 },
        }}
        loop={false} // 무한 반복
        className="w-full"
      >
        {/* <div className="flex justify-start gap-[30px] tablet:h-full mobile:h-[132.5px]"> */}
        {contents?.length === 0 ? (
          <div className="text-[16px] text-white02 font-light">
            검색결과가 없습니다.
          </div>
        ) : (
          contents?.map((item) => (
            <SwiperSlide key={item.id} className="flex flex-col items-center">
              <Link
                to={
                  type === "tv"
                    ? `/detailseries/${item.id}`
                    : `/detailmovie/${item.id}`
                }
                className="w-full flex flex-col gap-[10px]"
              >
                {/* 컨텐츠 이미지 */}
                <div
                  className="tablet:w-[200px] mobile:w-[100px] bg-gray02 
                  tablet:h-[300px] mobile:h-[132.5px]
                  rounded-[10px] overflow-hidden bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${IMAGE_BASE_URL}original${
                      item.poster_path ? item.poster_path : item.backdrop_path
                    })`,
                  }}
                ></div>

                {/* 제목(연도) */}
                <div
                  className="font-bold text-[16px] text-white02
                  line-clamp-2 overflow-hidden whitespace-normal 
                  hover:line-clamp-none hover:overflow-visible"
                >
                  {item.title ? item.title : item.name}(
                  {item.first_air_date
                    ? item.first_air_date.slice(0, 4)
                    : item.release_date?.slice(0, 4)}
                  )
                </div>
              </Link>
            </SwiperSlide>
          ))
        )}

        {/* </div> */}
      </Swiper>
    </section>
  );
}
