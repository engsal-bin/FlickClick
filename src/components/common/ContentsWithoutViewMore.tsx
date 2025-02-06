export default function Contents() {
  return (
    <>
      {/* tablet 이상 */}
      <div className="hidden tablet:flex flex-col justify-between w-full border-[1px] border-gray01">
        <div className="flex justify-between items-baseline">
          <p className="text-white01 font-bold text-[24px]"></p>
        </div>
        <div>
          <div className="w-[212px] h-[306px] border-[1px] rounded-[8px] border-gray01 bg-gray02"></div>
          <p className="text-white01 pt-[10px] font-[18px]">영화 제목</p>
        </div>
      </div>
      {/* mobile 전용 */}
      <div className="tablet:hidden flex flex-col justify-between w-full border-[1px] border-gray01">
        <div className="flex justify-between items-baseline">
          <p className="text-white01 font-bold text-[16px]"></p>
        </div>
        <div>
          <div className="w-[93px] h-[134px] border-[1px] rounded-[8px] border-gray01 bg-gray02"></div>
          <p className="text-white01 pt-[10px] font-[14px]">영화 제목</p>
        </div>
      </div>
    </>
  );
}
