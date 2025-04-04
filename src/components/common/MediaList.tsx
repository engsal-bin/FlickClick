import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from "../../api/axios";
import { useLanguageStore } from "../../store/useLanguageStore";
import { menuTranslations } from "../../translations/menu";
import defaultImage from "../../assets/icon/imagenone2.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination } from "swiper/modules";

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
  const { language } = useLanguageStore();
  const translation = menuTranslations[language];

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
                {translation.viewMore}
              </Link>
            )}
          </div>

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={3}
            className="w-full hidden tablet:flex"
            breakpoints={{
              900: { slidesPerView: 4 },
              1100: { slidesPerView: 5 },
              1300: { slidesPerView: 6 },
            }}
          >
            {data.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <div
                    key={index}
                    className="w-[200px] h-[265px] rounded-[8px] cursor-pointer
                    bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${
                        item.poster_path
                          ? `${IMAGE_BASE_URL}original${item.poster_path}`
                          : item.backdrop_path
                            ? `${IMAGE_BASE_URL}original${item.backdrop_path}`
                            : defaultImage
                      })`,
                    }}
                  >
                    <Link
                      to={
                        item.title
                          ? `/detailmovie/${item.id}`
                          : `/detailseries/${item.id}`
                      }
                      className="block w-full h-full"
                    ></Link>
                  </div>
                  <div className="relative w-[200px] px-[10px]">
                    <p className="text-left overflow-hidden whitespace-nowrap text-ellipsis hover:whitespace-normal hover:overflow-visible">
                      {item.name ? item.name : item.title}
                    </p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* mobile 전용 */}
        <div className="tablet:hidden flex flex-col justify-between w-full px-[10px]">
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

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={3}
            className="w-full hidden tablet:flex"
          >
            {data.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <div
                    key={index}
                    className="w-[100px] h-[132.5px] rounded-[8px] cursor-pointer
                    bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${
                        item.poster_path
                          ? `${IMAGE_BASE_URL}original${item.poster_path}`
                          : item.backdrop_path
                            ? `${IMAGE_BASE_URL}original${item.backdrop_path}`
                            : defaultImage
                      })`,
                    }}
                  >
                    <Link
                      to={
                        item.title
                          ? `/detailmovie/${item.id}`
                          : `/detailseries/${item.id}`
                      }
                      className="block w-full h-full"
                    ></Link>
                  </div>
                  <div className="relative w-[100px] px-[2px]">
                    <p className="text-left text-[14px] overflow-hidden whitespace-nowrap text-ellipsis">
                      {item.name ? item.name : item.title}
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
