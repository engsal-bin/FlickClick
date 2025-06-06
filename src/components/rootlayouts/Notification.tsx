import { Link, useNavigate } from "react-router-dom";
import {
  getArgumentCountByUId,
  getClipCountByUId,
  getReviewCountByUId,
  QUERY_KEYS,
} from "../../api/mypageInfo";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import SideToggleList from "../notification/SideToggleList";
import arrowRight from "../../assets/icon/arrow/arrowRight.svg";
import { authAPI } from "../../api/user";
import changeIcon from "../../assets/icon/changeIcon.svg";
import logoutIcon from "../../assets/icon/logoutIcon.svg";
import tranlateLang from "../../assets/icon/translate_lang.svg";
import { useAuth } from "../../api/Auth";
import { useLanguageStore } from "../../store/useLanguageStore";
import { menuTranslations } from "../../translations/menu";

type ToggleClickedType = {
  [key: string]: boolean;
};

export default function Notification() {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguageStore();
  const translation = menuTranslations[language];

  const [toggleClicked, setToggleClicked] = useState<ToggleClickedType>({
    series: false,
    movies: false,
    genres: false,
    myPage: false,
  });

  const { isLoggedIn, user, setUser, setIsLoggedin } = useAuth();

  // TanStack Query를 사용하여 사용자 데이터 가져오기
  const { data: counts = { reviewCount: 0, discussCount: 0, clipCount: 0 } } = useQuery({
    queryKey: [QUERY_KEYS.USER_COUNTS, user?.id],
    queryFn: async () => {
      if (!user?.id) return { reviewCount: 0, discussCount: 0, clipCount: 0 };
      
      const [review, discuss, clip] = await Promise.all([
        getReviewCountByUId(user.id),
        getArgumentCountByUId(user.id),
        getClipCountByUId(user.id),
      ]);

      return {
        reviewCount: review || 0,
        discussCount: discuss || 0,
        clipCount: clip || 0,
      };
    },
    enabled: !!user?.id,
  });

  const handleToggleClicked = useCallback((key: string) => {
    setToggleClicked((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  const onClickLogOut = useCallback(async () => {
    try {
      await authAPI.logOut();
      setUser(null);
      setIsLoggedin(false);
      
      // 강제로 페이지 새로고침
      window.location.replace("/");
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  }, [setUser, setIsLoggedin]);

  const toggleLanguage = () => {
    setLanguage(language === "ko" ? "en" : "ko");
  };

  return (
    <div className="flex flex-col justify-between h-full border-white shadow-2xl">
      {/* 데스크탑용 알림 */}
      <div className="hidden tablet:flex w-[249px] h-[58px] justify-between">
        {[
          [translation.review, counts.reviewCount, "review"],
          [translation.discuss, counts.discussCount, "discuss"],
          [translation.scrap, counts.clipCount, "scrap"],
        ].map(([label, count, select]) => (
          <button
            onClick={() =>
              navigate(`/mypage?tab=${select}`, {
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
        <p className="text-white01">{translation.languageChange}</p>
        <div
          className="w-[68px] flex justify-between cursor-pointer"
          onClick={toggleLanguage}
        >
          <img src={changeIcon} />
          <p className="text-white01">{translation.language}</p>
        </div>
      </div>

      {/* 마이페이지 & 알림 */}
      <button
        onClick={() => navigate("/mypage")}
        className="hidden text-white01 tablet:flex"
      >
        {translation.mypage}
      </button>
      <button
        onClick={() =>
          navigate("/mypage", { state: { selectedTab: "notify" } })
        }
        className="hidden text-white01 tablet:flex"
      >
        {translation.notification}
      </button>

      {/* 로그아웃 */}
      <div
        className="hidden cursor-pointer tablet:flex justify-left"
        onClick={onClickLogOut}
      >
        <img src={logoutIcon} className="mr-[15px]" />
        <p className="text-warn">{translation.logout}</p>
      </div>

      {/* 모바일용 알림창 */}
      <div className="tablet:hidden flex flex-col items-center gap-[20px] pt-[50px] px-[20px]">
        {[
          { name: translation.series, key: "series" },
          { name: translation.movies, key: "movies" },
          { name: translation.genres, key: "genres" },
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
          onClick={toggleLanguage}
        >
          <p className="text-white01">{translation.languageChange}</p>
          <div className="w-[60px] flex justify-between gap-[5px]">
            <img src={tranlateLang} />
            <div className="text-white01 text-[14px]">
              {translation.language}
            </div>
          </div>
        </div>

        {/* 로그아웃 버튼 */}
        <button
          onClick={onClickLogOut}
          className="flex justify-between items-center gap-[15px]"
        >
          <img src={logoutIcon} />
          <p className="text-warn">{translation.logout}</p>
        </button>

        {/* SideToggleList 컴포넌트 */}
        {[
          { label: translation.movies, path: "movies" },
          { label: translation.genres, path: "genres" },
          { label: translation.mypage, path: "myPage" },
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
