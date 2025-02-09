import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import mainLogo from "../../assets/logo/mainLogo.svg";
import searchIcon from "../../assets/icon/searchIcon.svg";
import cancelIcon from "../../assets/icon/cancelIcon.svg";
import arrow01 from "../../assets/icon/arrow/arrow01.svg";
import Notification from "./Notification";
import Searchbar from "./Searchbar";
import burgerButton from "../../assets/icon/burgerButton.svg";
import { useAuth } from "../../api/Auth";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false); // 알림창 오픈 상태
  const [isSearch, setIsSearch] = useState(false); // 검색창 오픈 상태
  const location = useLocation(); // 현재 경로 상태
  const { isLoggedIn, setIsLoggedin } = useAuth(); // (임시) 로그인 상태
  const navigate = useNavigate();
  const [previosPath, setPreviousPath] = useState("");

  // 모바일에서 스크롤 막기&허용
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // 검색창 오픈 시 스크롤 막기
  useEffect(() => {
    if (isSearch) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSearch]);

  useEffect(() => {
    if (location.pathname !== "/search") {
      setPreviousPath(location.pathname);
    }
  }, [navigate, previosPath]);

  return (
    <>
      <div className="w-full h-[80px] px-[50px] bg-black flex justify-between items-center">
        {/* 좌측 메뉴 */}
        <>
          {/* tablet 이상 */}
          <div className="hidden tablet:flex justify-between items-center w-[401px] h-[60px] text-gray01 text-[20px] font-bold">
            <Link to="/">
              <img src={mainLogo} className="w-[115px] h-[60px] " />
            </Link>
            <Link
              to="/series"
              className={`hover:text-gray03 ${
                location.pathname === "/series"
                  ? "text-main hover:text-main"
                  : ""
              }`}>
              시리즈
            </Link>
            <Link
              to="/movies"
              className={`hover:text-gray03 ${
                location.pathname === "/movies"
                  ? "text-main hover:text-main"
                  : ""
              }`}>
              영화
            </Link>
            <Link
              to="/genres"
              className={`hover:text-gray03 ${
                location.pathname === "/genres"
                  ? "text-main hover:text-main"
                  : ""
              }`}>
              장르
            </Link>
          </div>
          {/* mobile 전용 */}
          <div className="tablet:hidden flex justify-between items-center h-[60px] text-gray01 text-[20px] font-bold">
            <Link to="/">
              <img src={mainLogo} className="w-[85px] h-[44.35px]" />
            </Link>
          </div>
        </>
        {/* 임시 로그인 버튼 */}
        {isLoggedIn ? (
          <div
            onClick={setIsLoggedin}
            className="w-[100px] border-[1px] border-white01 p-[5px] text-center text-white01 text-[10px] cursor-pointer">
            임시 로그아웃 버튼
          </div>
        ) : (
          <div
            onClick={() => {}}
            className="w-[100px] border-[1px] border-white01 p-[5px] text-center text-white01 text-[10px] cursor-pointer">
            임시 로그인 버튼
          </div>
        )}

        {/* 우측 메뉴 */}
        <>
          {/* tablet 이상 */}
          <div className=" hidden tablet:flex w-[189px] h-[35px] justify-between items-center  text-white01 text-[14px] font-bold">
            {/* 검색 버튼 */}
            <img
              src={isSearch ? cancelIcon : searchIcon}
              alt="Toggle Searchbar"
              className={`cursor-pointer w-[20px] ${
                isSearch ? "w-[18px] mx-[4px]" : "w-[26px]"
              }`}
              onClick={() => {
                setIsSearch((prev) => !prev);
                isSearch ? navigate(previosPath) : "";
              }}
            />
            {isLoggedIn ? (
              <Link
                to={"/mypage"}
                className="flex items-center justify-between ">
                <div className="w-[35px] h-[35px] bg-gray02 rounded-full mr-[10px]"></div>
                <div>닉네임</div>
              </Link>
            ) : (
              <Link to="/login">로그인을 해주세요</Link>
            )}
            {/* 알림창 버튼 */}
            {isLoggedIn && (
              <img
                src={arrow01}
                alt="Toggle Notification"
                className="flex cursor-pointer"
                onClick={() => {
                  setIsOpen((prev) => !prev);
                }}
              />
            )}
          </div>
          {/* mobile 전용 */}
          <div className="tablet:hidden flex w-[65px] h-[35px] justify-between items-center text-white01 text-[14px] font-bold">
            {/* 검색 버튼 */}
            <img
              src={isSearch ? cancelIcon : searchIcon}
              alt="Toggle Searchbar"
              className="cursor-pointer w-[20px]"
              onClick={() => {
                setIsSearch((prev) => !prev);
              }}
            />
            {/* 햄버거 버튼 */}
            <img
              src={burgerButton}
              alt="Toggle Notification"
              className="cursor-pointer flex w-[20px]"
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
            />
          </div>
        </>

        {/* 검색창 */}
        {isSearch && (
          <div className="absolute top-[80px] left-0 w-full h-full bg-black_50 z-20">
            <div className="absolute left-0 w-full pb-[50px] bg-black z-30">
              <Searchbar />
            </div>
          </div>
        )}

        {/* 알림창 */}
        {isOpen && (
          <>
            {/* tablet 이상 */}
            <div
              className="absolute hidden tablet:flex top-[80px]
            right-[18px] bg-none z-20">
              <div
                className="absolute top-0 right-0 w-[349px] h-[417px]
              bg-black border border-gray03 rounded-[10px]
              shadow-md shadow-white01/10 p-[50px] z-20">
                <Notification />
              </div>
            </div>
            {/* mobile 전용 */}
            <div
              className="absolute tablet:hidden flex w-full h-[100%]
            bg-black_50 top-[80px] left-0 z-20">
              <div
                className="absolute top-0px right-0 w-[256px] h-full
              bg-black border-0 rounded-none z-20">
                <Notification />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
