import placeholderImg03 from "../../assets/placeholderImg03.svg";
import { Link } from "react-router-dom";

export default function MainThumbnail() {
  return (
    /* 임시로 시리즈 상세 페이지에 연결함 */
    <>
      {/* tablet 이상 */}
      <Link
        to={"/detailseries/96102"}
        className="relative hidden tablet:flex flex-col justify-center 
        items-center w-full h-[720px] bg-cover bg-center py-[80px] px-[100px]"
        style={{ backgroundImage: `url(${placeholderImg03})` }}
      >
        {/* 그라데이션 오버레이 */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black 
        via-black/50 to-transparent opacity-80"
        ></div>

        {/* 텍스트 */}
        <div
          className="w-full h-full flex flex-col justify-end items-start 
        gap-[10px] relative z-10 text-center text-white"
        >
          <div className="font-bold text-[60px] leading-none">영화 제목</div>
          <div className="text-[24px] leading-none">요약 내용</div>
        </div>
      </Link>

      {/* mobile 전용 */}
      <div
        className="relative tablet:hidden flex flex-col justify-center 
        items-center w-full h-[420px] border-[1px] border-gray01 
        bg-cover bg-center py-[50px] px-[30px]"
        style={{ backgroundImage: `url(${placeholderImg03})` }}
      >
        {/* 그라데이션 오버레이 */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black 
        via-transparent to-transparent opacity-80"
        ></div>

        {/* 텍스트 */}
        <div
          className="w-full h-full flex flex-col justify-end items-start 
        gap-[10px] relative z-10 text-center text-white"
        >
          <div className="font-bold text-[36px] leading-none">영화 제목</div>
          <div className="text-[16px] leading-none">요약 내용</div>
        </div>
      </div>
    </>
  );
}
