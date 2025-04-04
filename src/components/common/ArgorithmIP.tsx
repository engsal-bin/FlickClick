import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { tvAPI } from "../../api/tv";
import { movieAPI } from "../../api/movie";
import { IMAGE_BASE_URL } from "../../api/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { useLanguageStore } from "../../store/useLanguageStore";
import { menuTranslations } from "../../translations/menu";

export default function ArgorithmIP({
  seriesId,
  type,
  label,
}: {
  seriesId: number;
  type: string;
  label: string;
}) {
  const { language } = useLanguageStore();
  const translation = menuTranslations[language];
  const [contents, setContents] = useState<RecommendContentsType[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (type === "tv" && label === translation.recommendation) {
          const tvResponse = await tvAPI.getRecommendTv(
            seriesId,
            translation.languageParams
          );
          setContents(tvResponse.results);
        } else if (type === "movie" && label === translation.recommendation) {
          const movieResponse = await movieAPI.getRecommendMovie(
            seriesId,
            translation.languageParams
          );
          setContents(movieResponse.results);
        } else if (type === "tv" && label === translation.similarity) {
          const tvResponse = await tvAPI.getSimilarTv(
            seriesId,
            translation.languageParams
          );
          setContents(tvResponse.results);
        } else if (type === "movie" && label === translation.similarity) {
          const movieResponse = await movieAPI.getSimilarMovie(
            seriesId,
            translation.languageParams
          );
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
        breakpoints={{
          320: { slidesPerView: 2 },
          600: { slidesPerView: 3 },
          880: { slidesPerView: 4 },
          1090: { slidesPerView: 5 },
          1300: { slidesPerView: 6 },
        }}
        loop={false} // 무한 반복
        className="w-full"
      >
        {contents?.length === 0 ? (
          <div className="text-[16px] text-white02 font-light">
            {translation.noResult}
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
                  className="tablet:w-[200px] mobile:w-[100px] font-bold text-[16px] text-white02
                  line-clamp-1 overflow-hidden whitespace-normal 
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
      </Swiper>
    </section>
  );
}
