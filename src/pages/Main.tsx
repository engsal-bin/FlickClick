import React from "react";
import MainThumbnail from "../components/common/MainThumbnail";
import Banner from "../components/common/Banner";
import Contents from "../components/common/Contents";

export default function Main() {
  return (
    <div className="flex flex-col justify-between items-center desktop:gap-[50px] tablet:gap-[40px] mobile:gap-[30px] text-white bg-black">
      <MainThumbnail />
      <Banner />
      <Contents />
    </div>
  );
}
