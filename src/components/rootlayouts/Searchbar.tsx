import React, { useEffect, useState } from "react";
import seachIcon from "../../assets/icon/searchIcon.svg";

export default function Searchbar() {
  return (
    <>
      {/* desktop */}
      <div className="tablet:hidden mobile:hidden desktop:flex">
        <div className="w-[100%] h-[100%] py-[50px] px-[315px] flex flex-col justify-between items-center">
          <div className="flex">
            <input
              className="w-[620px] h-[41px] mr-[4px] font-light text-white01 text-[18px] bg-black border-b-[2px] border-b-white01"
              placeholder="검색어를 입력하세요"
            />
            <img src={seachIcon} />
          </div>
          <div className="w-[650px] h-[411px] flex flex-col gap-[20px] mt-[50px] text-white01 font-bold text-[18px]">
            <p>트렌드 컨텐츠</p>
            <div className="flex text-[16px]">
              <div className="w-[20px] text-main mr-[20px]">1</div>
              <div className="font-light">컨텐츠명</div>
            </div>
          </div>
        </div>
      </div>
      {/* tablet */}
      <div className="desktop:hidden mobile:hidden tablet:flex">
        <div className="w-[100%] h-[100%] py-[50px] px-[58px] flex flex-col justify-between items-center">
          <div className="flex text-[18px]">
            <input
              className="w-[620px] h-[41px] mr-[4px] font-light text-white01 bg-black border-b-[2px] border-b-white01"
              placeholder="검색어를 입력하세요"
            />
            <img src={seachIcon} />
          </div>
          <div className="w-[650px] h-[411px] flex flex-col gap-[20px] mt-[50px] text-white01 font-bold text-[18px]">
            <p>트렌드 컨텐츠</p>
            <div className="flex text-[16px]">
              <div className="w-[20px] text-main mr-[20px]">1</div>
              <div className="font-light">컨텐츠명</div>
            </div>
          </div>
        </div>
      </div>
      {/* mobile */}
      <div className="desktop:hidden tablet:hidden mobile:flex">
        <div className="w-[100%] h-[100%] py-[50px] px-[58px] flex flex-col justify-between items-center">
          <div className="flex text-[18px]">
            <input
              className="w-[250px] h-[35px] mr-[4px] font-light text-white01 bg-black border-b-[2px] border-b-white01"
              placeholder="검색어를 입력하세요"
            />
            <img src={seachIcon} />
          </div>
          <div className="w-[280px] h-[411px] flex flex-col gap-[20px] mt-[50px] text-white01 font-bold text-[18px]">
            <p>트렌드 컨텐츠</p>
            <div className="flex text-[16px]">
              <div className="w-[20px] text-main mr-[20px]">1</div>
              <div className="font-light">컨텐츠명</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
