import { Link } from "react-router-dom";

export default function Contents({
  children,
  to,
  showMore = true,
}: {
  children: string;
  to: string;
  showMore: boolean;
}) {
  return (
    <>
      {/* tablet 이상 */}
      <div className="hidden tablet:flex flex-col justify-between w-full border-[1px] border-gray01">
        <div className="flex justify-between items-baseline">
          <p className="text-white01 font-bold text-[24px] mb-[30px]">
            {children}
          </p>
          {showMore && (
            <Link to={to} className="text-white03 text-[20px]">
              더보기
            </Link>
          )}
        </div>

        <div>
          <div className="w-[200px] h-[265px] border-[1px] rounded-[8px] border-gray01 bg-gray02"></div>
        </div>
      </div>
      {/* mobile 전용 */}
      <div className="tablet:hidden flex flex-col justify-between w-full px-[10px] border-[1px] border-gray01">
        <div className="flex justify-between items-baseline">
          <p className="text-white01 font-bold text-[18px] mb-[30px]">
            {children}
          </p>
          {showMore && (
            <Link to={to} className="text-white03 text-[12px]">
              더보기
            </Link>
          )}
        </div>

        <div>
          <div className="w-[80px] h-[106px] border-[1px] rounded-[8px] border-gray01 bg-gray02"></div>
        </div>
      </div>
    </>
  );
}
