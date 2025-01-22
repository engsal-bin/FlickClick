import React, { useState } from "react";
import changeIcon from "../../assets/icon/changeIcon.svg";
import logoutIcon from "../../assets/icon/logoutIcon.svg";
import arrowRight from "../../assets/icon/arrow/arrowRight.svg";
import translate_ko from "../../assets/icon/translate_ko.svg";
import translate_en from "../../assets/icon/translate_en.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../../api/Auth";

export default function Notification() {
  // 언어 변경 상태
  const [isTranslate, setIsTranslate] = useState(false);
  // (임시) 로그인 상태
  const { isLoggedIn, setIsLoggedin } = useAuth();

  return (
    <div className="h-full border-white flex flex-col justify-between">
      {/* tablet 이상에서 나오는 창 */}
      {/* 알림목록 */}
      <div className="hidden tablet:flex w-[249px] h-[58px] justify-between">
        <div className="text-center w-[47px] h-[58px]">
          <p className="text-main text-[24px] font-bold">0</p>
          <p className="text-white03 text-[18px] font-400">리뷰</p>
        </div>
        <div className="text-center w-[47px] h-[58px]">
          <p className="text-main text-[24px] font-bold">0</p>
          <p className="text-white03 text-[18px] font-400">토론</p>
        </div>
        <div className="text-center w-[47px] h-[58px]">
          <p className="text-main text-[24px] font-bold">0</p>
          <p className="text-white03 text-[18px] font-400">스크랩</p>
        </div>
      </div>
      {/* 구분선 */}
      <div className="hidden tablet:flex border-b-[0.7px] border-gray02"></div>
      {/* 구분선 하단 메뉴 */}
      <div className="hidden tablet:flex justify-between">
        <p className="text-white01">언어 변경</p>
        <div className="w-[68px] flex justify-between">
          <img src={changeIcon} />
          <p className="text-white01">한국어</p>
        </div>
      </div>
      <p className="text-white01 hidden tablet:flex">마이페이지</p>
      <p className="text-white01 hidden tablet:flex">알림</p>
      <div
        className="hidden tablet:flex justify-left cursor-pointer"
        onClick={setIsLoggedin}
      >
        <img src={logoutIcon} className="mr-[15px]" />
        <p className="text-warn">로그아웃</p>
      </div>

      {/* 모바일용 알림창 */}
      <div className="tablet:hidden flex flex-col items-center gap-[20px] pt-[50px] px-[20px]">
        <div className="w-full h-full border-white border-1">
          <Link to="/series" className="text-white01 flex justify-between">
            시리즈
            <img src={arrowRight} />
          </Link>
        </div>
        {/* 구분선 */}
        <div className="flex w-[216px] border-b-[0.5px] border-gray02"></div>
        {/* 구분선 하단 메뉴 */}
        <div className="w-full">
          <Link to="/movies" className="text-white01 flex justify-between">
            영화
            <img src={arrowRight} />
          </Link>
        </div>
        {/* 구분선 */}
        <div className="flex w-[216px] border-b-[0.5px] border-gray02"></div>
        <div className="w-full">
          <Link to="/genres" className="text-white01 flex justify-between">
            장르
            <img src={arrowRight} />
          </Link>
        </div>
        <img
          src={isTranslate ? translate_en : translate_ko}
          onClick={() => setIsTranslate((prev) => !prev)}
          className="fixed right-[20px] bottom-[20px]"
        />
      </div>
    </div>
  );
}
