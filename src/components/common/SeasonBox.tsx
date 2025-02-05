import { Link } from "react-router-dom";
import arrowRight from "../../assets/icon/arrow/arrowRight.svg"
export default function SeasonBox() {
  return (
    <section className="flex flex-col w-full mb-[217px] tablet:gap-[50px] mobile:gap-[30px] desktop:px-[128px] tablet:px-[40px] mobile:px-[10px] tablet:mt-[50px] mobile:mt-[30px]">
      <div className="flex flex-between w-full tablet:h-[200px] mobile:h-[106.67px] overflow-hidden">
        {/* 콘텐츠 영역 */}
        <figure className="flex w-full tablet:gap-[35px] mobile:gap-[10px]">
          {/* 이미지 */}
          <img
            className="bg-white rounded-[10px] tablet:w-[150px] mobile:w-[80px]  h-full object-cover"
            alt="슬기로운 의사생활"
          />
          
          {/* 텍스트 캡션 */}
          <figcaption className="flex flex-col justify-center ml-[20px] text-white">
            <p className="font-semibold tablet:text-[30px] mobile:text-[18px] text-white01">슬기로운 의사생활</p>
            <p className="tablet:text-[24px] mobile:text-[14px] text-gray03">시즌 2 | 2021</p>
          </figcaption>
        </figure>
        <Link to="" className="w-[50px] h-full flex justify-end items-center">
          <img src={arrowRight} alt="바로 가기 버튼" className="tablet:w-[10px] tablet:h-[24px] mobile:w-[6.67px] mobile:h-[16px]" />
        </Link>
      </ div>
      <hr className="h-[1px] border-gray02"/>
      <div className="flex flex-between w-full tablet:h-[200px] mobile:h-[106.67px] overflow-hidden">
        {/* 콘텐츠 영역 */}
        <figure className="flex w-full tablet:gap-[35px] mobile:gap-[10px]">
          {/* 이미지 */}
          <img
            className="bg-white rounded-[10px] tablet:w-[150px] mobile:w-[80px]  h-full object-cover"
            alt="슬기로운 의사생활"
          />
          
          {/* 텍스트 캡션 */}
          <figcaption className="flex flex-col justify-center ml-[20px] text-white">
            <p className="font-semibold tablet:text-[30px] mobile:text-[18px] text-white01">슬기로운 의사생활</p>
            <p className="tablet:text-[24px] mobile:text-[14px] text-gray03">시즌 2 | 2021</p>
          </figcaption>
        </figure>
        <Link to="" className="w-[50px] h-full flex justify-end items-center">
          <img src={arrowRight} alt="바로 가기 버튼" className="tablet:w-[10px] tablet:h-[24px] mobile:w-[6.67px] mobile:h-[16px]" />
        </Link>
      </ div>
    </section>
  );
}
