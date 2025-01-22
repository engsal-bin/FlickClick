import placeholderImg02 from "../../assets/placeholderImg02.svg";
import { Link } from "react-router-dom";

export default function SeriesThumbnail() {
  return (
    <>
      {/* tablet 이상 */}
      <div
        className="relative hidden tablet:flex flex-row justify-around items-start w-full h-[640px] bg-cover bg-center py-[146px] desktop:px-[136px] tablet:px-[30px]"
        style={{ backgroundImage: `url(${placeholderImg02})` }}
      >
        {/* 블러 오버레이 */}
        <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-lg"></div>

        {/* 텍스트 */}
        <div className="w-[436px] flex flex-col justify-between items-start gap-[10px] relative z-10 text-left text-white">
          <div className="font-bold text-[40px] leading-none">
            슬기로운 의사생활
          </div>
          <div className="font-light text-[16px] leading-none">
            누군가는 태어나고 누군가는 삶을 끝내는, 인생의 축소판이라 불리는
            병원에서 평범한 듯 특별한 하루하루를 살아가는 사람들과 눈빛만 봐도
            알 수 있는 20년지기 친구들의 케미스토리를 담은 드라마 <br />
            #우정 #병원 #의사 #락밴드 #비하인드
          </div>
        </div>

        {/* 작은 이미지 */}
        <img
          src={placeholderImg02}
          alt="placeholder"
          className="desktop:w-[320px] tablet:w-[220px] h-auto z-10"
        />
      </div>

      {/* mobile 전용 */}
      <div
        className="relative tablet:hidden flex flex-col justify-center items-center w-full h-[308px] border-[1px] border-gray01 bg-cover bg-center py-[50px] px-[30px]"
        style={{ backgroundImage: `url(${placeholderImg02})` }}
      >
        {/* 블러 오버레이 */}
        <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-md"></div>

        {/* 텍스트 */}
        <div className="w-[436px] flex flex-col justify-between items-start gap-[10px] relative z-10 text-left text-white">
          <div className="font-bold text-[36px] leading-none">
            슬기로운 의사생활
          </div>
          <div className="text-[16px] leading-none">
            누군가는 태어나고 누군가는 삶을 끝내는, 인생의 축소판이라 불리는
            병원에서 평범한 듯 특별한 하루하루를 살아가는 사람들과 눈빛만 봐도
            알 수 있는 20년지기 친구들의 케미스토리를 담은 드라마 <br />
            #우정 #병원 #의사 #락밴드 #비하인드
          </div>
        </div>
      </div>
    </>
  );
}
