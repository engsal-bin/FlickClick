import UpcomingCreditsDetail from "./UpcomingCreditsDetail";
import { useEffect, useState } from "react";
import { movieAPI } from "../../api/movie";
import { useLanguageStore } from "../../store/useLanguageStore";
import { menuTranslations } from "../../translations/menu";

export default function UpcomingCredits({ movie_id }: { movie_id: number }) {
  const { language } = useLanguageStore();
  const transition = menuTranslations[language];

  const [castInfos, setCastInfos] = useState([]);
  useEffect(() => {
    const fetchCredits = async () => {
      const creditInfos = await movieAPI.getCredits(
        movie_id,
        transition.languageParams
      );

      setCastInfos(creditInfos.cast);
    };
    fetchCredits();
  }, []);
  return (
    <div className="w-[329px] min-h-[175px]  max-desktop:w-full h-auto">
      <div className="text-white text-[20px] max-[320px]:text-[16px mt-[10px]">
        {transition.cast}
      </div>
      <div className="flex mt-[20px] overflow-y-auto ">
        {castInfos.length > 0 ? (
          castInfos.map((info, index) => (
            <UpcomingCreditsDetail info={info} key={index} />
          ))
        ) : (
          <p className="text-white">{transition.noInfo}</p>
        )}
      </div>
    </div>
  );
}
