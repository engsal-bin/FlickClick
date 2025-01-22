import React from "react";
import MainThumbnail from "../components/common/MainThumbnail";

export default function Movies() {
  return (
    <div className="w-full h-full flex flex-col justify-between items-center desktop:gap-[50px] tablet:gap-[40px] mobile:gap-[30px] text-white bg-black">
      <MainThumbnail />
    </div>
  );
}
