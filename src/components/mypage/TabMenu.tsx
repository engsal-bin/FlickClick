import { useNavigate } from "react-router-dom";

const tabNames = {
  notify: "알림",
  review: "리뷰",
  discuss: "토론",
  scrap: "스크랩",
};

const TabMenu = ({ selectedTab }: { selectedTab: string }) => {
  const navigate = useNavigate();

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
