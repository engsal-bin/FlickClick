import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IMAGE_BASE_URL } from "../../api/axios";


export default function GridContents({ series }: {series: TvShow[]}) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("필터링된 시리즈", series);
  }, [series]);

  return (
    <div className="w-full md:px-10 px-[10px]">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {series.map((item) => (
          <div
            key={item.id}
            className="relative w-[200px] h-[265px]  rounded-lg overflow-hidden"
            onClick={() => navigate(`/path/to/item/${item.id}`)}
          >
            <img
              src={`${IMAGE_BASE_URL}original${item.poster_path}`}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
