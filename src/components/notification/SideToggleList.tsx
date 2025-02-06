import arrowRight from "../../assets/icon/arrow/arrowRight.svg";
import arrowBottom from "../../assets/icon/arrow/arrowBottom.svg";
import { Link } from "react-router-dom";

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
  console.log(clicked[id]);
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
            <div className="flex flex-col gap-[20px] text-gray01">
              <div className="hover:text-white01 cursor-pointer">알림</div>
              <div className="hover:text-white01 cursor-pointer">리뷰</div>
              <div className="hover:text-white01 cursor-pointer">토론</div>
              <div className="hover:text-white01 cursor-pointer">스크랩</div>
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
