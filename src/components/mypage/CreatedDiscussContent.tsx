import DeleteIcon from "../../assets/icon/deleteIcon.svg";

export default function CreatedDiscussContent() {
  return (
    <div className="flex items-center justify-between border border-gray01 rounded-[10px] py-[30px] px-[20px]">
      <div className="flex mobile:items-start tablet:items-center gap-[10px]">
        <div className="w-[45px] h-[45px] rounded-full bg-gray03"></div>
        <div>
          <p className="text-[18px] text-white01 font-bold">토론 주제</p>
          <div className="text-white03 mobile:flex gap-[50px] desktop:hidden">
            <p>슬기로운 의사생활</p>
            <p>3</p>
          </div>
          <div className="mobile:flex flex-col gap-[5px] tablet:hidden">
            <p className="text-gray03">2025-01-09, 오전 03:26</p>
            <div className="flex gap-[5px]">
              <img src={DeleteIcon} alt="삭제" />
              <p className="text-warn">삭제</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-[100px] items-center">
        <div className="text-white03 desktop:flex gap-[50px] hidden">
          <p>슬기로운 의사생활</p>
          <p>3</p>
        </div>
        <div className="tablet:flex flex-col gap-[5px] mobile:hidden">
          <p className="text-gray03">2025-01-09, 오전 03:26</p>
          <div className="flex gap-[5px]">
            <img src={DeleteIcon} alt="삭제" />
            <p className="text-warn">삭제</p>
          </div>
        </div>
      </div>
    </div>
  );
}
