import UpcomingCreditsDetail from "./UpcomingCreditsDetail";
import { useEffect, useState } from "react";
import { movieAPI } from "../../api/movie";

export default function UpcomingCredits({ movie_id }: { movie_id: number }) {
  const [castInfos, setCastInfos] = useState([]);
  useEffect(() => {
    const fetchCredits = async () => {
      const creditInfos = await movieAPI.getCredits(movie_id);

      setCastInfos(creditInfos.cast);
    };
    fetchCredits();
  }, []);
  return (
    <div className="w-[329px] min-h-[175px]  max-desktop:w-full h-auto">
      <div className="text-white text-[20px] max-[320px]:text-[16px mt-[10px]">
        출연진
      </div>
      <div className="flex mt-[20px] overflow-y-auto ">
        {castInfos.length > 0 ? (
          castInfos.map((info, index) => (
            <UpcomingCreditsDetail info={info} key={index} />
          ))
        ) : (
          <p className="text-white">출연진 정보가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
