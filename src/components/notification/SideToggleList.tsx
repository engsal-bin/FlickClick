import { Link, useNavigate } from "react-router-dom";
import { useLanguageStore } from "../../store/useLanguageStore";
import { menuTranslations } from "../../translations/menu";
import arrowBottom from "../../assets/icon/arrow/arrowBottom.svg";
import arrowRight from "../../assets/icon/arrow/arrowRight.svg";

type ClickedState = {
  [key: string]: boolean;
};

interface SideToggleListProps {
  title: string;
  id: string;
  clicked: ClickedState;
  onClicked: (key: string) => void;
}

export default function SideToggleList({
  title,
  id,
  clicked,
  onClicked,
}: SideToggleListProps) {
  const navigate = useNavigate();
  const { language } = useLanguageStore();
  const translation = menuTranslations[language];

  const myPageList = [
    { key: "notify", label: translation.notification },
    { key: "review", label: translation.review },
    { key: "discuss", label: translation.discuss },
    { key: "scrap", label: translation.scrap },
  ];

  return (
    <div className="w-full h-full border-white border-1">
      {id === "myPage" ? (
        /* 마이페이지 */
        <div className="flex flex-col gap-[20px]">
          <div
            className="text-white01 flex justify-between cursor-pointer"
            onClick={() => onClicked(id)}
          >
            {title}
            <img src={clicked[id] ? arrowBottom : arrowRight} />
          </div>
          {clicked[id] && (
            <div className="flex flex-col gap-[20px] text-gray01 items-start pl-[10px]">
              {/* 마이페이지 하위 리스트 */}
              {myPageList.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() =>
                    navigate(`/myPage?tab=${key}`, {
                      state: { selectedTab: key },
                    })
                  }
                  className="hover:text-white01 cursor-pointer"
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* 나머지 리스트 */
        <Link
          to={`/${id}`}
          className="text-white01 flex justify-between
         cursor-pointer"
        >
          {title}
          <img src={arrowRight} />
        </Link>
      )}
    </div>
  );
}
