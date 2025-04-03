import { useState } from "react";

export default function TagWithnotCancelIcon({
  children,
  onClick,
  isSelected,
}: {
  children?: string | number;
  onClick?: () => void;
  isSelected?: boolean;
}) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    if (onClick) onClick();
  };
  return (
    <>
      {/* desktop, tablet */}
      <div
        className={`desktop:flex tablet:flex mobile:hidden h-[30px] items-center 
          px-[5px] rounded-[10px] font-light text-white03 ${
            isSelected ? "bg-gray01 border-0" : "border-[1px] border-white03"
          }`}
        onClick={handleClick}
      >
        {children}
      </div>

      {/* mobile */}
      <div
        className={`desktop:hidden tablet:hidden mobile:flex h-[24px] 
          items-center px-[8px] rounded-[8px] font-light text-[14px] text-white03 
          ${isSelected ? "bg-gray01 border-0" : "border-[1px] border-white03"}`}
        onClick={handleClick}
      >
        {children}
      </div>
    </>
  );
}
