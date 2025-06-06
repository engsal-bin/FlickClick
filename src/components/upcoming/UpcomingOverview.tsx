import { useState, useEffect } from "react";
import arrow from "../../assets/icon/arrow/arrow01.svg";
import { useLanguageStore } from "../../store/useLanguageStore";
import { menuTranslations } from "../../translations/menu";

export default function UpcomingOverview({
  overview,
  plusView,
  piusViewFunction,
}: {
  overview: string;
  plusView: boolean;
  piusViewFunction: () => void;
}) {
  const [isMiddleScreen, setIsMiddleScreen] = useState(false);
  const { language } = useLanguageStore();
  const translation = menuTranslations[language];

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMiddleScreen(window.innerWidth >= 320 && window.innerWidth <= 1280);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const showButton = overview && overview.length > 200 && !isMiddleScreen;

  return (
    <div className={`w-[329px] max-desktop:w-full max-desktop:h-auto`}>
      <div className="flex justify-between text-white02 mt-[10px] text-[20px] max-[320px]:text-[16px]">
        <div>{translation.story}</div>
        {showButton && (
          <button onClick={piusViewFunction} className="flex items-center">
            <p>{translation.viewMore}</p>
            <img
              src={arrow}
              className={`ml-[10px] w-[18px] h-[18px] ${
                plusView ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>
      <div
        className={`text-white03 mt-[20px] text-[16px] max-mobile:text-[14px] ${
          isMiddleScreen || plusView ? "" : "h-[192px] overflow-hidden"
        }`}
      >
        {overview || translation.noSummary}
      </div>
    </div>
  );
}
