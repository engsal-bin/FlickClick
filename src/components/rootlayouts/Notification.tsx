import { useState } from "react";
import changeIcon from "../../assets/icon/changeIcon.svg";
import logoutIcon from "../../assets/icon/logoutIcon.svg";
import tranlateLang from "../../assets/icon/translate_lang.svg";
import { useAuth } from "../../api/Auth";
import SideToggleList from "../notification/SideToggleList";

type ToggleClickedType = {
  [key: string]: boolean;
};

export default function Notification() {
  // 언어 변경 상태
  const [isTranslate, setIsTranslate] = useState(false);
  // (임시) 로그인 상태
  const { isLoggedIn, setIsLoggedin } = useAuth();
  // 버튼 클릭 상태
  const [toggleClicked, setToggleClicked] = useState<ToggleClickedType>({
    series: false,
    movies: false,
    genres: false,
    myPage: false,
  });

  // 버튼 클릭 상태 변경 함수
  const handleToggleClicked = (key: string) => {
    setToggleClicked((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="flex flex-col justify-between h-full border-white">
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
      <div className="justify-between hidden tablet:flex">
        <p className="text-white01">언어 변경</p>
        <div className="w-[68px] flex justify-between">
          <img src={changeIcon} />
          <p className="text-white01">한국어</p>
        </div>
      </div>
      <p className="hidden text-white01 tablet:flex">마이페이지</p>
      <p className="hidden text-white01 tablet:flex">알림</p>
      <div
        className="hidden cursor-pointer tablet:flex justify-left"
        onClick={setIsLoggedin}
      >
        <img src={logoutIcon} className="mr-[15px]" />
        <p className="text-warn">로그아웃</p>
      </div>

      {/* 모바일용 알림창 */}
      <div className="tablet:hidden flex flex-col items-center gap-[20px] pt-[50px] px-[20px]">
        <div className="w-full h-full border-white border-1">
          <Link to="/series" className="flex justify-between text-white01">
            시리즈
            <img src={arrowRight} />
          </Link>
        </div>
        {/* 구분선 */}
        <div className="flex w-[216px] border-b-[0.5px] border-gray02"></div>
        {/* 구분선 하단 메뉴 */}
        <div className="w-full">
          <Link to="/movies" className="flex justify-between text-white01">
            영화
            <img src={arrowRight} />
          </Link>
        </div>
        {/* 구분선 */}
        <div className="flex w-[216px] border-b-[0.5px] border-gray02"></div>
        <div className="w-full">
          <Link to="/genres" className="flex justify-between text-white01">
            장르
            <img src={arrowRight} />
          </Link>
        </div>
        <img
          src={isTranslate ? translate_en : translate_ko}
          onClick={() => setIsTranslate((prev) => !prev)}
          className="fixed right-[20px] bottom-[20px]"
        />

        {/* 구분선 */}
        <div className="flex w-[216px] border-b-[0.5px] border-gray02"></div>

        {/* 영화 */}
        <SideToggleList
          title="영화"
          id="movies"
          clicked={toggleClicked}
          onClicked={handleToggleClicked}
        />

        {/* 구분선 */}
        <div className="flex w-[216px] border-b-[0.5px] border-gray02"></div>

        {/* 장르 */}
        <SideToggleList
          title="장르"
          id="genres"
          clicked={toggleClicked}
          onClicked={handleToggleClicked}
        />

        {/* 구분선 */}
        <div className="flex w-[216px] border-b-[0.5px] border-gray02"></div>

        {/* 마이페이지 */}
        <SideToggleList
          title="마이페이지"
          id="myPage"
          clicked={toggleClicked}
          onClicked={handleToggleClicked}
        />

        {/* 구분선 */}
        <div className="flex w-[216px] border-b-[0.5px] border-gray02"></div>

        {/* 언어변경 버튼 */}
        <div
          className="flex items-center justify-between w-full h-full border-white cursor-pointer border-1"
          onClick={() => setIsTranslate((prev) => !prev)}
        >
          <div className="flex justify-between text-white01">언어변경</div>

          {/* 언어변경 버튼 */}
          <div className="w-[60px] flex justify-between gap-[5px]">
            <img src={tranlateLang} />
            <div className="text-white01 text-[14px] text-left">
              {isTranslate ? "영어" : "한국어"}
            </div>
          </div>
        </div>

        {/* 로그아웃 버튼 */}
        <div
          className="flex justify-start w-full cursor-pointer"
          onClick={setIsLoggedin}
        >
          <div className="flex justify-between items-center gap-[15px]">
            <img src={logoutIcon} />
            <p className="text-warn">로그아웃</p>
          </div>
        </div>
      </div>
    </div>
  );
}
