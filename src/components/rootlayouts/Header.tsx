import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import mainLogo from "../../assets/logo/mainLogo.svg";
import searchIcon from "../../assets/icon/searchIcon.svg";
import cancelIcon from "../../assets/icon/cancelIcon.svg";
import arrow01 from "../../assets/icon/arrow/arrow01.svg";
import arrowUp from "../../assets/icon/arrow/arrowUp.svg";
import Notification from "./Notification";
import Searchbar from "./Searchbar";
import burgerButton from "../../assets/icon/burgerButton.svg";
import { useAuth } from "../../api/Auth";
import { notificationAPI } from "../../api/notification";
import { supabase } from "../../api";
import { useLanguageStore } from "../../store/useLanguageStore";
import { menuTranslations } from "../../translations/menu";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [previousPath, setPreviousPath] = useState("");
  const { isLoggedIn, user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { language } = useLanguageStore();
  const translation = menuTranslations[language];
  const notificationRef = useRef<HTMLDivElement>(null);

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
      setIsSearch(false);
    }
  }, [navigate, previousPath]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const fetchNotifications = async () => {
    const { data } = await notificationAPI.getNotifications(user!.id);
    setNotifications(data!);
  };
  useEffect(() => {
    fetchNotifications();
    const notificationSubscription = supabase
      .channel("notification")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notification" },
        () => {
          fetchNotifications();
        }
      )
      .subscribe();
    return () => {
      notificationSubscription.unsubscribe();
    };
  }, []);

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
              }`}
            >
              {translation.series}
            </Link>
            <Link
              to="/movies"
              className={`hover:text-gray03 ${
                location.pathname === "/movies"
                  ? "text-main hover:text-main"
                  : ""
              }`}
            >
              {translation.movies}
            </Link>
            <Link
              to="/genres"
              className={`hover:text-gray03 ${
                location.pathname === "/genres"
                  ? "text-main hover:text-main"
                  : ""
              }`}
            >
              {translation.genres}
            </Link>
          </div>
          {/* mobile 전용 */}
          <div className="tablet:hidden flex justify-between items-center h-[60px] text-gray01 text-[20px] font-bold">
            <Link to="/">
              <img src={mainLogo} className="w-[85px] h-[44.35px]" />
            </Link>
          </div>
        </>

        {/* 우측 메뉴 */}
        <>
          {/* tablet 이상 */}
          <div className="hidden tablet:flex w-[189px] h-[35px] justify-between items-center text-white01 text-[14px] font-bold">
            {/* 검색 버튼 */}
            <button className="z-10">
              <img
                src={isSearch ? cancelIcon : searchIcon}
                alt={translation.search}
                className={`cursor-pointer w-[20px] ${
                  isSearch ? "w-[18px] mx-[4px]" : "w-[26px]"
                }`}
                onClick={() => {
                  setIsSearch((prev) => !prev);
                  isSearch ? navigate(previousPath) : "";
                }}
              />
            </button>
            {isLoggedIn ? (
              <Link
                to={"/mypage"}
                className="flex items-center justify-between "
              >
                <img
                  src={user?.profile}
                  className="w-[35px] h-[35px] bg-gray02 rounded-full mr-[10px]"
                ></img>
                <div className="relative">
                  <div>{user?.name || "No Name"}</div>
                  {notifications.some((n) => !n.is_read) && (
                    <span className="absolute w-2 h-2 rounded-full -top-1 -right-1 bg-main"></span>
                  )}
                </div>
              </Link>
            ) : (
              <Link to="/login">{translation.login}</Link>
            )}
            {/* 알림창 버튼 */}
            {isLoggedIn && (
              <button
                className="z-50 tablet:block hidden"
                onClick={() => {
                  setIsOpen((prev) => !prev);
                }}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <img
                  src={isOpen ? arrowUp : arrow01}
                  alt={translation.notification}
                  className="flex cursor-pointer"
                />
              </button>
            )}
          </div>
          {/* mobile 전용 */}
          <div className="tablet:hidden flex w-[65px] h-[35px] justify-between items-center text-white01 text-[14px] font-bold">
            {/* 검색 버튼 */}
            <img
              src={isSearch ? cancelIcon : searchIcon}
              alt={translation.search}
              className="cursor-pointer w-[20px]"
              onClick={() => {
                setIsSearch((prev) => !prev);
              }}
            />
            {/* 햄버거 버튼 */}
            <button
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className="z-50 tablet:hidden block"
            >
              <img
                src={burgerButton}
                alt={translation.notification}
                className="cursor-pointer flex w-[20px]"
              />
            </button>
          </div>
        </>

        {/* 검색창 */}
        {isSearch && (
          <div className="absolute top-[80px] left-0 w-full h-full bg-black_50 z-20">
            <div className="absolute left-0 z-30 w-full bg-black">
              <Searchbar />
            </div>
          </div>
        )}

        {/* 알림창 */}
        {isOpen && (
          <div
            className="absolute tablet:flex tablet:top-[80px]
            tablet:right-[18px] tablet:bg-none
            absolute tablet:w-auto tablet:h-auto w-full h-[100%]
            bg-black_50 top-[80px] left-0"
            ref={notificationRef}
          >
            <div
              className="tablet:block hidden absolute top-0 right-0 w-[349px] h-[417px]
              bg-black border border-gray03 rounded-[10px]
              shadow-md shadow-white01/10 p-[50px] z-20"
            >
              <Notification />
            </div>
            {/* mobile 전용 */}

            <div
              className="tablet:hidden absolute top-0px right-0 w-[256px] h-full
              bg-black border-0 rounded-none z-20"
            >
              <Notification />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
