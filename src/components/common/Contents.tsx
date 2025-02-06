import { Link } from "react-router-dom";

interface ChildProps {
  imgSrc: string[];
  children?: React.ReactNode;
  to: string;
  showMore: boolean;
}
export default function Contents(props: ChildProps) {
  const imgSrc = props.imgSrc;

  return (
    <>
      {/* tablet 이상 */}
      <div className="hidden tablet:flex flex-col justify-between w-full px-[50px] border-[1px] border-gray01">
        <div className="flex items-baseline justify-between">
          <p className="text-white01 font-bold text-[24px] mb-[30px]">
            {props.children}
          </p>
          {props.showMore && (
            <Link to={props.to} className="text-white03 text-[20px]">
              더보기
            </Link>
          )}
        </div>

        <div>
          {imgSrc.map((_, index) => {
            return (
              <img
                className="w-[200px] h-[265px] border-[1px] rounded-[8px] border-gray01"
                src={imgSrc[index]}
                key={index}
              />
            );
          })}

          <div className="w-[200px] h-[265px] border-[1px] rounded-[8px] border-gray01 bg-gray02"></div>
        </div>
      </div>
      {/* mobile 전용 */}
      <div className="tablet:hidden flex flex-col justify-between w-full px-[10px] border-[1px] border-gray01">
        <div className="flex items-baseline justify-between">
          <p className="text-white01 font-bold text-[18px] mb-[30px]">
            {props.children}
          </p>
          {props.showMore && (
            <Link to={props.to} className="text-white03 text-[12px]">
              더보기
            </Link>
          )}{" "}
        </div>

        <div>
          <div className="w-[80px] h-[106px] border-[1px] rounded-[8px] border-gray01 bg-gray02"></div>
        </div>
      </div>
    </>
  );
}
