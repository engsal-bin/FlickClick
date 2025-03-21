import { Link, useNavigate } from "react-router-dom";

import { mediaTypeToPathName } from "../../constants/path";
import { IMAGE_BASE_URL } from "../../api/axios";

interface ChildProps {
  to: string;
  showMore?: boolean;
  data?: TvShow[];
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
        : "",
    ) ?? [];

  const navigate = useNavigate();

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
                더보기
              </Link>
            )}
          </div>

          <div className="flex justify-between overflow-y-auto">
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

        {/* mobile 전용 */}
        <div className="tablet:hidden flex flex-col justify-between w-full px-[10px]">
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
