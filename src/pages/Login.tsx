import React from "react";
import loginBg from "../assets/icon/loginBg.svg";
import kakao from "../assets/logo/socialLogo/kakao.svg";
import google from "../assets/logo/socialLogo/google.svg";
import twitter from "../assets/logo/socialLogo/twitter.svg";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div
      className="w-full flex-1 flex justify-center items-center"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="w-[400px] h-[361px] bg-black/80 rounded-[10px] p-[50px]">
        <div className="w-full h-full flex flex-col justify-between font-bold text-center">
          <p className="text-white01 text-[24px] ">로그인</p>
          <div className="flex flex-col justify-stretch text-[15px] gap-[20px]">
            <Link
              to={"/"}
              className="h-[45px] flex flex-row gap-[8px] justify-center items-center rounded-[6px] bg-kakao"
            >
              <img src={kakao} className="w-[18px]" />
              <div>카카오 로그인</div>
            </Link>
            <Link
              to={"/"}
              className="h-[45px] flex flex-row gap-[8px] justify-center items-center rounded-[6px] bg-white text-[#1d1c2b]"
            >
              <img src={google} className="w-[18px]" />
              <div>Google 로그인</div>
            </Link>
            <Link
              to={"/"}
              className="h-[45px] flex flex-row gap-[8px] justify-center items-center rounded-[6px] bg-twitter text-white"
            >
              <img src={twitter} className="w-[18px]" />
              <div>트위터 로그인</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
