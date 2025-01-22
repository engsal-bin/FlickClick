import React from "react";
import { Link } from "react-router-dom";

export default function Contents() {
  return (
    <>
      {/* tablet 이상 */}
      <div className="hidden tablet:flex flex-col justify-between w-full px-[50px] h-[324px] border-[1px] border-gray01">
        <div className="flex justify-between items-baseline">
          <p className="text-white01 font-bold text-[24px]">컨텐츠 주제</p>
          <Link to="/popular" className="text-white03 text-[20px]">
            더보기
          </Link>
        </div>

        <div>
          <div className="w-[200px] h-[265px] border-[1px] rounded-[8px] border-gray01 bg-gray02"></div>
        </div>
      </div>
      {/* mobile 전용 */}
      <div className="tablet:hidden flex flex-col justify-between w-full px-[10px] h-[145px] border-[1px] border-gray01">
        <div className="flex justify-between items-baseline">
          <p className="text-white01 font-bold text-[16px]">컨텐츠 주제</p>
          <Link to="/popular" className="text-white03 text-[12px]">
            더보기
          </Link>
        </div>

        <div>
          <div className="w-[80px] h-[106px] border-[1px] rounded-[8px] border-gray01 bg-gray02"></div>
        </div>
      </div>
    </>
  );
}
