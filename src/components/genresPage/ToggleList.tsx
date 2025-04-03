import { ReactNode, useState, useRef } from "react";
import arrowBottom from "../../assets/icon/arrow/arrowBottom.svg";
import arrowRight from "../../assets/icon/arrow/arrowRight.svg";

export default function ToggleList({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-[124px] flex flex-col justify-start gap-[30px]">
      <div className="flex flex-row justify-between items-center">
        <p className="max-w-[110px] text-[18px] font-bold">{title}</p>
        <div className="w-[15px] h-[27px] flex flex-col justify-center">
          <img
            src={isToggleOpen ? arrowBottom : arrowRight}
            className="w-[15px] h-[15px] cursor-pointer"
            onClick={() => setIsToggleOpen(!isToggleOpen)}
            alt="toggle"
          />
        </div>
      </div>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isToggleOpen
            ? `${contentRef.current?.scrollHeight}px`
            : "0px",
          opacity: isToggleOpen ? 1 : 0,
        }}
      >
        <div className="w-[124px] flex flex-col justify-start items-start font-light">
          {children}
        </div>
      </div>
    </div>
  );
}
