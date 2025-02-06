export default function EpisodeContent() {
  return (
    <div className="flex">
      <div className="tablet:flex justify-between items-center gap-[30px]">
        <div className="min-w-[323px] h-[180px] bg-gray02 mb-[30px] tablet:mb-0"></div>
        <div className="flex flex-col tablet:gap-5 gap-[10px]">
          <p className="text-[14px] tablet:text-[22px] text-white02 font-semibold">
            슬기로운 의사생활 시즌 2
          </p>
          <p className="text-[16px] tablet:text-[22px] text-white02 font-semibold">
            에피소드 3
          </p>
          <p className="text-[14px] tablet:text-[18px] text-white03 tablet:h-[58px] overflow-hidden tablet:line-clamp-2">
            끝을 알 수 없어 더 힘든 병원 생활, 같은 아픔을 가진 보호자들은
            서로에게 크나큰 위로와 의지가 되어준다. 담당 교수인 준완은
            보호자에게 한 가지 소식을 전하게 되는데. 한편 익준에게는 절박한
            사연을 가진 환자의 수술 의뢰가 들어온다.
          </p>
        </div>
      </div>
    </div>
  );
}
