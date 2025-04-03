import { useNavigate } from "react-router-dom";
import { useLanguageStore } from "../../store/useLanguageStore";
import { menuTranslations } from "../../translations/menu";

const TabMenu = ({ selectedTab }: { selectedTab: string }) => {
  const navigate = useNavigate();
  const { language } = useLanguageStore();
  const translation = menuTranslations[language];

  const tabNames = {
    notify: translation.notification,
    review: translation.review,
    discuss: translation.discuss,
    scrap: translation.scrap,
  };

  return (
    <div className="hidden tablet:flex flex-row border-b-[1px] border-gray01">
      {Object.entries(tabNames).map(([tab, label]) => (
        <div
          key={tab}
          className={`w-[150px] h-[60px] flex justify-center items-center cursor-pointer ${
            selectedTab === tab
              ? "border-b-[2px] border-main text-main"
              : "hover:text-gray03"
          }`}
          onClick={() => navigate(`?tab=${tab}`)}
        >
          {label}
        </div>
      ))}
    </div>
  );
};

export default TabMenu;
