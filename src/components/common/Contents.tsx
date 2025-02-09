import { Link, useNavigate } from "react-router-dom";

import { mediaTypeToPathName } from "../../constants/path";

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
  const imgSrc = trendingData?.map((item) => item.poster_path);

  const path =
    trendingData?.map((item) =>
      item.media_type && mediaTypeToPathName[item.media_type as "movie" | "tv"]
        ? `/${mediaTypeToPathName[item.media_type as "movie" | "tv"]}/${
            item.id
          }`
        : ""
    ) ?? [];

  const navigate = useNavigate();

  if (imgSrc)
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

          <div className="flex justify-between overflow-y-auto ">
            {imgSrc.map((_, index) => {
              return (
                <img
                  className="w-[200px] h-[265px] border-[1px] rounded-[8px] border-gray01"
                  src={imgSrc[index]}
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
            {imgSrc.map((_, index) => {
              return (
                <img
                  className="w-[200px] h-[265px] border-[1px] rounded-[8px] border-gray01"
                  src={imgSrc[index]}
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
