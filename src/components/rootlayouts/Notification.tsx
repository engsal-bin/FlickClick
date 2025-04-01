import { Link, useNavigate } from "react-router-dom";
import {
  getArgumentCountByUId,
  getClipCountByUId,
  getReviewCountByUId,
} from "../../api/mypageInfo";
import { useCallback, useEffect, useState } from "react";

import SideToggleList from "../notification/SideToggleList";
import arrowRight from "../../assets/icon/arrow/arrowRight.svg";
import { authAPI } from "../../api/user";
import changeIcon from "../../assets/icon/changeIcon.svg";
import logoutIcon from "../../assets/icon/logoutIcon.svg";
import tranlateLang from "../../assets/icon/translate_lang.svg";
import { useAuth } from "../../api/Auth";

// 타입 정의
type ToggleClickedType = {
  [key: string]: boolean;
};

// Notification 컴포넌트
export default function Notification() {
  const navigate = useNavigate();

  // 상태 변수 정의
  const [isTranslate, setIsTranslate] = useState(false); // 언어 변환 상태
  const [toggleClicked, setToggleClicked] = useState<ToggleClickedType>({
    series: false,
    movies: false,
    genres: false,
    myPage: false,
  });

  const [counts, setCounts] = useState<MySavedCounts>({
    reviewCount: 0,
    discussCount: 0,
    clipCount: 0,
  });

  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    if (!isLoggedIn || !user) return;

    const fetchUserData = async () => {
      const [review, discuss, clip] = await Promise.all([
        getReviewCountByUId(user.id),
        getArgumentCountByUId(user.id),
        getClipCountByUId(user.id),
      ]);

      setCounts({
        reviewCount: review,
        discussCount: discuss,
        clipCount: clip,
      });
    };

    fetchUserData();
  }, [isLoggedIn, user]);

  const handleToggleClicked = useCallback((key: string) => {
    setToggleClicked((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  const onClickLogOut = useCallback(() => {
    authAPI.logOut();
    navigate("/");
  }, [navigate]);

  return (
    <div className="flex flex-col justify-between h-full border-white">
      {/* 데스크탑용 알림 */}
      <div className="hidden tablet:flex w-[249px] h-[58px] justify-between">
        {[
          ["리뷰", counts.reviewCount, "review"],
          ["토론", counts.discussCount, "discuss"],
          ["스크랩", counts.clipCount, "scrap"],
        ].map(([label, count, select]) => (
          <button
            onClick={() =>
              navigate(`/myPage?tab=${select}`, {
                state: { selectedTab: select },
              })
            }
            key={label}
            className="text-center w-[47px] h-[58px]"
          >
            <p className="text-main text-[24px] font-bold">{count}</p>
            <p className="text-white03 text-[18px] font-400">{label}</p>
          </button>
        ))}
      </div>

      <div className="hidden tablet:flex border-b-[0.7px] border-gray02"></div>

      {/* 언어 변경 */}
      <div className="justify-between hidden tablet:flex">
        <p className="text-white01">언어 변경</p>
        <div className="w-[68px] flex justify-between">
          <img src={changeIcon} />
          <p className="text-white01">{isTranslate ? "영어" : "한국어"}</p>
        </div>
      </div>

      {/* 마이페이지 & 알림 */}
      <button
        onClick={() => navigate("/myPage")}
        className="hidden text-white01 tablet:flex"
      >
        마이페이지
      </button>
      <button
        onClick={() =>
          navigate("/myPage", { state: { selectedTab: "notify" } })
        }
        className="hidden text-white01 tablet:flex"
      >
        알림
      </button>

      {/* 로그아웃 */}
      <div
        className="hidden cursor-pointer tablet:flex justify-left"
        onClick={onClickLogOut}
      >
        <img src={logoutIcon} className="mr-[15px]" />
        <p className="text-warn">로그아웃</p>
      </div>

      {/* 모바일용 알림창 */}
      <div className="tablet:hidden flex flex-col items-center gap-[20px] pt-[50px] px-[20px]">
        {[
          { name: "시리즈", key: "series" },
          { name: "영화", key: "movies" },
          { name: "장르", key: "genres" },
        ].map((category) => (
          <div key={category.key} className="w-full border-white border-1">
            <Link
              to={`/${category.key}`}
              className="flex justify-between text-white01"
            >
              {category.name}
              <img src={arrowRight} />
            </Link>
            <div className="flex w-[216px] border-b-[0.5px] border-gray02"></div>
          </div>
        ))}

        {/* 언어변경 버튼 */}
        <div
          className="flex items-center justify-between w-full border-white cursor-pointer border-1"
          onClick={() => setIsTranslate((prev) => !prev)}
        >
          <p className="text-white01">언어변경</p>
          <div className="w-[60px] flex justify-between gap-[5px]">
            <img src={tranlateLang} />
            <div className="text-white01 text-[14px]">
              {isTranslate ? "영어" : "한국어"}
            </div>
          </div>
        </div>

        {/* 로그아웃 버튼 */}
        <button
          onClick={onClickLogOut}
          className="flex justify-between items-center gap-[15px]"
        >
          <img src={logoutIcon} />
          <p className="text-warn">로그아웃</p>
        </button>

        {/* SideToggleList 컴포넌트 */}
        {[
          { label: "영화", path: "movies" },
          { label: "장르", path: "genres" },
          { label: "마이페이지", path: "myPage" },
        ].map((list) => (
          <SideToggleList
            key={list.label}
            title={list.label}
            id={list.path}
            clicked={toggleClicked}
            onClicked={handleToggleClicked}
          />
        ))}
      </div>
    </div>
  );
}
