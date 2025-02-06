import Tag from "./Tag";
import cancelIcon from "../../assets/icon/cancelIcon.svg"
import placeholderImg02 from "../../assets/placeholderImg02.svg";
import scrapIcon from "../../assets/icon/scrap_btn.svg"
import watcha from "../../assets/icon/ottIcon/watcha.svg"

export default function DetailIntroBox() {
  return (
    <>
      {/* tablet 이상 */}
      <section className="relative h-auto flex flex-col bg-cover bg-center desktop:pb-[133px] tablet:pb-[14px] mobile:pb-[42px]" style={{ backgroundImage: `url(${placeholderImg02})` }}>
        {/* 블러 오버레이 */}
        <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-lg"></div>
        <div className="flex justify-end w-full z-10 desktop:mb-[57px] tablet:mb-[70px] mobile:mb-[30px]">
          <button className="tablet:w-[26px] mobile:w-[19px] h-auto tablet:mt-[50px] mobile:mt-[30px] desktop:mr-[50px] tablet:mr-[30px] mobile:mr-[10px]">
            <img src={cancelIcon} alt="닫기 버튼" />
          </button>
        </div>  
        {/* 콘텐츠 소개 영역 */}
        <section
          className="w-full h-auto flex tablet:flex-row mobile:flex-col-reverse desktop:gap-[160px] tablet:gap-[50px] mobile:gap-[30px] justify-between tablet:items-start mobile:justify-center mobile:items-center tablet:pb-[146px] tablet:pt-[70px] desktop:px-[136px] tablet:px-[31px] mobile:px-[10px]"
          >
          <div className="w-full flex flex-col justify-between items-start gap-[35px] relative z-10 text-left text-white">
            <div className="flex flex-col gap-[10px]">
              <div className="font-bold text-[40px] leading-auto">
                슬기로운 의사생활
              </div>
              <div className="flex gap-[10px] text-light">
              <Tag>2020</Tag>
              <Tag>드라마</Tag>
              <Tag>코미디</Tag>
              <Tag>시즌 2개</Tag>
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <p className="text-white02 text-[16px] leading-[24px]">
                시청할 수 있는 서비스
              </p>
              <div className="flex gap-[10px]"><img src={watcha} alt="왓챠" /><img src={watcha} alt="왓챠" /><img src={watcha} alt="왓챠" /></div>
            </div>  
            <div className="font-light text-[16px] leading-[24px]">
              누군가는 태어나고 누군가는 삶을 끝내는, 인생의 축소판이라 불리는
              병원에서 평범한 듯 특별한 하루하루를 살아가는 사람들과 눈빛만 봐도
              알 수 있는 20년지기 친구들의 케미스토리를 담은 드라마 <br /><br />
              #우정 #병원 #의사 #락밴드 #비하인드
            </div>
            <button className="flex gap-[10px] w-auto h-auto px-[15px] py-[10px] border border-main rounded-[8px]">
              <img src={scrapIcon} alt="스크랩 버튼" />
              <span className="text-main">스크랩</span>
            </button>
          </div>
          <img
            src={placeholderImg02}
            alt="placeholder"
            className="desktop:w-[324px] tablet:w-[220px] mobile:w-[220px] h-auto z-10"
          />
        </section>
      </section>
    </>
  );
}
