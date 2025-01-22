import React from "react";

export default function Banner() {
  return (
    <>
      {/* desktop */}
      <div className="tablet:hidden mobile:hidden desktop:flex w-[1180px] h-[150px] mx-[50px] border-[1px] border-gray01">
        Banner
      </div>
      {/* tablet */}
      <div className="desktop:hidden mobile:hidden tablet:flex w-[709px] h-[150px] mx-[50px] border-[1px] border-gray01">
        Banner
      </div>
      {/* mobile */}
      <div className="desktop:hidden tablet:hidden mobile:flex w-[300px] h-[80px] mx-[10px] border-[1px] border-gray01">
        Banner
      </div>
    </>
  );
}
