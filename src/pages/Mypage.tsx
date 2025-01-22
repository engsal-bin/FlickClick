import React, { useState } from "react";
import Main from "./Main";

export default function Mypage() {
  const [isClick, setIsClick] = useState("notify");
  return (
    <div className="w-full y-full flex-1 px-[50px] pt-[100px] text-gray01">
      <div className="flex flex-row border-b-[1px] border-gray01">
        <div
          className={`w-[150px] h-[60px] flex justify-center items-center cursor-pointer ${
            isClick === "notify"
              ? "border-b-[2px] border-main text-main"
              : "hover:text-gray03"
          }`}
          onClick={() => {
            setIsClick(() => "notify");
          }}
        >
          알림
        </div>
        <div
          className={`w-[150px] h-[60px] flex justify-center items-center cursor-pointer ${
            isClick === "review"
              ? "border-b-[2px] border-main text-main"
              : "hover:text-gray03"
          }`}
          onClick={() => {
            setIsClick(() => "review");
          }}
        >
          리뷰
        </div>
        <div
          className={`w-[150px] h-[60px] flex justify-center items-center cursor-pointer ${
            isClick === "discuss"
              ? "border-b-[2px] border-main text-main"
              : "hover:text-gray03"
          }`}
          onClick={() => {
            setIsClick(() => "discuss");
          }}
        >
          토론
        </div>
        <div
          className={`w-[150px] h-[60px] flex justify-center items-center cursor-pointer ${
            isClick === "scrap"
              ? "border-b-[2px] border-main text-main"
              : "hover:text-gray03"
          }`}
          onClick={() => {
            setIsClick(() => "scrap");
          }}
        >
          스크랩
        </div>
      </div>
    </div>
  );
}
